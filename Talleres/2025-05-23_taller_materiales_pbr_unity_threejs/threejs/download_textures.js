import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const textures = {
  'metal_plate_diff_1k.jpg': 'https://ambientcg.com/get?id=MetalPlate047_1K-JPG',
  'metal_plate_rough_1k.jpg': 'https://ambientcg.com/get?id=MetalPlate047_1K-JPG_roughness',
  'metal_plate_metal_1k.jpg': 'https://ambientcg.com/get?id=MetalPlate047_1K-JPG_metallic',
  'metal_plate_nor_1k.jpg': 'https://ambientcg.com/get?id=MetalPlate047_1K-JPG_normal'
};

const texturesDir = path.join(__dirname, 'public', 'textures');

// Crear directorio si no existe
if (!fs.existsSync(texturesDir)) {
  fs.mkdirSync(texturesDir, { recursive: true });
}

// Función para descargar una textura
function downloadTexture(filename, url) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(texturesDir, filename);
    const file = fs.createWriteStream(filePath);

    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✅ ${filename} descargado correctamente`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      console.error(`❌ Error al descargar ${filename}:`, err.message);
      reject(err);
    });
  });
}

// Descargar todas las texturas
async function downloadAllTextures() {
  console.log('🚀 Iniciando descarga de texturas...');
  
  try {
    for (const [filename, url] of Object.entries(textures)) {
      await downloadTexture(filename, url);
    }
    console.log('✨ Todas las texturas han sido descargadas correctamente');
  } catch (error) {
    console.error('❌ Error al descargar las texturas:', error);
  }
}

downloadAllTextures(); 