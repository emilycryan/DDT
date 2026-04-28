import React, { useState, useEffect } from 'react';
import ResourcePageLayout from './ResourcePageLayout';
import { COPD_PREVENTION_PAGES } from './copdPreventionPages';

const GOOD = '#007833';
const BAD = '#f9dede';
const ALERT = '#d83933';
const BLUE = '#005ea2';
const DARK = '#1b1b1b';
const TEXT = '#323a45';
const BAND = '#f0f4f8';

const pages = {
  'Understanding COPD': {
    lead: 'More than 16 million Americans live with COPD — and many cases are preventable.',
    intro: 'Chronic Obstructive Pulmonary Disease (COPD) is a progressive lung disease that makes breathing harder over time. The good news: understanding how COPD develops gives you the power to protect your lungs and slow or prevent its progression.',
    stats: [
      { stat: '16M', color: '#ffffff', text: 'Americans currently live with COPD — many more remain undiagnosed' },
      { stat: '3rd', color: '#ffffff', text: 'leading cause of death by chronic disease in the United States' },
      { stat: '85%', color: BAD, text: 'of COPD cases are linked to preventable causes — primarily smoking' },
    ],
    mainTitle: 'What Is COPD?',
    paragraphs: [
      'COPD is an umbrella term for chronic lung diseases — most commonly emphysema and chronic bronchitis — that block airflow and make breathing difficult. It develops slowly, often over decades, and damage to the airways is largely irreversible.',
      "COPD doesn't appear overnight. By the time symptoms become noticeable, significant lung damage has often already occurred. That's why prevention and early action matter — every breath you protect today preserves capacity for tomorrow.",
    ],
    callout: 'Early signs are easy to dismiss — a lingering cough, shortness of breath climbing stairs, or wheezing during exercise. Talk to your doctor if symptoms last more than a few weeks.',
    asideTitle: 'Common Forms of COPD',
    asideCards: [
      { title: 'Emphysema', body: "Damage to the air sacs (alveoli) reduces the lungs' ability to transfer oxygen into the bloodstream." },
      { title: 'Chronic Bronchitis', body: 'Long-term inflammation of airway linings produces excess mucus and persistent cough.' },
      { title: 'Refractory Asthma', body: 'Severe, non-reversible asthma that no longer responds to standard medications, often overlapping with COPD.' },
    ],
    bottomTitle: 'Recognize the Warning Signs',
    bottomIntro: 'COPD develops slowly. The earlier you act on these symptoms, the more lung function you can preserve.',
    cards: [
      { title: 'Persistent Cough', body: 'A cough that lingers for weeks or months — often called a "smoker\'s cough" — that may bring up mucus.' },
      { title: 'Shortness of Breath', body: 'Feeling winded during everyday activities like walking, climbing stairs, or carrying groceries.' },
      { title: 'Wheezing', body: 'A whistling or squeaking sound when breathing, especially during exhalation or activity.' },
      { title: 'Chest Tightness', body: 'A feeling of pressure or constriction in the chest, especially after activity or during cold weather.' },
      { title: 'Frequent Infections', body: 'Recurring colds, flu, or respiratory infections that take longer than usual to clear up.' },
    ],
  },
  'Risk Factors & Lung Health': {
    lead: 'Knowing your risk is the first step toward protecting your lungs.',
    intro: "Some COPD risk factors are within your control — others aren't. Understanding both helps you focus your prevention efforts where they'll have the greatest impact and have an honest conversation with your doctor.",
    stats: [
      { stat: '75%', color: BAD, text: 'of COPD diagnoses are linked to current or former tobacco use' },
      { stat: '1 in 4', color: '#ffffff', text: 'people with COPD never smoked — environmental and genetic factors matter too' },
      { stat: '40+', color: BAD, text: 'most COPD diagnoses occur after age 40 — risk grows steadily with exposure' },
    ],
    mainTitle: 'How Healthy Lungs Work',
    paragraphs: [
      'Your lungs contain about 480 million tiny air sacs called alveoli. Each one is wrapped in capillaries that exchange oxygen for carbon dioxide every time you breathe — roughly 20,000 times a day.',
      'When lungs are healthy, the airways are open and elastic. With COPD, those airways become inflamed, narrowed, and lined with mucus — and the alveoli lose their stretch. Less air gets in. Less oxygen reaches the blood. Daily activities take more effort.',
    ],
    callout: 'Lung function peaks in your mid-20s, then naturally declines about 1% per year. Smoking and air pollution can triple that decline — but quitting at any age slows the loss.',
    asideTitle: 'Lung Function Over Time',
    asideCards: [
      { title: 'Healthy Adult', dot: GOOD, rows: [{ label: 'Annual decline', value: '~1% per year' }, { label: 'FEV1', value: '>= 80% predicted' }] },
      { title: 'Active Smoker', dot: ALERT, rows: [{ label: 'Annual decline', value: '2-3x faster' }, { label: 'FEV1', value: '50-79% predicted' }] },
      { title: 'Advanced COPD', dot: ALERT, rows: [{ label: 'Annual decline', value: 'Variable' }, { label: 'FEV1', value: '< 50% predicted' }] },
    ],
    bottomTitle: 'What Increases Your Risk?',
    bottomIntro: 'COPD is rarely caused by a single factor. Most cases reflect years of cumulative exposure combined with personal vulnerability.',
    cards: [
      { title: 'Tobacco Smoke', body: 'Cigarettes, cigars, pipes — and long-term secondhand smoke exposure — are the leading risk factor.' },
      { title: 'Workplace Exposure', body: 'Dust, chemical fumes, vapors, and silica common in mining, construction, agriculture, and manufacturing.' },
      { title: 'Air Pollution', body: 'Outdoor pollution, indoor smoke from biomass fuel, and wildfire smoke all contribute to lung damage.' },
      { title: 'Age & Genetics', body: 'Risk rises after 40. Alpha-1 antitrypsin deficiency — a genetic disorder — accounts for a small share of cases.' },
      { title: 'Childhood Asthma', body: 'A history of asthma — especially uncontrolled or severe — raises long-term risk of developing COPD.' },
      { title: 'Respiratory Infections', body: 'Frequent or severe lung infections in childhood can permanently affect lung development and function.', wide: true },
    ],
  },
  'Smoking, Air Quality & Triggers': {
    lead: 'Most COPD damage is caused by what we breathe in — and most of that is preventable.',
    intro: "From cigarette smoke to wildfire haze to workplace dust, the air around us shapes lung health more than any other factor. Knowing what to avoid — and how to protect yourself when you can't — is the foundation of COPD prevention.",
    stats: [
      { stat: '7,000+', color: BAD, text: 'chemicals in cigarette smoke — at least 70 known to cause cancer or lung damage' },
      { stat: '10x', color: BAD, text: 'higher COPD risk in long-term smokers compared to people who have never smoked' },
      { stat: '20 min', color: GOOD, text: 'after your last cigarette, heart rate and blood pressure begin returning to normal' },
    ],
    mainTitle: 'Quitting Is the Single Most Powerful Step',
    paragraphs: [
      'No medication, exercise routine, or treatment plan does more for your lungs than quitting tobacco. Within hours, your body begins repairing itself — and within years, your COPD risk drops significantly.',
      'Most successful quitters use a combination of methods: behavioral support, nicotine replacement therapy, and prescription medications. Talk to your doctor — combining strategies can double or triple your chance of quitting for good.',
    ],
    callout: 'It often takes multiple attempts — most people try 6 to 30 times before quitting successfully. Each attempt teaches you something. Every relapse is a step forward, not a failure.',
    asideTitle: 'Your Body After Quitting',
    asideCards: [
      { title: 'After 48 hours', dot: GOOD, body: 'Sense of taste and smell start improving as nerve endings heal.' },
      { title: 'Within 3 months', dot: GOOD, body: 'Lung function increases up to 30%. Walking and exercise feel easier.' },
      { title: 'Within 1 year', dot: GOOD, body: 'Risk of coronary heart disease cuts in half. Coughing and shortness of breath decrease.' },
      { title: 'After 10 years', dot: GOOD, body: 'Lung cancer death rate falls to about half that of a continuing smoker.' },
    ],
    bottomTitle: 'Air Quality & Everyday Triggers',
    bottomIntro: 'Even non-smokers can damage their lungs by breathing in irritants over time. These exposures are everywhere — but most are manageable with awareness and small adjustments.',
    cards: [
      { title: 'Secondhand Smoke', body: 'Make your home and car smoke-free. Even brief exposure can trigger inflammation in sensitive lungs.' },
      { title: 'Wildfire Smoke', body: 'Track AQI on smoky days. Stay indoors with windows closed and run a HEPA filter when AQI exceeds 100.' },
      { title: 'Workplace Dust', body: 'Use the right respirator for your industry — N95 minimum for dust, P100 for chemical vapors. Replace filters regularly.' },
      { title: 'Household Chemicals', body: 'Ventilate when cleaning. Avoid mixing bleach with ammonia. Choose fragrance-free, low-VOC products when possible.' },
      { title: 'Mold & Allergens', body: 'Fix leaks within 48 hours. Keep humidity below 50% and clean visible mold promptly to prevent lung irritation.' },
      { title: 'Radon & Indoor Air', body: "Test your home for radon — a colorless gas that's the second-leading cause of lung cancer in the U.S.", wide: true },
    ],
  },
  'Breathing, Activity & Daily Management': {
    lead: 'Lungs respond to use. The right movement and breathing habits build resilience for life.',
    intro: "Whether you're protecting healthy lungs or living with COPD, daily habits matter. Breathing techniques, regular movement, and small adjustments to your routine all reinforce respiratory strength and reduce flare-ups.",
    stats: [
      { stat: '150 min', color: '#ffffff', text: 'of moderate weekly activity recommended for adult lung and heart health' },
      { stat: '30%', color: GOOD, text: 'improvement in exercise capacity reported by COPD patients in pulmonary rehab' },
      { stat: '2 in 3', color: '#ffffff', text: 'flare-ups are preventable with vaccines, action plans, and consistent monitoring' },
    ],
    mainTitle: 'Breathe Smarter, Not Harder',
    paragraphs: [
      'Most adults breathe shallowly using only the upper chest. Two simple techniques — pursed-lip and diaphragmatic breathing — train your lungs to move more air with less effort. Practiced daily, they help calm shortness of breath and improve oxygen delivery during activity.',
      "Pulmonary rehabilitation programs combine breathing techniques with supervised exercise and education. They're proven to reduce hospitalizations and significantly improve quality of life — and they're covered by Medicare and most insurance plans.",
    ],
    callout: "Practice when you're calm, not just when you're short of breath. Building the habit during everyday moments makes it second nature when you really need it.",
    asideTitle: 'Two Techniques to Practice',
    asideCards: [
      { title: 'Pursed-Lip Breathing', meta: '5 min', body: "Inhale slowly through the nose for 2 counts. Pucker your lips like you're cooling soup, then exhale gently for 4 counts.", note: 'Best when feeling winded or anxious.' },
      { title: 'Diaphragmatic Breathing', meta: '5-10 min', body: 'Lie down with one hand on your chest, one on your belly. Breathe so only the belly hand rises. Strengthens the diaphragm.', note: 'Practice 1-2 times daily.' },
    ],
    featureCallout: {
      title: 'Pulmonary Rehab',
      body: 'A structured program of supervised exercise, breathing training, and education led by respiratory therapists.',
      note: 'Ask your doctor for a referral. Programs typically run 6-12 weeks.',
    },
    bottomTitle: 'Daily Habits That Protect Your Lungs',
    bottomIntro: 'Small, consistent choices add up. These evidence-based habits keep airways clear, reduce flare-up risk, and help you stay active.',
    cards: [
      { title: 'Move Most Days', body: 'Aim for 30 minutes of brisk walking, swimming, or cycling. Build slowly — even 5-10 minutes is a meaningful start.' },
      { title: 'Stay Up to Date on Vaccines', body: 'Annual flu shot, COVID-19 boosters, and pneumococcal vaccines prevent the infections most likely to trigger a flare-up.' },
      { title: 'Eat for Energy', body: 'Smaller, more frequent meals reduce pressure on the diaphragm. Lean protein supports muscle strength used in breathing.' },
      { title: 'Hydrate & Clear Airways', body: 'Aim for 6-8 cups of water a day. Hydration thins mucus, making it easier for the lungs to clear naturally.' },
      { title: 'Track Symptoms Daily', body: 'Note breath, cough, mucus, and energy. A simple pattern helps you and your doctor catch flare-ups early.' },
      { title: 'Have an Action Plan', body: 'Work with your provider on a written plan that defines what to do at the first sign of worsening symptoms.', wide: true },
    ],
  },
};

