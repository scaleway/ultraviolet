import { cn } from '@ultraviolet/utils'
import type { TooltipProps } from '.'
import type { useTooltip } from './useTooltip'
import { tooltipStyle } from './styles.css'

type TooltipElementProps = Pick<TooltipProps, 'id' | 'className' | 'style' | 'data-testid' | 'maxWidth' | 'text'> & {
  tooltip: ReturnType<typeof useTooltip>
}

export function TooltipElement({
  tooltip,
  id,
  className,
  style,
  'data-testid': dataTestId,
  maxWidth,
  text,
}: TooltipElementProps) {
  return (
    <div
      {...tooltip.getFloatingProps()}
      id={id}
      className={cn(
        className,
        tooltipStyle.tooltip,
        tooltip.status === 'close' ? tooltipStyle.animation.exit : tooltipStyle.animation.enter,
      )}
      data-placement={tooltip.finalPlacement}
      data-testid={dataTestId}
      ref={tooltip.refs.setFloating}
      role="tooltip"
      style={{
        ...tooltip.floatingStyles,
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        ...style,
      }}
    >
      <div className={tooltipStyle.arrow} ref={tooltip.arrowRef} style={tooltip.arrowStyle} />
      <div className={tooltipStyle.content}>{text}</div>
    </div>
  )
}
