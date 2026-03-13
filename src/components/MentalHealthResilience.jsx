import React, { useState, useEffect } from 'react';
import ResourcePageLayout from './ResourcePageLayout';

const PAGE_SEQUENCE = [
  { path: '/resources/healthy-living/building-healthy-habits', title: 'Building Healthy Habits' },
  { path: '/resources/healthy-living/sleep-recovery', title: 'Sleep & Recovery' },
  { path: '/resources/healthy-living/mental-health-resilience', title: 'Mental Health & Resilience' },
  { path: '/resources/healthy-living/social-connection', title: 'Social Connection' },
];

const stressCycleSteps = [
  { num: 1, title: 'Stressor perceived', desc: 'Amygdala triggers fight-or-flight; cortisol and adrenaline flood the system' },
  { num: 2, title: 'Response activated', desc: 'Heart rate rises, digestion slows, immune activity shifts — useful short-term, harmful if chronic' },
  { num: 3, title: 'Cycle completion', desc: 'Physical movement, deep breathing, or social connection "completes" the cycle and returns the body to baseline' },
];

const resilienceCards = [
  {
    title: 'Cognitive Reframing',
    desc: 'Challenge automatic negative thoughts by asking: "Is this thought accurate? What evidence supports it? What\'s another way to see this?" CBT-based reframing reduces anxiety and depressive symptoms within weeks.',
  },
  {
    title: 'Mindfulness Practice',
    desc: 'Even 10 minutes of daily mindfulness — focused breathing, body scan, or mindful movement — reduces cortisol, lowers blood pressure, and measurably changes brain structure in areas linked to emotional regulation.',
  },
  {
    title: 'Gratitude & Meaning',
    desc: 'Writing three specific things you\'re grateful for each day shifts attention toward positive experiences and is one of the most replicated interventions in positive psychology — with effects lasting months after the practice ends.',
  },
  {
    title: 'Physical Movement',
    desc: 'Exercise is the single most effective stress buffer available. A 20-minute walk raises serotonin and BDNF, reduces cortisol, and improves mood for hours. It\'s not a supplement to mental health care — it\'s a core part of it.',
  },
];

const MentalHealthResilience = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ResourcePageLayout categoryLabel="Healthy Living" categoryPath="/resources/healthy-living/building-healthy-habits" pageSequence={PAGE_SEQUENCE} title="Mental Health & Resilience">
      <p
        style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: '#323a45',
          lineHeight: 1.6,
          margin: '0 0 0.75rem 0',
        }}
      >
        Resilience isn&apos;t something you have or don&apos;t have — it&apos;s a skill that can be practiced and built over time.
      </p>
      <p
        style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: '#323a45',
          lineHeight: 1.6,
          margin: '0 0 2rem 0',
        }}
      >
        Mental health underpins everything else: how we eat, sleep, move, and connect. Evidence-based practices in cognitive skills, mindfulness, and social support measurably reduce risk for depression, anxiety, and chronic disease.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '1rem' : '2rem',
          backgroundColor: '#1b1b1b',
          color: 'white',
          padding: isMobile ? '1.5rem' : '2rem',
          borderRadius: '0.25rem',
          marginBottom: '2.5rem',
        }}
      >
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}>1 in 5</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            US adults experience a mental illness each year — and most never receive treatment
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', color: '#007833', marginBottom: '0.5rem' }}>35%</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            lower risk of depression and anxiety in people who exercise regularly — equal to or better than medication for mild-to-moderate cases
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', color: '#007833', marginBottom: '0.5rem' }}>50%</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            longer lifespan associated with strong social connections — one of the most replicated findings in health research
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 340px',
          gap: '2.5rem',
          marginBottom: '2.5rem',
          alignItems: 'start',
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
            What Resilience Actually Means
          </h2>
          <p
            style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              color: '#323a45',
              lineHeight: 1.6,
              margin: '0 0 1rem 0',
            }}
          >
            Resilience is not the absence of stress or adversity — it&apos;s the capacity to adapt, recover, and grow through it. Research shows it is not a fixed trait but a set of learnable skills that strengthen with practice.
          </p>
          <p
            style={{
              fontSize: '1rem',
              fontFamily: 'var(--font-body)',
              color: '#323a45',
              lineHeight: 1.6,
              margin: '0 0 1.25rem 0',
            }}
          >
            The science is clear: people with higher resilience have lower rates of depression, better cardiovascular health, and stronger immune function. They&apos;re not experiencing less stress — they&apos;re processing it more effectively.
          </p>
          <div
            style={{
              backgroundColor: '#e7f5ec',
              border: '1px solid #007833',
              borderRadius: '0.25rem',
              padding: '1.25rem 1.5rem',
            }}
          >
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: '#1b1b1b', marginBottom: '0.25rem' }}>
              The Mind-Body Connection
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#323a45', lineHeight: 1.5, margin: 0 }}>
              Mental and physical health are not separate systems. Chronic psychological stress directly raises cortisol, increases blood pressure, disrupts sleep, and accelerates biological aging. Addressing mental health is disease prevention.
            </p>
          </div>
        </div>

        <div>
          <h3
            style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: '#323a45',
              margin: '0 0 1rem 0',
              textTransform: 'uppercase',
            }}
          >
            The Stress Response Cycle
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {stressCycleSteps.map((step, i) => (
              <React.Fragment key={i}>
                <div
                  style={{
                    padding: '1rem',
                    borderRadius: '0.25rem',
                    border: '1px solid #e0e0e0',
                    width: '100%',
                  }}
                >
                  <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.05em', opacity: 0.9, marginBottom: '0.25rem', color: '#323a45' }}>
                    Step {i + 1}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', marginBottom: '0.25rem', color: '#1b1b1b' }}>
                    {step.title}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: 1.5, margin: 0, color: '#323a45' }}>
                    {step.desc}
                  </p>
                </div>
                {i < stressCycleSteps.length - 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem 0' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#323a45" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <h2
        style={{
          fontSize: isMobile ? '1.5rem' : '1.75rem',
          fontFamily: 'var(--font-header)',
          fontWeight: 600,
          color: '#1b1b1b',
          margin: '0 0 0.5rem 0',
        }}
      >
        Evidence-Based Resilience Practices
      </h2>
      <p
        style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: '#323a45',
          lineHeight: 1.6,
          margin: '0 0 1.5rem 0',
        }}
      >
        These approaches are drawn from cognitive behavioral therapy, positive psychology, and mindfulness research — and each has demonstrated measurable effects on mental and physical health outcomes.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
          gap: '1rem',
        }}
      >
        {resilienceCards.map((card, i) => (
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
              {card.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#323a45', lineHeight: 1.5, margin: 0 }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </ResourcePageLayout>
  );
};

export default MentalHealthResilience;
