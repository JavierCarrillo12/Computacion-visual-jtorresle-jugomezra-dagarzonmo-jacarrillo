using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// Gestor principal de la escena de realidad mixta
/// Coordina todos los componentes necesarios para el efecto passthrough
/// </summary>
public class MixedRealitySceneManager : MonoBehaviour
{
    [Header("Componentes Principales")]
    [SerializeField] private VideoBackgroundController videoController;
    [SerializeField] private PassthroughEffect passthroughEffect;
    [SerializeField] private Camera mainCamera;
    
    [Header("Configuración de Objetos")]
    [SerializeField] private GameObject[] virtualObjects;
    [SerializeField] private GameObject backgroundPlane;
    [SerializeField] private Canvas uiCanvas;
    
    [Header("Configuración de UI")]
    [SerializeField] private bool showControls = true;
    [SerializeField] private bool enableKeyboardShortcuts = true;
    
    [Header("Configuración de Rendimiento")]
    [SerializeField] private int targetFrameRate = 60;
    [SerializeField] private bool enableVSync = true;
    
    private bool isSceneInitialized = false;
    
    void Start()
    {
        InitializeScene();
    }
    
    void Update()
    {
        if (!isSceneInitialized) return;
        
        HandleKeyboardShortcuts();
        HandlePerformanceSettings();
    }
    
    /// <summary>
    /// Inicializa la escena de realidad mixta
    /// </summary>
    private void InitializeScene()
    {
        // Configurar rendimiento
        ConfigurePerformance();
        
        // Obtener componentes principales
        GetMainComponents();
        
        // Configurar la cámara
        SetupCamera();
        
        // Configurar el plano de fondo
        SetupBackgroundPlane();
        
        // Configurar objetos virtuales
        SetupVirtualObjects();
        
        // Configurar UI
        SetupUI();
        
        isSceneInitialized = true;
        
        Debug.Log("Escena de realidad mixta inicializada correctamente");
    }
    
    /// <summary>
    /// Configura los parámetros de rendimiento
    /// </summary>
    private void ConfigurePerformance()
    {
        Application.targetFrameRate = targetFrameRate;
        QualitySettings.vSyncCount = enableVSync ? 1 : 0;
        
        Debug.Log($"Rendimiento configurado: {targetFrameRate} FPS, VSync: {enableVSync}");
    }
    
    /// <summary>
    /// Obtiene los componentes principales de la escena
    /// </summary>
    private void GetMainComponents()
    {
        // Obtener cámara principal
        if (mainCamera == null)
        {
            mainCamera = Camera.main;
            if (mainCamera == null)
            {
                mainCamera = FindObjectOfType<Camera>();
            }
        }
        
        // Obtener controlador de video
        if (videoController == null)
        {
            videoController = FindObjectOfType<VideoBackgroundController>();
        }
        
        // Obtener efecto passthrough
        if (passthroughEffect == null)
        {
            passthroughEffect = FindObjectOfType<PassthroughEffect>();
        }
        
        // Obtener canvas de UI
        if (uiCanvas == null)
        {
            uiCanvas = FindObjectOfType<Canvas>();
        }
    }
    
    /// <summary>
    /// Configura la cámara principal
    /// </summary>
    private void SetupCamera()
    {
        if (mainCamera == null) return;
        
        // Configurar la cámara para realidad mixta
        mainCamera.clearFlags = CameraClearFlags.SolidColor;
        mainCamera.backgroundColor = Color.black;
        mainCamera.fieldOfView = 60f;
        mainCamera.nearClipPlane = 0.1f;
        mainCamera.farClipPlane = 1000f;
        
        Debug.Log("Cámara configurada para realidad mixta");
    }
    
