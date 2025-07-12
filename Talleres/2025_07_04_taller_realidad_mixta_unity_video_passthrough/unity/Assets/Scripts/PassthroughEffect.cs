using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// Implementación del efecto passthrough básico
/// Simula la experiencia de realidad mixta donde objetos virtuales se superponen sobre el mundo real
/// </summary>
public class PassthroughEffect : MonoBehaviour
{
    [Header("Configuración del Efecto")]
    [SerializeField] private bool enablePassthrough = true;
    [SerializeField] private float transparencyLevel = 0.8f;
    [SerializeField] private bool enableDepthBlending = false;
    [SerializeField] private float depthThreshold = 0.1f;
    
    [Header("Configuración de la Cámara")]
    [SerializeField] private Camera mainCamera;
    [SerializeField] private float nearClipPlane = 0.1f;
    [SerializeField] private float farClipPlane = 1000f;
    [SerializeField] private float fieldOfView = 60f;
    
    [Header("Configuración de Objetos")]
    [SerializeField] private GameObject[] virtualObjects;
    [SerializeField] private LayerMask virtualObjectLayer = 8;
    [SerializeField] private bool autoDetectVirtualObjects = true;
    
    [Header("Configuración de UI")]
    [SerializeField] private Canvas overlayCanvas;
    [SerializeField] private bool showDebugInfo = true;
    
    private VideoBackgroundController videoController;
    private Material passthroughMaterial;
    private bool isInitialized = false;
    
    void Start()
    {
        InitializePassthroughEffect();
    }
    
    void Update()
    {
        if (!isInitialized) return;
        
        HandlePassthroughEffect();
        HandleDebugInfo();
    }
    
    /// <summary>
    /// Inicializa el efecto passthrough
    /// </summary>
    private void InitializePassthroughEffect()
    {
        // Obtener la cámara principal
        if (mainCamera == null)
        {
            mainCamera = Camera.main;
            if (mainCamera == null)
            {
                mainCamera = FindObjectOfType<Camera>();
            }
        }
        
        // Configurar la cámara para el efecto passthrough
        ConfigureCamera();
        
        // Obtener el controlador de video
        videoController = FindObjectOfType<VideoBackgroundController>();
        
        // Detectar objetos virtuales automáticamente
        if (autoDetectVirtualObjects)
        {
            DetectVirtualObjects();
        }
        
        // Crear material de passthrough
        CreatePassthroughMaterial();
        
        // Configurar capas
        SetupLayers();
        
        isInitialized = true;
        
        Debug.Log("Efecto passthrough inicializado correctamente");
    }
    
    /// <summary>
    /// Configura la cámara para el efecto passthrough
    /// </summary>
    private void ConfigureCamera()
    {
        if (mainCamera == null) return;
        
        mainCamera.nearClipPlane = nearClipPlane;
        mainCamera.farClipPlane = farClipPlane;
        mainCamera.fieldOfView = fieldOfView;
        
        // Configurar el fondo de la cámara para que sea transparente
        mainCamera.clearFlags = CameraClearFlags.SolidColor;
        mainCamera.backgroundColor = Color.black;
        
        Debug.Log("Cámara configurada para passthrough");
    }
    
    /// <summary>
    /// Detecta automáticamente los objetos virtuales en la escena
    /// </summary>
    private void DetectVirtualObjects()
    {
        // Buscar objetos con el componente ObjectInteraction
        ObjectInteraction[] interactions = FindObjectsOfType<ObjectInteraction>();
        virtualObjects = new GameObject[interactions.Length];
        
        for (int i = 0; i < interactions.Length; i++)
        {
            virtualObjects[i] = interactions[i].gameObject;
        }
        
        Debug.Log($"Detectados {virtualObjects.Length} objetos virtuales");
    }
    
