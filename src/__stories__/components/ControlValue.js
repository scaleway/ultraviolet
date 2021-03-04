import { useState } from 'react'

const getNewValue = valueOrEvent => {
  if (valueOrEvent && valueOrEvent.currentTarget) {
    if (
      valueOrEvent.currentTarget.type === 'checkbox' ||
      valueOrEvent.currentTarget.type === 'radio'
    )
      return valueOrEvent.currentTarget.checked

    return valueOrEvent.currentTarget.value
  }

  return valueOrEvent
}

const ControlValue = ({ value, children }) => {
  const [state, setState] = useState({ value })

  const onChange = valueOrEvent =>
    setState({
      value: getNewValue(valueOrEvent),
    })

  return children({
    value: state.value,
    onChange,
  })
}

export default ControlValue
