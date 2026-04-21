import type { RefObject } from 'react'

const PLACEMENTS = ['top', 'right', 'bottom', 'left', 'nested-menu'] as const

type Placements = (typeof PLACEMENTS)[number]

type AddPrefixToUnion<T extends string, P extends string> = T extends string
  ? `${P}${T}`
  : never

type AutoPlacements =
  | AddPrefixToUnion<Exclude<Placements, 'nested-menu'>, 'auto-'>
  | 'auto'

export type PopupPlacement = AutoPlacements | Placements
export type PopupAlign = 'start' | 'center'

const isGenericPlacement = (
  placement: PopupPlacement,
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
): placement is Placements => PLACEMENTS.includes(placement as Placements)

export const DEFAULT_ARROW_WIDTH = 8 // in px
const SPACE = 4 // in px
export const DEFAULT_POSITIONS = {
  arrowLeft: 0,
  arrowTop: 0,
  arrowTransform: 'translate(-50%, -50)',
  placement: 'top',
  popupInitialPosition: 'translate3d(0px, 0px, 0)',
  popupPosition: 'translate3d(0px, 0px, 0)',
  rotate: 135,
}

type ComputePlacementTypes = {
  childrenStructuredRef: DOMRect
  popupStructuredRef: DOMRect
  popupPortalTarget: HTMLElement
  offsetParentRect: DOMRect
  offsetParent: Element
  isNestedMenu?: boolean
  autoPlacement?: AutoPlacements
  arrowWidth: number
}
// Depending on the auto-placement preferences, change the placements hierarchy

const getOrderOfPlacement = (autoPlacement: AutoPlacements) => {
  if (autoPlacement === 'auto-bottom') {
    return ['bottom', 'top', 'left', 'right'] as const
  }
  if (autoPlacement === 'auto-left') {
    return ['left', 'right', 'top', 'bottom'] as const
  }

  if (autoPlacement === 'auto-right') {
    return ['right', 'left', 'top', 'bottom'] as const
  }

  return ['top', 'bottom', 'left', 'right'] as const
}

// Space between the popup and its target
const getHorizontalSpacing = (arrowWidth: number) => arrowWidth + SPACE * 2
const getVerticalSpacing = (arrowWidth: number) => arrowWidth + SPACE

/**
 * This function will find the best placement in a window for popup based on children position and popup size
 */
const computePlacement = ({
  childrenStructuredRef,
  popupStructuredRef,
  offsetParentRect,
  offsetParent,
  popupPortalTarget,
  isNestedMenu,
  autoPlacement,
  arrowWidth,
}: ComputePlacementTypes) => {
  const {
    top: childrenTop,
    bottom: childrenBottom,
    left: childrenLeft,
    right: childrenRight,
    width: childrenWidth,
    height: childrenHeight,
  } = childrenStructuredRef

  const orderOfPlacement = getOrderOfPlacement(autoPlacement ?? 'auto')

  const { top: parentTop, left: parentLeft } = offsetParentRect

  const isPopupPortalTargetBody =
    popupPortalTarget === document.body || offsetParent === document.body

  const overloadedChildrenLeft = isPopupPortalTargetBody
    ? childrenLeft
    : childrenLeft - parentLeft
  const overloadedChildrenTop = isPopupPortalTargetBody
    ? childrenTop
    : childrenTop - parentTop
  const overloadedChildrenBottom = isPopupPortalTargetBody
    ? childrenBottom
    : childrenTop - parentTop + childrenHeight
  const overloadedChildrenRight = isPopupPortalTargetBody
    ? childrenRight
    : childrenLeft - parentLeft + childrenWidth

  const { width: popupWidth, height: popupHeight } = popupStructuredRef

  if (isNestedMenu) {
    if (overloadedChildrenRight + popupWidth > window.innerWidth) {
      return 'left'
    }

    return 'right'
  }

  const conditionsOfPlacement = {
    bottom:
      overloadedChildrenBottom + getVerticalSpacing(arrowWidth) + popupHeight <=
      window.innerHeight,
    left:
      overloadedChildrenLeft - getHorizontalSpacing(arrowWidth) - popupWidth >=
      0,
    right:
      overloadedChildrenRight + getHorizontalSpacing(arrowWidth) + popupWidth <=
      window.innerWidth,
    top:
      overloadedChildrenTop - getVerticalSpacing(arrowWidth) - popupHeight >= 0,
  }

  return (
    orderOfPlacement.find(placement => conditionsOfPlacement[placement]) ||
    orderOfPlacement[3]
  )
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

    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    currentElement = currentElement.parentElement as HTMLDivElement
  }

  // If no suitable offset parent is found, return the body element
  return document.body
}

