
export default function LoadingSpinner() {
    return (
        <div className="spinner-overlay" style={{ display: 'flex', position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: 9999 }}>
            <div className="spinner-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '24px' }}>
                <div className="spinner-circle" style={{ width: '48px', height: '48px', border: '4px solid #F3F3F3', borderTop: '4px solid #3B82F6', borderRadius: '50%', animation: 'spinner 1s linear infinite' }}></div>
                <p className="spinner-text" style={{ fontSize: '14px', fontWeight: '500', margin: '0', color: '#4B5563' }}>Loading...</p>
            </div>
        </div>
    );
}