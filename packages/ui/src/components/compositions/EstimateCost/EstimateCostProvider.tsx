'use client'

import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useMemo } from 'react'
import EstimateCostLocales from './locales/en'

const EstimateCostContext = createContext<{
  locales: Record<keyof typeof EstimateCostLocales, string>
  formatNumber: (number: number, options: FormatNumberOption) => string
}>({ formatNumber: () => '', locales: EstimateCostLocales })

// oxlint-disable-next-line react/only-export-components
export const useEstimateCost = () => useContext(EstimateCostContext)

type EstimateCostProviderProps = {
  children: ReactNode
  locales?: Record<keyof typeof EstimateCostLocales, string>
  currency?: string
  numberLocales?: string
}

type FormatNumberOption = {
  currencyDisplay?: 'symbol' | 'code' | 'name'
  unit?: string
  unitDisplay?: 'long' | 'short' | 'narrow'
  useGrouping?: boolean
  minimumIntegerDigits?: number
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  minimumSignificantDigits?: number
  maximumSignificantDigits?: number
}

export const EstimateCostProvider = ({
  children,
  locales,
  currency,
  numberLocales,
}: EstimateCostProviderProps) => {
  const newLocales = useMemo(
    () =>
      locales ? { ...EstimateCostLocales, ...locales } : EstimateCostLocales,
    [locales],
  )

  const formatNumber = useCallback(
    (number: number, options: FormatNumberOption) => {
      const numberFormat = new Intl.NumberFormat(numberLocales, {
        currency,
        style: 'currency',
        ...options,
      })

      return numberFormat.format(number)
    },
    [currency, numberLocales],
  )

  const value = useMemo(
    () => ({
      formatNumber,
      locales: newLocales,
    }),
    [formatNumber, newLocales],
  )

  return (
    <EstimateCostContext.Provider value={value}>
      {children}
    </EstimateCostContext.Provider>
  )
}
