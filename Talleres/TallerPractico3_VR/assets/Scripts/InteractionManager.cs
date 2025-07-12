using UnityEngine;
using System.Collections.Generic;

/// <summary>
/// Gestor principal de interacciones para dispositivos XR
/// Compatible con HoloLens, Magic Leap, Apple Vision Pro y Meta Quest Pro
/// </summary>
public class InteractionManager : MonoBehaviour
{
    [Header("Configuración de Dispositivo")]
    [SerializeField] private XRDeviceType targetDevice = XRDeviceType.HoloLens2;
    [SerializeField] private bool enableGestureRecognition = true;
    [SerializeField] private bool enableVoiceCommands = true;
    [SerializeField] private bool enableControllerInput = true;
    
    [Header("Referencias")]
    [SerializeField] private List<InteractiveObject> interactiveObjects;
    [SerializeField] private UIManager uiManager;
    
    // Componentes específicos por dispositivo
    private GestureHandler gestureHandler;
    private VoiceHandler voiceHandler;
    private ControllerHandler controllerHandler;
    
    // Estado del sistema
    private bool isInitialized = false;
    private XRDeviceType currentDevice;
    
    public enum XRDeviceType
    {
        HoloLens1,
        HoloLens2,
        MagicLeap1,
        AppleVisionPro,
        MetaQuestPro
    }
    
    void Start()
    {
        InitializeInteractionSystem();
    }
    
    void Update()
    {
        if (!isInitialized) return;
        
        // Actualizar estado de interacciones
        UpdateInteractionState();
        
        // Procesar input según el dispositivo
        ProcessDeviceInput();
    }
    
    /// <summary>
    /// Inicializa el sistema de interacciones según el dispositivo objetivo
    /// </summary>
    private void InitializeInteractionSystem()
    {
        currentDevice = targetDevice;
        
        // Configurar componentes según el dispositivo
        SetupDeviceSpecificComponents();
        
        // Inicializar handlers
        InitializeHandlers();
        
        // Configurar eventos
        SetupEventListeners();
        
        isInitialized = true;
        Debug.Log($"Sistema de interacciones inicializado para {currentDevice}");
    }
    
    /// <summary>
    /// Configura componentes específicos según el dispositivo XR
    /// </summary>
    private void SetupDeviceSpecificComponents()
    {
        switch (currentDevice)
        {
            case XRDeviceType.HoloLens1:
            case XRDeviceType.HoloLens2:
                SetupHoloLensComponents();
                break;
                
            case XRDeviceType.MagicLeap1:
                SetupMagicLeapComponents();
                break;
                
            case XRDeviceType.AppleVisionPro:
                SetupAppleVisionProComponents();
                break;
                
            case XRDeviceType.MetaQuestPro:
                SetupMetaQuestProComponents();
                break;
        }
    }
    
    private void SetupHoloLensComponents()
    {
        // Configuración específica para HoloLens
        if (enableGestureRecognition)
        {
            gestureHandler = gameObject.AddComponent<GestureHandler>();
            gestureHandler.SetupHoloLensGestures();
        }
        
        if (enableVoiceCommands)
        {
            voiceHandler = gameObject.AddComponent<VoiceHandler>();
            voiceHandler.SetupHoloLensVoice();
        }
    }
    
    private void SetupMagicLeapComponents()
    {
        // Configuración específica para Magic Leap
        if (enableControllerInput)
        {
            controllerHandler = gameObject.AddComponent<ControllerHandler>();
            controllerHandler.SetupMagicLeapController();
        }
        
        if (enableGestureRecognition)
        {
            gestureHandler = gameObject.AddComponent<GestureHandler>();
            gestureHandler.SetupMagicLeapGestures();
        }
    }
    
    private void SetupAppleVisionProComponents()
    {
        // Configuración específica para Apple Vision Pro
        if (enableGestureRecognition)
        {
            gestureHandler = gameObject.AddComponent<GestureHandler>();
            gestureHandler.SetupAppleVisionProGestures();
        }
        
        if (enableVoiceCommands)
        {
            voiceHandler = gameObject.AddComponent<VoiceHandler>();
            voiceHandler.SetupAppleVisionProVoice();
        }
    }
    
    private void SetupMetaQuestProComponents()
    {
        // Configuración específica para Meta Quest Pro
        if (enableControllerInput)
        {
            controllerHandler = gameObject.AddComponent<ControllerHandler>();
            controllerHandler.SetupMetaQuestProController();
        }
        
        if (enableGestureRecognition)
        {
            gestureHandler = gameObject.AddComponent<GestureHandler>();
            gestureHandler.SetupMetaQuestProGestures();
        }
    }
    
    private void InitializeHandlers()
    {
        // Inicializar todos los handlers activos
        if (gestureHandler != null)
            gestureHandler.Initialize();
            
        if (voiceHandler != null)
            voiceHandler.Initialize();
            
        if (controllerHandler != null)
            controllerHandler.Initialize();
    }
    
    private void SetupEventListeners()
    {
        // Configurar eventos de interacción
        if (gestureHandler != null)
        {
            gestureHandler.OnGestureDetected += HandleGestureDetected;
        }
        
        if (voiceHandler != null)
        {
            voiceHandler.OnVoiceCommand += HandleVoiceCommand;
        }
        
        if (controllerHandler != null)
        {
            controllerHandler.OnControllerInput += HandleControllerInput;
        }
    }
    
    private void UpdateInteractionState()
    {
        // Actualizar estado de objetos interactivos
        foreach (var interactiveObject in interactiveObjects)
        {
            if (interactiveObject != null)
            {
                interactiveObject.UpdateInteractionState();
            }
        }
    }
    
