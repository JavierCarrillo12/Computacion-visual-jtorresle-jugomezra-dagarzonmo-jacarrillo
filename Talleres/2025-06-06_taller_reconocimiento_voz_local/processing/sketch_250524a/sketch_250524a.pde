import oscP5.*;      // Librería para recibir mensajes OSC
import netP5.*;      // Librería de red necesaria para oscP5

OscP5 oscP5;          // Instancia del servidor OSC
String currentCmd = "";// Variable que almacena el último comando recibido
color bg = color(50); // Color de fondo inicial
boolean spinning = false; // Flag que indica si el modo “giro” está activo
float spinAngle = 0;     // Ángulo actual de rotación para la animación

void setup() {
  size(600, 400);                  
  // Inicializa oscP5 para escuchar en el puerto 5005 (debe coincidir con el cliente Python)
  oscP5 = new OscP5(this, 5005);
}

void draw() {
  // Dibuja el fondo con el color actual
  background(bg);
  
  // Muestra el comando actual en el centro de la pantalla
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(currentCmd, width/2, height/2);

  // Si el flag spinning está activo, dibujamos y animamos un rectángulo giratorio
  if (spinning) {
    pushMatrix();                     // Guarda la matriz de coordenadas actual
      translate(width/2, height/2);  // Movemos el origen al centro de la ventana
      rotate(spinAngle);              // Rotamos según el ángulo acumulado
      rect(-50, -50, 100, 100);       // Dibujamos un cuadrado centrado
    popMatrix();                      // Restauramos la matriz original

    spinAngle += 0.05; // Incrementamos un poco el ángulo para el siguiente frame
  }
}

// Esta función se invoca automáticamente al recibir un mensaje OSC
void oscEvent(OscMessage msg) {
  // Verifica que la dirección del mensaje sea "/cmd"
  if (msg.checkAddrPattern("/cmd")) {
    // Lee el primer argumento del mensaje como String
    currentCmd = msg.get(0).stringValue();

    // Según el comando recibido, actualiza color de fondo o activa el giro
    switch(currentCmd) {
      case "red":
        bg = color(200, 50, 50);  // Rojo fuerte
        spinning = false;         // Desactivar animación
        break;
      case "green":
        bg = color(50, 200, 50);  // Verde fuerte
        spinning = false;
        break;
      case "blue":
        bg = color(50, 50, 200);  // Azul fuerte
        spinning = false;
        break;
      case "switch":
        spinning = true;   // Activar modo giro
        spinAngle = 0;     // Reiniciar ángulo a cero
        break;
      default:
        spinning = false;  // Para cualquier otro comando, desactivar giro
        break;
    }
  }
}

