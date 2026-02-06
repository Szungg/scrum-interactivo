import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const musicDir = path.join(projectRoot, 'src', 'public', 'music');
const imagesDir = path.join(projectRoot, 'src', 'public', 'images');
const musicPlayerPath = path.join(projectRoot, 'src', 'components', 'music-player', 'music-player.js');

const allowedExtensions = new Set(['.mp3', '.wav', '.ogg', '.m4a']);
const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const placeholderImage = 'src/public/images/ajolotemusic.png';

const escapeSingleQuotes = (value) => value.replace(/'/g, "\\'");

const buildTracksBlock = (tracks) => {
    const entries = tracks.map((track) => {
        return [
            '        {',
            `            title: '${escapeSingleQuotes(track.title)}',`,
            `            src: '${escapeSingleQuotes(track.src)}',`,
            `            image: '${escapeSingleQuotes(track.image)}'`,
            '        }'
        ].join('\n');
    });

    const list = entries.length > 0 ? `${entries.join(',\n')}\n    ` : '';

    return [
        '    // BEGIN AUTO-GENERATED MUSIC TRACKS',
        '    const tracks = [',
        `    ${list}]`,
        '    // END AUTO-GENERATED MUSIC TRACKS'
    ].join('\n');
};

const main = async () => {
    let files;
    let imageFiles = [];
    try {
        files = await fs.readdir(musicDir);
        imageFiles = await fs.readdir(imagesDir);
    } catch (error) {
        console.error(`No se pudo leer la carpeta: ${musicDir}`);
        throw error;
    }

    const imageMap = new Map();
    imageFiles.forEach((file) => {
        const ext = path.extname(file).toLowerCase();
        if (!imageExtensions.includes(ext)) return;
        const base = path.parse(file).name.toLowerCase();
        if (!imageMap.has(base)) {
            imageMap.set(base, file);
        }
    });

    const tracks = files
        .filter((file) => allowedExtensions.has(path.extname(file).toLowerCase()))
        .sort((a, b) => a.localeCompare(b, 'es', { numeric: true }))
        .map((file) => {
            const rawBaseName = path.parse(file).name;
            const baseName = rawBaseName.replace(/_/g, ' ');
            const encoded = encodeURIComponent(file);
            const imageFile = imageMap.get(rawBaseName.toLowerCase());
            const imageSrc = imageFile
                ? `src/public/images/${encodeURIComponent(imageFile)}`
                : placeholderImage;
            return {
                title: baseName,
                src: `src/public/music/${encoded}`,
                image: imageSrc
            };
        });

    const content = await fs.readFile(musicPlayerPath, 'utf8');
    const blockRegex = /\s*\/\/ BEGIN AUTO-GENERATED MUSIC TRACKS[\s\S]*?\/\/ END AUTO-GENERATED MUSIC TRACKS/;

    if (!blockRegex.test(content)) {
        throw new Error('No se encontraron los marcadores de auto-generacion en src/components/music-player/music-player.js');
    }

    const updated = content.replace(blockRegex, `\n${buildTracksBlock(tracks)}`);
    await fs.writeFile(musicPlayerPath, updated, 'utf8');

    console.log(`Listado actualizado: ${tracks.length} pista(s).`);
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
