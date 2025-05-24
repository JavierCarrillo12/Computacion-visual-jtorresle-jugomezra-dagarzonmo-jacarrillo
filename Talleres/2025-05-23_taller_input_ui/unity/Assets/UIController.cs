using UnityEngine;
using UnityEngine.UI;

public class UIController : MonoBehaviour
{
    [Header("Referencia al objeto a seguir")]
    public Transform target;

    [Header("Elementos UI")]
    public Text statusText;
    public Slider progressBar;
    public Button resetButton;

    private Vector3 initialPosition;
    private Quaternion initialRotation;

    void Start()
    {
        // Guardamos la posición inicial para reiniciar después
        if (target != null)
        {
            initialPosition = target.position;
            initialRotation = target.rotation;
        }

        // Asignamos el listener al botón
        if (resetButton != null)
            resetButton.onClick.AddListener(ResetTarget);
    }

    void Update()
    {
        // Mostrar coordenadas en texto
        if (statusText != null && target != null)
        {
            Vector3 pos = target.position;
            statusText.text = $"Coordenadas:\n({pos.x:F2}, {pos.y:F2}, {pos.z:F2})";
        }

        // Actualizar barra de progreso (puede ser vida, tiempo, etc.)
        if (progressBar != null)
        {
            progressBar.value = Mathf.PingPong(Time.time * 0.25f, 1f); // 0 a 1 dinámico
        }
    }

    // Función que se llama al presionar el botón
    public void ResetTarget()
    {
        if (target != null)
        {
            target.position = initialPosition;
            target.rotation = initialRotation;
        }
    }
}
