export default function Footer() {
  return (
    <footer className="bg-base-darkest">
      <div className="grid-container padding-y-4">
        <div className="grid-row grid-gap-2 flex-align-center">
          <div className="grid-col-12 tablet:grid-col-auto">
            <p className="font-heading-md text-white margin-0">Find Your Path</p>
          </div>
        </div>
        <div className="border-top border-base-dark margin-top-2 padding-top-2">
          <p className="font-body-3xs text-base-lighter margin-0 measure-5">
            This site is a prototype. Your answers are never saved &mdash;
            everything is cleared the moment you leave.
          </p>
        </div>
      </div>
    </footer>
  )
}
