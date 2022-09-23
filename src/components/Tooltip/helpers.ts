import { RefObject } from 'react'

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left' | 'auto'
export const ARROW_WIDTH = 6 // in px
export const SPACE = 6 // in px
export const TOTAL_USED_SPACE = ARROW_WIDTH + SPACE // in px
export const DEFAULT_POSITIONS = {
  arrowLeft: 50,
  arrowTop: 99,
  arrowTransform: 'translate(-50%, -50)',
  left: 0,
  rotate: 135,
  tooltipInitialPosition: 'translate3d(0, 0, 0))',
  top: 0,
}

export const TOOLTIP_INITIAL_POSITION = {
  auto: `translate3d(0, ${TOTAL_USED_SPACE}px, 0)`,
  bottom: `translate3d(0, -${TOTAL_USED_SPACE}px, 0)`,
  left: `translate3d(${TOTAL_USED_SPACE}px, 0, 0)`,
  right: `translate3d(-${TOTAL_USED_SPACE}px, 0, 0)`,
  top: `translate3d(0, ${TOTAL_USED_SPACE}px, 0)`,
}

type ComputePlacementTypes = {
  childrenStructuredRef: DOMRect
  tooltipStructuredRef: DOMRect
}

/**
 * This function will find the best placement in a window for tooltip based on children position and tooltip size
 */
export const computePlacement = ({
  childrenStructuredRef,
  tooltipStructuredRef,
}: ComputePlacementTypes) => {
  const {
    top: childrenTop,
    left: childrenLeft,
    right: childrenRight,
  } = childrenStructuredRef

  const { width: tooltipWidth, height: tooltipHeight } = tooltipStructuredRef

  if (childrenTop - tooltipHeight - TOTAL_USED_SPACE < 0) {
    return 'bottom'
  }

  if (childrenLeft - tooltipWidth - TOTAL_USED_SPACE < 0) {
    return 'right'
  }

  if (childrenRight + tooltipWidth + TOTAL_USED_SPACE > window.innerWidth) {
    return 'left'
  }

  return 'top'
}

type ComputePositionsTypes = {
  placement: TooltipPlacement
  childrenRef: RefObject<HTMLDivElement>
  tooltipRef: RefObject<HTMLDivElement>
}

/**
 * This function will compute the positions of tooltip and arrow based on children position and tooltip size
 */
export const computePositions = ({
  placement,
  childrenRef,
  tooltipRef,
}: ComputePositionsTypes) => {
  const childrenStructuredRef = (
    childrenRef.current as HTMLDivElement
  ).getBoundingClientRect()
  const tooltipStructuredRef = (
    tooltipRef.current as HTMLDivElement
  ).getBoundingClientRect()

  const placementBasedOnWindowSize =
    placement === 'auto'
      ? computePlacement({
          childrenStructuredRef,
          tooltipStructuredRef,
        })
      : placement

  const {
    top: childrenTop,
    left: childrenLeft,
    right: childrenRight,
    width: childrenWidth,
    height: childrenHeight,
  } = childrenStructuredRef

  const { width: tooltipWidth, height: tooltipHeight } = tooltipStructuredRef

  switch (placementBasedOnWindowSize) {
    case 'bottom':
      return {
        arrowLeft: tooltipWidth / 2,
        arrowTop: -ARROW_WIDTH - 5,
        arrowTransform: '',
        left: childrenLeft + childrenWidth / 2 - tooltipWidth / 2,
        rotate: 180,
        tooltipInitialPosition: TOOLTIP_INITIAL_POSITION.bottom,
        top: childrenTop + childrenHeight + ARROW_WIDTH + SPACE,
      }
    case 'left':
      return {
        arrowLeft: tooltipWidth + ARROW_WIDTH + 5,
        arrowTop: tooltipHeight / 2,
        arrowTransform: 'translate(-50%, -50%)',
        left: childrenLeft - tooltipWidth - ARROW_WIDTH - SPACE * 2,
        rotate: -90,
        tooltipInitialPosition: TOOLTIP_INITIAL_POSITION.left,
        top: childrenTop - tooltipHeight / 2 + childrenHeight / 2,
      }
    case 'right':
      return {
        arrowLeft: -ARROW_WIDTH - 5,
        arrowTop: tooltipHeight / 2,
        arrowTransform: 'translate(50%, -50%)',
        left: childrenRight + ARROW_WIDTH + SPACE * 2,
        rotate: 90,
        tooltipInitialPosition: TOOLTIP_INITIAL_POSITION.right,
        top: childrenTop - tooltipHeight / 2 + childrenHeight / 2,
      }
    default: // top placement is default value
      return {
        arrowLeft: tooltipWidth / 2,
        arrowTop: tooltipHeight - 1,
        arrowTransform: '',
        left: childrenLeft + childrenWidth / 2 - tooltipWidth / 2,
        rotate: 0,
        tooltipInitialPosition: TOOLTIP_INITIAL_POSITION.top,
        top: childrenTop - tooltipHeight - ARROW_WIDTH - SPACE,
      }
  }
}
