import type { ExpandableProps } from './types'

export const NoAnimationExpandable = ({
  children,
  opened,
  minHeight,
  className,
  'data-testid': dataTestId,
  style,
}: ExpandableProps) => (
  <div
    className={className}
    data-testid={dataTestId}
    style={{ display: opened ? undefined : 'none', minHeight, ...style }}
  >
    {children}
  </div>
)
