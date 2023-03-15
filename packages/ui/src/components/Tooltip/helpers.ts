import type { RefObject } from 'react'

export type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left' | 'auto'
export const ARROW_WIDTH = 6 // in px
const SPACE = 6 // in px
const TOTAL_USED_SPACE = ARROW_WIDTH + SPACE // in px
export const DEFAULT_POSITIONS = {
  arrowLeft: 50,
  arrowTop: 99,
  arrowTransform: 'translate(-50%, -50)',
  placement: 'top',
  rotate: 135,
  tooltipInitialPosition: 'translate3d(0, 0, 0)',
  tooltipPosition: 'translate3d(0, 0, 0)',
}

type ComputePlacementTypes = {
  childrenStructuredRef: DOMRect
  tooltipStructuredRef: DOMRect
}

/**
 * This function will find the best placement in a window for tooltip based on children position and tooltip size
 */
const computePlacement = ({
  childrenStructuredRef,
  tooltipStructuredRef,
}: ComputePlacementTypes) => {
  const {
    top: childrenX,
    left: childrenY,
    right: childrenRight,
  } = childrenStructuredRef

  const { width: tooltipWidth, height: tooltipHeight } = tooltipStructuredRef

  if (childrenX - tooltipHeight - TOTAL_USED_SPACE < 0) {
    return 'bottom'
  }

  if (childrenY - tooltipWidth - TOTAL_USED_SPACE < 0) {
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

  // It will get how much scroll is done on the page to compute the position of the tooltip
  const scrollTopValue = document.documentElement.scrollTop

  switch (placementBasedOnWindowSize) {
    case 'bottom': {
      const positionX = childrenLeft + childrenWidth / 2 - tooltipWidth / 2
      const positionY =
        childrenTop + scrollTopValue + childrenHeight + ARROW_WIDTH + SPACE

      return {
        arrowLeft: tooltipWidth / 2,
        arrowTop: -ARROW_WIDTH - 5,
        arrowTransform: '',
        placement: 'bottom',
        rotate: 180,
        tooltipInitialPosition: `translate3d(${positionX}px, ${
          positionY - TOTAL_USED_SPACE
        }px, 0)`,
        tooltipPosition: `translate3d(${positionX}px, ${positionY}px, 0)`,
      }
    }
    case 'left': {
      const positionX = childrenLeft - tooltipWidth - ARROW_WIDTH - SPACE * 2
      const positionY =
        childrenTop + scrollTopValue - tooltipHeight / 2 + childrenHeight / 2

      return {
        arrowLeft: tooltipWidth + ARROW_WIDTH + 5,
        arrowTop: tooltipHeight / 2,
        arrowTransform: 'translate(-50%, -50%)',
        placement: 'left',
        rotate: -90,
        tooltipInitialPosition: `translate3d(${
          positionX + TOTAL_USED_SPACE
        }px, ${positionY}px, 0)`,
        tooltipPosition: `translate3d(${positionX}px, ${positionY}px, 0)`,
      }
    }
    case 'right': {
      const positionX = childrenRight + ARROW_WIDTH + SPACE * 2
      const positionY =
        childrenTop + scrollTopValue - tooltipHeight / 2 + childrenHeight / 2

      return {
        arrowLeft: -ARROW_WIDTH - 5,
        arrowTop: tooltipHeight / 2,
        arrowTransform: 'translate(50%, -50%)',
        placement: 'right',
        rotate: 90,
        tooltipInitialPosition: `translate3d(${
          positionX - TOTAL_USED_SPACE
        }px, ${positionY}px, 0)`,
        tooltipPosition: `translate3d(${positionX}px, ${positionY}px, 0)`,
      }
    }
    default: {
      // top placement is default value
      const positionX = childrenLeft + childrenWidth / 2 - tooltipWidth / 2
      const positionY =
        childrenTop + scrollTopValue - tooltipHeight - ARROW_WIDTH - SPACE

      return {
        arrowLeft: tooltipWidth / 2,
        arrowTop: tooltipHeight - 1,
        arrowTransform: '',
        placement: 'top',
        rotate: 0,
        tooltipInitialPosition: `translate3d(${positionX}px, ${
          positionY + TOTAL_USED_SPACE
        }px, 0)`,
        tooltipPosition: `translate3d(${positionX}px, ${positionY}px, 0)`,
      }
    }
  }
}
