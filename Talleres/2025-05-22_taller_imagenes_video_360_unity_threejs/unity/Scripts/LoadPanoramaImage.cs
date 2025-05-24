using UnityEngine;

public class LoadPanoramaImage : MonoBehaviour
{
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        Renderer renderer = GetComponent<Renderer>();
        renderer.material.mainTexture = Resources.Load<Texture2D>("panorama"); // Aseg�rate que panorama.jpg est� en Resources/

    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
