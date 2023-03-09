import type { ReactNode } from 'react'
import { Icon } from '../Icon'
import { Stack } from '../Stack'
import { Text } from '../Text'

type NoticeProps = {
  children: ReactNode
  className?: string
}

export const Notice = ({ children, className }: NoticeProps) => (
  <Stack direction="row" alignItems="center" gap={1} className={className}>
    <Icon
      name="information-outline"
      size={20}
      color="neutral"
      prominence="weak"
    />
    {typeof children === 'string' ? (
      <Text as="p" variant="caption" color="neutral" prominence="weak">
        {children}
      </Text>
    ) : (
      children
    )}
  </Stack>
)