const getVerticalOverflow = (
  childrenRect: DOMRect,
  offsetParentRect: DOMRect,
  popupHalfWidthWithArrow: number,
  popupWidth: number,
) => {
  const { left: parentLeft, right: parentRight } = offsetParentRect
  const { left: childrenLeft, width: childrenWidth } = childrenRect

  const popupLeft = childrenLeft + childrenWidth / 2 - popupWidth / 2
  const popupRight = popupLeft + popupWidth

  if (popupRight > parentRight) {
    if (Math.abs(popupRight - parentRight) > popupHalfWidthWithArrow) {
      return -popupHalfWidthWithArrow
    }
    return parentRight - popupRight
  }

  if (popupLeft < parentLeft) {
    if (Math.abs(popupLeft - parentLeft) > popupHalfWidthWithArrow) {
      return popupHalfWidthWithArrow
    }
    return Math.abs(popupLeft - parentLeft)
  }

  return undefined
}

const getHorizontalOverflow = (
  childrenRect: DOMRect,
  offsetParentRect: DOMRect,
  popupHeight: number,
  popupHalfHeightWithArrow: number,
) => {
  const { top: parentTop, bottom: parentBottom } = offsetParentRect
  const { top: childrenTop, height: childrenHeight } = childrenRect

  const popupTop = childrenTop + childrenHeight / 2 - popupHeight / 2
  const popupBottom = popupTop + popupHeight

  if (popupTop < parentTop) {
    if (Math.abs(popupTop - parentTop) > popupHalfHeightWithArrow) {
      return popupHalfHeightWithArrow
    }
    return Math.abs(popupTop - parentTop)
  }

  if (popupBottom > parentBottom) {
    if (Math.abs(popupBottom - parentBottom) > popupHalfHeightWithArrow) {
      return -popupHalfHeightWithArrow
    }
    return parentBottom - popupBottom
  }

  return undefined
}
/**
 * This function will check if there is an overflow of the popup compared to the parent it is set in.
 * Depending on the position, for top and bottom the overflow will be on X axis and for left and right
 * the overflow will be Y axis. The function return the number of pixels the popup is overflowing
 * and that needs to be reajusted.
 * @param position the position of the popup
 * @param offsetParentRect the rect of the parent element where the children is located in
 * @param childrenRect the rect of the children element, the children element is the one that will trigger the popup
 * @param popupStructuredRef the rect of the popup, the popup itself
 */
const getPopupOverflowFromParent = (
  position: Placements,
  offsetParentRect: DOMRect,
  childrenRect: DOMRect,
  popupStructuredRef: DOMRect,
  arrowWidth: number,
) => {
  const { width: popupWidth, height: popupHeight } = popupStructuredRef
  const popupHalfWidthWithArrow = popupWidth / 2 - arrowWidth - 1 // -1 px to compensate border radius
  const popupHalfHeightWithArrow = popupHeight / 2 - arrowWidth - 1 // -1 px to compensate border radius

  if (position === 'top' || position === 'bottom') {
    const overflow = getVerticalOverflow(
      childrenRect,
      offsetParentRect,
      popupHalfWidthWithArrow,
      popupWidth,
    )

    if (overflow) {
      return overflow
    }
  }

  if (position === 'left' || position === 'right') {
    const overflow = getHorizontalOverflow(
      childrenRect,
      offsetParentRect,
      popupHeight,
      popupHalfHeightWithArrow,
    )

    if (overflow) {
      return overflow
    }
  }

  return 0
}

