using UnityEngine;
using System;

/// <summary>
/// Manejador de controladores para dispositivos XR
/// Compatible con Magic Leap y Meta Quest Pro
/// </summary>
public class ControllerHandler : MonoBehaviour
{
    [Header("Configuración de Controladores")]
    [SerializeField] private bool enableControllerInput = true;
    [SerializeField] private float controllerDeadzone = 0.1f;
    [SerializeField] private float triggerThreshold = 0.5f;
    
    // Eventos
    public event Action<string, Vector3> OnControllerInput;
    
    // Estado interno
    private bool isInitialized = false;
    private InteractionManager.XRDeviceType currentDevice;
    
    // Referencias específicas por dispositivo
    private object magicLeapController;
    private object metaQuestProController;
    
    // Estado de botones
    private bool isTriggerPressed = false;
    private bool isGripPressed = false;
    private bool isMenuPressed = false;
    
    public void Initialize()
    {
        isInitialized = true;
        Debug.Log("ControllerHandler inicializado");
    }
    
    /// <summary>
    /// Configura controladores para Magic Leap 1
    /// </summary>
    public void SetupMagicLeapController()
    {
        currentDevice = InteractionManager.XRDeviceType.MagicLeap1;
        Debug.Log("Configurando controladores para Magic Leap");
        
        // Aquí se configurarían los controladores específicos de Magic Leap
        // usando Magic Leap SDK
    }
    
    /// <summary>
    /// Configura controladores para Meta Quest Pro
    /// </summary>
    public void SetupMetaQuestProController()
    {
        currentDevice = InteractionManager.XRDeviceType.MetaQuestPro;
        Debug.Log("Configurando controladores para Meta Quest Pro");
        
        // Aquí se configurarían los controladores específicos de Meta Quest Pro
        // usando Oculus Integration
    }
    
    void Update()
    {
        if (!isInitialized || !enableControllerInput) return;
        
        // Procesar input de controladores según el dispositivo
        switch (currentDevice)
        {
            case InteractionManager.XRDeviceType.MagicLeap1:
                ProcessMagicLeapController();
                break;
                
            case InteractionManager.XRDeviceType.MetaQuestPro:
                ProcessMetaQuestProController();
                break;
        }
    }
    
    private void ProcessMagicLeapController()
    {
        // Simulación de input de controlador para Magic Leap
        Vector3 controllerPosition = GetControllerPosition();
        
        // Procesar botones
        ProcessControllerButtons("MagicLeap", controllerPosition);
        
        // Procesar joystick
        ProcessControllerJoystick("MagicLeap", controllerPosition);
        
        // Procesar trigger
        ProcessControllerTrigger("MagicLeap", controllerPosition);
    }
    
    private void ProcessMetaQuestProController()
    {
        // Simulación de input de controlador para Meta Quest Pro
        Vector3 controllerPosition = GetControllerPosition();
        
        // Procesar botones
        ProcessControllerButtons("MetaQuestPro", controllerPosition);
        
        // Procesar joystick
        ProcessControllerJoystick("MetaQuestPro", controllerPosition);
        
        // Procesar trigger
        ProcessControllerTrigger("MetaQuestPro", controllerPosition);
    }
    
    private void ProcessControllerButtons(string deviceType, Vector3 position)
    {
        // Simular botones con teclas
        if (Input.GetKeyDown(KeyCode.JoystickButton0) || Input.GetKeyDown(KeyCode.Space))
        {
            TriggerControllerInput($"{deviceType}_Button_A", position);
        }
        
        if (Input.GetKeyDown(KeyCode.JoystickButton1) || Input.GetKeyDown(KeyCode.B))
        {
            TriggerControllerInput($"{deviceType}_Button_B", position);
        }
        
        if (Input.GetKeyDown(KeyCode.JoystickButton2) || Input.GetKeyDown(KeyCode.X))
        {
            TriggerControllerInput($"{deviceType}_Button_X", position);
        }
        
        if (Input.GetKeyDown(KeyCode.JoystickButton3) || Input.GetKeyDown(KeyCode.Y))
        {
            TriggerControllerInput($"{deviceType}_Button_Y", position);
        }
        
        // Grip button
        if (Input.GetKeyDown(KeyCode.G))
        {
            isGripPressed = !isGripPressed;
            TriggerControllerInput($"{deviceType}_Grip_{(isGripPressed ? "Pressed" : "Released")}", position);
        }
        
        // Menu button
        if (Input.GetKeyDown(KeyCode.M))
        {
            isMenuPressed = !isMenuPressed;
            TriggerControllerInput($"{deviceType}_Menu_{(isMenuPressed ? "Pressed" : "Released")}", position);
        }
    }
    
    private void ProcessControllerJoystick(string deviceType, Vector3 position)
    {
        // Simular joystick con teclas de dirección
        Vector2 joystickInput = Vector2.zero;
        
        if (Input.GetKey(KeyCode.UpArrow))
            joystickInput.y = 1f;
        else if (Input.GetKey(KeyCode.DownArrow))
            joystickInput.y = -1f;
            
        if (Input.GetKey(KeyCode.RightArrow))
            joystickInput.x = 1f;
        else if (Input.GetKey(KeyCode.LeftArrow))
            joystickInput.x = -1f;
        
        // Aplicar deadzone
        if (joystickInput.magnitude > controllerDeadzone)
        {
            TriggerControllerInput($"{deviceType}_Joystick_{joystickInput}", position);
        }
    }
    
