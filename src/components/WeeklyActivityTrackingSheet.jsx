import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const GOAL_MINUTES = 150;

const WeeklyActivityTrackingSheet = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          <span style={{ color: '#323a45', fontWeight: 600 }}>Weekly Activity Tracking Sheet</span>
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
          Weekly Activity Tracking Sheet
        </h1>

        <p style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#323a45', lineHeight: 1.6, margin: '0 0 0.5rem 0' }}>
          A simple weekly log for patients to track physical activity minutes. The 150-minute goal comes from the CDC National Diabetes Prevention Program lifestyle change program and the U.S. Department of Health and Human Services Physical Activity Guidelines for Americans — both recommend at least 150 minutes of moderate-intensity aerobic activity per week for adults to improve health and reduce chronic disease risk.
        </p>

        <p style={{ fontSize: '0.875rem', fontFamily: 'var(--font-body)', color: '#323a45', lineHeight: 1.5, margin: '0 0 1.5rem 0' }}>
          Moderate activity includes brisk walking, water aerobics, dancing, gardening, or anything that raises your heart rate. Patients can write notes about what they did each day if helpful.
        </p>

        <div style={{ backgroundColor: '#f0f4f8', borderRadius: '0.25rem', padding: isMobile ? '1.5rem' : '2rem', border: '1px solid #e0e0e0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e0e0e0' }}>
            <h2 style={{ fontSize: '1.125rem', fontFamily: 'var(--font-header)', fontWeight: 600, color: '#1b1b1b', margin: 0 }}>
              Week of: _______________________
            </h2>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 600, color: '#005ea2' }}>
              Goal: {GOAL_MINUTES} minutes / week
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)', fontSize: '0.9375rem' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', borderBottom: '2px solid #e0e0e0', color: '#323a45', fontWeight: 600 }}>Day</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', borderBottom: '2px solid #e0e0e0', color: '#323a45', fontWeight: 600 }}>Minutes</th>
                <th style={{ textAlign: 'left', padding: '0.75rem 0.5rem', borderBottom: '2px solid #e0e0e0', color: '#323a45', fontWeight: 600 }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {DAYS.map((day) => (
                <tr key={day}>
                  <td style={{ padding: '0.75rem 0.5rem', borderBottom: '1px solid #e0e0e0', color: '#1b1b1b', fontWeight: 500, verticalAlign: 'top' }}>{day}</td>
                  <td style={{ padding: '0.75rem 0.5rem', borderBottom: '1px solid #e0e0e0', verticalAlign: 'top' }}>
                    <div style={{ width: isMobile ? 56 : 72, minHeight: 36, border: '1px solid #5c5c5c', borderRadius: '0.25rem', backgroundColor: 'white' }} />
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', borderBottom: '1px solid #e0e0e0', verticalAlign: 'top' }}>
                    <div style={{ minHeight: 36, border: '1px solid #5c5c5c', borderRadius: '0.25rem', backgroundColor: 'white' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 600, color: '#1b1b1b' }}>
              Weekly total: __________ minutes
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#323a45' }}>
              Reached 150 minutes? &nbsp;&#9634; Yes &nbsp;&#9634; Not yet
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-body)', color: '#323a45', lineHeight: 1.5, marginTop: '1.5rem', fontStyle: 'italic' }}>
          Sources: CDC National DPP; U.S. DHHS Physical Activity Guidelines for Americans, 2nd edition.
        </p>
      </section>
    </main>
  );
};

export default WeeklyActivityTrackingSheet;