type ComputePositionsTypes = {
  placement: PopupPlacement
  childrenRef: RefObject<HTMLDivElement | null>
  popupRef: RefObject<HTMLDivElement | null>
  popupPortalTarget: HTMLElement
  hasArrow: boolean
  align: PopupAlign
}

const placementBottom = (
  isAligned: boolean,
  overloadedChildrenLeft: number,
  childrenWidth: number,
  popupWidth: number,
  overloadedChildrenTop: number,
  scrollTopValue: number,
  childrenHeight: number,
  arrowWidth: number,
  popupOverflow: number,
  isPopupPortalTargetBody: boolean,
) => {
  const positionX = isAligned
    ? overloadedChildrenLeft
    : overloadedChildrenLeft + childrenWidth / 2 - popupWidth / 2
  const positionY =
    overloadedChildrenTop +
    scrollTopValue +
    childrenHeight +
    getVerticalSpacing(arrowWidth)

  const computedPositionX = isAligned ? positionX : positionX + popupOverflow

  // To make sure the popup does not overflow (negative X position)
  const finalPositionX = isPopupPortalTargetBody
    ? Math.max(computedPositionX, 0)
    : computedPositionX

  return {
    arrowLeft: isAligned ? childrenWidth / 2 : popupWidth / 2 - popupOverflow,
    arrowTop: -arrowWidth - 5,
    arrowTransform: '',
    placement: 'bottom',
    popupInitialPosition: `translate3d(${finalPositionX}px, ${positionY}px, 0)`,
    popupPosition: `translate3d(${finalPositionX}px, ${positionY}px, 0)`,
    rotate: 180,
  }
}

const placementLeft = (
  isAligned: boolean,
  overloadedChildrenLeft: number,
  popupWidth: number,
  overloadedChildrenTop: number,
  scrollTopValue: number,
  childrenHeight: number,
  arrowWidth: number,
  popupOverflow: number,
  popupHeight: number,
) => {
  const positionX =
    overloadedChildrenLeft - popupWidth - getHorizontalSpacing(arrowWidth)
  const positionY = isAligned
    ? overloadedChildrenTop + scrollTopValue
    : overloadedChildrenTop +
      scrollTopValue -
      popupHeight / 2 +
      childrenHeight / 2

  return {
    arrowLeft: popupWidth + arrowWidth + 5,
    arrowTop: isAligned
      ? childrenHeight / 2 - arrowWidth
      : popupHeight / 2 - popupOverflow,
    arrowTransform: 'translate(-50%, -50%)',
    placement: 'left',
    popupInitialPosition: `translate3d(${positionX}px, ${
      positionY + popupOverflow
    }px, 0)`,
    popupPosition: `translate3d(${positionX}px, ${
      positionY + popupOverflow
    }px, 0)`,
    rotate: -90,
  }
}

const placementRight = (
  isAligned: boolean,
  overloadedChildrenTop: number,
  scrollTopValue: number,
  childrenHeight: number,
  arrowWidth: number,
  popupOverflow: number,
  popupHeight: number,
  overloadedChildrenRight: number,
) => {
  const positionX = overloadedChildrenRight + getHorizontalSpacing(arrowWidth)
  const positionY = isAligned
    ? overloadedChildrenTop + scrollTopValue
    : overloadedChildrenTop +
      scrollTopValue -
      popupHeight / 2 +
      childrenHeight / 2

  return {
    arrowLeft: -arrowWidth - 5,
    arrowTop: isAligned
      ? childrenHeight / 2 - arrowWidth
      : popupHeight / 2 - popupOverflow,
    arrowTransform: 'translate(50%, -50%)',
    placement: 'right',
    popupInitialPosition: `translate3d(${positionX}px, ${
      positionY + popupOverflow
    }px, 0)`,
    popupPosition: `translate3d(${positionX}px, ${positionY + popupOverflow}px, 0)`,
    rotate: 90,
  }
}

