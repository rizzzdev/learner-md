import fs from 'fs';
import path from 'path';

const rootDir = path.join(process.cwd(), 'src', 'contents');
const publicDir = path.join(process.cwd(), 'public');
const outputFile = path.join(publicDir, 'data.json');

// Pastikan folder public ada
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

function generateData() {
  if (!fs.existsSync(rootDir)) {
    console.warn('Directory src/contents not found. Creating empty data.');
    fs.mkdirSync(rootDir, { recursive: true });
    fs.writeFileSync(outputFile, JSON.stringify([]));
    return;
  }

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

      // Urutkan materi berdasarkan prefix (angka), fallback ke slug
      materials.sort((a, b) => {
        const prefixA = a.prefix ? parseInt(a.prefix, 10) : Infinity;
        const prefixB = b.prefix ? parseInt(b.prefix, 10) : Infinity;
        if (prefixA !== prefixB) return prefixA - prefixB;
        return a.slug.localeCompare(b.slug, undefined, { numeric: true, sensitivity: 'base' });
      });

      courses.push({
        slug: outerDir.name,
        prefix: coursePrefix,
        title: courseTitle,
        description: courseDescription,
        materials: materials
      });
    }

    // Urutkan kursus berdasarkan prefix (angka), fallback ke slug
    courses.sort((a, b) => {
      const prefixA = a.prefix ? parseInt(a.prefix, 10) : Infinity;
      const prefixB = b.prefix ? parseInt(b.prefix, 10) : Infinity;
      if (prefixA !== prefixB) return prefixA - prefixB;
      return a.slug.localeCompare(b.slug, undefined, { numeric: true, sensitivity: 'base' });
    });

    fs.writeFileSync(outputFile, JSON.stringify(courses, null, 2));
    console.log(`Successfully generated ${outputFile}`);
  } catch (error) {
    console.error('Error generating data:', error);
    process.exit(1);
  }
}

generateData();
