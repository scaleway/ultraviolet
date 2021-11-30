import PropTypes from 'prop-types'
import React, { ComponentProps, VoidFunctionComponent, useState } from 'react'
import TextBox from '..'

const UncontrolledTextBox: VoidFunctionComponent<
  ComponentProps<typeof TextBox>
> = ({ defaultValue, ...props }) => {
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
