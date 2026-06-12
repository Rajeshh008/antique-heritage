// @ts-nocheck
import React from 'react';
import '@google/model-viewer';

function App() {
  const ModelViewer = 'model-viewer' as any;

  return (
    <div style={{ padding: '20px' }}>
      <h1>AR Antique Demo</h1>

      <ModelViewer
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
      </ModelViewer>
    </div>
  );
}

export default App;