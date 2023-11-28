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
  popupInitialPosition: 'translate3d(-999px, -999px, 0)',
  popupPosition: 'translate3d(-999px, -999px, 0)',
}

type ComputePlacementTypes = {
  childrenStructuredRef: DOMRect
  popupStructuredRef: DOMRect
  popupPortalTarget: HTMLElement
  offsetParentRect: DOMRect
  offsetParent: Element
}

/**
 * This function will find the best placement in a window for popup based on children position and popup size
 */
const computePlacement = ({
  childrenStructuredRef,
  popupStructuredRef,
  offsetParentRect,
  offsetParent,
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

  const isPopupPortalTargetBody =
    popupPortalTarget === document.body || offsetParent === document.body

  const overloadedChildrenLeft = isPopupPortalTargetBody
    ? childrenLeft
    : childrenLeft - parentLeft
  const overloadedChildrenTop = isPopupPortalTargetBody
    ? childrenTop
    : childrenTop - parentTop
  const overloadedChildrenRight = isPopupPortalTargetBody
    ? childrenRight
    : childrenRight - parentRight

  const { width: popupWidth, height: popupHeight } = popupStructuredRef

  if (overloadedChildrenTop - popupHeight - TOTAL_USED_SPACE < 0) {
    return 'bottom'
  }

  if (overloadedChildrenLeft - popupWidth - TOTAL_USED_SPACE < 0) {
    return 'right'
  }

  if (
    overloadedChildrenRight + popupWidth + TOTAL_USED_SPACE >
    window.innerWidth
  ) {
    return 'left'
  }

  return 'top'
}

/**
 * This function will check if the offset parent is usable for popup positioning
 * If not it will loop and search for a compatible parent until document.body is reached
 */
const findOffsetParent = (element: RefObject<HTMLDivElement>) => {
  const offsetParent = element?.current?.offsetParent

  // We need to check if offsetParent is a table cell or a table because they are not suitable for positioning
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
  if (offsetParent && !['TH', 'TD', 'TABLE'].includes(offsetParent.tagName)) {
    return offsetParent
  }

  let currentElement = element?.current

  while (currentElement && currentElement.tagName !== 'BODY') {
    const { position } = window.getComputedStyle(currentElement)

    // Check if the current element is a potential offset parent
    if (position !== 'static') {
      return currentElement
    }

    currentElement = currentElement.parentElement as HTMLDivElement
  }

  // If no suitable offset parent is found, return the body element
  return document.body
}

type ComputePositionsTypes = {
  placement: PopupPlacement
  childrenRef: RefObject<HTMLDivElement>
  popupRef: RefObject<HTMLDivElement>
  popupPortalTarget: HTMLElement
}

/**
 * This function will compute the positions of popup and arrow based on children position and popup size
 */
export const computePositions = ({
  placement,
  childrenRef,
  popupRef,
  popupPortalTarget,
}: ComputePositionsTypes) => {
  const childrenRect = (
    childrenRef.current as HTMLDivElement
  ).getBoundingClientRect()
  const offsetParent = findOffsetParent(childrenRef)
  const offsetParentRect = offsetParent?.getBoundingClientRect() ?? {
    top: 0,
    left: 0,
    right: 0,
  }
  const popupStructuredRef = (
    popupRef.current as HTMLDivElement
  ).getBoundingClientRect()

  const placementBasedOnWindowSize =
    placement === 'auto'
      ? computePlacement({
          childrenStructuredRef: childrenRect,
          popupStructuredRef,
          offsetParentRect,
          popupPortalTarget,
          offsetParent,
        })
      : placement

  const {
    top: childrenTop,
    left: childrenLeft,
    right: childrenRight,
    width: childrenWidth,
    height: childrenHeight,
  } = childrenRect

  const {
    top: parentTop,
    left: parentLeft,
    right: parentRight,
  } = offsetParentRect

  const { width: popupWidth, height: popupHeight } = popupStructuredRef

  // offSetParent is the closest positioned ancestor. If the element is not positioned, the nearest table cell or root element is used.
  const isPopupPortalTargetBody =
    popupPortalTarget === document.body || offsetParent === document.body

  // It will get how much scroll is done on the page to compute the position of the popup
  const scrollTopValue = isPopupPortalTargetBody
    ? document.documentElement.scrollTop
    : offsetParent.scrollTop

  // We need to compute the position of the popup based on the parent element in the case the popup is not in the body
  const overloadedChildrenLeft = isPopupPortalTargetBody
    ? childrenLeft
    : childrenLeft - parentLeft
  const overloadedChildrenTop = isPopupPortalTargetBody
    ? childrenTop
    : childrenTop - parentTop
  const overloadedChildrenRight = isPopupPortalTargetBody
    ? childrenRight
    : childrenRight + childrenWidth + ARROW_WIDTH + SPACE - parentRight / 2

  switch (placementBasedOnWindowSize) {
    case 'bottom': {
      const positionX =
        overloadedChildrenLeft + childrenWidth / 2 - popupWidth / 2
      const positionY =
        overloadedChildrenTop +
        scrollTopValue +
        childrenHeight +
        ARROW_WIDTH +
        SPACE

      return {
        arrowLeft: popupWidth / 2,
        arrowTop: -ARROW_WIDTH - 5,
        arrowTransform: '',
        placement: 'bottom',
        rotate: 180,
        popupInitialPosition: `translate3d(${positionX}px, ${
          positionY - TOTAL_USED_SPACE
        }px, 0)`,
        popupPosition: `translate3d(${positionX}px, ${positionY}px, 0)`,
      }
    }
    case 'left': {
      const positionX =
        overloadedChildrenLeft - popupWidth - ARROW_WIDTH - SPACE * 2
      const positionY =
        overloadedChildrenTop +
        scrollTopValue -
        popupHeight / 2 +
        childrenHeight / 2

      return {
        arrowLeft: popupWidth + ARROW_WIDTH + 5,
        arrowTop: popupHeight / 2,
        arrowTransform: 'translate(-50%, -50%)',
        placement: 'left',
        rotate: -90,
        popupInitialPosition: `translate3d(${
          positionX + TOTAL_USED_SPACE
        }px, ${positionY}px, 0)`,
        popupPosition: `translate3d(${positionX}px, ${positionY}px, 0)`,
      }
    }
    case 'right': {
      const positionX = overloadedChildrenRight + ARROW_WIDTH + SPACE * 2
      const positionY =
        overloadedChildrenTop +
        scrollTopValue -
        popupHeight / 2 +
        childrenHeight / 2

      return {
        arrowLeft: -ARROW_WIDTH - 5,
        arrowTop: popupHeight / 2,
        arrowTransform: 'translate(50%, -50%)',
        placement: 'right',
        rotate: 90,
        popupInitialPosition: `translate3d(${
          positionX - TOTAL_USED_SPACE
        }px, ${positionY}px, 0)`,
        popupPosition: `translate3d(${positionX}px, ${positionY}px, 0)`,
      }
    }
    default: {
      // top placement is default value
      const positionX =
        overloadedChildrenLeft + childrenWidth / 2 - popupWidth / 2
      const positionY =
        overloadedChildrenTop +
        scrollTopValue -
        popupHeight -
        ARROW_WIDTH -
        SPACE

      return {
        arrowLeft: popupWidth / 2,
        arrowTop: popupHeight - 1,
        arrowTransform: '',
        placement: 'top',
        rotate: 0,
        popupInitialPosition: `translate3d(${positionX}px, ${
          positionY + TOTAL_USED_SPACE
        }px, 0)`,
        popupPosition: `translate3d(${positionX}px, ${positionY}px, 0)`,
      }
    }
  }
}
