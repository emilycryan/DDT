import { useState } from 'react'

/** Age dropdown 0–100 (Q04). */
export default function AgeQuestion({ question, initial, onAnswer }) {
  const [age, setAge] = useState(initial != null ? String(initial) : '')

  function submit(event) {
    event.preventDefault()
    if (age !== '') onAnswer(Number(age))
  }

  return (
    <form className="usa-form maxw-mobile-lg" onSubmit={submit}>
      <label className="usa-label" htmlFor={question.id}>
        Age
      </label>
      <select
        className="usa-select"
        id={question.id}
        name={question.id}
        value={age}
        onChange={(event) => setAge(event.target.value)}
      >
        <option value="">- Select -</option>
        {Array.from({ length: 101 }, (_, i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
      <button type="submit" className="usa-button margin-top-3" disabled={age === ''}>
        Next
      </button>
    </form>
  )
}
