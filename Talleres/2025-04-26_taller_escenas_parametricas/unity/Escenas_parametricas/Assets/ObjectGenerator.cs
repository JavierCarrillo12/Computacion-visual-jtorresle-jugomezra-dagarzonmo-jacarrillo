using UnityEngine;
using System.Collections.Generic;

// Clase para almacenar datos de cada objeto
[System.Serializable]
public class ObjectData {
    public Vector3 position;
    public PrimitiveType type;
    public Color color;
    public Vector3 scale = Vector3.one; // Escala por defecto
}

public class ObjectGenerator : MonoBehaviour {
    [Header("Configuración de Objetos")]
    [SerializeField] private List<ObjectData> objectsToSpawn = new List<ObjectData>();

    void Start() {
        GenerateObjects();
    }

    void GenerateObjects() {
        foreach (ObjectData objData in objectsToSpawn) {
            // Crear el objeto primitivo
            GameObject newObj = GameObject.CreatePrimitive(objData.type);
            
            // Configurar transformaciones
            newObj.transform.position = objData.position;
            newObj.transform.localScale = objData.scale;
            
            // Aplicar color al material
            Renderer renderer = newObj.GetComponent<Renderer>();
            renderer.material = new Material(Shader.Find("Standard"));
            renderer.material.color = objData.color;

            // Condición lógica de ejemplo
            if(objData.type == PrimitiveType.Sphere) {
                newObj.name = "Esfera Personalizada"; // Renombrar solo esferas
            }
        }
    }
}