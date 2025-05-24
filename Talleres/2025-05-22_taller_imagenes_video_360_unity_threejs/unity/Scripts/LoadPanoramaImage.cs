using UnityEngine;

public class LoadPanoramaImage : MonoBehaviour
{
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        Renderer renderer = GetComponent<Renderer>();
        renderer.material.mainTexture = Resources.Load<Texture2D>("panorama"); // Asegúrate que panorama.jpg está en Resources/

    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
