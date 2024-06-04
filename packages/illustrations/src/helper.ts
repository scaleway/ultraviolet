// Bucket link
export const BASE_URL = 'https://test-bucket-illustrations.s3.fr-par.scw.cloud'

// Path to every illustration folder
export const EMPTY_PATH = 'various/empty'
export const FEEDBACK_PATH = 'various/feedback'
export const DOCUMENTATION_PATH = 'various/documentation'
export const ONBOARDING_PATH = 'various/onboarding'

// Create path to illustrations on bucket
export const bucketLink = (path: string, name: string, type = 'webp') =>
  `${BASE_URL}/${path}/${name}.${type ?? 'webp'}`

// Create path to product illustration on bucket. The product name must be in camelCase
export const bucketLinkProduct = (productName: string, folder?: string) => {
  const baseLink = `${BASE_URL}/products/${folder ?? productName}/${productName.replace(/([A-Z])/g, '-$1').toLowerCase()}`

  return [
    `${baseLink}-content.webp`,
    `${baseLink}-keyvisual.webp`,
    `${baseLink}-original.webp`,
    `${baseLink}-wire.svg`,
  ]
}
