import { useState } from 'react'

const ControlValue = ({ value, children }) => {
  const [state, setState] = useState({ value })

  const onChange = valueOrEvent =>
    setState({
      value: (() => {
        if (valueOrEvent && valueOrEvent.currentTarget) {
          if (
            valueOrEvent.currentTarget.type === 'checkbox' ||
            valueOrEvent.currentTarget.type === 'radio'
          )
            return valueOrEvent.currentTarget.checked

          return valueOrEvent.currentTarget.value
        }
        return valueOrEvent
      })(),
    })

  return children({
    value: state.value,
    onChange,
  })
}

export default ControlValue
