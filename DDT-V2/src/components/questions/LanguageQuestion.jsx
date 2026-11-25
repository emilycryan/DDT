import { useState } from 'react'

/**
 * Q15 — up to 3 ranked language choices. 1st required, 2nd/3rd optional.
 * "Another language" reveals a free-text field whose value replaces it.
 * Answer: array of 1–3 language strings.
 */
export default function LanguageQuestion({ question, onAnswer }) {
  const [choices, setChoices] = useState(['', '', ''])
  const [otherText, setOtherText] = useState('')

  const labels = ['1st choice', '2nd choice (optional)', '3rd choice (optional)']
  const hasOther = choices.includes('Another language')
  const canSubmit =
    choices[0] !== '' && (!hasOther || otherText.trim() !== '')

  function setChoice(index, value) {
    setChoices((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  function submit(event) {
    event.preventDefault()
    if (!canSubmit) return
    const resolved = choices
      .filter((c) => c !== '')
      .map((c) => (c === 'Another language' ? otherText.trim() : c))
    onAnswer(resolved)
  }

  return (
    <form className="usa-form maxw-mobile-lg" onSubmit={submit}>
      {labels.map((label, index) => (
        <div key={label}>
          <label className="usa-label" htmlFor={`${question.id}-${index}`}>
            {label}
          </label>
          <select
            className="usa-select"
            id={`${question.id}-${index}`}
            value={choices[index]}
            onChange={(event) => setChoice(index, event.target.value)}
          >
            <option value="">- Select -</option>
            {question.languageOptions.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      ))}
      {hasOther && (
        <div className="margin-top-2">
          <label className="usa-label" htmlFor={`${question.id}-other`}>
            Another language
          </label>
          <input
            className="usa-input"
            id={`${question.id}-other`}
            type="text"
            value={otherText}
            onChange={(event) => setOtherText(event.target.value)}
          />
        </div>
      )}
      <button type="submit" className="usa-button margin-top-3" disabled={!canSubmit}>
        Next
      </button>
    </form>
  )
}
