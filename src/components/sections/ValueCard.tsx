type ValueCardProps = {
  number: string
  title: string
  text: string
}

export function ValueCard({ number, title, text }: ValueCardProps) {
  return (
    <div className="about-value-card">
      <span className="font-serif text-[44px] leading-none text-brand">
        {number}
      </span>
      <div className="flex flex-col gap-3.5">
        <h3 className="m-0 font-serif text-[30px] font-normal leading-[1.2] text-navy">
          {title}
        </h3>
        <p className="m-0 text-base leading-[1.75] text-ink">{text}</p>
      </div>
    </div>
  )
}
