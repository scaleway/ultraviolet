import PropTypes from 'prop-types'
import React, { ComponentProps, useState } from 'react'
import TextBox from '..'

const UncontrolledTextBox = ({
  defaultValue,
  ...props
}: ComponentProps<typeof TextBox>) => {
  const [value, setValue] = useState(defaultValue)

  return <TextBox name="test" value={value} onChange={setValue} {...props} />
}

UncontrolledTextBox.propTypes = {
  defaultValue: PropTypes.string,
}
UncontrolledTextBox.defaultProps = {
  defaultValue: '',
}

export default UncontrolledTextBox