    /// <summary>
    /// Configura el plano de fondo
    /// </summary>
    private void SetupBackgroundPlane()
    {
        if (backgroundPlane == null)
        {
            // Crear plano de fondo si no existe
            backgroundPlane = GameObject.CreatePrimitive(PrimitiveType.Plane);
            backgroundPlane.name = "BackgroundPlane";
            backgroundPlane.transform.position = new Vector3(0, 0, 10);
            backgroundPlane.transform.localScale = new Vector3(20, 1, 20);
            
            // Agregar RawImage para el video
            GameObject rawImageObject = new GameObject("BackgroundRawImage");
            rawImageObject.transform.SetParent(backgroundPlane.transform);
            rawImageObject.transform.localPosition = Vector3.zero;
            rawImageObject.transform.localScale = Vector3.one;
            
            RawImage rawImage = rawImageObject.AddComponent<RawImage>();
            rawImage.rectTransform.sizeDelta = new Vector2(10, 10);
            
            // Agregar VideoBackgroundController
            VideoBackgroundController controller = rawImageObject.AddComponent<VideoBackgroundController>();
            controller.enabled = true;
        }
        
        Debug.Log("Plano de fondo configurado");
    }
    
    /// <summary>
    /// Configura los objetos virtuales
    /// </summary>
    private void SetupVirtualObjects()
    {
        if (virtualObjects == null || virtualObjects.Length == 0)
        {
            // Crear objetos virtuales de ejemplo
            CreateExampleVirtualObjects();
        }
        
        // Configurar cada objeto virtual
        foreach (GameObject obj in virtualObjects)
        {
            if (obj != null)
            {
                SetupVirtualObject(obj);
            }
        }
        
        Debug.Log($"Configurados {virtualObjects.Length} objetos virtuales");
    }
    
    /// <summary>
    /// Crea objetos virtuales de ejemplo
    /// </summary>
    private void CreateExampleVirtualObjects()
    {
        virtualObjects = new GameObject[3];
        
        // Cubo flotante
        GameObject cube = GameObject.CreatePrimitive(PrimitiveType.Cube);
        cube.name = "VirtualCube";
        cube.transform.position = new Vector3(0, 2, 5);
        cube.transform.localScale = Vector3.one * 0.5f;
        
        // Agregar componente de interacción
        ObjectInteraction cubeInteraction = cube.AddComponent<ObjectInteraction>();
        cubeInteraction.enabled = true;
        
        // Esfera pulsante
        GameObject sphere = GameObject.CreatePrimitive(PrimitiveType.Sphere);
        sphere.name = "VirtualSphere";
        sphere.transform.position = new Vector3(2, 1, 5);
        sphere.transform.localScale = Vector3.one * 0.3f;
        
        ObjectInteraction sphereInteraction = sphere.AddComponent<ObjectInteraction>();
        sphereInteraction.enabled = true;
        
        // Cilindro rotatorio
        GameObject cylinder = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
        cylinder.name = "VirtualCylinder";
        cylinder.transform.position = new Vector3(-2, 1.5f, 5);
        cylinder.transform.localScale = new Vector3(0.3f, 0.5f, 0.3f);
        
        ObjectInteraction cylinderInteraction = cylinder.AddComponent<ObjectInteraction>();
        cylinderInteraction.enabled = true;
        
        virtualObjects[0] = cube;
        virtualObjects[1] = sphere;
        virtualObjects[2] = cylinder;
    }
    
    /// <summary>
    /// Configura un objeto virtual individual
    /// </summary>
    private void SetupVirtualObject(GameObject obj)
    {
        // Asegurar que tiene un renderer
        Renderer renderer = obj.GetComponent<Renderer>();
        if (renderer == null)
        {
            renderer = obj.AddComponent<MeshRenderer>();
        }
        
        // Configurar material
        Material material = renderer.material;
        material.color = new Color(Random.Range(0.5f, 1f), Random.Range(0.5f, 1f), Random.Range(0.5f, 1f), 0.8f);
        
        // Asegurar que tiene un collider para interacción
        Collider collider = obj.GetComponent<Collider>();
        if (collider == null)
        {
            obj.AddComponent<BoxCollider>();
        }
        
        // Agregar componente de interacción si no lo tiene
        ObjectInteraction interaction = obj.GetComponent<ObjectInteraction>();
        if (interaction == null)
        {
            interaction = obj.AddComponent<ObjectInteraction>();
        }
        
        interaction.enabled = true;
    }
    
