import { useState } from 'react'

/**
 * Optional free-text name (Q01, Q03), mirroring the deck's response
 * block: a Name field plus a decline checkbox. Checking the box clears
 * and disables the field. Null answer = declined to share.
 */
export default function NameQuestion({ question, initial, onAnswer }) {
  // initial: undefined = not yet answered, null = declined, string = name
  const [value, setValue] = useState(typeof initial === 'string' ? initial : '')
  const [declined, setDeclined] = useState(initial === null)

  const canSubmit = declined || value.trim() !== ''

  function submit(event) {
    event.preventDefault()
    if (!canSubmit) return
    onAnswer(declined ? null : value.trim())
  }

  function toggleDeclined() {
    setDeclined((prev) => {
      const next = !prev
      if (next) setValue('')
      return next
    })
  }

  return (
    <form className="usa-form maxw-mobile-lg" onSubmit={submit}>
      <label className="usa-label" htmlFor={question.id}>
        Name
      </label>
      <input
        className="usa-input"
        id={question.id}
        name={question.id}
        type="text"
        autoComplete="off"
        value={value}
        disabled={declined}
        onChange={(event) => setValue(event.target.value)}
      />
      <div className="usa-checkbox margin-top-2">
        <input
          className="usa-checkbox__input"
          id={`${question.id}-decline`}
          type="checkbox"
          checked={declined}
          onChange={toggleDeclined}
        />
        <label
          className="usa-checkbox__label"
          htmlFor={`${question.id}-decline`}
        >
          {question.skipLabel}
        </label>
      </div>
      <button type="submit" className="usa-button margin-top-3" disabled={!canSubmit}>
        Next
      </button>
    </form>
  )
}
