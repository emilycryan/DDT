import React from 'react';
import { Link } from 'react-router-dom';

const ChildPathPlaceholder = () => {
  return (
    <main style={{ backgroundColor: '#ffffff', minHeight: '80vh' }}>
      <div
        className="grid-container"
        style={{
          maxWidth: 1140,
          margin: '0 auto',
          padding: '3rem 1.5rem',
        }}
      >
        <nav
          style={{
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: '#5c5c5c',
          }}
          aria-label="Breadcrumb"
        >
          <Link to="/" style={{ color: '#005ea2', textDecoration: 'underline' }}>Home</Link>
          <span style={{ margin: '0 0.5rem', color: '#5c5c5c' }}>/</span>
          <span style={{ color: '#323a45', fontWeight: 600 }}>For My Child</span>
        </nav>

        <h1
          style={{
            fontSize: '2.5rem',
            fontFamily: 'var(--font-header)',
            fontWeight: 700,
            color: '#1b1b1b',
            lineHeight: 1.2,
            margin: '0 0 1rem 0',
          }}
        >
          For My Child
        </h1>
        <p
          style={{
            fontSize: '1.125rem',
            fontFamily: 'var(--font-body)',
            color: '#323a45',
            lineHeight: 1.6,
            margin: '0 0 1.5rem 0',
            maxWidth: 720,
          }}
        >
          We&apos;re building this part of the site to help parents and guardians support healthy habits and
          reduce long-term risk of chronic conditions for the children in their care. Check back soon.
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#005ea2',
            color: 'white',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            fontSize: '1rem',
            border: 'none',
            borderRadius: '0.25rem',
            textDecoration: 'none',
          }}
        >
          Back to home
        </Link>
      </div>
    </main>
  );
};

export default ChildPathPlaceholder;
