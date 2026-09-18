import type { ComponentProps } from 'react'
import { SENTIMENTS } from '../../../../theme'
import { CopyButton } from '../index'

export const Sentiments = (props: ComponentProps<typeof CopyButton>) =>
  SENTIMENTS.map(sentiment => (
    <CopyButton key={sentiment} {...props} sentiment={sentiment} value="Text that will be copied" />
  ))
