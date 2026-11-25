import { useState } from 'react'

const STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
]

/**
 * Q14 — ZIP code, with an inline follow-up when the user opts out:
 * state dropdown / current location / online only / show all.
 * Answer shape: { zip } or { preference, state? }.
 */
export default function ZipQuestion({ question, initial, onAnswer }) {
  // initial: { zip } or { preference, state? }
  const [zip, setZip] = useState(initial?.zip ?? '')
  const [optedOut, setOptedOut] = useState(Boolean(initial?.preference))
  const [preference, setPreference] = useState(initial?.preference ?? null)
  const [state, setState] = useState(initial?.state ?? '')

  const zipValid = /^\d{5}$/.test(zip)

  function submitZip(event) {
    event.preventDefault()
    if (zipValid) onAnswer({ zip })
  }

  function submitPreference(event) {
    event.preventDefault()
    if (!preference) return
    if (preference === 'state' && !state) return
    onAnswer({ preference, ...(preference === 'state' ? { state } : {}) })
  }

  if (!optedOut) {
    return (
      <form className="usa-form maxw-mobile-lg" onSubmit={submitZip}>
        <label className="usa-label" htmlFor={question.id}>
          ZIP code
        </label>
        <input
          className="usa-input usa-input--medium"
          id={question.id}
          name={question.id}
          type="text"
          inputMode="numeric"
          pattern="[\d]{5}"
          maxLength={5}
          value={zip}
          onChange={(event) => setZip(event.target.value.replace(/\D/g, ''))}
        />
        <button type="submit" className="usa-button margin-top-3" disabled={!zipValid}>
          Next
        </button>
        <button
          type="button"
          className="usa-button usa-button--unstyled margin-top-2 display-block"
          onClick={() => setOptedOut(true)}
        >
          {question.optOutLabel}
        </button>
      </form>
    )
  }

  return (
    <form className="usa-form maxw-tablet" onSubmit={submitPreference}>
      <fieldset className="usa-fieldset">
        <legend className="usa-legend text-bold">
          {question.optOutQuestion}
        </legend>
        {question.optOutOptions.map((option) => (
          <div key={option.value}>
            <div className="usa-radio">
              <input
                className="usa-radio__input usa-radio__input--tile"
                id={`${question.id}-${option.value}`}
                type="radio"
                name={`${question.id}-pref`}
                value={option.value}
                checked={preference === option.value}
                onChange={() => setPreference(option.value)}
              />
              <label
                className="usa-radio__label"
                htmlFor={`${question.id}-${option.value}`}
              >
                {option.label}
              </label>
            </div>
            {option.value === 'state' && preference === 'state' && (
              <div className="margin-left-4 margin-top-1 maxw-mobile-lg">
                <label className="usa-sr-only" htmlFor={`${question.id}-state-select`}>
                  State
                </label>
                <select
                  className="usa-select"
                  id={`${question.id}-state-select`}
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                >
                  <option value="">- Select state -</option>
                  {STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}
      </fieldset>
      <button
        type="submit"
        className="usa-button margin-top-3"
        disabled={!preference || (preference === 'state' && !state)}
      >
        Next
      </button>
      <button
        type="button"
        className="usa-button usa-button--unstyled margin-top-2 display-block"
        onClick={() => setOptedOut(false)}
      >
        Enter a ZIP code instead
      </button>
    </form>
  )
}
