import { assignInlineVars } from '@vanilla-extract/dynamic'
import { Children } from 'react'

import { Text } from '../../components/Text'

import { maxWidthTextVar } from './Components/components.css'
import { useOverlay } from './OverlayContext'
import { estimateCostStyle } from './styles.css'

import type { ReactNode } from 'react'

export const Ellipsis = ({
  children,
  maxWidth = 350,
  'data-testid': dataTestId,
}: {
  children: ReactNode
  maxWidth?: number
  'data-testid'?: string
}) => {
  const { isOverlay } = useOverlay()
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const text = Children.toArray(children).join('').toString()

  return (
    <div
      data-testid={dataTestId}
      style={{ display: isOverlay ? undefined : 'inline-flex' }}
    >
      <Text
        as="p"
        className={estimateCostStyle.maxWidthText}
        oneLine
        style={assignInlineVars({
          [maxWidthTextVar]: isOverlay ? '200px' : `${maxWidth}px`,
        })}
        variant="bodyStrong"
      >
        {text}
      </Text>
    </div>
  )
}
