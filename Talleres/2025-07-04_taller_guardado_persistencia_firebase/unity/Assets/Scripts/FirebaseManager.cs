using Firebase;
using Firebase.Database;
using Firebase.Extensions;
using UnityEngine;

public class FirebaseManager : MonoBehaviour {
    DatabaseReference reference;

    void Start() {
        FirebaseApp.CheckAndFixDependenciesAsync().ContinueWithOnMainThread(task => {
            if (task.Result == DependencyStatus.Available) {
                reference = FirebaseDatabase.DefaultInstance.RootReference;
                Debug.Log("Firebase listo");

                Transform objTransform = GameObject.Find("Objeto3D").transform;

                // Recuperar datos al iniciar
                LoadTransformData("usuario_01", objTransform);

                // Guardar datos (puedes comentar esta línea si no quieres sobrescribir en cada arranque)
                SaveTransformData("usuario_01", objTransform);
            } else {
                Debug.LogError("Firebase no disponible: " + task.Result);
            }
        });
    }

    void SaveTransformData(string userId, Transform objTransform) {
        Vector3 pos = objTransform.position;
        Vector3 rot = objTransform.eulerAngles;

        TransformData data = new TransformData(pos, rot);

        string json = JsonUtility.ToJson(data);
        reference.Child("users").Child(userId).Child("transform").SetRawJsonValueAsync(json)
            .ContinueWithOnMainThread(task => {
                if (task.IsCompleted) {
                    Debug.Log("Transform guardado correctamente");
                } else {
                    Debug.LogError("Error al guardar transform: " + task.Exception);
                }
            });
    }

    void LoadTransformData(string userId, Transform objTransform) {
        reference.Child("users").Child(userId).Child("transform").GetValueAsync()
            .ContinueWithOnMainThread(task => {
                if (task.IsCompleted) {
                    DataSnapshot snapshot = task.Result;
                    if (snapshot.Exists) {
                        string json = snapshot.GetRawJsonValue();
                        TransformData data = JsonUtility.FromJson<TransformData>(json);
                        objTransform.position = data.position;
                        objTransform.eulerAngles = data.rotation;
                        Debug.Log("Transform recuperado y aplicado correctamente");
                    } else {
                        Debug.LogWarning("No se encontró transform guardado");
                    }
                } else {
                    Debug.LogError("Error al leer transform: " + task.Exception);
                }
            });
    }

    [System.Serializable]
    public class TransformData {
        public Vector3 position;
        public Vector3 rotation;

        public TransformData(Vector3 pos, Vector3 rot) {
            position = pos;
            rotation = rot;
        }
    }
}
