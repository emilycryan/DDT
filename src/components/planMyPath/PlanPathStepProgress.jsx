import React from 'react';
import { TEAL, TEAL_DARK } from './planPathConstants';

export default function PlanPathStepProgress({ currentStep, totalSteps }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 400,
        margin: '0 auto 2rem',
      }}
    >
      <p
        id="plan-path-progress-label"
        style={{
          textAlign: 'center',
          fontSize: '0.9375rem',
          fontWeight: 700,
          color: TEAL_DARK,
          fontFamily: 'var(--font-body)',
          margin: '0 0 0.75rem 0',
        }}
      >
        Step {currentStep} of {totalSteps}
      </p>

      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-valuenow={currentStep}
        aria-labelledby="plan-path-progress-label"
        aria-label={`Step ${currentStep} of ${totalSteps}`}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 6,
        }}
      >
        {Array.from({ length: totalSteps }, (_, i) => {
          const n = i + 1;
          const done = n < currentStep;
          const active = n === currentStep;
          return (
            <div
              key={n}
              title={`Step ${n}`}
              style={{
                flex: 1,
                height: 8,
                borderRadius: 4,
                backgroundColor: done || active ? TEAL : '#dfe1e2',
                opacity: active ? 1 : done ? 0.85 : 0.55,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
