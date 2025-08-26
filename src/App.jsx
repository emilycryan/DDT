import { useState } from 'react'
import './App.css'
import CDCHeader from './components/CDCHeader'
import CDCFooter from './components/CDCFooter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', margin: 0, padding: 0 }}>
      {/* CDC Header */}
      <CDCHeader />

      {/* Main Content */}
      <main style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '2rem 1rem', 
        textAlign: 'center' 
      }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          color: '#374151', 
          marginBottom: '2rem' 
        }}>
          Start Your Path 2 Prevention
        </h2>

        <div style={{ 
          backgroundColor: '#f9fafb', 
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#6b7280',
            marginBottom: '1rem' 
          }}>
            Get started on your path to preventing type 2 diabetes here. Path 2 Prevention is an online resource for people who may be at risk for developing type 2 diabetes.
          </p>
          
          <div style={{ marginBottom: '1rem' }}>
            <button
              onClick={() => setCount((count) => count + 1)}
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.375rem',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              Count is {count}
            </button>
          </div>

          <p style={{ color: '#6b7280' }}>
            Edit <code style={{ 
              backgroundColor: '#f3f4f6', 
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontFamily: 'monospace'
            }}>src/App.jsx</code> and save to test HMR
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          <div style={{ 
            backgroundColor: '#eff6ff',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            border: '1px solid #dbeafe'
          }}>
            <h3 style={{ color: '#1e40af', margin: '0 0 0.5rem 0' }}>React</h3>
            <p style={{ color: '#6b7280', margin: 0 }}>Fast refresh and modern development</p>
          </div>
          
          <div style={{ 
            backgroundColor: '#f0fdf4',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            border: '1px solid #dcfce7'
          }}>
            <h3 style={{ color: '#166534', margin: '0 0 0.5rem 0' }}>Vite</h3>
            <p style={{ color: '#6b7280', margin: 0 }}>Lightning fast build tool</p>
          </div>
          
          <div style={{ 
            backgroundColor: '#fefce8',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            border: '1px solid #fef3c7'
          }}>
            <h3 style={{ color: '#a16207', margin: '0 0 0.5rem 0' }}>Express</h3>
            <p style={{ color: '#6b7280', margin: 0 }}>Backend API ready to go</p>
          </div>
        </div>
      </main>

      {/* CDC Footer */}
      <CDCFooter />
    </div>
  )
}

export default App
