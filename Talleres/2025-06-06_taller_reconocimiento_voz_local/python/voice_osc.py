import speech_recognition as sr        # Biblioteca para reconocimiento de voz
from pythonosc import udp_client      # Cliente OSC para enviar mensajes a Processing/Unity
import pyttsx3                        # Motor de texto a voz (TTS) offline
import threading                      # Para manejar hilos concurrentes
from queue import Queue               # Cola para mensajes de voz sin bloqueo

# 1) Diccionario de comandos válidos
VALID_COMMANDS = {"green", "blue", "switch", "stop"}

# 2) Configurar cliente OSC apuntando a localhost:5005
client = udp_client.SimpleUDPClient("127.0.0.1", 5005)

# 3) Inicializar motor TTS y ajustar velocidad de habla
tts = pyttsx3.init()
tts.setProperty("rate", 150)  # palabras por minuto

# Cola para gestionar el texto a pronunciar en un solo hilo
voice_q = Queue()

def voice_worker():
    """Hilo dedicado a procesar la cola de texto y enviar al TTS."""
    while True:
        text = voice_q.get()       # Toma el siguiente mensaje
        tts.say(text)              # Encola en el motor de voz
        tts.runAndWait()           # Bloquea hasta terminar de hablar
        voice_q.task_done()        # Señala que se procesó este elemento

# Arranca el hilo de voz en segundo plano (daemon=True para que no bloquee salida)
threading.Thread(target=voice_worker, daemon=True).start()

def speak(text):
    """Añade un mensaje de texto a la cola para que se pronuncie."""
    voice_q.put(text)

def recognize_loop():
    """Bucle principal: captura audio, reconoce comandos y envía OSC."""
    r = sr.Recognizer()
    mic = sr.Microphone()

    # Calibrar nivel de ruido ambiente antes de empezar
    with mic as source:
        r.adjust_for_ambient_noise(source)

    print("Di un comando válido:", VALID_COMMANDS)
    while True:
        with mic as source:
            audio = r.listen(source)  # Escucha hasta silencio

        try:
            # Reconocimiento con la API gratuita de Google en español
            cmd = r.recognize_google(audio, language="es-ES").lower()
        except sr.UnknownValueError:
            # No se entendió nada
            print("No te entendí. Intenta de nuevo.")
            speak("No te entendí")
            continue
        except sr.RequestError as e:
            # Error de red o límite de cuota
            print(f"Error en el servicio de Google Speech API: {e}")
            speak("Error de reconocimiento")
            continue

        # 5) Filtrar y validar el comando reconocido
        for word in cmd.split():
            if word in VALID_COMMANDS:
                print("Comando detectado:", word)
                # 6) Enviar mensaje OSC con la dirección '/cmd'
                client.send_message("/cmd", word)
                speak(f"Comando {word} recibido")
                break
        else:
            # Si no coincide ninguno de los comandos válidos
            print(f"No es un comando válido: {cmd}")
            speak("Comando inválido")

if __name__ == "__main__":
    # Inicia el bucle de reconocimiento al ejecutar el script
    recognize_loop()

