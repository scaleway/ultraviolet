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
    <Stack gap={1}>
      <Stack direction="row" justifyContent="space-between">
        <Text
          as="h2"
          id={titleId}
          prominence={sentiment === 'neutral' ? 'strong' : 'stronger'}
          sentiment={sentiment === 'neutral' ? 'neutral' : 'white'}
          variant="bodyStrong"
        >
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
        <Text
          as="p"
          prominence={sentiment === 'neutral' ? 'strong' : 'stronger'}
          sentiment={sentiment === 'neutral' ? 'neutral' : 'white'}
          variant="bodySmall"
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Stack>
  )
}
