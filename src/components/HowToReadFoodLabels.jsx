import React, { useState, useEffect } from 'react';
import TipsPageLayout from './TipsPageLayout';

/* USWDS colors: #005ea2 primary, #1b1b1b dark, #323a45 text, #007833 success, #d83933 secondary, #e0e0e0 borders, #f0f4f8 light bg, #f9dede callout bg */

const labelClaims = [
  { claim: 'Multi-grain', example: 'e.g. Multi-Grain Cheerios, multi-grain bread', meaning: 'Multiple grain types, but doesn\'t guarantee whole grain. Check the ingredient list.', bulletColor: '#d83933' },
  { claim: 'Natural', example: 'e.g. "All Natural," "Made with Natural Ingredients"', meaning: 'Completely unregulated by the FDA. Ignore it entirely.', bulletColor: '#d83933' },
  { claim: 'Reduced Fat / Low Fat', example: 'e.g. reduced-fat peanut butter, low-fat yogurt', meaning: '25% less fat — but fat is often replaced with sugar or starch. Check the full label.', bulletColor: '#d83933' },
  { claim: 'Sugar Free', example: 'e.g. sugar-free gummies, sugar-free syrup', meaning: 'Less than 0.5g sugar per serving — but can contain artificial sweeteners that spike blood sugar.', bulletColor: '#d83933' },
  { claim: 'Made with Whole Grains', example: 'e.g. cereals, crackers, bread', meaning: 'May contain very little whole grain. Check where whole grain appears in the ingredient list.', bulletColor: '#d83933' },
  { claim: 'Good Source of Fiber / High in Protein', example: 'FDA-regulated nutrient content claims', meaning: 'Actually regulated and meaningful. "Good source" = 10-19% DV. "High" = 20%+ DV.', bulletColor: '#007833' },
];

