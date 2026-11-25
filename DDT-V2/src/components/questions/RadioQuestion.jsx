import { useState } from 'react'

/** Single-select (Q02, Q07, Q09, Q10, Q11, Q16). */
export default function RadioQuestion({ question, options, onAnswer }) {
  const [selected, setSelected] = useState(null)

  function submit(event) {
    event.preventDefault()
    if (selected) onAnswer(selected)
  }

  return (
    <form className="usa-form maxw-tablet" onSubmit={submit}>
      <fieldset className="usa-fieldset">
        {options.map((option) => (
          <div className="usa-radio" key={option.value}>
            <input
              className="usa-radio__input usa-radio__input--tile"
              id={`${question.id}-${option.value}`}
              type="radio"
              name={question.id}
              value={option.value}
              checked={selected === option.value}
              onChange={() => setSelected(option.value)}
            />
            <label
              className="usa-radio__label"
              htmlFor={`${question.id}-${option.value}`}
            >
              {option.label}
            </label>
          </div>
        ))}
      </fieldset>
      <button type="submit" className="usa-button margin-top-3" disabled={!selected}>
        Next
      </button>
    </form>
  )
}