    /// <summary>
    /// Configura la interfaz de usuario
    /// </summary>
    private void SetupUI()
    {
        if (uiCanvas == null)
        {
            // Crear canvas de UI
            GameObject canvasObject = new GameObject("UICanvas");
            uiCanvas = canvasObject.AddComponent<Canvas>();
            uiCanvas.renderMode = RenderMode.ScreenSpaceOverlay;
            
            // Agregar CanvasScaler
            CanvasScaler scaler = canvasObject.AddComponent<CanvasScaler>();
            scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            scaler.referenceResolution = new Vector2(1920, 1080);
            
            // Agregar GraphicRaycaster
            canvasObject.AddComponent<GraphicRaycaster>();
        }
        
        Debug.Log("UI configurada");
    }
    
    /// <summary>
    /// Maneja los atajos de teclado
    /// </summary>
    private void HandleKeyboardShortcuts()
    {
        if (!enableKeyboardShortcuts) return;
        
        // Cambiar entre webcam y video
        if (Input.GetKeyDown(KeyCode.W))
        {
            if (videoController != null)
            {
                videoController.SwitchToWebcam();
            }
        }
        else if (Input.GetKeyDown(KeyCode.V))
        {
            if (videoController != null)
            {
                videoController.SwitchToVideo();
            }
        }
        
        // Alternar efecto passthrough
        if (Input.GetKeyDown(KeyCode.P))
        {
            if (passthroughEffect != null)
            {
                passthroughEffect.TogglePassthrough();
            }
        }
        
        // Alternar controles de UI
        if (Input.GetKeyDown(KeyCode.H))
        {
            ToggleUIControls();
        }
        
        // Reiniciar escena
        if (Input.GetKeyDown(KeyCode.R))
        {
            RestartScene();
        }
    }
    
    /// <summary>
    /// Maneja la configuración de rendimiento en tiempo real
    /// </summary>
    private void HandlePerformanceSettings()
    {
        // Ajustar frame rate dinámicamente si es necesario
        if (Application.targetFrameRate != targetFrameRate)
        {
            Application.targetFrameRate = targetFrameRate;
        }
    }
    
    /// <summary>
    /// Alterna la visibilidad de los controles de UI
    /// </summary>
    public void ToggleUIControls()
    {
        showControls = !showControls;
        
        if (uiCanvas != null)
        {
            uiCanvas.enabled = showControls;
        }
        
        Debug.Log($"Controles de UI: {showControls}");
    }
    
    /// <summary>
    /// Reinicia la escena
    /// </summary>
    public void RestartScene()
    {
        UnityEngine.SceneManagement.SceneManager.LoadScene(UnityEngine.SceneManagement.SceneManager.GetActiveScene().name);
    }
    
    /// <summary>
    /// Obtiene el estado de la escena
    /// </summary>
    public bool IsSceneInitialized()
    {
        return isSceneInitialized;
    }
    
    /// <summary>
    /// Obtiene el número de objetos virtuales
    /// </summary>
    public int GetVirtualObjectCount()
    {
        return virtualObjects?.Length ?? 0;
    }
    
    void OnGUI()
    {
        if (!showControls) return;
        
        // Mostrar controles en pantalla
        GUILayout.BeginArea(new Rect(Screen.width - 310, 10, 300, 200));
        GUILayout.Label("Controles de Realidad Mixta");
        GUILayout.Label("W - Cambiar a Webcam");
        GUILayout.Label("V - Cambiar a Video");
        GUILayout.Label("P - Alternar Passthrough");
        GUILayout.Label("H - Ocultar/Mostrar UI");
        GUILayout.Label("R - Reiniciar Escena");
        GUILayout.Label($"Objetos virtuales: {GetVirtualObjectCount()}");
        GUILayout.EndArea();
    }
} 