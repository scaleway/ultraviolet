import type { ComponentProps } from 'react'
import { CopyButton } from '../index'

export const Sentiments = (props: ComponentProps<typeof CopyButton>) =>
  (['primary', 'neutral'] as const).map(sentiment => (
    <CopyButton
      key={sentiment}
      {...props}
      sentiment={sentiment}
      value="Text that will be copied"
    />
  ))