    private void ProcessDeviceInput()
    {
        // Procesar input según el dispositivo actual
        switch (currentDevice)
        {
            case XRDeviceType.HoloLens1:
            case XRDeviceType.HoloLens2:
                ProcessHoloLensInput();
                break;
                
            case XRDeviceType.MagicLeap1:
                ProcessMagicLeapInput();
                break;
                
            case XRDeviceType.AppleVisionPro:
                ProcessAppleVisionProInput();
                break;
                
            case XRDeviceType.MetaQuestPro:
                ProcessMetaQuestProInput();
                break;
        }
    }
    
    private void ProcessHoloLensInput()
    {
        // Procesar input específico de HoloLens
        if (gestureHandler != null)
            gestureHandler.ProcessHoloLensGestures();
            
        if (voiceHandler != null)
            voiceHandler.ProcessHoloLensVoice();
    }
    
    private void ProcessMagicLeapInput()
    {
        // Procesar input específico de Magic Leap
        if (controllerHandler != null)
            controllerHandler.ProcessMagicLeapController();
            
        if (gestureHandler != null)
            gestureHandler.ProcessMagicLeapGestures();
    }
    
    private void ProcessAppleVisionProInput()
    {
        // Procesar input específico de Apple Vision Pro
        if (gestureHandler != null)
            gestureHandler.ProcessAppleVisionProGestures();
            
        if (voiceHandler != null)
            voiceHandler.ProcessAppleVisionProVoice();
    }
    
    private void ProcessMetaQuestProInput()
    {
        // Procesar input específico de Meta Quest Pro
        if (controllerHandler != null)
            controllerHandler.ProcessMetaQuestProController();
            
        if (gestureHandler != null)
            gestureHandler.ProcessMetaQuestProGestures();
    }
    
    // Event Handlers
    private void HandleGestureDetected(string gestureType, Vector3 position)
    {
        Debug.Log($"Gesto detectado: {gestureType} en posición {position}");
        
        // Notificar a objetos interactivos
        foreach (var interactiveObject in interactiveObjects)
        {
            if (interactiveObject != null && interactiveObject.IsInRange(position))
            {
                interactiveObject.OnGestureDetected(gestureType);
            }
        }
        
        // Actualizar UI
        if (uiManager != null)
        {
            uiManager.ShowGestureFeedback(gestureType);
        }
    }
    
    private void HandleVoiceCommand(string command)
    {
        Debug.Log($"Comando de voz detectado: {command}");
        
        // Procesar comando de voz
        ProcessVoiceCommand(command);
        
        // Actualizar UI
        if (uiManager != null)
        {
            uiManager.ShowVoiceFeedback(command);
        }
    }
    
    private void HandleControllerInput(string inputType, Vector3 position)
    {
        Debug.Log($"Input de controlador: {inputType} en posición {position}");
        
        // Notificar a objetos interactivos
        foreach (var interactiveObject in interactiveObjects)
        {
            if (interactiveObject != null && interactiveObject.IsInRange(position))
            {
                interactiveObject.OnControllerInput(inputType);
            }
        }
        
        // Actualizar UI
        if (uiManager != null)
        {
            uiManager.ShowControllerFeedback(inputType);
        }
    }
    
    private void ProcessVoiceCommand(string command)
    {
        command = command.ToLower();
        
        switch (command)
        {
            case "activar":
            case "activate":
                ActivateAllObjects();
                break;
                
            case "desactivar":
            case "deactivate":
                DeactivateAllObjects();
                break;
                
            case "reset":
            case "reiniciar":
                ResetAllObjects();
                break;
                
            default:
                Debug.Log($"Comando no reconocido: {command}");
                break;
        }
    }
    
    private void ActivateAllObjects()
    {
        foreach (var interactiveObject in interactiveObjects)
        {
            if (interactiveObject != null)
            {
                interactiveObject.Activate();
            }
        }
    }
    
    private void DeactivateAllObjects()
    {
        foreach (var interactiveObject in interactiveObjects)
        {
            if (interactiveObject != null)
            {
                interactiveObject.Deactivate();
            }
        }
    }
    
    private void ResetAllObjects()
    {
        foreach (var interactiveObject in interactiveObjects)
        {
            if (interactiveObject != null)
            {
                interactiveObject.Reset();
            }
        }
    }
    
    /// <summary>
    /// Añade un objeto interactivo al sistema
    /// </summary>
    public void AddInteractiveObject(InteractiveObject interactiveObject)
    {
        if (interactiveObject != null && !interactiveObjects.Contains(interactiveObject))
        {
            interactiveObjects.Add(interactiveObject);
        }
    }
    
    /// <summary>
    /// Remueve un objeto interactivo del sistema
    /// </summary>
    public void RemoveInteractiveObject(InteractiveObject interactiveObject)
    {
        if (interactiveObject != null && interactiveObjects.Contains(interactiveObject))
        {
            interactiveObjects.Remove(interactiveObject);
        }
    }
    
    /// <summary>
    /// Cambia el dispositivo objetivo en tiempo de ejecución
    /// </summary>
    public void ChangeTargetDevice(XRDeviceType newDevice)
    {
        if (currentDevice != newDevice)
        {
            currentDevice = newDevice;
            targetDevice = newDevice;
            
            // Reinicializar sistema
            isInitialized = false;
            InitializeInteractionSystem();
        }
    }
    
    void OnDestroy()
    {
        // Limpiar eventos
        if (gestureHandler != null)
            gestureHandler.OnGestureDetected -= HandleGestureDetected;
            
        if (voiceHandler != null)
            voiceHandler.OnVoiceCommand -= HandleVoiceCommand;
            
        if (controllerHandler != null)
            controllerHandler.OnControllerInput -= HandleControllerInput;
    }
} 