const placementNested = (
  isAligned: boolean,
  overloadedChildrenTop: number,
  scrollTopValue: number,
  childrenHeight: number,
  arrowWidth: number,
  popupOverflow: number,
  popupHeight: number,
  overloadedChildrenRight: number,
  childrenRect: DOMRect,
  offsetParent: Element,
  offsetParentRect: DOMRect,
  popupStructuredRef: DOMRect,
  overloadedChildrenLeft: number,
  popupWidth: number,
  popupPortalTarget: HTMLElement,
) => {
  if (
    computePlacement({
      childrenStructuredRef: childrenRect,
      isNestedMenu: true,
      offsetParent,
      offsetParentRect,
      popupPortalTarget,
      popupStructuredRef,
      arrowWidth,
    }) === 'right'
  ) {
    // Place the menu top-right
    const positionX = overloadedChildrenRight + getHorizontalSpacing(arrowWidth)
    const positionY = isAligned
      ? overloadedChildrenTop + scrollTopValue
      : overloadedChildrenTop + scrollTopValue - popupHeight / 8

    return {
      arrowLeft: -arrowWidth - 5,
      arrowTop: isAligned
        ? childrenHeight / 2 - arrowWidth
        : popupHeight / 2 - popupOverflow,
      arrowTransform: 'translate(50%, -50%)',
      placement: 'right',
      popupInitialPosition: `translate3d(${
        positionX
      }px, ${positionY + popupOverflow}px, 0)`,
      popupPosition: `translate3d(${positionX}px, ${
        positionY + popupOverflow
      }px, 0)`,
      rotate: 90,
    }
  }

  // Place it top-left
  const positionX =
    overloadedChildrenLeft - popupWidth - getHorizontalSpacing(arrowWidth)
  const positionY = isAligned
    ? overloadedChildrenTop + scrollTopValue
    : overloadedChildrenTop +
      scrollTopValue -
      popupHeight / 2 +
      childrenHeight / 2

  return {
    arrowLeft: popupWidth + arrowWidth + 5,
    arrowTop: isAligned
      ? childrenHeight / 2 - arrowWidth
      : popupHeight / 2 - popupOverflow,
    arrowTransform: 'translate(-50%, -50%)',
    placement: 'left',
    popupInitialPosition: `translate3d(${positionX}px, ${
      positionY + popupOverflow
    }px, 0)`,
    popupPosition: `translate3d(${positionX}px, ${
      positionY + popupOverflow
    }px, 0)`,
    rotate: -90,
  }
}

const placementTop = (
  isAligned: boolean,
  overloadedChildrenTop: number,
  scrollTopValue: number,
  arrowWidth: number,
  popupOverflow: number,
  popupHeight: number,
  overloadedChildrenLeft: number,
  popupWidth: number,
  childrenWidth: number,
  isPopupPortalTargetBody: boolean,
) => {
  // top placement is default value
  const positionX = isAligned
    ? overloadedChildrenLeft
    : overloadedChildrenLeft + childrenWidth / 2 - popupWidth / 2
  const positionY =
    overloadedChildrenTop +
    scrollTopValue -
    popupHeight -
    getVerticalSpacing(arrowWidth)

  const computedPositionX = isAligned ? positionX : positionX + popupOverflow

  // To make sure the popup does not overflow (negative X position)
  const finalPositionX = isPopupPortalTargetBody
    ? Math.max(computedPositionX, 0)
    : computedPositionX

  return {
    arrowLeft: isAligned ? childrenWidth / 2 : popupWidth / 2 - popupOverflow,
    arrowTop: popupHeight - 1,
    arrowTransform: '',
    placement: 'top',
    popupInitialPosition: `translate3d(${finalPositionX}px, ${positionY}px, 0)`,
    popupPosition: `translate3d(${finalPositionX}px, ${positionY}px, 0)`,
    rotate: 0,
  }
}
/**
 * This function will compute the positions of popup and arrow based on children position and popup size
 */
