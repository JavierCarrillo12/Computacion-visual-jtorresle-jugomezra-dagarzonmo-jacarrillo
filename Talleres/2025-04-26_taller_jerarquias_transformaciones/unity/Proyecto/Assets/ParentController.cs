using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class ParentController : MonoBehaviour {
    [Header("UI References")]
    [SerializeField] private Slider positionSlider;
    [SerializeField] private Slider rotationSlider;
    [SerializeField] private Slider scaleSlider;
    [SerializeField] private TMP_Text positionText;
    [SerializeField] private TMP_Text rotationText;
    [SerializeField] private TMP_Text scaleText;

    [Header("Animation Settings")]
    [SerializeField] private float animationSpeed = 1f;
    
    private Vector3 initialPosition;
    private Quaternion initialRotation;
    private Vector3 initialScale;
    private bool isAnimating = true;

    void Start() {
        // Guardar valores iniciales
        initialPosition = transform.position;
        initialRotation = transform.rotation;
        initialScale = transform.localScale;

        // Configurar sliders
        positionSlider.onValueChanged.AddListener(UpdatePosition);
        rotationSlider.onValueChanged.AddListener(UpdateRotation);
        scaleSlider.onValueChanged.AddListener(UpdateScale);
    }

    void Update() {
        if(isAnimating) {
            // Animación automática (bonus)
            float timeValue = Mathf.PingPong(Time.time * animationSpeed, 1f);
            positionSlider.value = timeValue;
        }
    }

    void UpdatePosition(float value) {
        Vector3 newPos = initialPosition;
        newPos.x = value * 10f - 5f; // Rango de -5 a 5
        transform.position = newPos;
        positionText.text = $"Pos: {newPos.x:F2}";
    }

    void UpdateRotation(float value) {
        Quaternion newRot = initialRotation;
        newRot.y = value * 360f; // Rango de 0 a 360 grados
        transform.rotation = newRot;
        rotationText.text = $"Rot: {value * 360:F0}°";
    }

    void UpdateScale(float value) {
        Vector3 newScale = initialScale * (value + 0.5f); // Rango de 0.5x a 1.5x
        transform.localScale = newScale;
        scaleText.text = $"Scale: {newScale.x:F1}x";
    }

    // Métodos para botones (Bonus)
    public void ToggleAnimation() {
        isAnimating = !isAnimating;
    }

    public void ResetTransform() {
        positionSlider.value = 0.5f;
        rotationSlider.value = 0f;
        scaleSlider.value = 0.5f;
        isAnimating = false;
    }
}
