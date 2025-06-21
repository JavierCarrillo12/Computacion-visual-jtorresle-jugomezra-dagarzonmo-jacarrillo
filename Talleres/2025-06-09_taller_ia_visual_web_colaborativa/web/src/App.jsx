import React, { useState, useRef, useEffect } from 'react';
import Scene3D from './components/Scene3D';
import './App.css';

// Configuración de la API
const API_BASE_URL = 'http://localhost:5000';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detections, setDetections] = useState([]);
  const [message, setMessage] = useState(null);
  const [controls, setControls] = useState({
    showBoundingBoxes: true,
    showLabels: true,
    showConfidence: true,
    showImage: true
  });
  const fileInputRef = useRef(null);
  const uploadAreaRef = useRef(null);

  // Verificar conexión con el servidor al cargar
  useEffect(() => {
    checkServerConnection();
  }, []);

  // Verificar conexión con el servidor
  const checkServerConnection = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      console.log('✅ Servidor conectado:', data);
      showMessage('Servidor conectado correctamente', 'success');
    } catch (error) {
      console.error('❌ Error conectando al servidor:', error);
      showMessage('No se puede conectar al servidor. Asegúrate de que esté ejecutándose en http://localhost:5000', 'error');
    }
  };

  // Mostrar mensajes
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  // Manejar drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    uploadAreaRef.current?.classList.add('dragover');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    uploadAreaRef.current?.classList.remove('dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    uploadAreaRef.current?.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  // Manejar selección de archivo
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  // Procesar archivo
  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      showMessage('Por favor selecciona un archivo de imagen válido', 'error');
      return;
    }

    setSelectedFile(file);
  };

  // Detectar objetos
  const detectObjects = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      console.log('Enviando imagen al servidor...');
      const response = await fetch(`${API_BASE_URL}/detect`, {
        method: 'POST',
        body: formData
      });

      console.log('Respuesta recibida:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error del servidor: ${errorData.error || response.statusText}`);
      }

      const data = await response.json();
      console.log('Datos recibidos:', data);
      
      setDetections(data.objects || []);
      showMessage(`Detección completada: ${data.objects.length} objetos encontrados`, 'success');
      
    } catch (error) {
      console.error('Error:', error);
      showMessage(`Error al procesar la imagen: ${error.message}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>🔍 IA Visual Colaborativa</h1>
          <p>Visualización 3D de Detecciones con React + Three.js</p>
        </header>

        <main className="main-content">
          {/* Control Panel */}
          <div className="control-panel">
            <div className="panel-section">
              <h3>📤 Subir Imagen</h3>
              <div 
                className="upload-area" 
                ref={uploadAreaRef}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragLeave={handleDragLeave}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  accept="image/*" 
                  style={{ display: 'none' }}
                  onChange={handleFileSelect}
                />
                {selectedFile ? (
                  <div>
                    <img 
                      src={URL.createObjectURL(selectedFile)} 
                      alt="Preview" 
                      style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }}
                    />
                    <p style={{ marginTop: '1rem' }}>{selectedFile.name}</p>
                  </div>
                ) : (
                  <div className="upload-content">
                    <span className="upload-icon">📷</span>
                    <p>Haz clic para seleccionar una imagen</p>
                    <small>o arrastra y suelta aquí</small>
                  </div>
                )}
              </div>
              <button 
                className="btn btn-primary" 
                disabled={!selectedFile || isLoading}
                onClick={detectObjects}
              >
                {isLoading ? '🔄 Procesando...' : '🔍 Detectar Objetos'}
              </button>
            </div>

            <div className="panel-section">
              <h3>📊 Resultados</h3>
              <div className="results-info">
                <p><strong>{detections.length}</strong> objetos detectados</p>
                {detections.length > 0 && (
                  <p><small>Última detección: {new Date().toLocaleString()}</small></p>
                )}
              </div>
              <div className="detection-list">
                {detections.map((detection, index) => (
                  <div key={index} className="detection-item">
                    <h4>{detection.class}</h4>
                    <div className="confidence">
                      Confianza: {(detection.confidence * 100).toFixed(1)}%
                    </div>
                    <div className="position">
                      Posición: ({detection.x}, {detection.y}) | Tamaño: {detection.w}×{detection.h}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel-section">
              <h3>🎛️ Controles 3D</h3>
              <div className="controls">
                <label>
                  <input 
                    type="checkbox" 
                    checked={controls.showImage}
                    onChange={(e) => setControls(prev => ({ ...prev, showImage: e.target.checked }))}
                  />
                  Mostrar Imagen de Fondo
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={controls.showBoundingBoxes}
                    onChange={(e) => setControls(prev => ({ ...prev, showBoundingBoxes: e.target.checked }))}
                  />
                  Mostrar Bounding Boxes
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={controls.showLabels}
                    onChange={(e) => setControls(prev => ({ ...prev, showLabels: e.target.checked }))}
                  />
                  Mostrar Etiquetas
                </label>
                <label>
                  <input 
                    type="checkbox" 
                    checked={controls.showConfidence}
                    onChange={(e) => setControls(prev => ({ ...prev, showConfidence: e.target.checked }))}
                  />
                  Mostrar Confianza
                </label>
              </div>
            </div>
          </div>

          {/* 3D Scene */}
          <Scene3D detections={detections} controls={controls} selectedFile={selectedFile} />
        </main>
      </div>

      {/* Loading Modal */}
      {isLoading && (
        <div className="modal show">
          <div className="modal-content">
            <div className="spinner"></div>
            <p>Procesando imagen...</p>
          </div>
        </div>
      )}

      {/* Messages */}
      {message && (
        <div className={`message ${message.type}-message`} style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 1001,
          maxWidth: '400px'
        }}>
          {message.text}
        </div>
      )}
    </div>
  );
}

export default App; 