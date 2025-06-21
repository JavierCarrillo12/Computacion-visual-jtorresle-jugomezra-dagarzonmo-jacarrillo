import * as THREE from 'https://cdn.skypack.dev/three@0.160.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.160.0/examples/jsm/controls/OrbitControls.js';

// Clase para manejar la escena Three.js
export class ThreeScene {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.detectionObjects = [];
        this.animationId = null;
        
        this.init();
    }

    init() {
        // Escena
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1e293b);

        // Cámara
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 5, 10);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);

        // Controles
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;

        // Configurar iluminación
        this.setupLighting();
        
        // Configurar helpers
        this.setupHelpers();

        // Manejar redimensionamiento
        window.addEventListener('resize', () => this.onWindowResize());
    }

    setupLighting() {
        // Luz ambiental
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);

        // Luz direccional
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        // Luz puntual para efectos
        const pointLight = new THREE.PointLight(0x6366f1, 0.5, 20);
        pointLight.position.set(-5, 5, 5);
        this.scene.add(pointLight);
    }

    setupHelpers() {
        // Grid helper
        const gridHelper = new THREE.GridHelper(20, 20, 0x475569, 0x334155);
        this.scene.add(gridHelper);

        // Axes helper
        const axesHelper = new THREE.AxesHelper(5);
        this.scene.add(axesHelper);
    }

    // Crear visualización de detecciones
    createDetectionVisualization(detections) {
        // Limpiar objetos anteriores
        this.clearDetectionObjects();

        detections.forEach((detection, index) => {
            // Crear bounding box 3D
            const box = this.createBoundingBox(detection, index);
            this.scene.add(box);
            this.detectionObjects.push(box);

            // Crear etiqueta
            const label = this.createLabel(detection, box);
            if (label) {
                this.scene.add(label);
                this.detectionObjects.push(label);
            }

            // Crear línea de conexión al suelo
            const line = this.createGroundLine(box);
            this.scene.add(line);
            this.detectionObjects.push(line);
        });

        // Ajustar cámara a los objetos
        this.fitCameraToObjects();
    }

    // Crear bounding box 3D
    createBoundingBox(detection, index) {
        const geometry = new THREE.BoxGeometry(
            detection.w / 100, 
            detection.h / 100, 
            0.1
        );
        
        const color = this.getColorForClass(detection.class);
        const material = new THREE.MeshLambertMaterial({ 
            color: color,
            transparent: true,
            opacity: 0.7
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        
        // Posición
        mesh.position.set(
            (detection.x - 400) / 100,
            -(detection.y - 300) / 100,
            index * 0.2
        );
        
        mesh.userData = { detection: detection };
        
        // Agregar wireframe
        const wireframe = new THREE.LineSegments(
            new THREE.WireframeGeometry(geometry),
            new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true })
        );
        wireframe.position.copy(mesh.position);
        mesh.add(wireframe);
        
        return mesh;
    }

    // Crear etiqueta 3D
    createLabel(detection, parentMesh) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 64;
        
        // Fondo
        context.fillStyle = 'rgba(0, 0, 0, 0.8)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Borde
        context.strokeStyle = this.getColorForClass(detection.class);
        context.lineWidth = 2;
        context.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
        
        // Texto
        context.fillStyle = 'white';
        context.font = 'bold 20px Inter';
        context.textAlign = 'center';
        context.fillText(detection.class.toUpperCase(), canvas.width / 2, 30);
        
        // Confianza
        context.font = '14px Inter';
        context.fillText(`${(detection.confidence * 100).toFixed(1)}%`, canvas.width / 2, 50);
        
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(spriteMaterial);
        
        sprite.position.copy(parentMesh.position);
        sprite.position.y += parentMesh.geometry.parameters.height / 2 + 0.5;
        sprite.scale.set(2, 0.5, 1);
        
        return sprite;
    }

    // Crear línea al suelo
    createGroundLine(parentMesh) {
        const geometry = new THREE.BufferGeometry().setFromPoints([
            parentMesh.position,
            new THREE.Vector3(parentMesh.position.x, 0, parentMesh.position.z)
        ]);
        
        const material = new THREE.LineBasicMaterial({ 
            color: 0x6366f1,
            opacity: 0.5,
            transparent: true
        });
        
        return new THREE.Line(geometry, material);
    }

    // Obtener color para clase
    getColorForClass(className) {
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
            'phone': 0xff9f43,
            'tv': 0x2e86de,
            'keyboard': 0x10ac84,
            'mouse': 0x5f27cd,
            'remote': 0xff9f43,
            'cell phone': 0xff9f43
        };
        
        return colors[className.toLowerCase()] || 0x6366f1;
    }

    // Limpiar objetos de detección
    clearDetectionObjects() {
        this.detectionObjects.forEach(obj => {
            this.scene.remove(obj);
        });
        this.detectionObjects = [];
    }

    // Ajustar cámara a objetos
    fitCameraToObjects() {
        if (this.detectionObjects.length === 0) return;

        const box = new THREE.Box3().setFromObjects(this.detectionObjects);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = this.camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        
        this.camera.position.set(center.x, center.y, center.z + cameraZ * 1.5);
        this.camera.lookAt(center);
        this.controls.target.copy(center);
    }

    // Manejar redimensionamiento
    onWindowResize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    }

    // Renderizar escena
    render() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    // Iniciar loop de animación
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        this.render();
    }

    // Detener animación
    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    // Limpiar recursos
    dispose() {
        this.stopAnimation();
        this.clearDetectionObjects();
        
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        if (this.container && this.renderer) {
            this.container.removeChild(this.renderer.domElement);
        }
    }
} 