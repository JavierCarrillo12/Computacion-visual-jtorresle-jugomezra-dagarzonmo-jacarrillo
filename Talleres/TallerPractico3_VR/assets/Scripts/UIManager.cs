using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System.Collections;

/// <summary>
/// Manejador de UI para dispositivos XR
/// Gestiona feedback visual para interacciones
/// </summary>
public class UIManager : MonoBehaviour
{
    [Header("Referencias de UI")]
    [SerializeField] private Canvas mainCanvas;
    [SerializeField] private TextMeshProUGUI feedbackText;
    [SerializeField] private Image feedbackPanel;
    [SerializeField] private GameObject gestureFeedbackPrefab;
    [SerializeField] private GameObject voiceFeedbackPrefab;
    [SerializeField] private GameObject controllerFeedbackPrefab;
    
    [Header("Configuración de Feedback")]
    [SerializeField] private float feedbackDuration = 2f;
    [SerializeField] private Color gestureColor = Color.blue;
    [SerializeField] private Color voiceColor = Color.green;
    [SerializeField] private Color controllerColor = Color.red;
    [SerializeField] private Color warningColor = Color.yellow;
    
    [Header("Animaciones")]
    [SerializeField] private bool enableAnimations = true;
    [SerializeField] private float animationSpeed = 1f;
    
    // Estado interno
    private bool isInitialized = false;
    private Coroutine currentFeedbackCoroutine;
    
    public void Initialize()
    {
        isInitialized = true;
        
        // Configurar canvas para XR
        SetupXRCanvas();
        
        // Configurar elementos de UI
        SetupUIElements();
        
        Debug.Log("UIManager inicializado");
    }
    
    private void SetupXRCanvas()
    {
        if (mainCanvas != null)
        {
            // Configurar canvas para renderizado en XR
            mainCanvas.renderMode = RenderMode.WorldSpace;
            mainCanvas.worldCamera = Camera.main;
            
            // Posicionar canvas frente a la cámara
            mainCanvas.transform.position = Camera.main.transform.position + Camera.main.transform.forward * 2f;
            mainCanvas.transform.rotation = Camera.main.transform.rotation;
        }
    }
    
    private void SetupUIElements()
    {
        // Configurar panel de feedback
        if (feedbackPanel != null)
        {
            feedbackPanel.gameObject.SetActive(false);
        }
        
        // Configurar texto de feedback
        if (feedbackText != null)
        {
            feedbackText.text = "";
            feedbackText.gameObject.SetActive(false);
        }
    }
    
    /// <summary>
    /// Muestra feedback para gestos
    /// </summary>
    public void ShowGestureFeedback(string gestureType)
    {
        if (!isInitialized) return;
        
        string message = $"Gesto: {gestureType}";
        ShowFeedback(message, gestureColor, FeedbackType.Gesture);
    }
    
    /// <summary>
    /// Muestra feedback para comandos de voz
    /// </summary>
    public void ShowVoiceFeedback(string command)
    {
        if (!isInitialized) return;
        
        string message = $"Voz: {command}";
        ShowFeedback(message, voiceColor, FeedbackType.Voice);
    }
    
    /// <summary>
    /// Muestra feedback para input de controladores
    /// </summary>
    public void ShowControllerFeedback(string inputType)
    {
        if (!isInitialized) return;
        
        string message = $"Controlador: {inputType}";
        ShowFeedback(message, controllerColor, FeedbackType.Controller);
    }
    
    /// <summary>
    /// Muestra un mensaje de advertencia
    /// </summary>
    public void ShowWarning(string message)
    {
        if (!isInitialized) return;
        
        ShowFeedback(message, warningColor, FeedbackType.Warning);
    }
    
    /// <summary>
    /// Muestra feedback general
    /// </summary>
    public void ShowFeedback(string message, Color color, FeedbackType type)
    {
        // Detener feedback anterior si existe
        if (currentFeedbackCoroutine != null)
        {
            StopCoroutine(currentFeedbackCoroutine);
        }
        
        // Iniciar nuevo feedback
        currentFeedbackCoroutine = StartCoroutine(ShowFeedbackCoroutine(message, color, type));
    }
    
