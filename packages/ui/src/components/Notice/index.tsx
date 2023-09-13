import { Icon } from '@ultraviolet/icons'
import type { ReactNode } from 'react'
import { Stack } from '../Stack'
import { Text } from '../Text'

type NoticeProps = {
  children: ReactNode
  className?: string
  'data-testid'?: string
}

/**
 * A Notice is used to display a short message to the user.
 */
export const Notice = ({
  children,
  className,
  'data-testid': dataTestId,
}: NoticeProps) => (
  <Stack
    direction="row"
    alignItems="center"
    gap={1}
    data-testid={dataTestId}
    className={className}
  >
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
