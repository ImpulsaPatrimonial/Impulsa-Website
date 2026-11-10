import DOMPurify from 'dompurify'

import { ActivityBlock } from '@/components/activities/ActivityBlock'
import { ImagePlaceholder } from '@/components/sections/ImagePlaceholder'
import { activityDetailUi } from '@/content/activities'
import { resolveActivityImage } from '@/lib/activity-images'

type ActivityDescriptionProps = {
  html: string
  bodyImageUrl: string | null
  bodyImageAlt: string | null
}

const ALLOWED_TAGS = [
  'p',
  'ul',
  'ol',
  'li',
  'strong',
  'em',
  'a',
  'blockquote',
  'br',
  'h3',
]

export function ActivityDescription({
  html,
  bodyImageUrl,
  bodyImageAlt,
}: ActivityDescriptionProps) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  })
  const image = resolveActivityImage(bodyImageUrl)

  return (
    <ActivityBlock
      id="descripcion"
      title={activityDetailUi.sectionTitles.descripcion}
      first
    >
      <div className="article-prose max-w-none">
        <div
          className="article-prose-chunk"
          dangerouslySetInnerHTML={{ __html: clean }}
        />
      </div>
      {image ? (
        <img
          src={image}
          alt={bodyImageAlt ?? ''}
          className="mt-3.5 aspect-video w-full object-cover"
          width={960}
          height={540}
          loading="lazy"
        />
      ) : (
        <ImagePlaceholder
          className="mt-3.5 aspect-video w-full"
          label="Imagen relacionada con la actividad"
        />
      )}
    </ActivityBlock>
  )
}
