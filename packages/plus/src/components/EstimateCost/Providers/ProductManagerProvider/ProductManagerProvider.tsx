import type { ReactNode } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import type { BareEstimateProduct, EstimateProduct } from '../../types'

const DEFAULT_TOTAL_PRICE = {
  overlayHourly: 0,
  maxOverlayHourly: 0,
  hourly: 0,
  maxHourly: 0,
  total: 0,
  maxTotal: 0,
} as const

type ProductManagerContextType = {
  addProduct: (product: EstimateProduct) => void
  removeProduct: (product: BareEstimateProduct) => void
  products: EstimateProduct[]
  totalPrice: typeof DEFAULT_TOTAL_PRICE
}

const ProductManagerContext = createContext<ProductManagerContextType>({
  addProduct: () => {},
  removeProduct: () => {},
  products: [],
  totalPrice: DEFAULT_TOTAL_PRICE,
})

/**
 * useProductManager is a hook that provides methods to add and remove products from the virtual store.
 * It also provides the list of products and the total price.
 */
export const useProductManager = () => useContext(ProductManagerContext)

type ProductManagerProviderProps = {
  children: ReactNode
}

export const ProductManagerProvider = ({
  children,
}: ProductManagerProviderProps) => {
  const [products, setProducts] = useState<EstimateProduct[]>([]) // product is used to store each item with their price and amount

  const add = useCallback((newProduct: EstimateProduct) => {
    setProducts(total => {
      if (total.find(product => product.id === newProduct.id)) {
        return total.map(product =>
          product.id === newProduct.id ? newProduct : product,
        )
      }

      return [...total, newProduct]
    })
  }, [])

  const remove = useCallback(({ id }: BareEstimateProduct) => {
    setProducts(total => total.filter(product => product.id !== id))
  }, [])

  const value = useMemo(
    () => ({
      addProduct: add,
      removeProduct: remove,
      products,
    }),
    [add, products, remove],
  )

  return (
    <ProductManagerContext.Provider value={value}>
      {children}
    </ProductManagerContext.Provider>
  )
}
