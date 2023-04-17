import Link from 'next/link'
import Head from 'next/head'
import ExtLink from './ext-link'
import { useRouter } from 'next/router'

const navItems: { label: string; page?: string; link?: string }[] = [
  { label: 'Thoughts', page: '/blog' },
  { label: 'Projects', page: '/projects' },
  { label: 'About', page: '/' },
]

const ogImageUrl = 'https://notion-blog.now.sh/og-image.png'

export default ({ title = '', children = null }) => {
  const { pathname } = useRouter()

  return (
    <>
      <Head>
        <title>{title || 'Anoushk'}</title>
        <meta name="description" content="chewing glass." />
        <meta name="og:title" content="Anoushk" />
      </Head>
      <header>
        <div>{children}</div>
        <nav>
          {children ? (
            <div>
              <Link
                href={pathname
                  .split('/')
                  .slice(0, -1)
                  .join('/')}
              >
                <a>Back</a>
              </Link>
            </div>
          ) : (
            navItems.map(({ label, page, link }) => (
              <div key={label}>
                {page ? (
                  <Link href={page}>
                    <a className={pathname === page ? 'active' : undefined}>
                      {label}
                    </a>
                  </Link>
                ) : (
                  <ExtLink href={link}>{label}</ExtLink>
                )}
              </div>
            ))
          )}
        </nav>
      </header>
    </>
  )
}
