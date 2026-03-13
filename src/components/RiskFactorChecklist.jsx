import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RiskFactorChecklist = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const checklistItem = (label, helper) => (
    <div
      key={label}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        padding: '0.6rem 0',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: 4,
          border: '2px solid #5c5c5c',
          flexShrink: 0,
          marginTop: 2,
        }}
      />
      <div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#1b1b1b', fontWeight: 500 }}>{label}</div>
        {helper && (
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#323a45', marginTop: 2 }}>{helper}</div>
        )}
      </div>
    </div>
  );

  const sectionStyles = {
    maxWidth: 960,
    margin: '0 auto',
    padding: isMobile ? '2rem 1rem' : '3rem 2rem',
  };

  return (
    <main style={{ backgroundColor: '#ffffff', minHeight: '80vh' }}>
      <section style={sectionStyles}>
        <nav style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#5c5c5c' }} aria-label="Breadcrumb">
          <Link to="/" style={{ color: '#005ea2', textDecoration: 'underline' }}>Home</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <Link to="/for-practitioners" style={{ color: '#005ea2', textDecoration: 'underline' }}>For Practitioners</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: '#323a45', fontWeight: 600 }}>Risk Factor Checklist</span>
        </nav>

        <span
          style={{
            display: 'inline-block',
            backgroundColor: '#e7f2f5',
            color: '#005ea2',
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            padding: '0.4rem 1rem',
            borderRadius: '0.25rem',
            marginBottom: '1.25rem',
            fontFamily: 'var(--font-body)',
            textTransform: 'uppercase',
          }}
        >
          Visit Tool
        </span>

        <h1 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontFamily: 'var(--font-header)', fontWeight: 700, color: '#1b1b1b', lineHeight: 1.2, margin: '0 0 0.75rem 0' }}>
          Risk Factor Checklist
        </h1>

        <p style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#323a45', lineHeight: 1.6, margin: '0 0 0.5rem 0' }}>
          A simple checklist you can use with patients to quickly review common risk factors for prediabetes and type 2 diabetes. Complete together before or during a visit to guide conversation and next steps.
        </p>

        <p style={{ fontSize: '0.875rem', fontFamily: 'var(--font-body)', color: '#323a45', lineHeight: 1.5, margin: '0 0 1.5rem 0' }}>
          Check all that apply. Use the notes area at the bottom for details or follow-up items.
        </p>

        <div style={{ backgroundColor: '#f0f4f8', borderRadius: '0.25rem', padding: isMobile ? '1.5rem' : '2rem', border: '1px solid #e0e0e0' }}>
          <h2 style={{ fontSize: '1.125rem', fontFamily: 'var(--font-header)', fontWeight: 600, color: '#1b1b1b', margin: '0 0 1rem 0' }}>
            Check if any of these are true:
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '0.5rem 0' : '0 1.5rem' }}>
            <div>
              {checklistItem('Age 45 or older', 'Especially if not regularly active.')}
              {checklistItem('Overweight or higher body weight', 'BMI in the overweight or obesity range.')}
              {checklistItem('Family history of type 2 diabetes', 'Parent, brother, sister, or child with type 2 diabetes.')}
              {checklistItem('History of gestational diabetes or large baby', 'Diabetes during pregnancy or baby weighing more than 9 lbs.')}
              {checklistItem('Physically inactive', 'Less than 150 minutes of moderate activity each week.')}
            </div>
            <div>
              {checklistItem('High blood pressure', 'History of hypertension or on blood pressure medication.')}
              {checklistItem('Abnormal cholesterol', 'Low HDL ("good") cholesterol or high triglycerides.')}
              {checklistItem('History of heart disease or stroke', 'Prior cardiovascular event or diagnosed condition.')}
              {checklistItem('Sleep problems', 'Obstructive sleep apnea or short sleep most nights.')}
              {checklistItem('Other conditions that increase risk', 'Such as PCOS or certain medications that raise blood sugar.')}
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e0e0e0' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 600, color: '#1b1b1b', marginBottom: '0.5rem' }}>Notes / follow-up:</div>
            <div style={{ minHeight: 96, borderRadius: '0.25rem', border: '1px dashed #5c5c5c', backgroundColor: 'white' }} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default RiskFactorChecklist;
