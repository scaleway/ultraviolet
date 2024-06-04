import { bucketLink } from '../../helper'

const serverlessDBContent = bucketLink(
  'products/serverlessDB',
  'serverlessDB-content',
)
const serverlessDBOriginal = bucketLink(
  'products/serverlessDB',
  'serverlessDB-original',
)
const serverlessDBKeyvisual = bucketLink(
  'products/serverlessDB',
  'serverlessDB-keyvisual',
)
const serverlessDBWire = bucketLink(
  'products/serverlessDB',
  'serverlessDB-wire',
  'svg',
)

export {
  serverlessDBOriginal,
  serverlessDBWire,
  serverlessDBContent,
  serverlessDBKeyvisual,
}
