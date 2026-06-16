import type { AnyObject } from '../types'
import { isSameValues } from './helpers'

export type FiltersState<V extends AnyObject> = {
  values: V
  lastSubmittedValues: V
  defaultValues: V
}

export type FiltersAction<V extends AnyObject> =
  | { type: 'SET_VALUE'; payload: { name: keyof V; value: unknown } }
  | { type: 'SET_VALUES'; payload: { values: Partial<V> } }
  | { type: 'RESET_FIELD'; payload: { name: keyof V; defaultValue?: V[keyof V] } }
  | { type: 'RESET_FIELDS'; payload: { names: (keyof V)[] } }
  | { type: 'RESET'; payload: { values?: Partial<V> } }
  | { type: 'SUBMIT' }
  | { type: 'DISCARD' }

const getNewState = <V extends AnyObject>(newValues: V, state: FiltersState<V>) => {
  if (isSameValues(newValues, state.values)) {
    return state
  }

  return {
    ...state,
    values: newValues,
  }
}

export const filtersReducer = <V extends AnyObject>(
  state: FiltersState<V>,
  action: FiltersAction<V>,
): FiltersState<V> => {
  switch (action.type) {
    case 'SET_VALUE': {
      const newValues = {
        ...state.values,
        [action.payload.name]: action.payload.value,
      }

      return getNewState(newValues, state)
    }
    case 'SET_VALUES': {
      const newValues = {
        ...state.values,
        ...action.payload.values,
      }

      return getNewState(newValues, state)
    }

    case 'RESET_FIELD': {
      const newDefaultValue =
        action.payload.defaultValue === undefined
          ? state.defaultValues[action.payload.name]
          : action.payload.defaultValue

      const newValues = {
        ...state.values,
        [action.payload.name]: newDefaultValue,
      }
      const newDefaultValues = {
        ...state.defaultValues,
        [action.payload.name]: newDefaultValue,
      }

      if (isSameValues(newValues, state.values) && isSameValues(newDefaultValues, state.defaultValues)) {
        return state
      }

      return {
        ...state,
        values: newValues,
        defaultValues: newDefaultValues,
      }
    }

    case 'RESET_FIELDS': {
      const newValues = { ...state.values }

      for (const key of action.payload.names) {
        newValues[key] = state.defaultValues[key]
      }

      return getNewState(newValues, state)
    }

    case 'RESET': {
      const newDefaultValues = {
        ...state.defaultValues,
        ...action.payload.values,
      }

      if (isSameValues(newDefaultValues, state.values) && isSameValues(newDefaultValues, state.defaultValues)) {
        return state
      }

      return {
        ...state,
        values: newDefaultValues,
        defaultValues: newDefaultValues,
      }
    }

    case 'SUBMIT': {
      return {
        ...state,
        lastSubmittedValues: state.values,
      }
    }

    case 'DISCARD': {
      return getNewState(state.lastSubmittedValues, state)
    }

    default: {
      return state
    }
  }
}
