import React, { useState, useEffect } from 'react';
import ResourcePageLayout from './ResourcePageLayout';

const PAGE_SEQUENCE = [
  { path: '/resources/heart-health/know-your-numbers', title: 'Know Your Numbers' },
  { path: '/resources/heart-health/blood-pressure-cholesterol', title: 'Blood Pressure & Cholesterol' },
  { path: '/resources/heart-health/heart-healthy-eating', title: 'Heart-Healthy Eating' },
  { path: '/resources/heart-health/stress-cardiovascular-risk', title: 'Stress & Cardiovascular Risk' },
];

const bpCategories = [
  { label: 'Normal', borderColor: '#007833', text: 'No action needed — maintain healthy habits.', range: 'Less than 120/80' },
  { label: 'Elevated', borderColor: '#d83933', text: 'Lifestyle changes recommended now.', range: '120-129 / below 80' },
  { label: 'Stage 1 Hypertension', borderColor: '#d83933', text: 'Lifestyle changes + possible medication.', range: '130-139 / 80-89' },
  { label: 'Stage 2 Hypertension', borderColor: '#d83933', text: 'Requires medical attention and treatment.', range: '140/90 or higher' },
];

const cholesterolTargets = [
  { type: 'LDL (bad)', desc: 'Keep as low as possible.', target: 'Below 100 mg/dL' },
  { type: 'HDL (good)', desc: 'Higher is better.', target: '60+ mg/dL' },
  { type: 'Triglycerides', desc: 'Linked to diet and inactivity.', target: 'Below 150 mg/dL' },
  { type: 'Total Cholesterol', desc: 'Combined measure.', target: 'Below 200 mg/dL' },
];

const movesTheNeedle = [
  { title: 'Reduce Sodium', desc: 'Cutting to under 2,300 mg/day (ideally 1,500 mg) can lower systolic BP by 5-6 mmHg. Avoid processed foods — they carry 70% of dietary sodium.' },
  { title: 'Move More', desc: '150 minutes of moderate aerobic exercise per week can lower BP by 5-8 mmHg and raise HDL cholesterol by up to 6%.' },
  { title: 'Lose 5-10 lbs', desc: 'Even modest weight loss reduces both blood pressure and LDL cholesterol. Blood pressure drops roughly 1 mmHg per kilogram lost.' },
  { title: 'Quit Smoking', desc: 'Smoking raises BP immediately and damages artery walls over time. Within 1 year of quitting, heart disease risk drops by half.' },
];

const BloodPressureCholesterol = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ResourcePageLayout categoryLabel="Heart Health" categoryPath="/resources/heart-health/know-your-numbers" pageSequence={PAGE_SEQUENCE} title="Blood Pressure & Cholesterol">
      <p
        style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: '#323a45',
          lineHeight: 1.6,
          margin: '0 0 2.5rem 0',
        }}
      >
        Two of the most critical — and controllable — risk factors for heart disease. High blood pressure and high cholesterol often have no symptoms. That&apos;s what makes them dangerous. Understanding what these numbers mean — and how to improve them — can add years to your life.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}
      >
        <div>
          <h2
            style={{
              fontSize: isMobile ? '1.5rem' : '1.75rem',
              fontFamily: 'var(--font-header)',
              fontWeight: 600,
              color: '#1b1b1b',
              margin: '0 0 0.75rem 0',
            }}
          >
            Blood Pressure Categories
          </h2>
          <p
            style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              color: '#323a45',
              lineHeight: 1.6,
              margin: '0 0 1.25rem 0',
            }}
          >
            Blood pressure is recorded as two numbers: systolic (pressure when heart beats) over diastolic (pressure between beats). It&apos;s called the &quot;silent killer&quot; because most people have no symptoms until serious damage has occurred.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {bpCategories.map((item, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderLeftWidth: 4,
                  borderLeftColor: item.borderColor,
                  padding: '1rem 1.25rem',
                  borderRadius: '0 0.25rem 0.25rem 0',
                }}
              >
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: '#1b1b1b', marginBottom: '0.25rem' }}>
                  {item.label}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#323a45', marginBottom: '0.25rem' }}>
                  {item.text}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#323a45' }}>
                  {item.range}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2
            style={{
              fontSize: isMobile ? '1.5rem' : '1.75rem',
              fontFamily: 'var(--font-header)',
              fontWeight: 600,
              color: '#1b1b1b',
              margin: '0 0 0.75rem 0',
            }}
          >
            Cholesterol Targets
          </h2>
          <p
            style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              color: '#323a45',
              lineHeight: 1.6,
              margin: '0 0 1.25rem 0',
            }}
          >
            About 10% of U.S. adults have total cholesterol above 240 mg/dL. Diet, exercise, and medication can bring it down significantly.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {cholesterolTargets.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '0.75rem 0',
                  borderBottom: i < 3 ? '1px solid #e0e0e0' : 'none',
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: '#1b1b1b' }}>
                    {item.type}:
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#323a45' }}>
                    {item.desc}
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: '#007833', flexShrink: 0 }}>
                  {item.target}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              backgroundColor: '#f9dede',
              border: '1px solid #1b1b1b',
              borderRadius: '0.25rem',
              padding: '1rem 1.25rem',
            }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#1b1b1b', lineHeight: 1.5, margin: 0 }}>
              Get a lipid panel blood test every 4-6 years, or more often if you have risk factors like family history or high BMI.
            </p>
          </div>
        </div>
      </div>

      <h2
        style={{
          fontSize: isMobile ? '1.5rem' : '1.75rem',
          fontFamily: 'var(--font-header)',
          fontWeight: 600,
          color: '#1b1b1b',
          margin: '0 0 1rem 0',
        }}
      >
        What Moves the Needle
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: '1rem',
        }}
      >
        {movesTheNeedle.map((item, i) => (
          <div
            key={i}
            style={{
              border: '1px solid #e0e0e0',
              borderTop: '3px solid #007833',
              borderRadius: '0.25rem',
              padding: '1.25rem',
              backgroundColor: 'white',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem', color: '#1b1b1b', margin: '0 0 0.5rem 0' }}>
              {item.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#323a45', lineHeight: 1.5, margin: 0 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </ResourcePageLayout>
  );
};

export default BloodPressureCholesterol;
