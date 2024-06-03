import { bucketLinkProduct } from '../../helper'

const [
  objectStorageContent,
  objectStorageKeyvisual,
  objectStorageOriginal,
  objectStorageWire,
] = bucketLinkProduct('objectStorage')

const [
  objectStorageGlacierContent,
  objectStorageGlacierKeyvisual,
  objectStorageGlacierOriginal,
  objectStorageGlacierWire,
] = bucketLinkProduct('objectStorageGlacier', 'objectStorage')

export {
  objectStorageOriginal,
  objectStorageWire,
  objectStorageContent,
  objectStorageKeyvisual,
  objectStorageGlacierOriginal,
  objectStorageGlacierWire,
  objectStorageGlacierContent,
  objectStorageGlacierKeyvisual,
}
