import { useState } from 'react'

/** Optional free-text name (Q01, Q03). Null answer = declined to share. */
export default function NameQuestion({ question, onAnswer }) {
  const [value, setValue] = useState('')

  function submit(event) {
    event.preventDefault()
    const name = value.trim()
    onAnswer(name ? name : null)
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
        onChange={(event) => setValue(event.target.value)}
      />
      <button type="submit" className="usa-button margin-top-3" disabled={!value.trim()}>
        Next
      </button>
      <button
        type="button"
        className="usa-button usa-button--unstyled margin-top-2 display-block"
        onClick={() => onAnswer(null)}
      >
        {question.skipLabel}
      </button>
    </form>
  )
}
