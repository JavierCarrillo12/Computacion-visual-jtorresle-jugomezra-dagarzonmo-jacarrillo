using UnityEngine;
using UnityEngine.Video;

public class LoadPanoramaVideo : MonoBehaviour
{
    public VideoPlayer vp;
    public GameObject esfera;

    void Start()
    {
        vp = GetComponent<VideoPlayer>();
        vp.source = VideoSource.Url;
        vp.url = System.IO.Path.Combine(Application.streamingAssetsPath, "video360.mp4");
        vp.targetMaterialRenderer = esfera.GetComponent<Renderer>();
        vp.targetMaterialProperty = "_MainTex";
        vp.Play();
    }
}
