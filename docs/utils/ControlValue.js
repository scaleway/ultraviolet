import React from 'react'

class ControlValue extends React.Component {
  state = { value: this.props.value }

  onChange = valueOrEvent => {
    this.setState({
      value:
        valueOrEvent && valueOrEvent.currentTarget
          ? valueOrEvent.currentTarget.type === 'checkbox' ||
            valueOrEvent.currentTarget.type === 'radio'
            ? valueOrEvent.currentTarget.checked
            : valueOrEvent.currentTarget.value
          : valueOrEvent,
    })
  }

  render() {
    return this.props.children({
      value: this.state.value,
      onChange: this.onChange,
    })
  }
}

export default ControlValue
