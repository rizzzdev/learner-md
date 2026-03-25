import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// Vite custom plugin — membaca struktur nested folder contents
// Structure: src/contents/{outer}/{inner}/{metadata.json + readme.md}
function markdownApiPlugin() {
  return {
    name: 'markdown-api',
    configureServer(server) {
      server.middlewares.use('/api/data', (req, res) => {
        const rootDir = path.join(process.cwd(), 'src', 'contents');
        if (!fs.existsSync(rootDir)) fs.mkdirSync(rootDir, { recursive: true });

        const courses = [];

        try {
          const outerDirs = fs.readdirSync(rootDir, { withFileTypes: true })
            .filter(d => d.isDirectory() && !d.name.startsWith('.'));

          for (const outerDir of outerDirs) {
            const outerPath = path.join(rootDir, outerDir.name);

            // Baca metadata outer (course)
            const outerMetaPath = path.join(outerPath, 'metadata.json');
            let courseTitle = outerDir.name;
            let courseDescription = '';
            if (fs.existsSync(outerMetaPath)) {
              const meta = JSON.parse(fs.readFileSync(outerMetaPath, 'utf-8'));
              courseTitle = meta.title || courseTitle;
              courseDescription = meta.description || '';
            }

            // Parse prefix angka dari nama folder outer
            const outerPrefixMatch = outerDir.name.match(/^(\d+)-(.+)$/);
            const coursePrefix = outerPrefixMatch ? outerPrefixMatch[1] : null;

            // Baca inner folder (materi)
            const materials = [];
            const innerDirs = fs.readdirSync(outerPath, { withFileTypes: true })
              .filter(d => d.isDirectory() && !d.name.startsWith('.'));

            for (const innerDir of innerDirs) {
              const innerPath = path.join(outerPath, innerDir.name);

              // Baca metadata inner (materi)
              const innerMetaPath = path.join(innerPath, 'metadata.json');
              let materialTitle = innerDir.name;
              let materialDescription = '';
              if (fs.existsSync(innerMetaPath)) {
                const meta = JSON.parse(fs.readFileSync(innerMetaPath, 'utf-8'));
                materialTitle = meta.title || materialTitle;
                materialDescription = meta.description || '';
              }

              // Parse prefix angka dari nama folder inner
              const innerPrefixMatch = innerDir.name.match(/^(\d+)-(.+)$/);
              const materialPrefix = innerPrefixMatch ? innerPrefixMatch[1] : null;

              // Baca readme.md
              const readmePath = path.join(innerPath, 'readme.md');
              let content = '';
              if (fs.existsSync(readmePath)) {
                content = fs.readFileSync(readmePath, 'utf-8');
              }

              materials.push({
                slug: innerDir.name,
                prefix: materialPrefix,
                title: materialTitle,
                description: materialDescription,
                content: content
              });
            }

            // Urutkan materi berdasarkan nama folder (natural sort)
            materials.sort((a, b) =>
              a.slug.localeCompare(b.slug, undefined, { numeric: true, sensitivity: 'base' })
            );

            courses.push({
              slug: outerDir.name,
              prefix: coursePrefix,
              title: courseTitle,
              description: courseDescription,
              materials: materials
            });
          }

          // Urutkan kursus berdasarkan nama folder
          courses.sort((a, b) =>
            a.slug.localeCompare(b.slug, undefined, { numeric: true, sensitivity: 'base' })
          );

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(courses));
        } catch (error) {
          console.error('Error membaca struktur contents:', error);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: 'Gagal membaca folder', message: error.message }));
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), markdownApiPlugin()]
})