const COPDPreventionPlaceholder = ({ title }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const page = pages[title];
  const textStyle = { fontFamily: 'var(--font-body)', fontSize: '1rem', color: TEXT, lineHeight: 1.6 };
  const h2Style = { fontFamily: 'var(--font-header)', fontSize: isMobile ? '1.5rem' : '1.75rem', fontWeight: 700, color: DARK, margin: '0 0 1rem' };

  return (
    <ResourcePageLayout categoryLabel="COPD Prevention" categoryPath="/learn/copd-prevention/understanding-copd" pageSequence={COPD_PREVENTION_PAGES} title={title}>
      <p style={{ ...textStyle, fontWeight: 700, margin: '0 0 0.75rem' }}>{page.lead}</p>
      <p style={{ ...textStyle, maxWidth: 760, margin: '0 0 2rem' }}>{page.intro}</p>
      <StatsBand stats={page.stats} isMobile={isMobile} />
      <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 360px', gap: '2rem', marginTop: '2.5rem', alignItems: 'start' }}>
        <div>
          <h2 style={h2Style}>{page.mainTitle}</h2>
          {page.paragraphs.map((paragraph) => <p key={paragraph} style={{ ...textStyle, margin: '0 0 1rem' }}>{paragraph}</p>)}
          <div style={{ backgroundColor: '#f9dede', borderLeft: `4px solid ${ALERT}`, borderRadius: '0 0.25rem 0.25rem 0', padding: '1rem 1.25rem', marginTop: '1.25rem' }}>
            <p style={{ ...textStyle, fontSize: '0.9375rem', margin: 0 }}>{page.callout}</p>
          </div>
          {page.featureCallout && (
            <div style={{ backgroundColor: '#e7f2f5', borderLeft: `4px solid ${BLUE}`, borderRadius: '0 0.25rem 0.25rem 0', padding: '1rem 1.25rem', marginTop: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 700, color: DARK, marginBottom: '0.35rem' }}>{page.featureCallout.title}</div>
              <p style={{ ...textStyle, fontSize: '0.9375rem', margin: '0 0 0.35rem' }}>{page.featureCallout.body}</p>
              <p style={{ ...textStyle, fontSize: '0.875rem', fontStyle: 'italic', margin: 0 }}>{page.featureCallout.note}</p>
            </div>
          )}
        </div>
        <AsideCards title={page.asideTitle} cards={page.asideCards} />
      </section>
      <section style={{ backgroundColor: BAND, borderRadius: '0.25rem', padding: isMobile ? '1.5rem' : '2rem', marginTop: '2.5rem' }}>
        <h2 style={h2Style}>{page.bottomTitle}</h2>
        <p style={{ ...textStyle, maxWidth: 760, margin: '0 0 1.5rem' }}>{page.bottomIntro}</p>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)', gap: '1rem' }}>
          {page.cards.map((card) => (
            <article key={card.title} style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderTop: `3px solid ${ALERT}`, borderRadius: '0.25rem', padding: '1.25rem', gridColumn: !isMobile && card.wide ? '1 / -1' : 'auto' }}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 700, color: DARK, margin: '0 0 0.5rem' }}>{card.title}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: TEXT, lineHeight: 1.5, margin: 0 }}>{card.body}</p>
            </article>
          ))}
        </div>
      </section>
    </ResourcePageLayout>
  );
};

