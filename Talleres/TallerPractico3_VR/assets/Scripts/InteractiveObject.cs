using UnityEngine;
using System.Collections;

/// <summary>
/// Objeto interactivo para dispositivos XR
/// Responde a gestos, voz y controladores
/// </summary>
public class InteractiveObject : MonoBehaviour
{
    [Header("Configuración de Interacción")]
    [SerializeField] private float interactionRange = 2f;
    [SerializeField] private bool isInteractable = true;
    [SerializeField] private bool showInteractionHints = true;
    
    [Header("Estados Visuales")]
    [SerializeField] private Material idleMaterial;
    [SerializeField] private Material activeMaterial;
    [SerializeField] private Material selectedMaterial;
    [SerializeField] private Material disabledMaterial;
    
    [Header("Animaciones")]
    [SerializeField] private bool enableAnimations = true;
    [SerializeField] private float animationSpeed = 2f;
    [SerializeField] private Vector3 hoverScale = new Vector3(1.1f, 1.1f, 1.1f);
    [SerializeField] private Vector3 selectedScale = new Vector3(1.2f, 1.2f, 1.2f);
    
    [Header("Efectos")]
    [SerializeField] private GameObject interactionEffect;
    [SerializeField] private AudioClip interactionSound;
    [SerializeField] private ParticleSystem interactionParticles;
    
    // Estado interno
    private Renderer objectRenderer;
    private Material originalMaterial;
    private Vector3 originalScale;
    private bool isActive = false;
    private bool isSelected = false;
    private bool isHovered = false;
    private AudioSource audioSource;
    
    // Eventos
    public System.Action<InteractiveObject> OnObjectActivated;
    public System.Action<InteractiveObject> OnObjectDeactivated;
    public System.Action<InteractiveObject> OnObjectSelected;
    public System.Action<InteractiveObject> OnObjectDeselected;
    
    void Start()
    {
        InitializeObject();
    }
    
    private void InitializeObject()
    {
        // Obtener componentes
        objectRenderer = GetComponent<Renderer>();
        audioSource = GetComponent<AudioSource>();
        
        if (audioSource == null)
        {
            audioSource = gameObject.AddComponent<AudioSource>();
        }
        
        // Guardar estado original
        if (objectRenderer != null)
        {
            originalMaterial = objectRenderer.material;
        }
        
        originalScale = transform.localScale;
        
        // Configurar estado inicial
        SetState(ObjectState.Idle);
        
        Debug.Log($"Objeto interactivo inicializado: {gameObject.name}");
    }
    
    void Update()
    {
        if (!isInteractable) return;
        
        // Actualizar estado visual
        UpdateVisualState();
        
        // Mostrar hints de interacción
        if (showInteractionHints)
        {
            UpdateInteractionHints();
        }
    }
    
    private void UpdateVisualState()
    {
        if (objectRenderer == null) return;
        
        Material targetMaterial = idleMaterial;
        
        if (!isInteractable)
        {
            targetMaterial = disabledMaterial;
        }
        else if (isSelected)
        {
            targetMaterial = selectedMaterial;
        }
        else if (isActive)
        {
            targetMaterial = activeMaterial;
        }
        else if (isHovered)
        {
            targetMaterial = activeMaterial;
        }
        
        if (targetMaterial != null && objectRenderer.material != targetMaterial)
        {
            objectRenderer.material = targetMaterial;
        }
    }
    
    private void UpdateInteractionHints()
    {
        // Mostrar hints según el estado
        if (isHovered && !isSelected)
        {
            ShowHoverHint();
        }
        else if (isSelected)
        {
            ShowSelectedHint();
        }
        else
        {
            HideHints();
        }
    }
    
    private void ShowHoverHint()
    {
        // Mostrar hint de hover
        if (enableAnimations)
        {
            transform.localScale = Vector3.Lerp(transform.localScale, hoverScale, Time.deltaTime * animationSpeed);
        }
    }
    
    private void ShowSelectedHint()
    {
        // Mostrar hint de selección
        if (enableAnimations)
        {
            transform.localScale = Vector3.Lerp(transform.localScale, selectedScale, Time.deltaTime * animationSpeed);
        }
    }
    
    private void HideHints()
    {
        // Ocultar hints
        if (enableAnimations)
        {
            transform.localScale = Vector3.Lerp(transform.localScale, originalScale, Time.deltaTime * animationSpeed);
        }
    }
    
    /// <summary>
    /// Verifica si el objeto está en rango de interacción
    /// </summary>
    public bool IsInRange(Vector3 position)
    {
        float distance = Vector3.Distance(transform.position, position);
        return distance <= interactionRange;
    }
    
    /// <summary>
    /// Activa el objeto
    /// </summary>
    public void Activate()
    {
        if (!isInteractable) return;
        
        isActive = true;
        SetState(ObjectState.Active);
        
        // Disparar evento
        OnObjectActivated?.Invoke(this);
        
        // Reproducir efectos
        PlayInteractionEffects();
        
        Debug.Log($"Objeto activado: {gameObject.name}");
    }
    
    /// <summary>
    /// Desactiva el objeto
    /// </summary>
    public void Deactivate()
    {
        if (!isInteractable) return;
        
        isActive = false;
        SetState(ObjectState.Idle);
        
        // Disparar evento
        OnObjectDeactivated?.Invoke(this);
        
        Debug.Log($"Objeto desactivado: {gameObject.name}");
    }
    
