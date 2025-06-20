using UnityEngine;
using UnityEngine.AI;

public class Patrullaje : MonoBehaviour
{
    public Transform[] puntos;
    private int index = 0;
    private NavMeshAgent agente;
    private Animator animator;
    private Transform jugador;

    private enum EstadoNPC
    {
        Patrullando,
        Persiguiendo
    }

    private EstadoNPC estadoActual = EstadoNPC.Patrullando;

    void Start()
    {
        agente = GetComponent<NavMeshAgent>();
        animator = GetComponent<Animator>();

        if (puntos.Length > 0)
        {
            agente.SetDestination(puntos[index].position);
        }
    }

    void Update()
    {
        animator.SetFloat("Velocidad", agente.velocity.magnitude);

        switch (estadoActual)
        {
            case EstadoNPC.Patrullando:
                if (!agente.pathPending && agente.remainingDistance < 0.5f)
                {
                    index = (index + 1) % puntos.Length;
                    agente.SetDestination(puntos[index].position);
                }
                break;

            case EstadoNPC.Persiguiendo:
                if (jugador != null)
                {
                    agente.SetDestination(jugador.position);
                }
                break;
        }
    }

    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            jugador = other.transform;
            estadoActual = EstadoNPC.Persiguiendo;
        }
    }

    void OnTriggerExit(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            jugador = null;
            estadoActual = EstadoNPC.Patrullando;
            agente.SetDestination(puntos[index].position); // volver al patrullaje actual
        }
    }
}
