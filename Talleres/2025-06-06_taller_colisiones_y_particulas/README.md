# Taller: Colisiones y Partículas en Unity

Este proyecto consiste en una escena interactiva en Unity en la que objetos caen y, al colisionar con el suelo, se activa un sistema de partículas en el punto de impacto.

## Comportamiento esperado

- Los objetos (`Cube`, `Sphere`) caen gracias a la gravedad (Rigidbody).
- Al colisionar con el `Plane`, se activa un sistema de partículas en el punto exacto del impacto.
- El sistema de partículas tiene configuraciones personalizadas (color, forma, duración) y está desactivado por defecto (no "Play On Awake").

## Demostración (GIF)

![Colisión con partículas](/colisiones.gif)


## Código del script

```csharp
using UnityEngine;

public class ColisionParticulas : MonoBehaviour
{
    public ParticleSystem efecto;

    private void OnCollisionEnter(Collision collision)
    {
        if (efecto != null)
        {
            efecto.transform.position = collision.contacts[0].point;
            efecto.Play();
        }
    }
}

```
# Descripción general

Este proyecto de Unity implementa una escena donde objetos tridimensionales (cubos y esferas) caen por acción de la gravedad, utilizando el componente `Rigidbody`. Al colisionar con una superficie (`Plane`), se detecta la colisión mediante el evento `OnCollisionEnter`, y se activa un `Particle System` en el punto exacto de impacto. Esto permite una respuesta visual inmediata y precisa, reforzando la interacción física entre objetos.

---

# Reflexión

El uso de colisiones en Unity no se limita solo a efectos visuales. Este sistema puede extenderse fácilmente para activar otros tipos de reacciones como:

- Reproducción de sonidos con `AudioSource`.
- Activación de luces con `Light`.
- Ejecución de animaciones con `Animator`.
- Aparición de textos, cambios en UI, o activación de enemigos o trampas.

Estos mecanismos pueden mejorar la interactividad de cualquier experiencia visual, tanto en videojuegos como en simulaciones educativas o demostraciones técnicas.
