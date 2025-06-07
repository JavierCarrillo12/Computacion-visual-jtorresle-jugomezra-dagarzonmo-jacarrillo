import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';

function MovingSphere({ data }) {
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.position.x = data.x;
      ref.current.position.y = data.y;
      ref.current.material.color.set(data.color);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={data.color} />
    </mesh>
  );
}

function App() {
  const [data, setData] = useState({ x: 0, y: 0, color: 'blue' });
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8765");
    ws.onopen = () => console.log("WebSocket conectado");
    ws.onmessage = (event) => {
      const received = JSON.parse(event.data);
      setData(received);
    };
    setSocket(ws);
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    const newData = { ...data, [name]: name === 'color' ? value : parseFloat(value) };
    setData(newData);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(newData));
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '70vw', height: '100vh' }}>
        <Canvas style={{ width: '100%', height: '100%' }}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <MovingSphere data={data} />
        </Canvas>
      </div>
      <div style={{ padding: 20, width: '30vw', background: '#f4f4f4' }}>
        <h2>Control de Esfera</h2>
        <label>
          X: 
          <input type="range" name="x" min="-5" max="5" step="0.1" value={data.x} onChange={handleInput} />
        </label><br />
        <label>
          Y: 
          <input type="range" name="y" min="-5" max="5" step="0.1" value={data.y} onChange={handleInput} />
        </label><br />
        <label>
          Color: 
          <select name="color" value={data.color} onChange={handleInput}>
            <option value="red">Rojo</option>
            <option value="green">Verde</option>
            <option value="blue">Azul</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default App;
