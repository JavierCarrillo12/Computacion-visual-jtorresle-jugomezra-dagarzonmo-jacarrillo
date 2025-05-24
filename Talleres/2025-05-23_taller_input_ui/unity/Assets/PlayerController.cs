using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float speed = 5f;
    public float mouseSensitivity = 100f;

    private float rotationY = 0f;

    void Update()
    {
        // Movimiento WASD
        float horizontal = Input.GetAxis("Horizontal"); // A/D
        float vertical = Input.GetAxis("Vertical");     // W/S

        Vector3 move = transform.right * horizontal + transform.forward * vertical;
        transform.Translate(move * speed * Time.deltaTime, Space.World);

        // Movimiento del mouse (rotación)
        float mouseX = Input.GetAxis("Mouse X");
        rotationY += mouseX * mouseSensitivity * Time.deltaTime;
        transform.rotation = Quaternion.Euler(0, rotationY, 0);

        // Click de mouse
        if (Input.GetMouseButtonDown(0)) // Botón izquierdo
        {
            Debug.Log("¡Clic izquierdo detectado!");
            // Aquí puedes llamar una función, animación, etc.
        }
    }
}
