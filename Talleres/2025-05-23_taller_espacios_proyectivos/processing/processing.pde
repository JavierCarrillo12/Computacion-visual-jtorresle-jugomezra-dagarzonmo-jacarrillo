boolean ortografica = false;

void setup() {
  size(800, 600, P3D);
}

void draw() {
  background(30);
  
  // Control de cámara
  if (ortografica) {
    ortho(-width/2, width/2, -height/2, height/2, 0.1, 1000);
  } else {
    perspective(PI/3.0, float(width)/float(height), 0.1, 1000);
  }

  // Posición de cámara
  camera(300, 300, 300, 0, 0, 0, 0, 1, 0);

  // Luz
  lights();

  // Dibujar cubos a distintas profundidades
  pushMatrix();
  translate(-100, 0, -200);
  fill(255, 100, 0);
  box(50);
  popMatrix();

  pushMatrix();
  translate(0, 0, 0);
  fill(0, 200, 0);
  box(50);
  popMatrix();

  pushMatrix();
  translate(100, 0, 200);
  fill(0, 0, 255);
  box(50);
  popMatrix();

  // Instrucción
  fill(255);
  text("Presiona 'P' para cambiar proyección", 10, height - 10);
}

void keyPressed() {
  if (key == 'p' || key == 'P') {
    ortografica = !ortografica;
  }
}
