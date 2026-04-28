import React, { useState, useEffect } from 'react';
import ResourcePageLayout from './ResourcePageLayout';
import { STROKE_PREVENTION_PAGES } from './strokePreventionPages';

const GOOD = '#007833';
const BAD = '#f9dede';
const ALERT = '#d83933';
const BLUE = '#005ea2';
const DARK = '#1b1b1b';
const TEXT = '#323a45';
const BAND = '#f0f4f8';

const fastCards = [
  { letter: 'F', title: 'FACE DROOPING', body: 'Ask the person to smile. Does one side of the face droop, or feel numb? An uneven smile is one of the clearest early signs.', color: GOOD },
  { letter: 'A', title: 'ARM WEAKNESS', body: 'Ask the person to raise both arms. Does one drift downward, or feel weak or numb? Sudden one-sided weakness is a red flag.', color: GOOD },
  { letter: 'S', title: 'SPEECH DIFFICULTY', body: 'Ask the person to repeat a simple sentence. Is their speech slurred, garbled, or hard to understand? Even brief confusion counts.', color: GOOD },
  { letter: 'T', title: 'TIME TO CALL 911', body: 'If you see any one sign, call 911 immediately and note the time symptoms started. Do not wait, and do not drive yourself.', color: ALERT },
];

const otherSigns = [
  { title: 'Sudden vision changes', body: 'Blurred or double vision, or losing sight in one or both eyes — even if it clears up.' },
  { title: 'Severe headache', body: 'A sudden, intense headache with no known cause — often described as the worst headache of your life.' },
  { title: 'Loss of balance', body: 'Sudden dizziness, trouble walking, or coordination loss — especially with any other FAST sign.' },
  { title: 'Confusion or numbness', body: 'Sudden trouble understanding others, or numbness on one side of the body or face.' },
];

const checklistItems = [
  'Call 911 immediately — do not call your doctor first.',
  'Note when symptoms started, or when the person was last known to be normal.',
  "Don't give food, water, or medication — including aspirin.",
  'Stay with the person and keep them comfortable until help arrives.',
];

const riskImpact = [
  { label: 'Smoking', value: '2x risk' },
  { label: 'Diabetes', value: '2x risk' },
  { label: 'Sleep apnea', value: '2x risk' },
  { label: 'Heart disease', value: '2-4x risk' },
  { label: 'Atrial fibrillation', value: '5x risk' },
  { label: 'Physical inactivity', value: '1.5x risk' },
  { label: 'High blood pressure', value: '4x risk', alert: true },
];

const bpCategories = [
  { label: 'Normal', value: 'Below 120 / 80', color: GOOD },
  { label: 'Elevated', value: '120-129 / under 80', color: '#b7791f' },
  { label: 'Stage 1 hypertension', value: '130-139 / 80-89', color: '#d97706' },
  { label: 'Stage 2 hypertension', value: '140+ / 90+', color: ALERT },
  { label: 'Home reading', value: 'Same time, twice daily', color: DARK },
  { label: 'Stroke prevention goal', value: 'Under 130 / 80', color: DARK },
  { label: 'Hypertensive crisis', value: '180+ / 120+ - call 911', color: ALERT, alert: true },
];

