import { ChangeEvent, useState } from 'react'

const isEvent = <T>(valueOrEvent: ChangeEvent<HTMLInputElement> | T): valueOrEvent is ChangeEvent<HTMLInputElement> => !!(valueOrEvent as ChangeEvent)?.currentTarget

const getNewValue = <T>(valueOrEvent: ChangeEvent<HTMLInputElement> | T): T => {
  if (isEvent<T>(valueOrEvent)) {
    if (
      valueOrEvent.currentTarget.type === 'checkbox' ||
      valueOrEvent.currentTarget.type === 'radio'
    )
      return valueOrEvent.currentTarget.checked as unknown as T

    return valueOrEvent.currentTarget.value as unknown as T
  }

  return valueOrEvent
}

interface ControlProps<T> {
  value: T
  children: ({ onChange, value }: { onChange: (valueOrEvent: ChangeEvent<HTMLInputElement> | T) => void, value: T }) => JSX.Element
}

const ControlValue = <T>({ value, children }: ControlProps<T>): JSX.Element => {
  const [state, setState] = useState<T>(value)

  const onChange = (valueOrEvent: ChangeEvent<HTMLInputElement> | T) => {
    setState(getNewValue<T>(valueOrEvent))
  }

  return children({
    onChange,
    value: state,
  })
}

export default ControlValue
