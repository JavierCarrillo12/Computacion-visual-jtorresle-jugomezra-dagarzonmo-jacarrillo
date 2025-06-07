using UnityEngine;
using UnityEngine.Events;

public class AnimationController : MonoBehaviour
{
    [Header("Componentes")]
    private Animator animator;

    [Header("Parámetros de Animación")]
    private readonly int SpeedHash = Animator.StringToHash("Speed");
    private readonly int JumpHash = Animator.StringToHash("Jump");
    private readonly int IsGroundedHash = Animator.StringToHash("IsGrounded");

    [Header("Eventos")]
    public UnityEvent onAnimationComplete;
    public UnityEvent onJumpStart;
    public UnityEvent onJumpEnd;

    private void Start()
    {
        animator = GetComponent<Animator>();
        if (animator == null)
        {
            Debug.LogError("No se encontró el componente Animator en el objeto.");
        }
    }

    public void SetSpeed(float speed)
    {
        if (animator != null)
        {
            animator.SetFloat(SpeedHash, speed);
        }
    }

    public void TriggerJump()
    {
        if (animator != null)
        {
            animator.SetTrigger(JumpHash);
            onJumpStart?.Invoke();
        }
    }

    public void SetGrounded(bool isGrounded)
    {
        if (animator != null)
        {
            animator.SetBool(IsGroundedHash, isGrounded);
            if (isGrounded)
            {
                onJumpEnd?.Invoke();
            }
        }
    }

    public void PlayAnimation(string animationName)
    {
        if (animator != null)
        {
            animator.Play(animationName);
        }
    }

    public void SetAnimationSpeed(float speed)
    {
        if (animator != null)
        {
            animator.speed = speed;
        }
    }

    // Evento llamado desde la animación
    public void OnAnimationComplete()
    {
        onAnimationComplete?.Invoke();
    }
} 