import type { RefObject } from 'react'

export type PopupPlacement = 'top' | 'right' | 'bottom' | 'left' | 'auto'
export const ARROW_WIDTH = 8 // in px
const SPACE = 4 // in px
const TOTAL_USED_SPACE = 0 // in px
export const DEFAULT_POSITIONS = {
  arrowLeft: -999,
  arrowTop: -999,
  arrowTransform: 'translate(-50%, -50)',
  placement: 'top',
  rotate: 135,
  tooltipInitialPosition: 'translate3d(-999px, -999px, 0)',
  tooltipPosition: 'translate3d(-999px, -999px, 0)',
}

type ComputePlacementTypes = {
  childrenStructuredRef: DOMRect
  tooltipStructuredRef: DOMRect
  popupPortalTarget: HTMLElement
  offsetParentRect: DOMRect
}

/**
 * This function will find the best placement in a window for tooltip based on children position and tooltip size
 */
const computePlacement = ({
  childrenStructuredRef,
  tooltipStructuredRef,
  offsetParentRect,
  popupPortalTarget,
}: ComputePlacementTypes) => {
  const {
    top: childrenTop,
    left: childrenLeft,
    right: childrenRight,
  } = childrenStructuredRef

  const {
    top: parentTop,
    left: parentLeft,
    right: parentRight,
  } = offsetParentRect

  const overloadedChildrenLeft =
    popupPortalTarget === document.body
      ? childrenLeft
      : childrenLeft - parentLeft
  const overloadedChildrenTop =
    popupPortalTarget === document.body ? childrenTop : childrenTop - parentTop
  const overloadedChildrenRight =
    popupPortalTarget === document.body
      ? childrenRight
      : childrenRight - parentRight

  const { width: tooltipWidth, height: tooltipHeight } = tooltipStructuredRef

  if (overloadedChildrenTop - tooltipHeight - TOTAL_USED_SPACE < 0) {
    return 'bottom'
  }

  if (overloadedChildrenLeft - tooltipWidth - TOTAL_USED_SPACE < 0) {
    return 'right'
  }

  if (
    overloadedChildrenRight + tooltipWidth + TOTAL_USED_SPACE >
    window.innerWidth
  ) {
    return 'left'
  }

  return 'top'
}

type ComputePositionsTypes = {
  placement: PopupPlacement
  childrenRef: RefObject<HTMLDivElement>
  tooltipRef: RefObject<HTMLDivElement>
  popupPortalTarget: HTMLElement
}

/**
 * This function will compute the positions of tooltip and arrow based on children position and tooltip size
 */
export const computePositions = ({
  placement,
  childrenRef,
  tooltipRef,
  popupPortalTarget,
}: ComputePositionsTypes) => {
  const childrenStructuredRef = (
    childrenRef.current as HTMLDivElement
  ).getBoundingClientRect()
  const offsetParentRect =
    childrenRef?.current?.offsetParent?.getBoundingClientRect() ?? {
      top: 0,
      left: 0,
      right: 0,
    }
  const tooltipStructuredRef = (
    tooltipRef.current as HTMLDivElement
  ).getBoundingClientRect()

  const placementBasedOnWindowSize =
    placement === 'auto'
      ? computePlacement({
          childrenStructuredRef,
          tooltipStructuredRef,
          offsetParentRect: offsetParentRect as DOMRect,
          popupPortalTarget,
        })
      : placement

  const {
    top: childrenTop,
    left: childrenLeft,
    right: childrenRight,
    width: childrenWidth,
    height: childrenHeight,
  } = childrenStructuredRef

  const {
    top: parentTop,
    left: parentLeft,
    right: parentRight,
  } = offsetParentRect as DOMRect

  const { width: tooltipWidth, height: tooltipHeight } = tooltipStructuredRef

  // It will get how much scroll is done on the page to compute the position of the tooltip
  const scrollTopValue =
    popupPortalTarget === document.body ? document.documentElement.scrollTop : 0

  // We need to compute the position of the tooltip based on the parent element in the case the popup is not in the body
  const overloadedChildrenLeft =
    popupPortalTarget === document.body
      ? childrenLeft
      : childrenLeft - parentLeft
  const overloadedChildrenTop =
    popupPortalTarget === document.body ? childrenTop : childrenTop - parentTop
  const overloadedChildrenRight =
    popupPortalTarget === document.body
      ? childrenRight
      : childrenRight + childrenWidth + ARROW_WIDTH + SPACE - parentRight / 2

  switch (placementBasedOnWindowSize) {
    case 'bottom': {
      const positionX =
        overloadedChildrenLeft + childrenWidth / 2 - tooltipWidth / 2
      const positionY =
        overloadedChildrenTop +
        scrollTopValue +
        childrenHeight +
        ARROW_WIDTH +
        SPACE

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
      const positionX =
        overloadedChildrenLeft - tooltipWidth - ARROW_WIDTH - SPACE * 2
      const positionY =
        overloadedChildrenTop +
        scrollTopValue -
        tooltipHeight / 2 +
        childrenHeight / 2

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
      const positionX = overloadedChildrenRight + ARROW_WIDTH + SPACE * 2
      const positionY =
        overloadedChildrenTop +
        scrollTopValue -
        tooltipHeight / 2 +
        childrenHeight / 2

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
      const positionX =
        overloadedChildrenLeft + childrenWidth / 2 - tooltipWidth / 2
      const positionY =
        overloadedChildrenTop +
        scrollTopValue -
        tooltipHeight -
        ARROW_WIDTH -
        SPACE

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
