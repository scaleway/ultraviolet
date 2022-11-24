import { ComponentProps } from 'react'
import CopyButton, { SIZES } from '../index'

export const Sizes = (props: ComponentProps<typeof CopyButton>) =>
  Object.keys(SIZES).map(size => (
    <CopyButton
      {...props}
      size={size as keyof typeof SIZES}
      value="Text that will be copied"
    />
  ))
