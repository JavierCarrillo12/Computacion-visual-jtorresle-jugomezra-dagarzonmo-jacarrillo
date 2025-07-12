using UnityEngine;
using UnityEngine.Video;
using UnityEngine.UI;

/// <summary>
/// Controlador principal para manejar el video de fondo y la webcam
/// Simula el efecto passthrough de visores AR como HoloLens o Meta Quest
/// </summary>
public class VideoBackgroundController : MonoBehaviour
{
    [Header("Configuración de Video")]
    [SerializeField] private VideoPlayer videoPlayer;
    [SerializeField] private RawImage backgroundImage;
    [SerializeField] private RenderTexture renderTexture;
    
    [Header("Configuración de Webcam")]
    [SerializeField] private bool useWebcam = true;
    [SerializeField] private int webcamIndex = 0;
    [SerializeField] private int webcamWidth = 1920;
    [SerializeField] private int webcamHeight = 1080;
    
    [Header("Configuración de Video File")]
    [SerializeField] private VideoClip videoClip;
    [SerializeField] private string videoPath = "media/video_fondo.mp4";
    
    private WebCamTexture webCamTexture;
    private bool isWebcamInitialized = false;
    
    void Start()
    {
        InitializeVideoBackground();
    }
    
    void Update()
    {
        // Actualizar la textura de la webcam si está activa
        if (useWebcam && isWebcamInitialized && webCamTexture != null)
        {
            if (webCamTexture.isPlaying)
            {
                backgroundImage.texture = webCamTexture;
            }
        }
        
        // Controles de teclado para cambiar entre webcam y video
        if (Input.GetKeyDown(KeyCode.W))
        {
            SwitchToWebcam();
        }
        else if (Input.GetKeyDown(KeyCode.V))
        {
            SwitchToVideo();
        }
    }
    
    /// <summary>
    /// Inicializa el sistema de video de fondo
    /// </summary>
    private void InitializeVideoBackground()
    {
        if (videoPlayer == null)
        {
            videoPlayer = GetComponent<VideoPlayer>();
            if (videoPlayer == null)
            {
                videoPlayer = gameObject.AddComponent<VideoPlayer>();
            }
        }
        
        if (backgroundImage == null)
        {
            backgroundImage = GetComponent<RawImage>();
        }
        
        if (useWebcam)
        {
            InitializeWebcam();
        }
        else
        {
            InitializeVideoFile();
        }
    }
    
    /// <summary>
    /// Inicializa la webcam como fuente de video
    /// </summary>
    private void InitializeWebcam()
    {
        // Obtener dispositivos de webcam disponibles
        WebCamDevice[] devices = WebCamTexture.devices;
        
        if (devices.Length == 0)
        {
            Debug.LogWarning("No se encontraron dispositivos de webcam. Cambiando a video file.");
            useWebcam = false;
            InitializeVideoFile();
            return;
        }
        
        // Seleccionar la webcam especificada o la primera disponible
        int selectedIndex = Mathf.Clamp(webcamIndex, 0, devices.Length - 1);
        WebCamDevice selectedDevice = devices[selectedIndex];
        
        Debug.Log($"Inicializando webcam: {selectedDevice.name}");
        
        // Crear la textura de webcam
        webCamTexture = new WebCamTexture(selectedDevice.name, webcamWidth, webcamHeight, 30);
        webCamTexture.Play();
        
        // Asignar la textura al RawImage
        if (backgroundImage != null)
        {
            backgroundImage.texture = webCamTexture;
        }
        
        isWebcamInitialized = true;
        
        Debug.Log("Webcam inicializada correctamente");
    }
    
    /// <summary>
    /// Inicializa el archivo de video como fuente
    /// </summary>
    private void InitializeVideoFile()
    {
        if (videoPlayer == null) return;
        
        // Configurar el VideoPlayer
        videoPlayer.playOnAwake = true;
        videoPlayer.isLooping = true;
        videoPlayer.renderMode = VideoRenderMode.RenderTexture;
        
        // Asignar el video clip si está disponible
        if (videoClip != null)
        {
            videoPlayer.clip = videoClip;
        }
        else
        {
            // Intentar cargar desde la ruta especificada
            string fullPath = System.IO.Path.Combine(Application.streamingAssetsPath, videoPath);
            if (System.IO.File.Exists(fullPath))
            {
                videoPlayer.url = fullPath;
            }
            else
            {
                Debug.LogWarning($"No se encontró el archivo de video en: {fullPath}");
                // Crear un color sólido como fallback
                CreateSolidColorBackground();
                return;
            }
        }
        
        // Configurar el render texture
        if (renderTexture == null)
        {
            renderTexture = new RenderTexture(1920, 1080, 24);
        }
        
        videoPlayer.targetTexture = renderTexture;
        
        // Asignar la textura al RawImage
        if (backgroundImage != null)
        {
            backgroundImage.texture = renderTexture;
        }
        
        videoPlayer.Play();
        
        Debug.Log("Video file inicializado correctamente");
    }
    
    /// <summary>
    /// Crea un fondo de color sólido como fallback
    /// </summary>
    private void CreateSolidColorBackground()
    {
        Texture2D solidTexture = new Texture2D(1, 1);
        solidTexture.SetPixel(0, 0, Color.blue);
        solidTexture.Apply();
        
        if (backgroundImage != null)
        {
            backgroundImage.texture = solidTexture;
        }
        
        Debug.Log("Usando fondo de color sólido como fallback");
    }
    
    /// <summary>
    /// Cambia a la webcam como fuente de video
    /// </summary>
    public void SwitchToWebcam()
    {
        useWebcam = true;
        
        if (videoPlayer != null)
        {
            videoPlayer.Stop();
        }
        
        InitializeWebcam();
        
        Debug.Log("Cambiado a webcam");
    }
    
    /// <summary>
    /// Cambia al archivo de video como fuente
    /// </summary>
    public void SwitchToVideo()
    {
        useWebcam = false;
        
        if (webCamTexture != null)
        {
            webCamTexture.Stop();
        }
        
        InitializeVideoFile();
        
        Debug.Log("Cambiado a video file");
    }
    
    /// <summary>
    /// Obtiene la textura actual del video de fondo
    /// </summary>
    public Texture GetCurrentBackgroundTexture()
    {
        if (useWebcam && webCamTexture != null)
        {
            return webCamTexture;
        }
        else if (renderTexture != null)
        {
            return renderTexture;
        }
        
        return null;
    }
    
    /// <summary>
    /// Verifica si el video está reproduciéndose
    /// </summary>
    public bool IsVideoPlaying()
    {
        if (useWebcam)
        {
            return webCamTexture != null && webCamTexture.isPlaying;
        }
        else
        {
            return videoPlayer != null && videoPlayer.isPlaying;
        }
    }
    
    void OnDestroy()
    {
        // Limpiar recursos
        if (webCamTexture != null)
        {
            webCamTexture.Stop();
            DestroyImmediate(webCamTexture);
        }
        
        if (renderTexture != null)
        {
            renderTexture.Release();
        }
    }
    
    void OnApplicationPause(bool pauseStatus)
    {
        // Pausar/reanudar la webcam cuando la aplicación se pausa
        if (webCamTexture != null)
        {
            if (pauseStatus)
            {
                webCamTexture.Pause();
            }
            else
            {
                webCamTexture.Play();
            }
        }
    }
} 