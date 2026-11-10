import { Eyebrow } from '@/components/sections/Eyebrow'
import { ValueCard } from '@/components/sections/ValueCard'
import { aboutPrinciples } from '@/content/about'
import fondo from '@/assets/images/nosotros-principios-fondo.jpg'

export function AboutPrinciples() {
  const data = aboutPrinciples

  return (
    <section
      className="about-principles"
      aria-labelledby="principios-titulo"
    >
      <div className="about-principles-bg" aria-hidden="true">
        <img
          src={fondo}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
          width={1920}
          height={1100}
          loading="lazy"
        />
        <span className="about-principles-tint" />
      </div>

      <div className="wrap about-principles-in">
        <div className="about-principles-copy flex flex-col gap-[22px]">
          <Eyebrow tone="dark">{data.eyebrow}</Eyebrow>
          <h2
            id="principios-titulo"
            className="text-[30px] leading-[1.1] text-white md:text-[52px]"
          >
            {data.title}
          </h2>
          <p className="m-0 max-w-[480px] text-lg leading-[1.8] text-on-dark">
            {data.text}
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {data.cards.map((card) => (
            <ValueCard
              key={card.number}
              number={card.number}
              title={card.title}
              text={card.text}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
