import { Link } from 'react-router-dom'

import { AuthorBox } from '@/components/blog/AuthorBox'
import { ServiceCtaBlock } from '@/components/blog/ServiceCtaBlock'
import { Label } from '@/components/sections/Label'
import { blogArticle, serviceCtaByCategorySlug } from '@/content/blog'
import type { BlogPost } from '@/types/blog'

type ArticleBodyProps = {
  post: BlogPost
  beforeHtml: string
  afterHtml: string
}

export function ArticleBody({ post, beforeHtml, afterHtml }: ArticleBodyProps) {
  const serviceCta = post.category
    ? serviceCtaByCategorySlug[post.category.slug]
    : null

  return (
    <article className="article-prose min-w-0 flex-[999_1_560px]">
      <div
        className="article-prose-chunk"
        dangerouslySetInnerHTML={{ __html: beforeHtml }}
      />
      {serviceCta ? (
        <div className="article-prose-cta">
          <ServiceCtaBlock label={serviceCta.label} href={serviceCta.href} />
        </div>
      ) : null}
      {afterHtml ? (
        <div
          className="article-prose-chunk"
          dangerouslySetInnerHTML={{ __html: afterHtml }}
        />
      ) : null}

      <div className="article-prose-note bg-tint px-[22px] py-[18px] text-sm leading-[1.7] text-ink">
        {blogArticle.disclaimer}
      </div>

      {post.tags.length > 0 ? (
        <div className="article-prose-tags flex flex-wrap items-center gap-2">
          <Label className="mr-2">{blogArticle.tagsLabel}</Label>
          {post.tags.map((tag) => (
            <Link
              key={tag}
              to={`/blog?etiqueta=${encodeURIComponent(tag)}`}
              className="bg-tint px-3 py-1.5 text-[13px] text-navy no-underline hover:text-brand"
            >
              #{tag}
            </Link>
          ))}
        </div>
      ) : null}

      <div className="article-prose-author">
        <AuthorBox
          name={post.authorName}
          role={post.authorRole}
          bio={post.authorBio}
        />
      </div>
    </article>
  )
}