    private IEnumerator ShowFeedbackCoroutine(string message, Color color, FeedbackType type)
    {
        // Mostrar panel de feedback
        if (feedbackPanel != null)
        {
            feedbackPanel.gameObject.SetActive(true);
            feedbackPanel.color = color;
            
            if (enableAnimations)
            {
                // Animación de entrada
                feedbackPanel.transform.localScale = Vector3.zero;
                float elapsed = 0f;
                while (elapsed < 0.3f)
                {
                    elapsed += Time.deltaTime * animationSpeed;
                    float t = elapsed / 0.3f;
                    feedbackPanel.transform.localScale = Vector3.Lerp(Vector3.zero, Vector3.one, t);
                    yield return null;
                }
                feedbackPanel.transform.localScale = Vector3.one;
            }
        }
        
        // Mostrar texto de feedback
        if (feedbackText != null)
        {
            feedbackText.gameObject.SetActive(true);
            feedbackText.text = message;
            feedbackText.color = Color.white;
            
            if (enableAnimations)
            {
                // Animación de texto
                feedbackText.alpha = 0f;
                float elapsed = 0f;
                while (elapsed < 0.2f)
                {
                    elapsed += Time.deltaTime * animationSpeed;
                    feedbackText.alpha = elapsed / 0.2f;
                    yield return null;
                }
                feedbackText.alpha = 1f;
            }
        }
        
        // Crear prefab específico según el tipo
        GameObject feedbackPrefab = null;
        switch (type)
        {
            case FeedbackType.Gesture:
                feedbackPrefab = gestureFeedbackPrefab;
                break;
            case FeedbackType.Voice:
                feedbackPrefab = voiceFeedbackPrefab;
                break;
            case FeedbackType.Controller:
                feedbackPrefab = controllerFeedbackPrefab;
                break;
        }
        
        if (feedbackPrefab != null)
        {
            GameObject instance = Instantiate(feedbackPrefab, mainCanvas.transform);
            instance.GetComponentInChildren<TextMeshProUGUI>().text = message;
            
            // Posicionar prefab
            RectTransform rectTransform = instance.GetComponent<RectTransform>();
            if (rectTransform != null)
            {
                rectTransform.anchoredPosition = Vector2.zero;
            }
            
            // Destruir después de un tiempo
            Destroy(instance, feedbackDuration);
        }
        
        // Esperar duración del feedback
        yield return new WaitForSeconds(feedbackDuration);
        
        // Ocultar feedback con animación
        if (enableAnimations)
        {
            if (feedbackPanel != null)
            {
                float elapsed = 0f;
                while (elapsed < 0.3f)
                {
                    elapsed += Time.deltaTime * animationSpeed;
                    float t = elapsed / 0.3f;
                    feedbackPanel.transform.localScale = Vector3.Lerp(Vector3.one, Vector3.zero, t);
                    yield return null;
                }
            }
            
            if (feedbackText != null)
            {
                float elapsed = 0f;
                while (elapsed < 0.2f)
                {
                    elapsed += Time.deltaTime * animationSpeed;
                    feedbackText.alpha = 1f - (elapsed / 0.2f);
                    yield return null;
                }
            }
        }
        
        // Ocultar elementos
        if (feedbackPanel != null)
        {
            feedbackPanel.gameObject.SetActive(false);
        }
        
        if (feedbackText != null)
        {
            feedbackText.gameObject.SetActive(false);
        }
        
        currentFeedbackCoroutine = null;
    }
    
    /// <summary>
    /// Muestra información del dispositivo actual
    /// </summary>
    public void ShowDeviceInfo(string deviceName, string capabilities)
    {
        if (!isInitialized) return;
        
        string message = $"Dispositivo: {deviceName}\nCapacidades: {capabilities}";
        ShowFeedback(message, Color.cyan, FeedbackType.Info);
    }
    
    /// <summary>
    /// Muestra métricas de rendimiento
    /// </summary>
    public void ShowPerformanceMetrics(float fps, float latency)
    {
        if (!isInitialized) return;
        
        string message = $"FPS: {fps:F1} | Latencia: {latency:F2}ms";
        ShowFeedback(message, Color.magenta, FeedbackType.Performance);
    }
    
    /// <summary>
    /// Actualiza la posición del canvas para seguir al usuario
    /// </summary>
    public void UpdateCanvasPosition()
    {
        if (mainCanvas != null && Camera.main != null)
        {
            // Posicionar canvas frente al usuario
            Vector3 targetPosition = Camera.main.transform.position + Camera.main.transform.forward * 2f;
            mainCanvas.transform.position = Vector3.Lerp(mainCanvas.transform.position, targetPosition, Time.deltaTime * 2f);
            
            // Rotar canvas hacia el usuario
            Quaternion targetRotation = Quaternion.LookRotation(mainCanvas.transform.position - Camera.main.transform.position);
            mainCanvas.transform.rotation = Quaternion.Slerp(mainCanvas.transform.rotation, targetRotation, Time.deltaTime * 2f);
        }
    }
    
    /// <summary>
    /// Limpia todos los elementos de feedback
    /// </summary>
    public void ClearAllFeedback()
    {
        if (currentFeedbackCoroutine != null)
        {
            StopCoroutine(currentFeedbackCoroutine);
            currentFeedbackCoroutine = null;
        }
        
        if (feedbackPanel != null)
        {
            feedbackPanel.gameObject.SetActive(false);
        }
        
        if (feedbackText != null)
        {
            feedbackText.gameObject.SetActive(false);
        }
    }
    
    /// <summary>
    /// Activa o desactiva las animaciones
    /// </summary>
    public void SetAnimationsEnabled(bool enabled)
    {
        enableAnimations = enabled;
        Debug.Log($"Animaciones de UI {(enabled ? "activadas" : "desactivadas")}");
    }
    
    void Update()
    {
        if (!isInitialized) return;
        
        // Actualizar posición del canvas
        UpdateCanvasPosition();
    }
    
    void OnDestroy()
    {
        ClearAllFeedback();
        Debug.Log("UIManager destruido");
    }
    
    public enum FeedbackType
    {
        Gesture,
        Voice,
        Controller,
        Warning,
        Info,
        Performance
    }
} 