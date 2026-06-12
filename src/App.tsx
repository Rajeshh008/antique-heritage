// @ts-nocheck
import '@google/model-viewer';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>AR Antique Demo</h1>

      <model-viewer
        src="/models/Chair.glb"
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        auto-rotate
        style={{ width: '100%', height: '600px' }}
      >
        <button slot="ar-button">
          View In Your Space
        </button>
      </model-viewer>
    </div>
  );
}

export default App;