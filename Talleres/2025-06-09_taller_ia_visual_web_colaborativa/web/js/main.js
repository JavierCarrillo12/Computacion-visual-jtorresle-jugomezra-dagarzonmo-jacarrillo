// Importar Three.js
import * as THREE from 'https://cdn.skypack.dev/three@0.160.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.160.0/examples/jsm/controls/OrbitControls.js';

// Configuración de la API
const API_BASE_URL = 'http://localhost:5000';

// Variables globales
let scene, camera, renderer, controls;
let detectionObjects = [];
let selectedFile = null;
let animationId;

// Elementos del DOM
const uploadArea = document.getElementById('uploadArea');
const imageInput = document.getElementById('imageInput');
const detectBtn = document.getElementById('detectBtn');
const resultsInfo = document.getElementById('resultsInfo');
const detectionList = document.getElementById('detectionList');
const scene3D = document.getElementById('scene3D');
const loadingModal = document.getElementById('loadingModal');
const objectCount = document.getElementById('objectCount');
const fpsElement = document.getElementById('fps');

// Controles
const showBoundingBoxes = document.getElementById('showBoundingBoxes');
const showLabels = document.getElementById('showLabels');
const showConfidence = document.getElementById('showConfidence');

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    setupEventListeners();
    animate();
});

// Configurar Three.js
function initThreeJS() {
    // Escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1e293b);

    // Cámara
    camera = new THREE.PerspectiveCamera(
        75,
        scene3D.clientWidth / scene3D.clientHeight,
        0.1,
        1000
    );
    camera.position.set(0, 5, 10);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(scene3D.clientWidth, scene3D.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    scene3D.appendChild(renderer.domElement);

    // Controles
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Iluminación
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Grid helper
    const gridHelper = new THREE.GridHelper(20, 20, 0x475569, 0x334155);
    scene.add(gridHelper);

    // Manejar redimensionamiento
    window.addEventListener('resize', onWindowResize);
}

// Configurar event listeners
function setupEventListeners() {
    // Upload area
    uploadArea.addEventListener('click', () => imageInput.click());
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('drop', handleDrop);
    uploadArea.addEventListener('dragleave', handleDragLeave);

    // File input
    imageInput.addEventListener('change', handleFileSelect);

    // Detect button
    detectBtn.addEventListener('click', detectObjects);

    // Controles
    showBoundingBoxes.addEventListener('change', updateVisualization);
    showLabels.addEventListener('change', updateVisualization);
    showConfidence.addEventListener('change', updateVisualization);
}

// Manejar drag and drop
function handleDragOver(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

// Manejar selección de archivo
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}

// Procesar archivo
function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Por favor selecciona un archivo de imagen válido');
        return;
    }

    selectedFile = file;
    detectBtn.disabled = false;
    
    // Mostrar preview
    const reader = new FileReader();
    reader.onload = (e) => {
        uploadArea.innerHTML = `
            <img src="${e.target.result}" style="max-width: 100%; max-height: 200px; border-radius: 8px;">
            <p style="margin-top: 1rem;">${file.name}</p>
        `;
    };
    reader.readAsDataURL(file);
}

