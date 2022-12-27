import * as variantExplorer from './variantExplorer'
import * as variantProduct from './variantProduct'
import * as variantTable from './variantTable'

export const variants = {
  explorer: variantExplorer,
  product: variantProduct,
  table: variantTable,
}

export type ListVariant = keyof typeof variants