function StatsBand({ stats, isMobile }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '1.5rem', backgroundColor: DARK, color: '#ffffff', padding: isMobile ? '1.5rem' : '2rem', borderRadius: '0.25rem', marginBottom: '2.5rem' }}>
      {stats.map((item, index) => (
        <div key={item.stat} style={{ borderLeft: !isMobile && index > 0 ? '1px solid rgba(255,255,255,0.2)' : 'none', paddingLeft: !isMobile && index > 0 ? '1.5rem' : 0 }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '2.25rem', fontWeight: 700, color: item.color, lineHeight: 1, marginBottom: '0.75rem' }}>{item.stat}</div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.45, margin: 0 }}>{item.text}</p>
        </div>
      ))}
    </div>
  );
}

function AsideCards({ title, cards }) {
  return (
    <aside>
      <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: TEXT, margin: '0 0 0.75rem', textTransform: 'uppercase' }}>{title}</h3>
      <div style={{ display: 'grid', gap: '0.875rem' }}>
        {cards.map((card) => (
          <article key={card.title} style={{ backgroundColor: '#ffffff', border: card.alert ? `2px solid ${ALERT}` : '1px solid #e0e0e0', borderRadius: '0.25rem', padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 700, color: card.alert ? ALERT : DARK, margin: 0 }}>{card.title}</h4>
              {card.dot && <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: card.dot, flexShrink: 0, marginTop: 4 }} />}
              {card.meta && <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: TEXT, whiteSpace: 'nowrap' }}>{card.meta}</span>}
            </div>
            {card.rows ? (
              <div style={{ display: 'grid', gap: '0.35rem' }}>
                {card.rows.map((row) => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: TEXT }}>
                    <span>{row.label}</span>
                    <strong style={{ color: DARK, textAlign: 'right' }}>{row.value}</strong>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: TEXT, lineHeight: 1.5, margin: 0 }}>{card.body}</p>
            )}
            {card.note && <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: TEXT, fontStyle: 'italic', lineHeight: 1.5, margin: '0.75rem 0 0' }}>{card.note}</p>}
          </article>
        ))}
      </div>
    </aside>
  );
}

export default COPDPreventionPlaceholder;