// oxlint-disable-next-line eslint/max-statements
export const computePositions = ({
  placement,
  childrenRef,
  popupRef,
  popupPortalTarget,
  hasArrow,
  align,
}: ComputePositionsTypes) => {
  const arrowWidth = hasArrow ? DEFAULT_ARROW_WIDTH : 0
  const childrenRect = childrenRef.current!.getBoundingClientRect()
  const offsetParent = findOffsetParent(
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    childrenRef as RefObject<HTMLDivElement>,
  )
  const offsetParentRect = offsetParent?.getBoundingClientRect() ?? {
    left: 0,
    right: window?.innerWidth ?? 0,
    top: 0,
    bottom: window?.innerHeight ?? 0,
  }

  const popupStructuredRef = popupRef.current!.getBoundingClientRect()

  const placementBasedOnWindowSize = isGenericPlacement(placement)
    ? placement
    : computePlacement({
        autoPlacement: placement,
        childrenStructuredRef: childrenRect,
        offsetParent,
        offsetParentRect,
        popupPortalTarget,
        popupStructuredRef,
        arrowWidth,
      })

  const {
    top: childrenTop,
    left: childrenLeft,
    right: childrenRight,
    width: childrenWidth,
    height: childrenHeight,
  } = childrenRect

  const { top: parentTop, left: parentLeft } = offsetParentRect

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
    : childrenLeft - parentLeft + childrenWidth

  const popupOverflow = getPopupOverflowFromParent(
    placementBasedOnWindowSize,
    offsetParentRect,
    childrenRect,
    popupStructuredRef,
    arrowWidth,
  )

  const isAligned = align === 'start'

  switch (placementBasedOnWindowSize) {
    case 'bottom': {
      return placementBottom(
        isAligned,
        overloadedChildrenLeft,
        childrenWidth,
        popupWidth,
        overloadedChildrenTop,
        scrollTopValue,
        childrenHeight,
        arrowWidth,
        popupOverflow,
        isPopupPortalTargetBody,
      )
    }
    case 'left': {
      return placementLeft(
        isAligned,
        overloadedChildrenLeft,
        popupWidth,
        overloadedChildrenTop,
        scrollTopValue,
        childrenHeight,
        arrowWidth,
        popupOverflow,
        popupHeight,
      )
    }
    case 'right': {
      return placementRight(
        isAligned,
        overloadedChildrenTop,
        scrollTopValue,
        childrenHeight,
        arrowWidth,
        popupOverflow,
        popupHeight,
        overloadedChildrenRight,
      )
    }
    case 'nested-menu': {
      return placementNested(
        isAligned,
        overloadedChildrenTop,
        scrollTopValue,
        childrenHeight,
        arrowWidth,
        popupOverflow,
        popupHeight,
        overloadedChildrenRight,
        childrenRect,
        offsetParent,
        offsetParentRect,
        popupStructuredRef,
        overloadedChildrenLeft,
        popupWidth,
        popupPortalTarget,
      )
    }
    case 'top': {
      return placementTop(
        isAligned,
        overloadedChildrenTop,
        scrollTopValue,
        arrowWidth,
        popupOverflow,
        popupHeight,
        overloadedChildrenLeft,
        popupWidth,
        childrenWidth,
        isPopupPortalTargetBody,
      )
    }
    default: {
      return placementTop(
        isAligned,
        overloadedChildrenTop,
        scrollTopValue,
        arrowWidth,
        popupOverflow,
        popupHeight,
        overloadedChildrenLeft,
        popupWidth,
        childrenWidth,
        isPopupPortalTargetBody,
      )
    }
  }
}
