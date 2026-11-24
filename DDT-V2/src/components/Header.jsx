import { useState } from 'react'

export default function Header() {
  const [bannerOpen, setBannerOpen] = useState(false)

  return (
    <>
      <section
        className="usa-banner"
        aria-label="Official website of the United States government"
      >
        <div className="usa-accordion">
          <header className="usa-banner__header">
            <div className="usa-banner__inner">
              <div className="grid-col-fill tablet:grid-col-auto">
                <p className="usa-banner__header-text">
                  An official website of the United States government
                </p>
                <p className="usa-banner__header-action" aria-hidden="true">
                  Here’s how you know
                </p>
              </div>
              <button
                type="button"
                className="usa-accordion__button usa-banner__button"
                aria-expanded={bannerOpen}
                aria-controls="gov-banner"
                onClick={() => setBannerOpen((open) => !open)}
              >
                <span className="usa-banner__button-text">Here’s how you know</span>
              </button>
            </div>
          </header>
          <div
            className="usa-banner__content usa-accordion__content"
            id="gov-banner"
            hidden={!bannerOpen}
          >
            <div className="grid-row grid-gap-lg">
              <div className="usa-banner__guidance tablet:grid-col-6">
                <div className="usa-media-block__body">
                  <p>
                    <strong>Official websites use .gov</strong>
                    <br />A <strong>.gov</strong> website belongs to an official
                    government organization in the United States.
                  </p>
                </div>
              </div>
              <div className="usa-banner__guidance tablet:grid-col-6">
                <div className="usa-media-block__body">
                  <p>
                    <strong>Secure .gov websites use HTTPS</strong>
                    <br />A <strong>lock</strong> or <strong>https://</strong> means
                    you’ve safely connected to the .gov website. Share sensitive
                    information only on official, secure websites.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <header className="usa-header usa-header--basic">
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <div className="usa-logo">
              <em className="usa-logo__text">
                <a href="/" title="Find Your Path">
                  Find Your Path
                </a>
              </em>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
