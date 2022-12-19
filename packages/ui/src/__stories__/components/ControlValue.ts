import type { ChangeEvent } from 'react'
import { useState } from 'react'
import type { MultiValue, SingleValue } from 'react-select'

const isEvent = <T>(
  valueOrEvent:
    | ChangeEvent<HTMLInputElement>
    | T
    | SingleValue<T>
    | MultiValue<T>,
): valueOrEvent is ChangeEvent<HTMLInputElement> =>
  !!(valueOrEvent as ChangeEvent)?.currentTarget

const getNewValue = <T>(
  valueOrEvent:
    | ChangeEvent<HTMLInputElement>
    | T
    | SingleValue<T>
    | MultiValue<T>,
): T => {
  if (isEvent<T>(valueOrEvent)) {
    if (
      valueOrEvent.currentTarget.type === 'checkbox' ||
      valueOrEvent.currentTarget.type === 'radio'
    ) {
      return valueOrEvent.currentTarget.checked as unknown as T
    }

    return valueOrEvent.currentTarget.value as unknown as T
  }

  return valueOrEvent as T
}

type ControlProps<T> = {
  value: T
  children: ({
    onChange,
    value,
  }: {
    onChange: (
      valueOrEvent:
        | ChangeEvent<HTMLInputElement>
        | T
        | SingleValue<T>
        | MultiValue<T>,
    ) => void
    value: T
  }) => JSX.Element
}

/**
 * ControlValue is a component that allows you to set and change a value.
 * IMPORTANT! DO NOT USE IT IN STORIES!
 */
const ControlValue = <T>({ value, children }: ControlProps<T>): JSX.Element => {
  const [state, setState] = useState<T>(value)

  const onChange = (
    valueOrEvent:
      | ChangeEvent<HTMLInputElement>
      | T
      | SingleValue<T>
      | MultiValue<T>,
  ) => {
    setState(getNewValue<T>(valueOrEvent))
  }

  return children({
    onChange,
    value: state,
  })
}

export default ControlValue
