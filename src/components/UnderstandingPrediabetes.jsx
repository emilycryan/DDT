import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ResourcePageLayout from './ResourcePageLayout';

const PAGE_SEQUENCE = [
  { path: '/learn/prediabetes/understanding-prediabetes', title: 'Understanding Prediabetes' },
  { path: '/learn/prediabetes/nutrition-blood-sugar', title: 'Nutrition & Blood Sugar' },
  { path: '/learn/prediabetes/physical-activity-insulin-sensitivity', title: 'Physical Activity & Insulin Sensitivity' },
  { path: '/learn/prediabetes/dpp-program-overview', title: 'National DPP Lifestyle Change Program Overview' },
];

const riskFactors = [
  { title: 'Age', description: '45 years or older. Risk increases significantly with age.' },
  { title: 'Weight', description: 'Overweight or obese (BMI ≥ 25, or ≥ 23 for Asian Americans).' },
  { title: 'Physical Activity', description: 'Less than 3 times per week of moderate physical activity.' },
  { title: 'Family History', description: 'Parent or sibling diagnosed with type 2 diabetes.' },
  { title: 'Race / Ethnicity', description: 'African American, Hispanic/Latino, American Indian, Alaska Native, Pacific Islander, or Asian American.' },
];

const UnderstandingPrediabetes = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const textStyle = { fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#323a45', lineHeight: 1.6 };
  const h2Style = { fontSize: isMobile ? '1.5rem' : '1.75rem', fontFamily: 'var(--font-header)', fontWeight: 600, color: '#1b1b1b', margin: '0 0 1rem 0' };

  return (
    <ResourcePageLayout categoryLabel="Prediabetes" categoryPath="/learn/prediabetes/understanding-prediabetes" pageSequence={PAGE_SEQUENCE} title="Understanding Prediabetes">
      <div style={{ borderBottom: '1px solid #e0e0e0', marginBottom: '1.5rem' }} />

      <p style={{ ...textStyle, margin: '0 0 0.75rem 0' }}>
        Over 96 million American adults have prediabetes — and most don&apos;t know it.
      </p>
      <p style={{ ...textStyle, margin: '0 0 2rem 0' }}>
        With prediabetes, your blood sugar is higher than normal but not yet high enough for a type 2 diabetes diagnosis. The good news: modest lifestyle changes can cut your risk in half.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: isMobile ? '1rem' : '2rem',
        backgroundColor: '#1b1b1b',
        color: 'white',
        padding: isMobile ? '1.5rem' : '2rem',
        borderRadius: '0.25rem',
        marginBottom: '2.5rem',
      }}>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}>96M</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.9, lineHeight: 1.4 }}>American adults have prediabetes — more than 2 in 5 adults</div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}>9 in 10</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.9, lineHeight: 1.4 }}>people with prediabetes don&apos;t know they have it</div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', color: '#007833', marginBottom: '0.5rem' }}>58%</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.9, lineHeight: 1.4 }}>58% lower chances of developing type 2 diabetes for patients enrolled in a CDC-recognized National DPP lifestyle change program</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 340px', gap: '2.5rem', alignItems: 'start' }}>
        <div>
          <h2 style={h2Style}>What Do the Numbers Mean?</h2>
          <p style={{ ...textStyle, margin: '0 0 1rem 0' }}>
            Two tests are commonly used to diagnose prediabetes: the A1C test, which measures your average blood sugar over 3 months, and the fasting plasma glucose test. Prediabetes has no clear symptoms — the only way to know is to get tested.
          </p>
          <p style={{ ...textStyle, margin: '0 0 1.5rem 0' }}>
            Talk to your doctor about getting tested if you&apos;re over 45, have overweight, or have other risk factors. Early detection gives you the best chance to reverse course.
          </p>
          <div style={{ backgroundColor: '#f9dede', borderLeft: '4px solid #d83933', padding: '1.25rem 1.5rem', borderRadius: '0 0.25rem 0.25rem 0' }}>
            <p style={{ ...textStyle, color: '#1b1b1b', margin: 0 }}>
              The A1C test doesn&apos;t require fasting. A small blood draw from your finger or arm gives results reflecting 3 months of blood sugar history.
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: '#f0f4f8', borderRadius: '0.25rem', padding: '1.5rem', border: '1px solid #e0e0e0' }}>
          <h3 style={{ fontSize: '0.75rem', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: '0.08em', color: '#323a45', margin: '0 0 1.25rem 0', textTransform: 'uppercase' }}>
            Diagnostic Ranges
          </h3>
          {[
            { label: 'Normal', color: '#007833', border: '1px solid #e0e0e0', a1c: 'Below 5.7%', fasting: 'Below 100 mg/dL' },
            { label: 'Prediabetes', color: '#d83933', border: '1px solid #d83933', a1c: '5.7% – 6.4%', fasting: '100 – 125 mg/dL' },
            { label: 'Type 2 Diabetes', color: '#d83933', border: '1px solid #e0e0e0', a1c: '6.5% or higher', fasting: '126 mg/dL or higher' },
          ].map((row, i) => (
            <div key={i} style={{ backgroundColor: 'white', border: row.border, borderRadius: '0.25rem', padding: '1rem', marginBottom: i < 2 ? '1rem' : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem', color: '#1b1b1b' }}>{row.label}</span>
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: row.color, flexShrink: 0 }} />
              </div>
              <div style={{ fontSize: '0.875rem', fontFamily: 'var(--font-body)', color: '#323a45', lineHeight: 1.5 }}>
                <div><strong>A1C:</strong> {row.a1c}</div>
                <div><strong>Fasting Glucose:</strong> {row.fasting}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: '#f0f4f8', borderRadius: '0.25rem', padding: isMobile ? '1.5rem' : '2rem', marginTop: '2.5rem' }}>
        <h2 style={h2Style}>Are You at Risk?</h2>
        <p style={{ ...textStyle, margin: '0 0 1.5rem 0' }}>
          Talk to your doctor about getting tested if any of the following apply to you. Multiple risk factors increase your likelihood significantly.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {riskFactors.map((item, i) => (
            <div key={i} style={{ backgroundColor: 'white', border: '1px solid #005ea2', borderRadius: '0.25rem', padding: '1.25rem' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem', color: '#1b1b1b', marginBottom: '0.5rem' }}>{item.title}</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#323a45', lineHeight: 1.5, margin: 0 }}>{item.description}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/get-started" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#005ea2', color: 'white',
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', padding: '0.75rem 1.25rem',
            borderRadius: '0.25rem', textDecoration: 'none',
          }}>
            Take the Risk Test
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#323a45' }}>Takes about 1 minute. No sign-up required.</span>
        </div>
      </div>
    </ResourcePageLayout>
  );
};

export default UnderstandingPrediabetes;
