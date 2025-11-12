'use client'

import type { ReactNode } from 'react'
import { createContext, useCallback, useContext, useMemo } from 'react'
import type { FieldError } from 'react-hook-form'
import type { MetaField, RequiredErrors } from '../../types'

type ErrorContextValue = {
  errors: RequiredErrors
  getError: (meta: MetaField, error?: FieldError) => string | undefined
}

const ErrorContext = createContext<ErrorContextValue | undefined>(undefined)

type ErrorProviderProps = {
  children: ReactNode
  errors: RequiredErrors
}

export const ErrorProvider = ({ children, errors }: ErrorProviderProps) => {
  const getError = useCallback<ErrorContextValue['getError']>(
    (meta, error) => {
      if (!error) {
        return undefined
      }

      if (error.message) {
        return error.message
      }

      return errors?.[error.type]?.(meta)
    },
    [errors],
  )

  const value = useMemo(
    () =>
      ({
        errors,
        getError,
      }) as ErrorContextValue,
    [errors, getError],
  )

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}

// oxlint-disable-next-line react/only-export-components
export const useErrors = () => {
  const context = useContext(ErrorContext)

  if (context === undefined) {
    throw new Error('useErrors must be used within an ErrorProvider ')
  }

  return context
}
