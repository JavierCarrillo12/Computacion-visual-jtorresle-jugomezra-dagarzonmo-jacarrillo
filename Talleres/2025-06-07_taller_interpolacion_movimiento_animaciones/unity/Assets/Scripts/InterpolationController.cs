using UnityEngine;
using UnityEngine.UI;

public class InterpolationController : MonoBehaviour
{
    [Header("Objetos")]
    public Transform targetObject;
    public Transform startPoint;
    public Transform endPoint;
    public Transform controlPoint;
    public LineRenderer trajectoryLine;

    [Header("Configuración")]
    public float speed = 0.5f;
    public InterpolationType interpolationType = InterpolationType.Lerp;
    public AnimationCurve easeCurve = AnimationCurve.EaseInOut(0, 0, 1, 1);

    private float t = 0f;
    private Vector3[] bezierPoints;

    public enum InterpolationType
    {
        Lerp,
        Slerp,
        Bezier
    }

    void Start()
    {
        if (trajectoryLine != null)
        {
            trajectoryLine.positionCount = 50;
            UpdateTrajectoryLine();
        }
    }

    void Update()
    {
        // Actualizar t
        t = (t + Time.deltaTime * speed) % 1f;
        float easedT = easeCurve.Evaluate(t);

        // Aplicar interpolación según el tipo
        switch (interpolationType)
        {
            case InterpolationType.Lerp:
                targetObject.position = Vector3.Lerp(startPoint.position, endPoint.position, easedT);
                targetObject.rotation = Quaternion.Slerp(startPoint.rotation, endPoint.rotation, easedT);
                break;

            case InterpolationType.Slerp:
                targetObject.position = Vector3.Lerp(startPoint.position, endPoint.position, easedT);
                targetObject.rotation = Quaternion.Slerp(startPoint.rotation, endPoint.rotation, easedT);
                break;

            case InterpolationType.Bezier:
                targetObject.position = CalculateBezierPoint(easedT);
                targetObject.rotation = Quaternion.Slerp(startPoint.rotation, endPoint.rotation, easedT);
                break;
        }
    }

    Vector3 CalculateBezierPoint(float t)
    {
        float u = 1f - t;
        float tt = t * t;
        float uu = u * u;

        Vector3 p = uu * startPoint.position;
        p += 2f * u * t * controlPoint.position;
        p += tt * endPoint.position;

        return p;
    }

    void UpdateTrajectoryLine()
    {
        if (interpolationType == InterpolationType.Bezier)
        {
            for (int i = 0; i < trajectoryLine.positionCount; i++)
            {
                float t = i / (float)(trajectoryLine.positionCount - 1);
                trajectoryLine.SetPosition(i, CalculateBezierPoint(t));
            }
        }
        else
        {
            for (int i = 0; i < trajectoryLine.positionCount; i++)
            {
                float t = i / (float)(trajectoryLine.positionCount - 1);
                trajectoryLine.SetPosition(i, Vector3.Lerp(startPoint.position, endPoint.position, t));
            }
        }
    }

    public void SetInterpolationType(int type)
    {
        interpolationType = (InterpolationType)type;
        UpdateTrajectoryLine();
    }
} 