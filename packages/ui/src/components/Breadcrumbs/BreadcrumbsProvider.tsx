import type { Context, ReactNode, RefObject } from 'react'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'

type BreadcrumbItems = {
  id: string
  ref: RefObject<HTMLLIElement>
}

type BreadcrumbsContextType = {
  breadcrumbs: BreadcrumbItems[]
  registerBreadcrumb: (ref: RefObject<HTMLLIElement>) => string
  unregisterBreadcrumb: (id: string) => void
}

const BreadcrumbsContext = createContext<BreadcrumbsContextType | undefined>(
  undefined,
)

export const useBreadcrumbs = () => {
  const context = BreadcrumbsContext
  if (context === undefined) {
    throw new Error('useBreadcrumbs must be used within a BreadcrumbsProvider')
  }

  return useContext(context as Context<BreadcrumbsContextType>)
}

type BreadcrumbsProviderProps = {
  children: ReactNode
}

export const BreadcrumbsProvider = ({ children }: BreadcrumbsProviderProps) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItems[]>([])

  const registerBreadcrumb = useCallback((ref: RefObject<HTMLLIElement>) => {
    const id = Math.random().toString(36).substring(7)
    setBreadcrumbs(prevBreadcrumbs => [...prevBreadcrumbs, { id, ref }])

    return id
  }, [])

  const unregisterBreadcrumb = useCallback((id: string) => {
    setBreadcrumbs(prevBreadcrumbs =>
      prevBreadcrumbs.filter(breadcrumb => breadcrumb.id !== id),
    )
  }, [])

  const values = useMemo(
    () => ({
      registerBreadcrumb,
      unregisterBreadcrumb,
      breadcrumbs,
    }),
    [breadcrumbs, registerBreadcrumb, unregisterBreadcrumb],
  )

  return (
    <BreadcrumbsContext.Provider value={values}>
      {children}
    </BreadcrumbsContext.Provider>
  )
}
