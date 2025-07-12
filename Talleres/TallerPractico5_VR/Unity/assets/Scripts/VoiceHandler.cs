using UnityEngine;
using System;
using System.Collections.Generic;

/// <summary>
/// Manejador de comandos de voz para dispositivos XR
/// Compatible con diferentes plataformas de realidad aumentada
/// </summary>
public class VoiceHandler : MonoBehaviour
{
    [Header("Configuración de Voz")]
    [SerializeField] private float voiceConfidenceThreshold = 0.7f;
    [SerializeField] private float voiceCooldown = 1.0f;
    [SerializeField] private bool enableVoiceRecognition = true;
    
    [Header("Comandos de Voz")]
    [SerializeField] private List<VoiceCommand> voiceCommands = new List<VoiceCommand>();
    
    // Eventos
    public event Action<string> OnVoiceCommand;
    
    // Estado interno
    private float lastVoiceTime;
    private bool isInitialized = false;
    private InteractionManager.XRDeviceType currentDevice;
    
    // Referencias específicas por dispositivo
    private object hololensSpeechRecognizer;
    private object appleVisionProSpeechRecognizer;
    
    [System.Serializable]
    public class VoiceCommand
    {
        public string command;
        public string description;
        public bool isEnabled = true;
    }
    
    public void Initialize()
    {
        isInitialized = true;
        lastVoiceTime = 0f;
        
        // Configurar comandos por defecto
        SetupDefaultCommands();
        
        Debug.Log("VoiceHandler inicializado");
    }
    
    private void SetupDefaultCommands()
    {
        voiceCommands.Clear();
        
        voiceCommands.Add(new VoiceCommand { command = "activar", description = "Activa todos los objetos" });
        voiceCommands.Add(new VoiceCommand { command = "desactivar", description = "Desactiva todos los objetos" });
        voiceCommands.Add(new VoiceCommand { command = "reset", description = "Reinicia todos los objetos" });
        voiceCommands.Add(new VoiceCommand { command = "hola", description = "Saludo de prueba" });
        voiceCommands.Add(new VoiceCommand { command = "ayuda", description = "Muestra comandos disponibles" });
    }
    
    /// <summary>
    /// Configura comandos de voz para HoloLens 1 y 2
    /// </summary>
    public void SetupHoloLensVoice()
    {
        currentDevice = InteractionManager.XRDeviceType.HoloLens2;
        Debug.Log("Configurando comandos de voz para HoloLens");
        
        // Aquí se configurarían los comandos específicos de HoloLens
        // usando Microsoft.MixedReality.Toolkit
    }
    
    /// <summary>
    /// Configura comandos de voz para Apple Vision Pro
    /// </summary>
    public void SetupAppleVisionProVoice()
    {
        currentDevice = InteractionManager.XRDeviceType.AppleVisionPro;
        Debug.Log("Configurando comandos de voz para Apple Vision Pro");
        
        // Aquí se configurarían los comandos específicos de Apple Vision Pro
        // usando visionOS SDK
    }
    
    void Update()
    {
        if (!isInitialized || !enableVoiceRecognition) return;
        
        // Procesar comandos de voz según el dispositivo
        switch (currentDevice)
        {
            case InteractionManager.XRDeviceType.HoloLens1:
            case InteractionManager.XRDeviceType.HoloLens2:
                ProcessHoloLensVoice();
                break;
                
            case InteractionManager.XRDeviceType.AppleVisionPro:
                ProcessAppleVisionProVoice();
                break;
        }
    }
    
    private void ProcessHoloLensVoice()
    {
        // Simulación de detección de comandos de voz para HoloLens
        if (Time.time - lastVoiceTime < voiceCooldown) return;
        
        // Simular comandos de voz con teclas
        if (Input.GetKeyDown(KeyCode.V)) // Simulación de comando "activar"
        {
            TriggerVoiceCommand("activar");
        }
        else if (Input.GetKeyDown(KeyCode.D)) // Simulación de comando "desactivar"
        {
            TriggerVoiceCommand("desactivar");
        }
        else if (Input.GetKeyDown(KeyCode.R)) // Simulación de comando "reset"
        {
            TriggerVoiceCommand("reset");
        }
        else if (Input.GetKeyDown(KeyCode.H)) // Simulación de comando "hola"
        {
            TriggerVoiceCommand("hola");
        }
        else if (Input.GetKeyDown(KeyCode.Y)) // Simulación de comando "ayuda"
        {
            TriggerVoiceCommand("ayuda");
        }
    }
    
