const fs = require('fs')
const path = require('path')
const { NODE_ENV, NOTION_TOKEN, BLOG_INDEX_ID } = process.env

try {
  fs.unlinkSync(path.resolve('.blog_index_data'))
} catch (_) {
  /* non fatal */
}
try {
  fs.unlinkSync(path.resolve('.blog_index_data_previews'))
} catch (_) {
  /* non fatal */
}

const warnOrError =
  NODE_ENV !== 'production'
    ? console.warn
    : msg => {
        throw new Error(msg)
      }

if (!NOTION_TOKEN) {
  // We aren't able to build or serve images from Notion without the
  // NOTION_TOKEN being populated
  warnOrError(
    `\nNOTION_TOKEN is missing from env, this will result in an error\n` +
      `Make sure to provide one before starting Next.js`
  )
}

if (!BLOG_INDEX_ID) {
  // We aren't able to build or serve images from Notion without the
  // NOTION_TOKEN being populated
  warnOrError(
    `\nBLOG_INDEX_ID is missing from env, this will result in an error\n` +
      `Make sure to provide one before starting Next.js`
  )
}

module.exports = {
  target: 'experimental-serverless-trace',
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  webpack(cfg, { dev, isServer }) {
    // only compile build-rss in production server build
    if (dev || !isServer) return cfg

    const originalEntry = cfg.entry
    cfg.entry = async () => {
      const entries = { ...(await originalEntry()) }
      entries['./scripts/build-rss.js'] = './src/lib/build-rss.ts'
      return entries
    }
    return cfg
  },
}
