/**
 * main-simple.js - Versión simplificada de la aplicación XR
 */

// Variables globales
let scene, camera, renderer, controls;
let objects = [];
let clock = new THREE.Clock();

// Variables para controles WASD
let keys = {};
let moveSpeed = 0.1;
let rotateSpeed = 0.02;

/**
 * Inicialización principal
 */
function init() {
    console.log('🚀 Iniciando aplicación XR simplificada...');
    
    // Crear escena
    createScene();
    
    // Crear cámara
    createCamera();
    
    // Crear renderer
    createRenderer();
    
    // Crear controles
    setupControls();
    
    // Crear objetos
    createObjects();
    
    // Crear iluminación
    createLighting();
    
    // Crear piso
    createFloor();
    
    // Configurar eventos
    setupEventListeners();
    
    // Iniciar loop de renderizado
    animate();
    
    console.log('✅ Aplicación iniciada correctamente');
}

/**
 * Crear escena Three.js
 */
function createScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000011);
    console.log('✅ Escena creada');
}

/**
 * Crear cámara
 */
function createCamera() {
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    camera.position.set(0, 5, 10);
    console.log('✅ Cámara creada');
}

/**
 * Crear renderer
 */
function createRenderer() {
    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: false
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    document.body.appendChild(renderer.domElement);
    console.log('✅ Renderer creado');
}

/**
 * Configurar controles
 */
function setupControls() {
    // Verificar si FlyControls está disponible
    if (typeof FlyControls !== 'undefined') {
        controls = new FlyControls(camera);
        controls.movementSpeed = 100;
        controls.rollSpeed = 0.005;
        controls.dragToLook = true;
        console.log('✅ FlyControls configurado');
    } else {
        console.log('⚠️ FlyControls no disponible, usando controles básicos');
    }
}

/**
 * Crear objetos interactivos
 */
function createObjects() {
    const geometries = [
        new THREE.BoxGeometry(2, 2, 2),
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.TorusGeometry(1, 0.3, 16, 100)
    ];
    
    const materials = [
        new THREE.MeshPhongMaterial({ color: 0xff6b6b }),
        new THREE.MeshPhongMaterial({ color: 0x4ecdc4 }),
        new THREE.MeshPhongMaterial({ color: 0x45b7d1 })
    ];
    
    for (let i = 0; i < 10; i++) {
        const geometry = geometries[i % geometries.length];
        const material = materials[i % materials.length].clone();
        
        const object = new THREE.Mesh(geometry, material);
        
        // Posición aleatoria
        object.position.set(
            (Math.random() - 0.5) * 20,
            Math.random() * 10 + 2,
            (Math.random() - 0.5) * 20
        );
        
        // Propiedades para interacción
        object.userData = {
            originalColor: material.color.getHex(),
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            }
        };
        
        // Agregar sombras
        object.castShadow = true;
        object.receiveShadow = true;
        
        scene.add(object);
        objects.push(object);
    }
    
    console.log(`✅ ${objects.length} objetos creados`);
}

/**
 * Crear iluminación
 */
function createLighting() {
    // Luz ambiental
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    // Luz direccional principal
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);
    
    console.log('✅ Sistema de iluminación creado');
}

/**
 * Crear piso
 */
function createFloor() {
    const floorGeometry = new THREE.PlaneGeometry(50, 50);
    const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x2c3e50 });
    
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    
    console.log('✅ Piso creado');
}

/**
 * Configurar eventos
 */
function setupEventListeners() {
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    console.log('✅ Eventos configurados');
}

/**
 * Manejar teclas presionadas
 */
function onKeyDown(event) {
    keys[event.code] = true;
    
    switch(event.code) {
        case 'KeyR':
            resetCamera();
            break;
    }
}

/**
 * Manejar teclas liberadas
 */
function onKeyUp(event) {
    keys[event.code] = false;
}

/**
 * Resetear cámara
 */
function resetCamera() {
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    console.log('🔄 Cámara reseteada');
}

/**
 * Manejar resize de ventana
 */
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Loop de animación
 */
function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();
    
    // Actualizar controles
    if (controls && controls.enabled) {
        controls.update(delta);
    }
    
    // Animar objetos
    objects.forEach(object => {
        object.rotation.x += object.userData.rotationSpeed.x;
        object.rotation.y += object.userData.rotationSpeed.y;
        object.rotation.z += object.userData.rotationSpeed.z;
    });
    
    // Manejar movimiento WASD
    handleWASDMovement();
    
    // Renderizar
    renderer.render(scene, camera);
}

/**
 * Manejar movimiento WASD
 */
function handleWASDMovement() {
    // Obtener la dirección hacia donde mira la cámara
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    
    // Vector para movimiento lateral (perpendicular a la dirección de la cámara)
    const right = new THREE.Vector3();
    right.crossVectors(camera.up, direction).normalize();
    
    // Movimiento hacia adelante/atrás (W/S)
    if (keys['KeyW']) {
        camera.position.add(direction.clone().multiplyScalar(moveSpeed));
    }
    if (keys['KeyS']) {
        camera.position.sub(direction.clone().multiplyScalar(moveSpeed));
    }
    
    // Movimiento lateral (A/D)
    if (keys['KeyA']) {
        camera.position.sub(right.clone().multiplyScalar(moveSpeed));
    }
    if (keys['KeyD']) {
        camera.position.add(right.clone().multiplyScalar(moveSpeed));
    }
    
    // Movimiento vertical (Q/E)
    if (keys['KeyQ']) {
        camera.position.y += moveSpeed;
    }
    if (keys['KeyE']) {
        camera.position.y -= moveSpeed;
    }
    
    // Rotación con flechas
    if (keys['ArrowLeft']) {
        camera.rotation.y += rotateSpeed;
    }
    if (keys['ArrowRight']) {
        camera.rotation.y -= rotateSpeed;
    }
    if (keys['ArrowUp']) {
        camera.rotation.x -= rotateSpeed;
    }
    if (keys['ArrowDown']) {
        camera.rotation.x += rotateSpeed;
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

console.log('📦 Aplicación XR simplificada cargada'); 