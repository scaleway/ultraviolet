import { ComponentProps, useState } from 'react'
import TextBox from '..'

const UncontrolledTextBox = ({
  defaultValue = '',
  ...props
}: ComponentProps<typeof TextBox>) => {
  const [value, setValue] = useState(defaultValue)

  return <TextBox name="test" value={value} onChange={setValue} {...props} />
}

export default UncontrolledTextBox