    private void ProcessControllerTrigger(string deviceType, Vector3 position)
    {
        // Simular trigger con teclas
        if (Input.GetKeyDown(KeyCode.T))
        {
            isTriggerPressed = !isTriggerPressed;
            TriggerControllerInput($"{deviceType}_Trigger_{(isTriggerPressed ? "Pressed" : "Released")}", position);
        }
        
        // Simular trigger analógico
        float triggerValue = 0f;
        if (Input.GetKey(KeyCode.T))
        {
            triggerValue = 1f;
        }
        
        if (triggerValue > triggerThreshold)
        {
            TriggerControllerInput($"{deviceType}_Trigger_Analog_{triggerValue:F2}", position);
        }
    }
    
    private Vector3 GetControllerPosition()
    {
        // Simular posición del controlador
        return Camera.main.transform.position + Camera.main.transform.right * 0.3f;
    }
    
    private void TriggerControllerInput(string inputType, Vector3 position)
    {
        Debug.Log($"Input de controlador: {inputType} en {position}");
        
        // Disparar evento
        OnControllerInput?.Invoke(inputType, position);
    }
    
    /// <summary>
    /// Verifica si un botón específico está presionado
    /// </summary>
    public bool IsButtonPressed(string buttonName)
    {
        switch (buttonName.ToLower())
        {
            case "trigger":
                return isTriggerPressed;
            case "grip":
                return isGripPressed;
            case "menu":
                return isMenuPressed;
            case "a":
                return Input.GetKey(KeyCode.JoystickButton0) || Input.GetKey(KeyCode.Space);
            case "b":
                return Input.GetKey(KeyCode.JoystickButton1) || Input.GetKey(KeyCode.B);
            case "x":
                return Input.GetKey(KeyCode.JoystickButton2) || Input.GetKey(KeyCode.X);
            case "y":
                return Input.GetKey(KeyCode.JoystickButton3) || Input.GetKey(KeyCode.Y);
            default:
                return false;
        }
    }
    
    /// <summary>
    /// Obtiene el valor del joystick
    /// </summary>
    public Vector2 GetJoystickValue()
    {
        Vector2 joystickInput = Vector2.zero;
        
        if (Input.GetKey(KeyCode.UpArrow))
            joystickInput.y = 1f;
        else if (Input.GetKey(KeyCode.DownArrow))
            joystickInput.y = -1f;
            
        if (Input.GetKey(KeyCode.RightArrow))
            joystickInput.x = 1f;
        else if (Input.GetKey(KeyCode.LeftArrow))
            joystickInput.x = -1f;
        
        // Aplicar deadzone
        if (joystickInput.magnitude <= controllerDeadzone)
        {
            joystickInput = Vector2.zero;
        }
        
        return joystickInput;
    }
    
    /// <summary>
    /// Obtiene el valor del trigger
    /// </summary>
    public float GetTriggerValue()
    {
        if (Input.GetKey(KeyCode.T))
        {
            return 1f;
        }
        return 0f;
    }
    
    /// <summary>
    /// Obtiene la posición del controlador principal
    /// </summary>
    public Vector3 GetPrimaryControllerPosition()
    {
        return GetControllerPosition();
    }
    
    /// <summary>
    /// Obtiene la posición del controlador secundario
    /// </summary>
    public Vector3 GetSecondaryControllerPosition()
    {
        // Simular posición del controlador secundario
        return Camera.main.transform.position + Camera.main.transform.right * -0.3f;
    }
    
    /// <summary>
    /// Obtiene la rotación del controlador principal
    /// </summary>
    public Quaternion GetPrimaryControllerRotation()
    {
        // Simular rotación del controlador
        return Camera.main.transform.rotation;
    }
    
    /// <summary>
    /// Obtiene la rotación del controlador secundario
    /// </summary>
    public Quaternion GetSecondaryControllerRotation()
    {
        // Simular rotación del controlador secundario
        return Camera.main.transform.rotation;
    }
    
    /// <summary>
    /// Verifica si el controlador está conectado
    /// </summary>
    public bool IsControllerConnected()
    {
        return enableControllerInput && isInitialized;
    }
    
    /// <summary>
    /// Activa o desactiva el input de controladores
    /// </summary>
    public void SetControllerInputActive(bool active)
    {
        enableControllerInput = active;
        Debug.Log($"Input de controladores {(active ? "activado" : "desactivado")}");
    }
    
    /// <summary>
    /// Obtiene información sobre el dispositivo de controlador actual
    /// </summary>
    public string GetCurrentControllerDevice()
    {
        switch (currentDevice)
        {
            case InteractionManager.XRDeviceType.MagicLeap1:
                return "Magic Leap 1";
            case InteractionManager.XRDeviceType.MetaQuestPro:
                return "Meta Quest Pro";
            default:
                return "Dispositivo no soportado para controladores";
        }
    }
    
    /// <summary>
    /// Simula un input de controlador para testing
    /// </summary>
    public void SimulateControllerInput(string inputType)
    {
        TriggerControllerInput(inputType, GetControllerPosition());
    }
    
    void OnDestroy()
    {
        // Limpiar recursos de controladores si es necesario
        Debug.Log("ControllerHandler destruido");
    }
} 