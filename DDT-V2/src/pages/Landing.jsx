import { useSurvey } from '../context/SurveyContext.jsx'

export default function Landing() {
  const { startSurvey } = useSurvey()

  return (
    <main id="main-content">
      <section className="usa-section bg-primary-lightest">
        <div className="grid-container">
          <div className="grid-row">
            <div className="tablet:grid-col-10 desktop:grid-col-8">
              <h1 className="font-heading-2xl text-primary-darker margin-top-0">
                Welcome! We’re glad you’re here.
              </h1>
              <p className="usa-intro">
                Whether you’re looking for support for yourself or someone you
                care about, we’ll help you explore what feels right for you.
              </p>
              <p className="font-body-lg line-height-body-5">
                Tell us a little about yourself and we will recommend health
                program and information that fit your life, so you can take the
                next step on your path to better health—at your own pace.
              </p>
              <button
                type="button"
                className="usa-button usa-button--big margin-top-2"
                onClick={startSurvey}
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