// Detectar objetos
async function detectObjects() {
    if (!selectedFile) return;

    showLoading(true);
    
    try {
        const formData = new FormData();
        formData.append('image', selectedFile);

        const response = await fetch(`${API_BASE_URL}/detect`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        displayResults(data);
        create3DVisualization(data);
        
    } catch (error) {
        console.error('Error al detectar objetos:', error);
        alert('Error al procesar la imagen. Verifica que el servidor esté ejecutándose.');
    } finally {
        showLoading(false);
    }
}

// Mostrar resultados
function displayResults(data) {
    const objects = data.objects || [];
    
    // Actualizar información
    resultsInfo.innerHTML = `
        <p><strong>${objects.length}</strong> objetos detectados</p>
        <p><small>Timestamp: ${new Date(data.timestamp).toLocaleString()}</small></p>
    `;

    // Actualizar lista
    detectionList.innerHTML = '';
    objects.forEach((obj, index) => {
        const item = document.createElement('div');
        item.className = 'detection-item';
        item.innerHTML = `
            <h4>${obj.class}</h4>
            <div class="confidence">Confianza: ${(obj.confidence * 100).toFixed(1)}%</div>
            <div class="position">Posición: (${obj.x}, ${obj.y}) | Tamaño: ${obj.w}×${obj.h}</div>
        `;
        detectionList.appendChild(item);
    });

    // Actualizar contador
    objectCount.textContent = `Objetos: ${objects.length}`;
}

// Crear visualización 3D
function create3DVisualization(data) {
    // Limpiar objetos anteriores
    detectionObjects.forEach(obj => scene.remove(obj));
    detectionObjects = [];

    const objects = data.objects || [];
    
    objects.forEach((obj, index) => {
        // Crear geometría del bounding box
        const geometry = new THREE.BoxGeometry(obj.w / 100, obj.h / 100, 0.1);
        
        // Color basado en la clase
        const color = getColorForClass(obj.class);
        const material = new THREE.MeshLambertMaterial({ 
            color: color,
            transparent: true,
            opacity: 0.7
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        
        // Posición (normalizar coordenadas)
        mesh.position.set(
            (obj.x - 400) / 100,  // Centrar en X
            -(obj.y - 300) / 100, // Invertir Y
            index * 0.2           // Separar en Z
        );
        
        mesh.userData = { detection: obj };
        scene.add(mesh);
        detectionObjects.push(mesh);

        // Crear etiqueta si está habilitado
        if (showLabels.checked) {
            createLabel(mesh, obj);
        }
    });

    // Ajustar cámara
    if (objects.length > 0) {
        const box = new THREE.Box3().setFromObjects(detectionObjects);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        
        camera.position.set(center.x, center.y, center.z + cameraZ * 1.5);
        camera.lookAt(center);
        controls.target.copy(center);
    }
}

// Crear etiqueta 3D
function createLabel(mesh, detection) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 64;
    
    context.fillStyle = 'rgba(0, 0, 0, 0.8)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    context.fillStyle = 'white';
    context.font = '20px Inter';
    context.textAlign = 'center';
    context.fillText(detection.class, canvas.width / 2, 30);
    
    if (showConfidence.checked) {
        context.font = '14px Inter';
        context.fillText(`${(detection.confidence * 100).toFixed(1)}%`, canvas.width / 2, 50);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    
    sprite.position.copy(mesh.position);
    sprite.position.y += mesh.geometry.parameters.height / 2 + 0.5;
    sprite.scale.set(2, 0.5, 1);
    
    scene.add(sprite);
    detectionObjects.push(sprite);
}

// Obtener color para clase
function getColorForClass(className) {
    const colors = {
        'person': 0xff6b6b,
        'car': 0x4ecdc4,
        'dog': 0x45b7d1,
        'cat': 0x96ceb4,
        'chair': 0xfeca57,
        'bottle': 0xff9ff3,
        'cup': 0x54a0ff,
        'book': 0x5f27cd,
        'laptop': 0x00d2d3,
        'phone': 0xff9f43
    };
    
    return colors[className.toLowerCase()] || 0x6366f1;
}

// Actualizar visualización
function updateVisualization() {
    // Recrear visualización con nuevos ajustes
    if (detectionObjects.length > 0) {
        const data = {
            objects: detectionObjects
                .filter(obj => obj.userData.detection)
                .map(obj => obj.userData.detection)
        };
        create3DVisualization(data);
    }
}

// Mostrar/ocultar loading
function showLoading(show) {
    if (show) {
        loadingModal.classList.add('show');
    } else {
        loadingModal.classList.remove('show');
    }
}

// Manejar redimensionamiento
function onWindowResize() {
    camera.aspect = scene3D.clientWidth / scene3D.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(scene3D.clientWidth, scene3D.clientHeight);
}

// Loop de animación
function animate() {
    animationId = requestAnimationFrame(animate);
    
    controls.update();
    renderer.render(scene, camera);
    
    // Actualizar FPS
    const fps = Math.round(1000 / (performance.now() - (animate.lastTime || performance.now())));
    fpsElement.textContent = `FPS: ${fps}`;
    animate.lastTime = performance.now();
}

// Limpiar al salir
window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
}); 