const content = {
  'Stroke Risk Factors & Prevention': {
    h1: 'Stroke Risk Factors & Prevention',
    lead: 'Up to 80% of strokes are preventable. Knowing your risks — and which ones you can change — is the most effective place to start.',
    intro: 'Some risk factors for stroke are out of your hands: age, family history, the body you were born into. But the majority of stroke risk comes from factors you can influence — high blood pressure, blood sugar, weight, smoking, sleep, and stress. Small, sustained changes add up fast.',
    stats: [
      { stat: '80%', color: GOOD, text: 'of strokes are preventable through lifestyle and managing known conditions' },
      { stat: '10 mmHg', color: '#ffffff', text: 'drop in systolic blood pressure cuts stroke risk by roughly one third' },
      { stat: '1 in 4', color: BAD, text: "stroke survivors will have a second stroke if risks aren't addressed" },
    ],
    mainTitle: 'How Strokes Happen',
    paragraphs: [
      'There are two main kinds of stroke. Ischemic strokes — about 87% of cases — happen when a clot blocks blood flow to part of the brain. Hemorrhagic strokes happen when a vessel in the brain bleeds, often because long-term high blood pressure has weakened the wall.',
      'Both types share root causes you can act on: blood pressure, blood sugar, cholesterol, smoking, weight, alcohol use, and physical activity. Even one of these well-managed lowers stroke risk meaningfully.',
    ],
    calloutTitle: 'Why prevention works',
    callout: 'Lowering systolic blood pressure by just 10 mmHg cuts stroke risk by roughly a third. No medication is needed for most people — weight, salt, and movement do most of the work.',
    asideTitle: 'Top Risk Factor Impact',
    asideRows: riskImpact,
    bottomTitle: 'What You Can Do vs What to Watch For',
    panels: [
      {
        title: 'Daily Prevention',
        color: GOOD,
        items: [
          { title: 'Manage blood pressure', body: 'Aim for under 120/80. A 10-point drop in systolic BP cuts stroke risk by roughly a third — the single biggest lever you have.' },
          { title: 'Move 30 minutes daily', body: 'Brisk walking, biking, or swimming — even split into 10-minute chunks. Reduces stroke risk by about 25%.' },
          { title: 'Eat plants first', body: 'Vegetables, fruits, whole grains, legumes, nuts. A Mediterranean-style pattern is consistently linked to lower stroke risk.' },
          { title: "Don't smoke or vape", body: 'Quitting at any age sharply lowers stroke risk — within five years, risk falls close to that of a non-smoker.' },
          { title: 'Sleep 7-9 hours', body: 'Treat sleep apnea if you have it. Chronic poor sleep raises blood pressure, blood sugar, and clotting risk.' },
        ],
      },
      {
        title: 'Watch for These Risks',
        color: ALERT,
        items: [
          { title: 'Uncontrolled hypertension', body: "The number one cause of stroke. Most people with high BP don't feel it — measure regularly, treat consistently." },
          { title: 'Smoking & vaping', body: 'Damages blood vessels, raises blood pressure, and makes blood more likely to clot. Vaping shows similar early effects.' },
          { title: 'Untreated diabetes', body: 'High blood sugar damages the small vessels in the brain. Strokes happen earlier and recover slower in people with uncontrolled diabetes.' },
          { title: 'Atrial fibrillation', body: 'An irregular heartbeat that lets clots form in the heart and travel to the brain. Up to 5x higher stroke risk — ask about screening.' },
          { title: 'Heavy alcohol use', body: 'Raises blood pressure and triglycerides. Limit to 1 drink/day for women, 2 for men at most — less is better.' },
        ],
      },
    ],
  },
  'Blood Pressure & Brain Health': {
    h1: 'Blood Pressure & Brain Health',
    lead: 'High blood pressure is the leading cause of stroke. It often shows no symptoms — but quietly damages the small vessels that keep your brain working.',
    intro: 'Most people who have a stroke had elevated blood pressure for years before. The good news: blood pressure is also one of the most measurable, treatable, and modifiable risk factors. A 10-point drop in systolic BP can cut stroke risk by a third.',
    stats: [
      { stat: '1 in 3', color: '#ffffff', text: "U.S. adults have high blood pressure — nearly half don't have it under control" },
      { stat: '35%', color: GOOD, text: 'drop in stroke risk when systolic BP is lowered from 140 to 130 mmHg' },
      { stat: 'Silent', color: BAD, text: 'Most people with high BP feel completely normal — only measurement reveals it' },
    ],
    mainTitle: 'How High BP Damages the Brain',
    paragraphs: [
      "Blood pressure is the force your blood puts on artery walls. When it's chronically too high, it scars and stiffens those walls — including the tiny vessels deep in the brain. Over time, those vessels narrow, leak, or burst.",
      'This damage often happens silently. Many people accumulate small "silent strokes" they never feel — each one chipping away at memory, balance, and thinking. By the time a major stroke happens, the groundwork has often been laid for decades.',
    ],
    calloutTitle: 'Silent strokes are real',
    callout: 'About 1 in 4 adults over 80 has had a silent stroke they never knew about. Controlling BP earlier in life is the most powerful way to prevent the cumulative damage that leads to stroke and vascular dementia.',
    asideTitle: 'Blood Pressure Categories',
    asideRows: bpCategories,
    bottomTitle: 'Lowering Your Numbers',
    panels: [
      {
        title: 'Lifestyle First',
        color: GOOD,
        items: [
          { title: 'Move 30 minutes daily', body: 'Walking, biking, swimming — lowers systolic BP by about 5-8 mmHg on its own.' },
          { title: 'DASH-style eating', body: 'Plant-forward, low-salt eating pattern. Most people see results within two weeks.' },
          { title: 'Cut sodium hard', body: 'Aim for under 1,500 mg/day. Most sodium hides in restaurant meals, bread, and packaged foods — not the salt shaker.' },
          { title: 'Limit alcohol', body: 'Under 1 drink/day for women, 2 for men. Heavy drinking raises BP and stroke risk independently.' },
          { title: 'Lose 5-10 pounds', body: "If you're overweight, each pound lost trims systolic BP by about 1 point. The first ten pounds matter most." },
        ],
      },
      {
        title: 'When You Need Medication',
        color: ALERT,
        items: [
          { title: 'ACE inhibitors', body: 'Drugs ending in "-pril" (lisinopril, enalapril). Relax vessels and protect kidney function. First-line for many people.' },
          { title: 'ARBs', body: 'Drugs ending in "-sartan" (losartan, valsartan). Similar effect to ACE inhibitors with fewer side effects — no cough.' },
          { title: 'Diuretics', body: 'Help kidneys remove excess sodium and water. Inexpensive, well-studied — often part of combination therapy.' },
          { title: 'Calcium channel blockers', body: 'Drugs like amlodipine. Relax artery walls. Especially helpful for older adults and people of African descent.' },
          { title: 'Combination therapy', body: "Most people need two or more drugs to reach goal. This is normal — not a sign you're failing at lifestyle changes." },
        ],
      },
    ],
  },
  'Recovery & Reducing Future Risk': {
    h1: 'Recovery & Reducing Future Risk',
    lead: 'Surviving a stroke is the beginning. The first months shape long-term recovery — and the right plan can prevent a second stroke.',
    intro: "About 1 in 4 stroke survivors will have another stroke if their risk factors aren't addressed. Recovery and prevention go hand in hand: rehab rebuilds what the brain lost, while medication, lifestyle, and follow-up care guard against what comes next.",
    stats: [
      { stat: '2 of 3', color: GOOD, text: 'stroke survivors regain meaningful independence with consistent rehab' },
      { stat: '90 days', color: '#ffffff', text: "window where the brain's neuroplasticity gains are steepest — act early" },
      { stat: '1 in 4', color: BAD, text: 'survivors will have a second stroke without secondary prevention' },
    ],
    mainTitle: 'Recovery Has Phases',
    paragraphs: [
      "Stroke recovery isn't linear. Some abilities return within days; others take months or years. The brain rewires itself around damaged areas through a process called neuroplasticity — and it responds to consistent, repeated effort.",
      'The biggest gains come in the first three to six months, but meaningful recovery continues for years. The plan should match the phase: aggressive rehab early, smart maintenance later.',
    ],
    calloutTitle: 'The early window matters most',
    callout: "Most stroke survivors should begin rehab within 24-48 hours of becoming stable. The first 90 days drive the steepest gains — don't delay therapy waiting to feel ready.",
    bottomTitle: 'Rehab Pillars & Reducing Future Risk',
    panels: [
      {
        title: 'Rehab Pillars',
        color: GOOD,
        items: [
          { title: 'Physical therapy', body: 'Rebuilds strength, balance, and walking. Most survivors start with PT in the hospital and continue at home or outpatient.' },
          { title: 'Occupational therapy', body: 'Restores daily-living skills — dressing, cooking, bathing, returning to work. Adapts the home if needed.' },
          { title: 'Speech & language therapy', body: 'For aphasia, swallowing problems, and slurred speech. Early speech therapy improves long-term communication.' },
          { title: 'Cognitive rehabilitation', body: 'Helps with memory, attention, planning, and problem-solving. Often overlooked but essential for return to work and independence.' },
          { title: 'Mental health support', body: "Depression affects about 1 in 3 stroke survivors and slows recovery. Counseling and medication help — don't tough it out." },
        ],
      },
      {
        title: 'Reducing Future Risk',
        color: ALERT,
        items: [
          { title: 'Take prescribed meds daily', body: 'Blood thinners, BP meds, and statins are protective only when taken consistently. Set reminders, use a pill organizer.' },
          { title: 'Treat atrial fibrillation', body: "AFib is a frequent hidden cause of stroke. Wearable monitors can detect it — ask about screening if it hasn't been checked." },
          { title: 'Quit smoking immediately', body: 'Smokers face roughly twice the risk of a recurrent stroke. Quitting at any age sharply lowers that risk within months.' },
          { title: 'Manage diabetes & weight', body: 'Both raise the risk of a second stroke. Aim for an A1C under 7% and steady, gradual weight loss if needed.' },
          { title: 'Keep moving long-term', body: 'Daily activity — even short walks — protects gains made in rehab and lowers recurrence. Maintenance matters.' },
        ],
      },
    ],
  },
};

