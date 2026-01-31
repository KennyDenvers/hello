import { useState } from 'react';
import { useProficiency } from '../hooks/useProficiency';
import { useSpacedRep } from '../hooks/useSpacedRep';

function Settings({ onBack }) {
  const { resetProgress, getOverallProgress } = useProficiency();
  const { resetReviews } = useSpacedRep();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = () => {
    resetProgress();
    resetReviews();
    setShowConfirm(false);
  };

  const overallProgress = getOverallProgress();

  return (
    <div className="settings fade-in">
      <header className="header">
        <button className="back-btn" onClick={onBack}>←</button>
        <h1>Einstellungen</h1>
      </header>

      <div className="settings-section">
        <div className="settings-item">
          <span className="settings-label">Gesamtfortschritt</span>
          <span className="settings-value">{overallProgress}%</span>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-item">
          <span className="settings-label">Sprache</span>
          <span className="settings-value">Deutsch</span>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-item">
          <span className="settings-label">Version</span>
          <span className="settings-value">1.0.0</span>
        </div>
      </div>

      <div className="settings-section">
        <div className="settings-item">
          <span className="settings-label">Fortschritt zurücksetzen</span>
          <button onClick={() => setShowConfirm(true)}>
            Zurücksetzen
          </button>
        </div>
      </div>

      {showConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: 16,
            padding: 24,
            maxWidth: 320,
            width: '100%'
          }}>
            <h3 style={{ marginBottom: 12 }}>Fortschritt zurücksetzen?</h3>
            <p style={{ color: '#6b7280', marginBottom: 20, fontSize: 14 }}>
              Alle Lernfortschritte und Statistiken werden gelöscht.
              Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                  background: 'white',
                  cursor: 'pointer'
                }}
                onClick={() => setShowConfirm(false)}
              >
                Abbrechen
              </button>
              <button
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 8,
                  border: 'none',
                  background: '#ef4444',
                  color: 'white',
                  cursor: 'pointer'
                }}
                onClick={handleReset}
              >
                Zurücksetzen
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{
        textAlign: 'center',
        padding: 40,
        color: '#9ca3af',
        fontSize: 13
      }}>
        <p>Potenzen & Logarithmen Lernapp</p>
        <p style={{ marginTop: 4 }}>Für Wirtschaftswissenschaftler</p>
      </div>
    </div>
  );
}

export default Settings;