    /// <summary>
    /// Crea el material para el efecto passthrough
    /// </summary>
    private void CreatePassthroughMaterial()
    {
        // Crear un shader básico para transparencia
        string shaderCode = @"
            Shader ""Custom/PassthroughShader"" {
                Properties {
                    _MainTex (""Texture"", 2D) = ""white"" {}
                    _Transparency (""Transparency"", Range(0,1)) = 0.8
                }
                SubShader {
                    Tags { ""Queue""=""Transparent"" ""RenderType""=""Transparent"" }
                    Blend SrcAlpha OneMinusSrcAlpha
                    ZWrite Off
                    
                    Pass {
                        CGPROGRAM
                        #pragma vertex vert
                        #pragma fragment frag
                        #include ""UnityCG.cginc""
                        
                        struct appdata {
                            float4 vertex : POSITION;
                            float2 uv : TEXCOORD0;
                        };
                        
                        struct v2f {
                            float2 uv : TEXCOORD0;
                            float4 vertex : SV_POSITION;
                        };
                        
                        sampler2D _MainTex;
                        float _Transparency;
                        
                        v2f vert (appdata v) {
                            v2f o;
                            o.vertex = UnityObjectToClipPos(v.vertex);
                            o.uv = v.uv;
                            return o;
                        }
                        
                        fixed4 frag (v2f i) : SV_Target {
                            fixed4 col = tex2D(_MainTex, i.uv);
                            col.a *= _Transparency;
                            return col;
                        }
                        ENDCG
                    }
                }
            }";
        
        // Crear el material (en una implementación real, usarías un shader precompilado)
        passthroughMaterial = new Material(Shader.Find("Standard"));
        passthroughMaterial.SetFloat("_Mode", 3); // Transparent mode
        passthroughMaterial.SetInt("_SrcBlend", (int)UnityEngine.Rendering.BlendMode.SrcAlpha);
        passthroughMaterial.SetInt("_DstBlend", (int)UnityEngine.Rendering.BlendMode.OneMinusSrcAlpha);
        passthroughMaterial.SetInt("_ZWrite", 0);
        passthroughMaterial.DisableKeyword("_ALPHATEST_ON");
        passthroughMaterial.EnableKeyword("_ALPHABLEND_ON");
        passthroughMaterial.DisableKeyword("_ALPHAPREMULTIPLY_ON");
        passthroughMaterial.renderQueue = 3000;
        
        Debug.Log("Material de passthrough creado");
    }
    
    /// <summary>
    /// Configura las capas para separar objetos virtuales del fondo
    /// </summary>
    private void SetupLayers()
    {
        // Asignar objetos virtuales a la capa especificada
        if (virtualObjects != null)
        {
            foreach (GameObject obj in virtualObjects)
            {
                if (obj != null)
                {
                    obj.layer = (int)Mathf.Log(virtualObjectLayer.value, 2);
                }
            }
        }
        
        Debug.Log("Capas configuradas para objetos virtuales");
    }
    
    /// <summary>
    /// Maneja el efecto passthrough en cada frame
    /// </summary>
    private void HandlePassthroughEffect()
    {
        if (!enablePassthrough) return;
        
        // Aplicar transparencia a los objetos virtuales
        ApplyTransparencyToVirtualObjects();
        
        // Aplicar efecto de profundidad si está habilitado
        if (enableDepthBlending)
        {
            ApplyDepthBlending();
        }
        
        // Actualizar la posición de los objetos virtuales
        UpdateVirtualObjectPositions();
    }
    
    /// <summary>
    /// Aplica transparencia a los objetos virtuales
    /// </summary>
    private void ApplyTransparencyToVirtualObjects()
    {
        if (virtualObjects == null) return;
        
        foreach (GameObject obj in virtualObjects)
        {
            if (obj == null) continue;
            
            Renderer renderer = obj.GetComponent<Renderer>();
            if (renderer != null)
            {
                Material[] materials = renderer.materials;
                foreach (Material mat in materials)
                {
                    Color color = mat.color;
                    color.a = transparencyLevel;
                    mat.color = color;
                }
            }
        }
    }
    
