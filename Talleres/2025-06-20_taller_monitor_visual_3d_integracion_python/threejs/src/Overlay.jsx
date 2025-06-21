export default function Overlay({ nPersonas }) {
  return (
    <div style={{
      position: 'absolute',
      top: 20,
      left: 20,
      color: 'white',
      background: 'rgba(0,0,0,0.6)',
      padding: '10px 15px',
      borderRadius: '8px',
      fontFamily: 'monospace'
    }}>
      Personas detectadas: {nPersonas}
    </div>
  )
}
