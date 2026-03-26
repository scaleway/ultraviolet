'use client'

import { AnimatedExpandable } from './AnimatedExpandable'
import { ANIMATION_DURATION } from './constant'
import { NoAnimationExpandable } from './NonAnimatedExpandable'

import type { ExpandableProps } from './types'

/**
 * The Expandable component is a dynamic React component that allows for the expansion of its children content
 * based on its height. The component comes with a sleek and smooth animation, providing a visually pleasing
 * user experience.
 */
export const Expandable = ({
  children,
  opened,
  minHeight,
  className,
  'data-testid': dataTestId,
  animationDuration = ANIMATION_DURATION,
  style,
}: ExpandableProps) => {
  if (animationDuration > 0) {
    return (
      <AnimatedExpandable
        animationDuration={animationDuration}
        className={className}
        data-testid={dataTestId}
        minHeight={minHeight}
        opened={opened}
        style={style}
      >
        {children}
      </AnimatedExpandable>
    )
  }

  return (
    <NoAnimationExpandable
      className={className}
      data-testid={dataTestId}
      minHeight={minHeight}
      opened={opened}
      style={style}
    >
      {children}
    </NoAnimationExpandable>
  )
}
