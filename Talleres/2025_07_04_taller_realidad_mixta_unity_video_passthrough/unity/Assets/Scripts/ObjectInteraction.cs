using UnityEngine;
using UnityEngine.UI;

/// <summary>
/// Script para manejar la interacción con objetos 3D superpuestos
/// Permite que los objetos reaccionen al mouse y simulen persistencia espacial
/// </summary>
public class ObjectInteraction : MonoBehaviour
{
    [Header("Configuración de Interacción")]
    [SerializeField] private bool followMouse = false;
    [SerializeField] private bool clickToToggle = true;
    [SerializeField] private float mouseSensitivity = 1.0f;
    [SerializeField] private float distanceFromCamera = 2.0f;
    
    [Header("Configuración de Animación")]
    [SerializeField] private bool enableRotation = true;
    [SerializeField] private bool enablePulse = false;
    [SerializeField] private float rotationSpeed = 50.0f;
    [SerializeField] private float pulseSpeed = 2.0f;
    [SerializeField] private float pulseScale = 0.2f;
    
    [Header("Configuración de Material")]
    [SerializeField] private Material highlightMaterial;
    [SerializeField] private Material originalMaterial;
    
    private Camera mainCamera;
    private Vector3 originalScale;
    private bool isHighlighted = false;
    private bool isPulsing = false;
    private Renderer objectRenderer;
    
    void Start()
    {
        InitializeObject();
    }
    
    void Update()
    {
        HandleMouseInteraction();
        HandleAnimations();
    }
    
    /// <summary>
    /// Inicializa el objeto y sus componentes
    /// </summary>
    private void InitializeObject()
    {
        mainCamera = Camera.main;
        if (mainCamera == null)
        {
            mainCamera = FindObjectOfType<Camera>();
        }
        
        objectRenderer = GetComponent<Renderer>();
        if (objectRenderer != null)
        {
            originalMaterial = objectRenderer.material;
        }
        
        originalScale = transform.localScale;
        
        // Configurar el objeto para que sea interactuable
        if (GetComponent<Collider>() == null)
        {
            gameObject.AddComponent<BoxCollider>();
        }
    }
    
    /// <summary>
    /// Maneja la interacción con el mouse
    /// </summary>
    private void HandleMouseInteraction()
    {
        if (mainCamera == null) return;
        
        // Seguir el mouse si está habilitado
        if (followMouse)
        {
            FollowMousePosition();
        }
        
        // Detectar clics en el objeto
        if (Input.GetMouseButtonDown(0))
        {
            Ray ray = mainCamera.ScreenPointToRay(Input.mousePosition);
            RaycastHit hit;
            
            if (Physics.Raycast(ray, out hit) && hit.collider.gameObject == gameObject)
            {
                OnObjectClicked();
            }
        }
        
        // Detectar hover
        Ray hoverRay = mainCamera.ScreenPointToRay(Input.mousePosition);
        RaycastHit hoverHit;
        
        if (Physics.Raycast(hoverRay, out hoverHit) && hoverHit.collider.gameObject == gameObject)
        {
            if (!isHighlighted)
            {
                OnObjectHoverEnter();
            }
        }
        else
        {
            if (isHighlighted)
            {
                OnObjectHoverExit();
            }
        }
    }
    
    /// <summary>
    /// Hace que el objeto siga la posición del mouse
    /// </summary>
    private void FollowMousePosition()
    {
        Vector3 mousePosition = Input.mousePosition;
        mousePosition.z = distanceFromCamera;
        
        Vector3 worldPosition = mainCamera.ScreenToWorldPoint(mousePosition);
        transform.position = Vector3.Lerp(transform.position, worldPosition, mouseSensitivity * Time.deltaTime);
    }
    
    /// <summary>
    /// Maneja las animaciones del objeto
    /// </summary>
    private void HandleAnimations()
    {
        // Rotación automática
        if (enableRotation)
        {
            transform.Rotate(Vector3.up, rotationSpeed * Time.deltaTime);
        }
        
        // Efecto de pulso
        if (enablePulse || isPulsing)
        {
            float pulse = Mathf.Sin(Time.time * pulseSpeed) * pulseScale;
            Vector3 newScale = originalScale + Vector3.one * pulse;
            transform.localScale = newScale;
        }
    }
    
