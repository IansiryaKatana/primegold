import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const nft = require('@vercel/nft')

export const nodeFileTrace = nft.nodeFileTrace
export const resolve = nft.resolve
