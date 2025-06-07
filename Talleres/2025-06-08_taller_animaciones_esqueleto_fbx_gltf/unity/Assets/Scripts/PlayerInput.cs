using UnityEngine;

public class PlayerInput : MonoBehaviour
{
    [Header("Referencias")]
    private AnimationController animController;
    private CharacterController characterController;

    [Header("Configuración de Movimiento")]
    [SerializeField] private float moveSpeed = 5f;
    [SerializeField] private float rotationSpeed = 10f;
    [SerializeField] private float jumpForce = 5f;
    [SerializeField] private float gravity = -9.81f;

    [Header("Estado")]
    private Vector3 velocity;
    private bool isGrounded;

    private void Start()
    {
        animController = GetComponent<AnimationController>();
        characterController = GetComponent<CharacterController>();

        if (animController == null)
        {
            Debug.LogError("No se encontró el componente AnimationController.");
        }
        if (characterController == null)
        {
            Debug.LogError("No se encontró el componente CharacterController.");
        }
    }

    private void Update()
    {
        HandleMovement();
        HandleJump();
        ApplyGravity();
    }

    private void HandleMovement()
    {
        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");

        Vector3 movement = new Vector3(horizontal, 0, vertical);
        float speed = movement.magnitude;

        // Actualizar animación
        if (animController != null)
        {
            animController.SetSpeed(speed);
        }

        // Rotar el personaje
        if (movement != Vector3.zero)
        {
            Quaternion targetRotation = Quaternion.LookRotation(movement);
            transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, rotationSpeed * Time.deltaTime);
        }

        // Mover el personaje
        if (characterController != null)
        {
            characterController.Move(movement * moveSpeed * Time.deltaTime);
        }
    }

    private void HandleJump()
    {
        if (Input.GetButtonDown("Jump") && isGrounded)
        {
            velocity.y = Mathf.Sqrt(jumpForce * -2f * gravity);
            if (animController != null)
            {
                animController.TriggerJump();
            }
        }
    }

    private void ApplyGravity()
    {
        if (characterController != null)
        {
            isGrounded = characterController.isGrounded;
            if (animController != null)
            {
                animController.SetGrounded(isGrounded);
            }

            if (isGrounded && velocity.y < 0)
            {
                velocity.y = -2f;
            }

            velocity.y += gravity * Time.deltaTime;
            characterController.Move(velocity * Time.deltaTime);
        }
    }
} 