    /// <summary>
    /// Aplica efecto de mezcla de profundidad
    /// </summary>
    private void ApplyDepthBlending()
    {
        if (mainCamera == null) return;
        
        // Simular efecto de profundidad basado en la distancia a la cámara
        foreach (GameObject obj in virtualObjects)
        {
            if (obj == null) continue;
            
            float distance = Vector3.Distance(mainCamera.transform.position, obj.transform.position);
            float depthFactor = Mathf.Clamp01(distance / farClipPlane);
            
            Renderer renderer = obj.GetComponent<Renderer>();
            if (renderer != null)
            {
                Material[] materials = renderer.materials;
                foreach (Material mat in materials)
                {
                    Color color = mat.color;
                    color.a = transparencyLevel * (1 - depthFactor);
                    mat.color = color;
                }
            }
        }
    }
    
    /// <summary>
    /// Actualiza las posiciones de los objetos virtuales
    /// </summary>
    private void UpdateVirtualObjectPositions()
    {
        // Aquí se pueden agregar efectos de tracking o persistencia espacial
        // Por ahora, solo mantenemos las posiciones actuales
    }
    
    /// <summary>
    /// Maneja la información de debug
    /// </summary>
    private void HandleDebugInfo()
    {
        if (!showDebugInfo) return;
        
        // Mostrar información de debug en la consola
        if (Input.GetKeyDown(KeyCode.D))
        {
            Debug.Log($"Passthrough activo: {enablePassthrough}");
            Debug.Log($"Objetos virtuales: {virtualObjects?.Length ?? 0}");
            Debug.Log($"Transparencia: {transparencyLevel}");
            Debug.Log($"Mezcla de profundidad: {enableDepthBlending}");
        }
    }
    
    /// <summary>
    /// Habilita o deshabilita el efecto passthrough
    /// </summary>
    public void TogglePassthrough()
    {
        enablePassthrough = !enablePassthrough;
        Debug.Log($"Passthrough: {enablePassthrough}");
    }
    
    /// <summary>
    /// Ajusta el nivel de transparencia
    /// </summary>
    public void SetTransparency(float transparency)
    {
        transparencyLevel = Mathf.Clamp01(transparency);
        Debug.Log($"Transparencia ajustada a: {transparencyLevel}");
    }
    
    /// <summary>
    /// Habilita o deshabilita la mezcla de profundidad
    /// </summary>
    public void ToggleDepthBlending()
    {
        enableDepthBlending = !enableDepthBlending;
        Debug.Log($"Mezcla de profundidad: {enableDepthBlending}");
    }
    
    /// <summary>
    /// Agrega un objeto virtual al sistema
    /// </summary>
    public void AddVirtualObject(GameObject obj)
    {
        if (obj == null) return;
        
        // Redimensionar el array
        GameObject[] newArray = new GameObject[virtualObjects.Length + 1];
        for (int i = 0; i < virtualObjects.Length; i++)
        {
            newArray[i] = virtualObjects[i];
        }
        newArray[virtualObjects.Length] = obj;
        
        virtualObjects = newArray;
        
        // Configurar el objeto
        obj.layer = (int)Mathf.Log(virtualObjectLayer.value, 2);
        
        Debug.Log($"Objeto virtual agregado: {obj.name}");
    }
    
    /// <summary>
    /// Obtiene el estado actual del efecto passthrough
    /// </summary>
    public bool IsPassthroughEnabled()
    {
        return enablePassthrough;
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
        if (!showDebugInfo) return;
        
        // Mostrar información de debug en pantalla
        GUILayout.BeginArea(new Rect(10, 10, 300, 200));
        GUILayout.Label("Passthrough Debug Info");
        GUILayout.Label($"Passthrough: {enablePassthrough}");
        GUILayout.Label($"Objetos virtuales: {GetVirtualObjectCount()}");
        GUILayout.Label($"Transparencia: {transparencyLevel:F2}");
        GUILayout.Label($"Mezcla de profundidad: {enableDepthBlending}");
        GUILayout.EndArea();
    }
    
    void OnDestroy()
    {
        // Limpiar recursos
        if (passthroughMaterial != null)
        {
            DestroyImmediate(passthroughMaterial);
        }
    }
} 