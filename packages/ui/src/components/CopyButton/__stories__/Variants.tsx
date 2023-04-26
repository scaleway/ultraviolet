import type { ComponentProps } from 'react'
import { CopyButton } from '../index'

export const Variants = (props: ComponentProps<typeof CopyButton>) =>
  (['primary', 'neutral'] as const).map(variant => (
    <CopyButton {...props} variant={variant} value="Text that will be copied" />
  ))