const StrokePreventionPlaceholder = ({ title }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const page = content[title];
  const textStyle = { fontFamily: 'var(--font-body)', fontSize: '1rem', color: TEXT, lineHeight: 1.6 };
  const h2Style = { fontFamily: 'var(--font-header)', fontSize: isMobile ? '1.5rem' : '1.75rem', fontWeight: 700, color: DARK, margin: '0 0 1rem' };

  if (title === 'Recognizing Stroke Symptoms (FAST)') {
    return (
      <ResourcePageLayout categoryLabel="Stroke Prevention" categoryPath="/learn/stroke-prevention/recognizing-stroke-symptoms-fast" pageSequence={STROKE_PREVENTION_PAGES} title="Recognizing Stroke Symptoms (FAST)">
        <p style={{ ...textStyle, fontWeight: 700, margin: '0 0 0.75rem' }}>Stroke is a brain attack. Every minute without treatment costs 1.9 million brain cells — recognize it fast and call 911.</p>
        <p style={{ ...textStyle, maxWidth: 720, margin: '0 0 2rem' }}>Most people survive a first stroke, but the difference between full recovery and lifelong disability often comes down to how quickly someone recognized the signs and got to the hospital. Learn the F.A.S.T. test — it takes ten seconds to remember and could save a life.</p>
        <StatsBand isMobile={isMobile} stats={[
          { stat: '1.9M', color: BAD, text: 'brain cells lost every minute a stroke goes untreated — time is brain' },
          { stat: '80%', color: GOOD, text: 'of strokes are preventable — recognizing risk and acting on early signs is the first defense' },
          { stat: '3 hrs', color: '#ffffff', text: 'treatment window for the most effective clot-busting drugs — sooner is better' },
        ]} />
        <section style={{ marginTop: '2.5rem' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: GOOD, textTransform: 'uppercase', marginBottom: '0.5rem' }}>The F.A.S.T. Test</div>
          <h2 style={h2Style}>Four signs. Ten seconds. One call.</h2>
          <p style={{ ...textStyle, maxWidth: 760, margin: '0 0 1.5rem' }}>F.A.S.T. is the most widely used way to recognize a stroke. If you see any one of these signs — even briefly — treat it as an emergency.</p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '1rem' }}>
            {fastCards.map((card) => (
              <article key={card.letter} style={{ backgroundColor: card.color, borderRadius: '0.25rem', padding: '1.5rem', color: '#ffffff', minHeight: 260 }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '3.5rem', fontWeight: 700, lineHeight: 1, marginBottom: '1rem' }}>{card.letter}</div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 700, color: '#ffffff', margin: '0 0 0.75rem', textTransform: 'uppercase' }}>{card.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'rgba(255,255,255,0.92)', lineHeight: 1.55, margin: 0 }}>{card.body}</p>
              </article>
            ))}
          </div>
        </section>
        <section style={{ backgroundColor: BAND, borderRadius: '0.25rem', padding: isMobile ? '1.5rem' : '2rem', marginTop: '2.5rem' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: GOOD, textTransform: 'uppercase', marginBottom: '0.5rem' }}>Beyond F.A.S.T.</div>
          <h2 style={h2Style}>Other sudden signs of stroke</h2>
          <p style={{ ...textStyle, maxWidth: 760, margin: '0 0 1.5rem' }}>Strokes don&apos;t always start with the four classic signs. The word that matters most is sudden — symptoms appear out of nowhere, often in seconds.</p>
          <CardGrid isMobile={isMobile} cards={otherSigns} color={GOOD} />
        </section>
        <section style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 360px', gap: '2rem', marginTop: '2.5rem', alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: ALERT, textTransform: 'uppercase', marginBottom: '0.5rem' }}>If you suspect a stroke</div>
            <h2 style={h2Style}>Call 911. Don&apos;t drive.</h2>
            <p style={{ ...textStyle, margin: '0 0 1rem' }}>Paramedics can begin treatment in the ambulance, alert the hospital, and route to a certified stroke center. Driving someone yourself loses critical minutes — and risks a second emergency on the road.</p>
            <p style={{ ...textStyle, margin: 0 }}>Note the time the symptoms started, even approximately. The treatment options available to doctors depend heavily on this number.</p>
          </div>
          <aside style={{ backgroundColor: '#f9dede', borderLeft: `4px solid ${ALERT}`, borderRadius: '0.25rem', padding: '1.5rem' }}>
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: ALERT, margin: '0 0 1rem', textTransform: 'uppercase' }}>Emergency Checklist</h3>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
              {checklistItems.map((item, index) => (
                <li key={item} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: '0.75rem', alignItems: 'start' }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: ALERT, color: '#ffffff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>{index + 1}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: DARK, lineHeight: 1.45 }}>{item}</span>
                </li>
              ))}
            </ol>
          </aside>
        </section>
      </ResourcePageLayout>
    );
  }

  return (
    <ResourcePageLayout categoryLabel="Stroke Prevention" categoryPath="/learn/stroke-prevention/recognizing-stroke-symptoms-fast" pageSequence={STROKE_PREVENTION_PAGES} title={title}>
      <p style={{ ...textStyle, fontWeight: 700, margin: '0 0 0.75rem' }}>{page.lead}</p>
      <p style={{ ...textStyle, maxWidth: 760, margin: '0 0 2rem' }}>{page.intro}</p>
      <StatsBand isMobile={isMobile} stats={page.stats} />
      <section style={{ display: 'grid', gridTemplateColumns: isMobile || !page.asideRows ? '1fr' : '1fr 360px', gap: '2rem', marginTop: '2.5rem', alignItems: 'start' }}>
        <div>
          <h2 style={h2Style}>{page.mainTitle}</h2>
          {page.paragraphs.map((paragraph) => <p key={paragraph} style={{ ...textStyle, margin: '0 0 1rem' }}>{paragraph}</p>)}
          <div style={{ backgroundColor: '#e7f4e4', borderLeft: `4px solid ${GOOD}`, borderRadius: '0 0.25rem 0.25rem 0', padding: '1rem 1.25rem', marginTop: '1.25rem' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 700, color: GOOD, marginBottom: '0.35rem' }}>{page.calloutTitle}</div>
            <p style={{ ...textStyle, fontSize: '0.9375rem', margin: 0 }}>{page.callout}</p>
          </div>
        </div>
        {page.asideRows && <AsideTable title={page.asideTitle} rows={page.asideRows} />}
      </section>
      <section style={{ backgroundColor: BAND, borderRadius: '0.25rem', padding: isMobile ? '1.5rem' : '2rem', marginTop: '2.5rem' }}>
        <h2 style={h2Style}>{page.bottomTitle}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '1.25rem' }}>
          {page.panels.map((panel) => <Panel key={panel.title} panel={panel} />)}
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

