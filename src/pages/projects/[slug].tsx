import React from 'react'
import Head from 'next/head'

import Header from '../../components/header'
import Content from '../../components/content'

import getPageData from '../../lib/notion/getPageData'
// import getBlogIndex from '../../lib/notion/getBlogIndex'
import { getDateStr, getProjectLink } from '../../lib/blog-helpers'
import getProjectIndex from '../../lib/notion/getProjectIndex'

// Get the data for each blog post
export async function getStaticProps({ params: { slug } }) {
  // load the postsTable so that we can get the page's ID
  const postsTable = await getProjectIndex()
  const post = postsTable[slug]

  if (!post) {
    console.log(`Failed to find post for slug: ${slug}`)
    return {
      props: {
        redirect: '/projects',
      },
    }
  }
  const postData = await getPageData(post.id)
  post.content = postData.blocks
  post.Authors = ['Anoushk Kharangate']

  // const { users } = await getNotionUsers(post.Authors || [])
  // post.Authors = Object.keys(users).map(id => users[id].full_name)

  return {
    props: {
      post,
    },
  }
}

// Return our list of blog posts to prerender
export async function getStaticPaths() {
  const postsTable = await getProjectIndex()
  return {
    paths: Object.keys(postsTable)
      .filter(post => postsTable[post].Published === 'Yes')
      .map(slug => getProjectLink(slug)),
    fallback: true,
  }
}

const RenderPost = ({ post, redirect }) => {
  if (redirect) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <meta httpEquiv="refresh" content={`0;url=${redirect}`} />
        </Head>
      </>
    )
  }

  if (!post) return <h1>Oops.</h1>

  return (
    <>
      <article>
        <h1>{post.Page || ''}</h1>

        <Header title={post.Page}>
          <div className="meta">
            {post.Authors.join(' ')}, {getDateStr(post.Date)}
          </div>
        </Header>

        <Content blocks={post.content || []} />
      </article>
    </>
  )
}

export default RenderPost
