using UnityEngine;
using UnityEngine.UI;

public class UIManager : MonoBehaviour
{
    public Transform target; // El objeto a seguir
    public Text StatusText;

    void Update()
    {
        Vector3 pos = target.position;
        StatusText.text = $"Coordenadas: ({pos.x:F2}, {pos.y:F2}, {pos.z:F2})";
    }
}