const HowToReadFoodLabels = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <TipsPageLayout title="How to Read Food Labels">
      <p style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#323a45', lineHeight: 1.6, margin: '0 0 0.75rem 0' }}>
        The Nutrition Facts panel holds a lot of power — once you know what to look for, every grocery trip becomes a health decision.
      </p>
      <p style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#323a45', lineHeight: 1.6, margin: '0 0 2rem 0' }}>
        Most people glance at calories and move on. But serving size, added sugars, and the ingredient list tell a far more important story — and understanding them takes less than a minute once you know the system.
      </p>

      {/* Stats Bar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: isMobile ? '1rem' : '2rem',
        backgroundColor: '#1b1b1b',
        color: 'white',
        padding: isMobile ? '1.5rem' : '2rem',
        borderRadius: 'var(--radius-md)',
        marginBottom: '2.5rem',
      }}>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', color: '#f0f4f8', marginBottom: '0.5rem' }}>200+</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            food decisions the average American makes every day — most of them on autopilot, without reading a single label.
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}>77%</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            of consumers check the Nutrition Facts panel, but most misinterpret serving size — making every other number meaningless.
          </div>
        </div>
        <div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-body)', marginBottom: '0.5rem' }}>3x</div>
          <div style={{ fontSize: '0.9375rem', opacity: 0.95, lineHeight: 1.4 }}>
            the daily recommended limit for added sugar consumed by the average American — mostly from foods that don&apos;t taste sweet.
          </div>
        </div>
      </div>

      {/* Read Any Label + Nutrition Facts sidebar */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 320px',
        gap: '2.5rem',
        marginBottom: '2.5rem',
        alignItems: 'start',
      }}>
        <div>
          <h2 style={{ fontSize: isMobile ? '1.5rem' : '1.75rem', fontFamily: 'var(--font-header)', fontWeight: 600, color: '#1b1b1b', margin: '0 0 0.75rem 0' }}>
            Read Any Label in 60 Seconds
          </h2>
          <p style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#323a45', lineHeight: 1.6, margin: '0 0 1rem 0' }}>
            Start with serving size — every number on the label is per serving. If you eat two servings, double everything. Calories are useful, but only in context: 400 calories of chips vs. 400 calories of nuts affect your body very differently.
          </p>
          <p style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#323a45', lineHeight: 1.6, margin: '0 0 1.25rem 0' }}>
            Scan the % Daily Value column: 5% or less is low, 20% or more is high. Aim high for fiber, vitamins, and potassium. Aim low for sodium, saturated fat, and added sugars.
          </p>
          <div style={{
            backgroundColor: '#f0f4f8',
            borderLeft: '4px solid #005ea2',
            padding: '1.25rem 1.5rem',
          }}>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: '#1b1b1b', marginBottom: '0.25rem' }}>
              The 5% / 20% Rule
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#323a45', lineHeight: 1.5, margin: 0 }}>
              For any nutrient: 5% Daily Value or less = low. 20% or more = high. Aim high on fiber, vitamins, potassium. Aim low on sodium, saturated fat, and added sugars. No math required.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 320 }}>
          {/* Header */}
          <div style={{ backgroundColor: '#1b1b1b', color: 'white', padding: '0.75rem 1rem' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.125rem' }}>Nutrition Facts</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', opacity: 0.9, marginTop: '0.25rem' }}>8 servings per container</div>
          </div>
          {/* START HERE - Serving Size */}
          <div style={{ backgroundColor: '#f9dede', borderLeft: '4px solid #d83933', padding: '0.75rem 1rem' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', fontWeight: 600, color: '#d83933', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>START HERE</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9375rem', color: '#1b1b1b' }}>Serving Size</span>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.9375rem', color: '#1b1b1b' }}>2/3 cup (55g)</span>
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: '#323a45', marginTop: '0.25rem' }}>All numbers below are per this</div>
          </div>
          {/* Calories */}
          <div style={{ backgroundColor: '#f0f4f8', padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#1b1b1b' }}>Calories</span>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.25rem', color: '#1b1b1b' }}>230</span>
          </div>
          {/* Fat */}
          <div style={{ backgroundColor: 'white', padding: '0.5rem 1rem', borderBottom: '1px solid #e0e0e0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#1b1b1b' }}>
              <span>Total Fat 8g</span>
              <span>10% DV</span>
            </div>
            <div style={{ paddingLeft: '1rem', fontSize: '0.8125rem', marginTop: '0.25rem', display: 'flex', justifyContent: 'space-between' }}>
              <span><span style={{ color: '#1b1b1b' }}>Saturated Fat </span><span style={{ color: '#d83933', fontWeight: 600 }}>1g</span></span>
              <span style={{ color: '#d83933', fontWeight: 600 }}>5% DV</span>
            </div>
            <div style={{ paddingLeft: '1rem', fontSize: '0.8125rem', marginTop: '0.125rem', color: '#1b1b1b' }}>Trans Fat 0g</div>
          </div>
          {/* WATCH THIS ONE - Sodium */}
          <div style={{ backgroundColor: '#f9dede', borderLeft: '4px solid #d83933', padding: '0.5rem 1rem' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', fontWeight: 600, color: '#d83933', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>WATCH THIS ONE</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: '#1b1b1b' }}>Sodium 160mg</span>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: '#d83933' }}>7% DV</span>
            </div>
          </div>
          {/* MOST IMPORTANT - Added Sugars */}
          <div style={{ backgroundColor: '#f9dede', borderLeft: '4px solid #d83933', padding: '0.5rem 1rem' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', fontWeight: 600, color: '#d83933', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>MOST IMPORTANT</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: '#1b1b1b' }}>Added Sugars 12g</span>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: '#d83933' }}>24% DV</span>
            </div>
          </div>
          {/* AIM HIGH - Dietary Fiber */}
          <div style={{ backgroundColor: '#f0f4f8', borderLeft: '4px solid #007833', padding: '0.5rem 1rem' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.6875rem', fontWeight: 600, color: '#007833', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>AIM HIGH</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.875rem', color: '#1b1b1b' }}>Dietary Fiber 4g</span>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: '#007833' }}>14% DV</span>
            </div>
          </div>
          {/* Ingredient List */}
          <div style={{ backgroundColor: '#1b1b1b', color: 'white', padding: '0.75rem 1rem' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.5rem' }}>INGREDIENT LIST — READ FIRST 3</div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', lineHeight: 1.5, opacity: 0.9 }}>
              Whole wheat flour, water, <span style={{ color: '#f9dede', fontWeight: 600 }}>sugar</span>, canola oil, <span style={{ color: '#f9dede', fontWeight: 600 }}>high fructose corn syrup</span>, salt, yeast...
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', opacity: 0.8, marginTop: '0.5rem' }}>
              Sugar appears twice under two names — a common tactic.
            </div>
          </div>
        </div>
      </div>

      {/* What the Label Says vs. What It Means */}
      <h2 style={{ fontSize: isMobile ? '1.5rem' : '1.75rem', fontFamily: 'var(--font-header)', fontWeight: 600, color: '#1b1b1b', margin: '0 0 0.5rem 0' }}>
        What the Label Says vs. What It Means
      </h2>
      <p style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', color: '#323a45', lineHeight: 1.6, margin: '0 0 1.5rem 0' }}>
        Food marketing language is designed to trigger purchase, not inform. The FDA regulates some terms strictly — others not at all. Here&apos;s the translation guide.
      </p>
      <div style={{ border: '1px solid #e0e0e0', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          backgroundColor: '#1b1b1b',
          color: 'white',
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
          padding: '0.75rem 1rem',
        }}>
          <div>THE CLAIM ON THE LABEL</div>
          <div>WHAT IT ACTUALLY MEANS</div>
        </div>
        {labelClaims.map((row, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: '1rem',
              padding: '1rem',
              alignItems: 'start',
              backgroundColor: i % 2 === 0 ? '#f0f4f8' : 'white',
            }}
          >
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
              <div style={{ width: 8, height: 8, minWidth: 8, borderRadius: '50%', backgroundColor: row.bulletColor, marginTop: '0.35rem' }} />
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: '#1b1b1b' }}>&quot;{row.claim}&quot;</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#323a45', marginTop: '0.25rem' }}>{row.example}</div>
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#323a45', lineHeight: 1.5 }}>
              {row.bulletColor === '#007833' ? (
                <>
                  Actually regulated and meaningful. <span style={{ color: '#007833', fontWeight: 600 }}>&quot;Good source&quot;</span> = 10–19% DV. <span style={{ color: '#007833', fontWeight: 600 }}>&quot;High&quot;</span> or <span style={{ color: '#007833', fontWeight: 600 }}>&quot;Excellent source&quot;</span> = 20%+ DV.
                </>
              ) : (
                row.meaning
              )}
            </div>
          </div>
        ))}
      </div>
    </TipsPageLayout>
  );
};

export default HowToReadFoodLabels;
