import { useState } from 'react'

const ControlValue = ({ value, children }) => {
  const [state, setState] = useState({ value })

  const onChange = valueOrEvent =>
    setState({
      value:
        valueOrEvent && valueOrEvent.currentTarget
          ? valueOrEvent.currentTarget.type === 'checkbox' ||
            valueOrEvent.currentTarget.type === 'radio'
            ? valueOrEvent.currentTarget.checked
            : valueOrEvent.currentTarget.value
          : valueOrEvent,
    })

  return children({
    value: state.value,
    onChange,
  })
}

export default ControlValue
