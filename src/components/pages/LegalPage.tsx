type LegalSection = { heading: string; body: string }

type LegalPageProps = {
  title: string
  lastUpdated?: string
  intro?: string
  sections: readonly LegalSection[]
}

export function LegalPage({ title, lastUpdated, intro, sections }: LegalPageProps) {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-heading text-primary-text">{title}</h1>
        {lastUpdated && <p className="mt-2 text-sm text-muted-text">Last updated: {lastUpdated}</p>}
        {intro && <p className="mt-6 text-desc">{intro}</p>}
        <div className="mt-8 flex flex-col gap-6">
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg text-primary-text md:text-xl">{section.heading}</h2>
              <p className="mt-2 text-sm text-muted-text md:text-base">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