    private void ProcessAppleVisionProVoice()
    {
        // Simulación de detección de comandos de voz para Apple Vision Pro
        if (Time.time - lastVoiceTime < voiceCooldown) return;
        
        // Simular comandos de voz específicos de Apple Vision Pro
        if (Input.GetKeyDown(KeyCode.V)) // Simulación de comando "activar"
        {
            TriggerVoiceCommand("activar");
        }
        else if (Input.GetKeyDown(KeyCode.D)) // Simulación de comando "desactivar"
        {
            TriggerVoiceCommand("desactivar");
        }
        else if (Input.GetKeyDown(KeyCode.R)) // Simulación de comando "reset"
        {
            TriggerVoiceCommand("reset");
        }
        else if (Input.GetKeyDown(KeyCode.H)) // Simulación de comando "hola"
        {
            TriggerVoiceCommand("hola");
        }
        else if (Input.GetKeyDown(KeyCode.Y)) // Simulación de comando "ayuda"
        {
            TriggerVoiceCommand("ayuda");
        }
    }
    
    private void TriggerVoiceCommand(string command)
    {
        lastVoiceTime = Time.time;
        
        Debug.Log($"Comando de voz detectado: {command}");
        
        // Verificar si el comando está habilitado
        if (IsCommandEnabled(command))
        {
            // Disparar evento
            OnVoiceCommand?.Invoke(command);
        }
        else
        {
            Debug.LogWarning($"Comando '{command}' no está habilitado");
        }
    }
    
    /// <summary>
    /// Verifica si un comando está habilitado
    /// </summary>
    public bool IsCommandEnabled(string command)
    {
        foreach (var voiceCommand in voiceCommands)
        {
            if (voiceCommand.command.ToLower() == command.ToLower())
            {
                return voiceCommand.isEnabled;
            }
        }
        return false;
    }
    
    /// <summary>
    /// Habilita o deshabilita un comando de voz
    /// </summary>
    public void SetCommandEnabled(string command, bool enabled)
    {
        foreach (var voiceCommand in voiceCommands)
        {
            if (voiceCommand.command.ToLower() == command.ToLower())
            {
                voiceCommand.isEnabled = enabled;
                Debug.Log($"Comando '{command}' {(enabled ? "habilitado" : "deshabilitado")}");
                return;
            }
        }
        
        Debug.LogWarning($"Comando '{command}' no encontrado");
    }
    
    /// <summary>
    /// Añade un nuevo comando de voz
    /// </summary>
    public void AddVoiceCommand(string command, string description)
    {
        voiceCommands.Add(new VoiceCommand 
        { 
            command = command.ToLower(), 
            description = description,
            isEnabled = true 
        });
        
        Debug.Log($"Comando de voz añadido: {command}");
    }
    
    /// <summary>
    /// Remueve un comando de voz
    /// </summary>
    public void RemoveVoiceCommand(string command)
    {
        for (int i = voiceCommands.Count - 1; i >= 0; i--)
        {
            if (voiceCommands[i].command.ToLower() == command.ToLower())
            {
                voiceCommands.RemoveAt(i);
                Debug.Log($"Comando de voz removido: {command}");
                return;
            }
        }
        
        Debug.LogWarning($"Comando '{command}' no encontrado");
    }
    
    /// <summary>
    /// Obtiene la lista de comandos de voz disponibles
    /// </summary>
    public List<VoiceCommand> GetAvailableCommands()
    {
        return new List<VoiceCommand>(voiceCommands);
    }
    
    /// <summary>
    /// Obtiene la confianza del último comando de voz
    /// </summary>
    public float GetVoiceConfidence()
    {
        // Simular confianza del comando de voz
        return voiceConfidenceThreshold;
    }
    
    /// <summary>
    /// Verifica si el reconocimiento de voz está activo
    /// </summary>
    public bool IsVoiceRecognitionActive()
    {
        return enableVoiceRecognition && isInitialized;
    }
    
    /// <summary>
    /// Activa o desactiva el reconocimiento de voz
    /// </summary>
    public void SetVoiceRecognitionActive(bool active)
    {
        enableVoiceRecognition = active;
        Debug.Log($"Reconocimiento de voz {(active ? "activado" : "desactivado")}");
    }
    
    /// <summary>
    /// Obtiene información sobre el dispositivo de voz actual
    /// </summary>
    public string GetCurrentVoiceDevice()
    {
        switch (currentDevice)
        {
            case InteractionManager.XRDeviceType.HoloLens1:
                return "HoloLens 1";
            case InteractionManager.XRDeviceType.HoloLens2:
                return "HoloLens 2";
            case InteractionManager.XRDeviceType.AppleVisionPro:
                return "Apple Vision Pro";
            default:
                return "Dispositivo no soportado para voz";
        }
    }
    
    /// <summary>
    /// Simula un comando de voz para testing
    /// </summary>
    public void SimulateVoiceCommand(string command)
    {
        TriggerVoiceCommand(command);
    }
    
    void OnDestroy()
    {
        // Limpiar recursos de voz si es necesario
        Debug.Log("VoiceHandler destruido");
    }
} 