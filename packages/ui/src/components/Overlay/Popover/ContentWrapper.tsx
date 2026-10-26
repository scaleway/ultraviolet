'use client'

import { CloseIcon } from '@ultraviolet/icons/CloseIcon'
import { Button } from '../../Action/Button'
import { Stack } from '../../Layout/Stack'
import { Text } from '../../Typography/Text'
import { usePopupContext } from '../Popup/v2/context'
import type { ContentWrapperProps } from './types'

export const ContentWrapper = ({ titleId, title, children, sentiment }: ContentWrapperProps) => {
  const { setOpen } = usePopupContext()

  return (
    <Stack gap={1} width="100%">
      <Stack direction="row" justifyContent="space-between">
        <Text as="h2" id={titleId} variant="bodyStrong">
          {title}
        </Text>
        <Button
          accessibleLabel="close"
          onClick={() => setOpen(false)}
          sentiment={sentiment === 'neutral' ? 'neutral' : 'primary'}
          size="xsmall"
          variant={sentiment === 'neutral' ? 'ghost' : 'filled'}
        >
          <CloseIcon />
        </Button>
      </Stack>
      {typeof children === 'string' ? (
        <Text as="p" variant="bodySmall">
          {children}
        </Text>
      ) : (
        children
      )}
    </Stack>
  )
}
