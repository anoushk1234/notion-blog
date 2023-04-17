import path from 'path'

const normalizeId = (id: string) => {
  if (id.length === 36) return id
  if (id.length !== 32) {
    throw new Error(
      `Invalid blog-index-id: ${id} should be 32 characters long. Info here https://github.com/ijjk/notion-blog#getting-blog-index-and-token`
    )
  }
  return `${id.substr(0, 8)}-${id.substr(8, 4)}-${id.substr(12, 4)}-${id.substr(
    16,
    4
  )}-${id.substr(20)}`
}

export const NOTION_TOKEN = process.env.NEXT_PUBLIC_NOTION_TOKEN

export const BLOG_INDEX_ID = normalizeId(process.env.NEXT_PUBLIC_BLOG_INDEX_ID)
export const PROJECT_INDEX_ID = normalizeId(
  process.env.NEXT_PUBLIC_PROJECT_INDEX_ID
)
export const API_ENDPOINT = 'https://www.notion.so/api/v3'
export const BLOG_INDEX_CACHE = path.resolve('.blog_index_data')
export const PROJECT_INDEX_CACHE = path.resolve('.project_index_data')
