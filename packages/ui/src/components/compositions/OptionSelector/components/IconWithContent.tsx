import type { ReactNode } from 'react'
import { Stack } from '../../../Stack'

export const IconWithContent = ({
  content,
  icon,
}: {
  content: ReactNode
  icon: ReactNode
}) => (
  <Stack alignItems="center" direction="row" gap="1.5">
    {icon}
    {content}
  </Stack>
)
