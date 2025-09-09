'use client'

import { Tooltip } from '../Tooltip'
import type { SENTIMENTS } from './constant'
import { animatedCircleStatus, circleStatus, status } from './styles.css'

type StatusSentiment = (typeof SENTIMENTS)[number]

type StatusProps = {
  animated?: boolean
  className?: string
  sentiment: StatusSentiment
  tooltip?: string
  'data-testid'?: string
  /**
   * This prop will set status as a notification and make it absolute to its parent displayed on top right.
   */
  notification?: boolean
}

/**
 * Status component used to display a colored circle with a tooltip for additional information.
 */
export const Status = ({
  animated = false,
  className,
  tooltip,
  sentiment,
  'data-testid': dataTestId,
  notification,
}: StatusProps) => (
  <Tooltip text={tooltip}>
    <span
      className={`${className ? `${className} ` : ''}${status({ notification })}`}
      data-testid={dataTestId}
    >
      {animated ? (
        <span className={animatedCircleStatus({ sentiment })} />
      ) : null}
      <span className={circleStatus({ sentiment })} />
    </span>
  </Tooltip>
)
