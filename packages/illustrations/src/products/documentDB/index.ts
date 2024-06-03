import { bucketLink } from '../../helper'

const documentDBContent = bucketLink(
  'products/documentDB',
  'documentDB-content',
)

const documentDBKeyvisual = bucketLink(
  'products/documentDB',
  'documentDB-keyvisual',
)

const documentDBOriginal = bucketLink(
  'products/documentDB',
  'documentDB-original',
)

const documentDBWire = bucketLink(
  'products/documentDB',
  'documentDB-wire',
  'svg',
)

export {
  documentDBOriginal,
  documentDBContent,
  documentDBWire,
  documentDBKeyvisual,
}
