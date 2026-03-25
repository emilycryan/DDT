import React from 'react';
import { Link } from 'react-router-dom';

export default function PlanPathBackLink({ to, children, isMobile }) {
  return (
    <div
      style={{
        marginBottom: '2rem',
        textAlign: isMobile ? 'center' : 'left',
      }}
    >
      <Link
        to={to}
        style={{
          fontSize: '0.875rem',
          color: '#005ea2',
          textDecoration: 'underline',
          fontWeight: 500,
        }}
      >
        {children}
      </Link>
    </div>
  );
}