function AsideTable({ title, rows }) {
  return (
    <aside>
      <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: TEXT, margin: '0 0 0.75rem', textTransform: 'uppercase' }}>{title}</h3>
      <div style={{ border: '1px solid #e0e0e0', borderRadius: '0.25rem', overflow: 'hidden', backgroundColor: '#ffffff' }}>
        {rows.map((row, index) => (
          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', padding: '0.875rem 1rem', borderBottom: index === rows.length - 1 ? 'none' : '1px solid #e0e0e0', backgroundColor: row.alert ? '#f9dede' : '#ffffff' }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 700, color: row.alert ? ALERT : DARK }}>{row.label}</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 700, color: row.color || (row.alert ? ALERT : DARK), whiteSpace: 'nowrap' }}>{row.value}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function CardGrid({ cards, color, isMobile }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '1rem' }}>
      {cards.map((card) => (
        <article key={card.title} style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderTop: `3px solid ${color}`, borderRadius: '0.25rem', padding: '1.25rem' }}>
          <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 700, color: DARK, margin: '0 0 0.5rem' }}>{card.title}</h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: TEXT, lineHeight: 1.5, margin: 0 }}>{card.body}</p>
        </article>
      ))}
    </div>
  );
}

function Panel({ panel }) {
  return (
    <article style={{ backgroundColor: '#ffffff', border: '1px solid #e0e0e0', borderTop: `3px solid ${panel.color}`, borderRadius: '0.25rem', padding: '1.5rem' }}>
      <h3 style={{ fontFamily: 'var(--font-header)', fontSize: '1.25rem', fontWeight: 700, color: panel.color, margin: '0 0 1rem' }}>{panel.title}</h3>
      {panel.items.map((item, index) => (
        <div key={item.title} style={{ padding: index === 0 ? '0 0 0.875rem' : '0.875rem 0', borderBottom: index === panel.items.length - 1 ? 'none' : '1px solid #e0e0e0' }}>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 700, color: DARK, marginBottom: '0.25rem' }}>{item.title}</div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: TEXT, lineHeight: 1.45, margin: 0 }}>{item.body}</p>
        </div>
      ))}
    </article>
  );
}

export default StrokePreventionPlaceholder;
