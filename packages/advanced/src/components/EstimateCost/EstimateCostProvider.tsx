import { createContext, ReactNode, useContext, useMemo } from 'react'
import { ReactParamsObject, useI18nExtend } from '../../helpers/useI18nExtend'
import EstimateCostLocales from './locales/en'

const EstimateCostContext = createContext<{
  t: (
    key: keyof typeof EstimateCostLocales,
    context?: ReactParamsObject<any>,
  ) => string | keyof typeof EstimateCostLocales
}>({ t: () => '' })

export const useEstimateCost = () => useContext(EstimateCostContext)

type EstimateCostProviderProps = {
  children: ReactNode
  locales?: typeof EstimateCostLocales
}

export const EstimateCostProvider = ({
  children,
  locales,
}: EstimateCostProviderProps) => {
  const { t } = useI18nExtend<typeof EstimateCostLocales>(
    EstimateCostLocales,
    locales,
  )

  const value = useMemo(() => ({ t }), [t])

  return (
    <EstimateCostContext.Provider value={value}>
      {children}
    </EstimateCostContext.Provider>
  )
}
