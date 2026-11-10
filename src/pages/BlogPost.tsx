import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { ArticleBody } from '@/components/blog/ArticleBody'
import { ArticleToc } from '@/components/blog/ArticleToc'
import { PostCardSkeleton } from '@/components/blog/PostCardSkeleton'
import { CtaSection } from '@/components/sections/CtaSection'
import { ImagePlaceholder } from '@/components/sections/ImagePlaceholder'
import { PageHero } from '@/components/sections/PageHero'
import { PostCard } from '@/components/sections/PostCard'
import { SectionHeader } from '@/components/sections/SectionHeader'
import { Seo } from '@/components/sections/Seo'
import { TextLink } from '@/components/sections/TextLink'
import { blogArticle } from '@/content/blog'
import { heroes } from '@/content/heroes'
import { site } from '@/content/site'
import { processArticleHtml } from '@/lib/article-html'
import { formatLongDate, formatPostMeta } from '@/lib/format-date'
import { absoluteUrl } from '@/lib/seo'
import { usePost, useRelatedPosts } from '@/hooks/queries/usePosts'
import NotFound from '@/pages/NotFound'
import heroImage from '@/assets/images/hero-blog.jpg'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const { data: post, isLoading, isError } = usePost(slug)
  const { data: related = [], isLoading: loadingRelated } = useRelatedPosts(
    post ?? null,
    3,
  )

  const processed = useMemo(
    () => (post ? processArticleHtml(post.contentHtml) : null),
    [post],
  )

  if (!isLoading && (isError || !post)) {
    return <NotFound />
  }

  if (isLoading || !post || !processed) {
    return (
      <>
        <Seo title="Artículo" path={`/blog/${slug ?? ''}`} />
        <PageHero
          badge="Blog"
          title="…"
          image={heroImage}
          imagePosition={heroes.blogPost.imagePosition}
          overlay={heroes.blogPost.overlay}
          className={heroes.blogPost.minHeightClass}
        />
        <section className="wrap py-20">
          <div className="flex flex-col gap-6">
            <div className="h-8 w-3/4 animate-pulse bg-tint" />
            <div className="h-4 w-1/2 animate-pulse bg-tint" />
            <div className="aspect-video animate-pulse bg-tint" />
          </div>
        </section>
      </>
    )
  }

  const path = `/blog/${post.slug}`
  const description = post.seoDescription ?? post.excerpt
  const seoTitle = post.seoTitle ?? post.title
  const categoryHref = post.category
    ? `/blog?categoria=${encodeURIComponent(post.category.slug)}`
    : '/blog'

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: {
        '@type': 'Person',
        name: post.authorName,
      },
      publisher: {
        '@type': 'Organization',
        name: site.legalName,
      },
      mainEntityOfPage: absoluteUrl(path),
      image: post.coverImageUrl
        ? absoluteUrl(post.coverImageUrl)
        : absoluteUrl('/og-default.jpg'),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: absoluteUrl('/'),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: absoluteUrl('/blog'),
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: absoluteUrl(path),
        },
      ],
    },
  ]

  return (
    <>
      <Seo
        title={seoTitle}
        description={description}
        path={path}
        type="article"
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt}
        authorName={post.authorName}
        image={post.coverImageUrl ?? undefined}
        jsonLd={jsonLd}
      />

      <PageHero
        badge={post.category?.name ?? 'Blog'}
        badgeHref={categoryHref}
        title={post.title}
        image={heroImage}
        imagePosition={heroes.blogPost.imagePosition}
        overlay={heroes.blogPost.overlay}
        className={heroes.blogPost.minHeightClass}
        titleClassName="md:text-[52px] md:leading-[1.1]"
      />

      <section className="pb-12 pt-[72px]">
        <div className="mx-auto flex max-w-[940px] flex-col gap-7 px-4 md:px-8">
          <p className="m-0 font-serif text-[22px] leading-[1.5] text-navy md:text-[26px]">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4 border-y border-line py-[18px] text-sm text-muted">
            {/* DECISIÓN: avatar circular explícito (rounded-full) como en el HTML. */}
            <ImagePlaceholder className="size-12 shrink-0 rounded-full" />
            <span className="leading-[1.4]">
              <strong className="text-navy">{post.authorName}</strong>
              <br />
              {post.authorRole}
            </span>
            <span className="ml-auto">
              {formatLongDate(post.publishedAt)} · {post.readingMinutes} min de
              lectura
            </span>
          </div>
        </div>
      </section>

      <section className="pb-[72px]">
        <div className="wrap max-w-[1140px]">
          <div className="relative aspect-video w-full overflow-hidden">
            {post.coverImageUrl ? (
              <img
                src={post.coverImageUrl}
                alt={post.coverImageAlt ?? ''}
                className="absolute inset-0 h-full w-full object-cover"
                width={1140}
                height={640}
              />
            ) : (
              <ImagePlaceholder className="absolute inset-0 h-full w-full" />
            )}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="wrap flex max-w-[1140px] flex-wrap items-start gap-[72px]">
          <ArticleToc
            items={processed.toc}
            title={post.title}
            path={path}
          />
          <ArticleBody
            post={post}
            beforeHtml={processed.beforeHtml}
            afterHtml={processed.afterHtml}
          />
        </div>
      </section>

      {/* DECISIÓN: relacionados a mano (no BlogSection) para excluir el actual vía useRelatedPosts. */}
      <section className="py-28">
        <div className="wrap">
          <SectionHeader
            eyebrow={blogArticle.relatedEyebrow}
            title={blogArticle.relatedTitle}
            className="mb-12"
            action={
              <TextLink to="/blog">{blogArticle.relatedLink}</TextLink>
            }
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {loadingRelated
              ? Array.from({ length: 3 }, (_, i) => (
                  <PostCardSkeleton key={i} />
                ))
              : related.map((item) => (
                  <PostCard
                    key={item.id}
                    href={`/blog/${item.slug}`}
                    category={item.category?.name ?? ''}
                    title={item.title}
                    meta={formatPostMeta(
                      item.authorName,
                      item.publishedAt,
                      item.readingMinutes,
                    )}
                    image={item.coverImageUrl ?? undefined}
                    imageAlt={item.coverImageAlt ?? undefined}
                  />
                ))}
          </div>
        </div>
      </section>

      <CtaSection title={blogArticle.cta.title} text={blogArticle.cta.text} />
    </>
  )
}
