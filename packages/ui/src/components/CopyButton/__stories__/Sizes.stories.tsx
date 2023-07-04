import type { ComponentProps } from 'react'
import { CopyButton } from '../index'

export const Sizes = (props: ComponentProps<typeof CopyButton>) =>
  (['small', 'large'] as const).map(size => (
    <CopyButton {...props} size={size} value="Text that will be copied" />
  ))
