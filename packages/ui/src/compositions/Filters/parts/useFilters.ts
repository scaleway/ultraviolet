import { useEffect, useMemo, useReducer } from 'react'
import type { AnyObject } from '../types'
import { getKeysWithDifferentValues, isSameValues } from './helpers'
import { filtersReducer } from './reducer'

export type UseFiltersParams<V extends AnyObject> = {
  defaultValues: V
  initialValues?: Partial<V>
  onChange?: (values: V) => void
  onSubmit?: (values: V) => void
}

export type UseFiltersReturn<V extends AnyObject> = ReturnType<typeof useFilters<V>>

/**
 * UI-agnostic implementation of the filters logic.
 */
export const useFilters = <V extends AnyObject>({
  defaultValues,
  initialValues = {},
  onChange,
  onSubmit,
}: UseFiltersParams<V>) => {
  const initialState = useMemo(() => {
    const stateInitialValues = { ...defaultValues, ...initialValues }

    return {
      values: stateInitialValues,
      lastSubmittedValues: stateInitialValues,
      defaultValues,
    }
  }, [defaultValues, initialValues])

  const [state, dispatch] = useReducer(filtersReducer, initialState)

  useEffect(() => {
    if (state.values !== initialState.values) {
      onChange?.(state.values)
    }
  }, [state.values, onChange, initialState.values])

  /**
   * Names of filters that have been modified from the default values AND submitted
   */
  const appliedFilters = useMemo(
    () => getKeysWithDifferentValues(state.lastSubmittedValues, state.defaultValues),
    [state.lastSubmittedValues, state.defaultValues],
  )

  /**
   * Names of filters that have been modified from the default values
   */
  const dirtyFilters = useMemo(
    () => getKeysWithDifferentValues(state.values, state.defaultValues),
    [state.values, state.defaultValues],
  )

  function setValue<K extends keyof V>(name: K, value: V[K]) {
    dispatch({ type: 'SET_VALUE', payload: { name, value } })
  }

  function setValues(values: Partial<V>) {
    dispatch({ type: 'SET_VALUES', payload: { values } })
  }

  function resetField<K extends keyof V>(name: K, options?: { defaultValue?: V[K] }) {
    dispatch({ type: 'RESET_FIELD', payload: { name, defaultValue: options?.defaultValue } })
  }

  function resetFields(names: (keyof V)[]) {
    dispatch({ type: 'RESET_FIELDS', payload: { names } })
  }

  function reset(values?: Partial<V>) {
    dispatch({ type: 'RESET', payload: { values } })
  }

  function submit(overrideValues?: Partial<V>) {
    dispatch({ type: 'SUBMIT' })

    const newValues = { ...state.values, ...overrideValues }
    if (!isSameValues(newValues, state.lastSubmittedValues)) {
      onSubmit?.({ ...state.values, ...overrideValues })
    }
  }

  function discard() {
    dispatch({ type: 'DISCARD' })
  }

  return {
    values: state.values,
    defaultValues: state.defaultValues,
    dirtyFilters,
    appliedFilters,
    lastSubmittedValues: state.lastSubmittedValues,
    setValue,
    setValues,
    resetField,
    resetFields,
    reset,
    submit,
    discard,
  }
}