    /// <summary>
    /// Selecciona el objeto
    /// </summary>
    public void Select()
    {
        if (!isInteractable) return;
        
        isSelected = true;
        SetState(ObjectState.Selected);
        
        // Disparar evento
        OnObjectSelected?.Invoke(this);
        
        Debug.Log($"Objeto seleccionado: {gameObject.name}");
    }
    
    /// <summary>
    /// Deselecciona el objeto
    /// </summary>
    public void Deselect()
    {
        if (!isInteractable) return;
        
        isSelected = false;
        SetState(ObjectState.Idle);
        
        // Disparar evento
        OnObjectDeselected?.Invoke(this);
        
        Debug.Log($"Objeto deseleccionado: {gameObject.name}");
    }
    
    /// <summary>
    /// Reinicia el objeto a su estado original
    /// </summary>
    public void Reset()
    {
        isActive = false;
        isSelected = false;
        isHovered = false;
        
        SetState(ObjectState.Idle);
        
        // Restaurar escala original
        if (enableAnimations)
        {
            StartCoroutine(ResetScaleCoroutine());
        }
        else
        {
            transform.localScale = originalScale;
        }
        
        Debug.Log($"Objeto reiniciado: {gameObject.name}");
    }
    
    private IEnumerator ResetScaleCoroutine()
    {
        float elapsed = 0f;
        Vector3 startScale = transform.localScale;
        
        while (elapsed < 0.5f)
        {
            elapsed += Time.deltaTime;
            float t = elapsed / 0.5f;
            transform.localScale = Vector3.Lerp(startScale, originalScale, t);
            yield return null;
        }
        
        transform.localScale = originalScale;
    }
    
    /// <summary>
    /// Maneja detección de gestos
    /// </summary>
    public void OnGestureDetected(string gestureType)
    {
        if (!isInteractable) return;
        
        switch (gestureType.ToLower())
        {
            case "tap":
                ToggleActive();
                break;
            case "grab":
                Select();
                break;
            case "release":
                Deselect();
                break;
            default:
                Debug.Log($"Gesto no reconocido: {gestureType}");
                break;
        }
    }
    
    /// <summary>
    /// Maneja input de controladores
    /// </summary>
    public void OnControllerInput(string inputType)
    {
        if (!isInteractable) return;
        
        switch (inputType.ToLower())
        {
            case "trigger_pressed":
                ToggleActive();
                break;
            case "grip_pressed":
                Select();
                break;
            case "grip_released":
                Deselect();
                break;
            default:
                Debug.Log($"Input de controlador no reconocido: {inputType}");
                break;
        }
    }
    
    /// <summary>
    /// Alterna el estado activo del objeto
    /// </summary>
    public void ToggleActive()
    {
        if (isActive)
        {
            Deactivate();
        }
        else
        {
            Activate();
        }
    }
    
    /// <summary>
    /// Establece el estado del objeto
    /// </summary>
    private void SetState(ObjectState state)
    {
        switch (state)
        {
            case ObjectState.Idle:
                isActive = false;
                isSelected = false;
                break;
            case ObjectState.Active:
                isActive = true;
                isSelected = false;
                break;
            case ObjectState.Selected:
                isActive = false;
                isSelected = true;
                break;
            case ObjectState.Disabled:
                isInteractable = false;
                break;
        }
    }
    
    /// <summary>
    /// Reproduce efectos de interacción
    /// </summary>
    private void PlayInteractionEffects()
    {
        // Reproducir sonido
        if (interactionSound != null && audioSource != null)
        {
            audioSource.PlayOneShot(interactionSound);
        }
        
        // Reproducir partículas
        if (interactionParticles != null)
        {
            interactionParticles.Play();
        }
        
        // Mostrar efecto visual
        if (interactionEffect != null)
        {
            GameObject effect = Instantiate(interactionEffect, transform.position, transform.rotation);
            Destroy(effect, 2f);
        }
    }
    
    /// <summary>
    /// Establece el rango de interacción
    /// </summary>
    public void SetInteractionRange(float range)
    {
        interactionRange = range;
    }
    
    /// <summary>
    /// Habilita o deshabilita la interactividad
    /// </summary>
    public void SetInteractable(bool interactable)
    {
        isInteractable = interactable;
        
        if (!interactable)
        {
            SetState(ObjectState.Disabled);
        }
        else
        {
            SetState(ObjectState.Idle);
        }
    }
    
    /// <summary>
    /// Establece el estado de hover
    /// </summary>
    public void SetHovered(bool hovered)
    {
        isHovered = hovered;
    }
    
    /// <summary>
    /// Obtiene el estado actual del objeto
    /// </summary>
    public ObjectState GetCurrentState()
    {
        if (!isInteractable)
            return ObjectState.Disabled;
        else if (isSelected)
            return ObjectState.Selected;
        else if (isActive)
            return ObjectState.Active;
        else
            return ObjectState.Idle;
    }
    
    /// <summary>
    /// Obtiene información del objeto
    /// </summary>
    public string GetObjectInfo()
    {
        return $"Nombre: {gameObject.name}\nEstado: {GetCurrentState()}\nInteractuable: {isInteractable}\nRango: {interactionRange}m";
    }
    
    void OnDrawGizmosSelected()
    {
        // Mostrar rango de interacción en el editor
        Gizmos.color = Color.yellow;
        Gizmos.DrawWireSphere(transform.position, interactionRange);
    }
    
    public enum ObjectState
    {
        Idle,
        Active,
        Selected,
        Disabled
    }
} 