    /// <summary>
    /// Se ejecuta cuando se hace clic en el objeto
    /// </summary>
    private void OnObjectClicked()
    {
        Debug.Log($"Objeto clickeado: {gameObject.name}");
        
        if (clickToToggle)
        {
            TogglePulse();
        }
        
        // Cambiar color temporalmente
        StartCoroutine(FlashColor());
    }
    
    /// <summary>
    /// Se ejecuta cuando el mouse entra en el área del objeto
    /// </summary>
    private void OnObjectHoverEnter()
    {
        isHighlighted = true;
        
        if (highlightMaterial != null && objectRenderer != null)
        {
            objectRenderer.material = highlightMaterial;
        }
        
        // Escalar ligeramente el objeto
        transform.localScale = originalScale * 1.1f;
    }
    
    /// <summary>
    /// Se ejecuta cuando el mouse sale del área del objeto
    /// </summary>
    private void OnObjectHoverExit()
    {
        isHighlighted = false;
        
        if (originalMaterial != null && objectRenderer != null)
        {
            objectRenderer.material = originalMaterial;
        }
        
        // Restaurar escala original
        transform.localScale = originalScale;
    }
    
    /// <summary>
    /// Alterna el efecto de pulso
    /// </summary>
    public void TogglePulse()
    {
        isPulsing = !isPulsing;
        Debug.Log($"Pulso alternado: {isPulsing}");
    }
    
    /// <summary>
    /// Habilita o deshabilita el seguimiento del mouse
    /// </summary>
    public void ToggleMouseFollow()
    {
        followMouse = !followMouse;
        Debug.Log($"Seguimiento de mouse: {followMouse}");
    }
    
    /// <summary>
    /// Habilita o deshabilita la rotación automática
    /// </summary>
    public void ToggleRotation()
    {
        enableRotation = !enableRotation;
        Debug.Log($"Rotación automática: {enableRotation}");
    }
    
    /// <summary>
    /// Mueve el objeto a una posición específica
    /// </summary>
    public void MoveToPosition(Vector3 position)
    {
        transform.position = position;
    }
    
    /// <summary>
    /// Rota el objeto a una rotación específica
    /// </summary>
    public void RotateToRotation(Vector3 rotation)
    {
        transform.rotation = Quaternion.Euler(rotation);
    }
    
    /// <summary>
    /// Escala el objeto a un tamaño específico
    /// </summary>
    public void ScaleToSize(Vector3 scale)
    {
        transform.localScale = scale;
        originalScale = scale;
    }
    
    /// <summary>
    /// Efecto de flash de color al hacer clic
    /// </summary>
    private System.Collections.IEnumerator FlashColor()
    {
        if (objectRenderer == null) yield break;
        
        Material originalMat = objectRenderer.material;
        Color originalColor = originalMat.color;
        
        // Cambiar a color blanco
        originalMat.color = Color.white;
        
        yield return new WaitForSeconds(0.1f);
        
        // Restaurar color original
        originalMat.color = originalColor;
    }
    
    /// <summary>
    /// Configura el material de highlight
    /// </summary>
    public void SetHighlightMaterial(Material material)
    {
        highlightMaterial = material;
    }
    
    /// <summary>
    /// Obtiene la posición actual del objeto
    /// </summary>
    public Vector3 GetCurrentPosition()
    {
        return transform.position;
    }
    
    /// <summary>
    /// Obtiene la rotación actual del objeto
    /// </summary>
    public Vector3 GetCurrentRotation()
    {
        return transform.rotation.eulerAngles;
    }
    
    /// <summary>
    /// Obtiene la escala actual del objeto
    /// </summary>
    public Vector3 GetCurrentScale()
    {
        return transform.localScale;
    }
    
    void OnDrawGizmosSelected()
    {
        // Dibujar gizmo para mostrar el área de interacción
        Gizmos.color = Color.yellow;
        Gizmos.DrawWireCube(transform.position, transform.localScale);
    }
} 