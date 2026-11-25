import { useState } from 'react'

/**
 * Multi-select (Q05, Q06, Q08, Q12, Q13a, Q13b). Options flagged
 * `other: true` reveal a free-text field; its text is stored under
 * answers.<questionId>_other.
 */
export default function CheckboxQuestion({ question, options, onAnswer }) {
  const [selected, setSelected] = useState([])
  const [otherText, setOtherText] = useState('')

  function toggle(value) {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    )
  }

  const otherSelected = options.some(
    (o) => o.other && selected.includes(o.value),
  )

  function submit(event) {
    event.preventDefault()
    if (selected.length === 0) return
    const extra = otherSelected
      ? { [`${question.id}_other`]: otherText.trim() }
      : {}
    onAnswer(selected, extra)
  }

  return (
    <form className="usa-form maxw-tablet" onSubmit={submit}>
      <fieldset className="usa-fieldset">
        {options.map((option) => (
          <div key={option.value}>
            <div className="usa-checkbox">
              <input
                className="usa-checkbox__input usa-checkbox__input--tile"
                id={`${question.id}-${option.value}`}
                type="checkbox"
                name={question.id}
                value={option.value}
                checked={selected.includes(option.value)}
                onChange={() => toggle(option.value)}
              />
              <label
                className="usa-checkbox__label"
                htmlFor={`${question.id}-${option.value}`}
              >
                {option.label}
              </label>
            </div>
            {option.other && selected.includes(option.value) && (
              <div className="margin-left-4 margin-top-1">
                <label
                  className="usa-sr-only"
                  htmlFor={`${question.id}-other-text`}
                >
                  Please describe
                </label>
                <input
                  className="usa-input"
                  id={`${question.id}-other-text`}
                  type="text"
                  value={otherText}
                  onChange={(event) => setOtherText(event.target.value)}
                />
              </div>
            )}
          </div>
        ))}
      </fieldset>
      <button
        type="submit"
        className="usa-button margin-top-3"
        disabled={selected.length === 0}
      >
        Next
      </button>
    </form>
  )
}
