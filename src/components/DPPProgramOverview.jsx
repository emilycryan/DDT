import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ResourcePageLayout from './ResourcePageLayout';

const PAGE_SEQUENCE = [
  { path: '/learn/prediabetes/understanding-prediabetes', title: 'Understanding Prediabetes' },
  { path: '/learn/prediabetes/nutrition-blood-sugar', title: 'Nutrition & Blood Sugar' },
  { path: '/learn/prediabetes/physical-activity-insulin-sensitivity', title: 'Physical Activity & Insulin Sensitivity' },
  { path: '/learn/prediabetes/dpp-program-overview', title: 'National DPP Lifestyle Change Program Overview' },
];

const linkStyle = {
  color: '#005ea2',
  textDecoration: 'underline',
  textUnderlineOffset: '2px',
};

const DPPProgramOverview = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ResourcePageLayout categoryLabel="Prediabetes" categoryPath="/learn/prediabetes/understanding-prediabetes" pageSequence={PAGE_SEQUENCE} title="National DPP Lifestyle Change Program Overview">
      <h2
        style={{
          fontSize: isMobile ? '1.25rem' : '1.375rem',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          color: '#323a45',
          margin: '0 0 0.75rem 0',
        }}
      >
        A proven, year-long program that cuts your diabetes risk by 58%.
      </h2>
      <p
        style={{
          fontSize: '1rem',
          fontFamily: 'var(--font-body)',
          color: '#323a45',
          lineHeight: 1.6,
          margin: '0 0 2rem 0',
        }}
      >
        The CDC-recognized National Diabetes Prevention Program (National DPP) is an evidence-based lifestyle change program that helps people with prediabetes make the small shifts that add up to lasting change – guided by a trained coach, with peer support along the way.
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
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', color: '#007833', marginBottom: '0.5rem' }}>58%</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            58% lower chances of developing type 2 diabetes for patients enrolled in a CDC-recognized National DPP lifestyle change program
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}>1 Year</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            structured program with ~24 hours of expert-guided instruction
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}>⅓ less</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            likely to develop diabetes even 10 years after program completion
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 0.88fr) minmax(400px, 1fr)',
          gap: '2.5rem',
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
              margin: '0 0 1rem 0',
            }}
          >
            How the Program Works
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
            The National DPP Lifestyle Change Program is a year-long program led by a trained Lifestyle Coach. It teaches practical skills for healthy eating, physical activity, stress management, and building lasting habits – in a group setting with peer support.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '0.25rem',
                padding: '1.5rem',
                display: 'flex',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#d83933',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  flexShrink: 0,
                }}
              >
                1
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.125rem', color: '#1b1b1b', margin: '0 0 0.5rem 0' }}>
                  First 6 Months — Weekly Sessions
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#323a45', lineHeight: 1.5, margin: 0 }}>
                  Meet weekly for 1-hour sessions. Learn core habits: healthy eating, adding physical activity, managing stress, and overcoming challenges. Small group setting builds accountability.
                </p>
              </div>
            </div>
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '0.25rem',
                padding: '1.5rem',
                display: 'flex',
                gap: '1rem',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: '#007833',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  flexShrink: 0,
                }}
              >
                2
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.125rem', color: '#1b1b1b', margin: '0 0 0.5rem 0' }}>
                  Next 6 Months — Monthly Check-Ins
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#323a45', lineHeight: 1.5, margin: 0 }}>
                  Meet monthly to reinforce skills and maintain positive changes. Build on momentum with coach support and the peer group you&apos;ve formed.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div
            style={{
              backgroundColor: '#f0f4f8',
              borderRadius: '0.25rem',
              padding: '1.5rem',
              border: '1px solid #e0e0e0',
            }}
          >
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
              Am I Eligible?
            </h3>
            <div
              style={{
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '0.25rem',
                padding: '1.25rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: '#323a45',
                  lineHeight: 1.6,
                }}
              >
                <p style={{ margin: '0 0 0.75rem 0', fontWeight: 600, color: '#1b1b1b' }}>
                  To participate, you must meet ALL 4 of these requirements:
                </p>
                <ol style={{ margin: '0 0 1.25rem 0', paddingLeft: '1.25rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Be 18 years or older.</li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Have a body mass index (BMI) of 25 or higher (23 or higher if you&apos;re an Asian American person).
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>Not be previously diagnosed with type 1 or type 2 diabetes.</li>
                  <li style={{ marginBottom: '0.5rem' }}>Not be pregnant.</li>
                </ol>
                <p style={{ margin: '0 0 0.75rem 0', fontWeight: 600, color: '#1b1b1b' }}>
                  You&apos;ll also need to meet 1 of these requirements:
                </p>
                <ol style={{ margin: '0 0 1.25rem 0', paddingLeft: '1.25rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    Had a blood test result in the prediabetes range within the past year (includes any of these tests and results):
                    <ul
                      style={{
                        listStyle: 'none',
                        paddingLeft: 0,
                        margin: '0.5rem 0 0 0',
                      }}
                    >
                      <li style={{ marginBottom: '0.35rem', paddingLeft: '0.5rem' }}>
                        · Hemoglobin A1C: 5.7%–6.4%
                      </li>
                      <li style={{ marginBottom: '0.35rem', paddingLeft: '0.5rem' }}>
                        · Fasting plasma glucose: 100–125 mg/dL
                      </li>
                      <li style={{ marginBottom: 0, paddingLeft: '0.5rem' }}>
                        · 2-hour plasma glucose (after a 75g glucose load): 140–199 mg/dL.
                      </li>
                    </ul>
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>Be previously diagnosed with gestational diabetes (diabetes during pregnancy).</li>
                  <li style={{ marginBottom: 0 }}>
                    Received a high-risk result (score of 5 or higher) on the{' '}
                    <a
                      href="https://www.cdc.gov/prediabetes/risktest/index.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={linkStyle}
                    >
                      Prediabetes Risk Test
                    </a>
                    .
                  </li>
                </ol>
                <p style={{ margin: 0 }}>
                  If you&apos;re enrolling in the Medicare Diabetes Prevention Program, different criteria apply.{' '}
                  <a
                    href="https://www.cdc.gov/diabetes-prevention/lifestyle-change-program/ndpp-medicare-program.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                  >
                    Find them here.
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#1b1b1b',
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 0.5px, transparent 1px)',
              backgroundSize: '24px 24px',
              borderRadius: '0.25rem',
              padding: '1.5rem',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.125rem', color: 'white', margin: '0 0 0.5rem 0' }}>
              Find Your Perfect Program
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'rgba(255,255,255,0.95)', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
              In-person, live virtual, and on-demand options available nationwide.
            </p>
            <Link
              to="/lifestyle-programs"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'white',
                color: '#1b1b1b',
                border: 'none',
                borderRadius: '0.25rem',
                padding: '0.75rem 1.25rem',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                textDecoration: 'none',
              }}
            >
              Search Programs
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </ResourcePageLayout>
  );
};

export default DPPProgramOverview;
