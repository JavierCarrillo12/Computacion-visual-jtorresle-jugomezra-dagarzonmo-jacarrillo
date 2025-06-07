using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class UIManager : MonoBehaviour
{
    [Header("Referencias")]
    [SerializeField] private AnimationController animationController;
    [SerializeField] private Slider speedSlider;
    [SerializeField] private Toggle pauseToggle;
    [SerializeField] private TMP_Dropdown animationDropdown;
    [SerializeField] private Button jumpButton;

    [Header("Configuración")]
    [SerializeField] private string[] animationNames = { "Idle", "Walk", "Run" };

    private void Start()
    {
        if (animationController == null)
        {
            Debug.LogError("No se asignó el AnimationController en el UIManager.");
            return;
        }

        SetupUI();
    }

    private void SetupUI()
    {
        // Configurar Slider de velocidad
        if (speedSlider != null)
        {
            speedSlider.onValueChanged.AddListener(OnSpeedChanged);
        }

        // Configurar Toggle de pausa
        if (pauseToggle != null)
        {
            pauseToggle.onValueChanged.AddListener(OnPauseToggled);
        }

        // Configurar Dropdown de animaciones
        if (animationDropdown != null)
        {
            animationDropdown.ClearOptions();
            animationDropdown.AddOptions(new System.Collections.Generic.List<string>(animationNames));
            animationDropdown.onValueChanged.AddListener(OnAnimationSelected);
        }

        // Configurar Botón de salto
        if (jumpButton != null)
        {
            jumpButton.onClick.AddListener(OnJumpButtonClicked);
        }
    }

    private void OnSpeedChanged(float value)
    {
        if (animationController != null)
        {
            animationController.SetAnimationSpeed(value);
        }
    }

    private void OnPauseToggled(bool isPaused)
    {
        if (animationController != null)
        {
            animationController.SetAnimationSpeed(isPaused ? 0f : 1f);
        }
    }

    private void OnAnimationSelected(int index)
    {
        if (animationController != null && index >= 0 && index < animationNames.Length)
        {
            animationController.PlayAnimation(animationNames[index]);
        }
    }

    private void OnJumpButtonClicked()
    {
        if (animationController != null)
        {
            animationController.TriggerJump();
        }
    }

    private void OnDestroy()
    {
        // Limpiar eventos
        if (speedSlider != null)
        {
            speedSlider.onValueChanged.RemoveListener(OnSpeedChanged);
        }

        if (pauseToggle != null)
        {
            pauseToggle.onValueChanged.RemoveListener(OnPauseToggled);
        }

        if (animationDropdown != null)
        {
            animationDropdown.onValueChanged.RemoveListener(OnAnimationSelected);
        }

        if (jumpButton != null)
        {
            jumpButton.onClick.RemoveListener(OnJumpButtonClicked);
        }
    }
} 