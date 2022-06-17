import styled from '@emotion/styled'
import {
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { getUUID } from '../../utils'

const ARROW_WIDTH = 6 // in px
const SPACE = 6 // in px
const ANIMATION_DURATION = 230 // in ms
const DEFAULT_POSITIONS = {
  arrowLeft: 50,
  arrowTop: 99,
  arrowTransform: 'translate(-50%, -50)',
  left: 0,
  rotate: 135,
  tooltipInitialPosition: 'translateX(0%)',
  top: 0,
}
const TOOLTIP_INITIAL_POSITION = {
  bottom: 'translateY(-40%)',
  left: 'translateX(15%)',
  right: 'translateX(-15%)',
  top: 'translateY(+40%)',
}

type PositionsType = {
  arrowLeft: number
  arrowTop: number
  arrowTransform: string
  left: number
  rotate: number
  top: number
  tooltipInitialPosition: string
}

const StyledTooltip = styled.div<{
  maxWidth: number
  positions: PositionsType
}>`
  background: ${({ theme }) => theme.colors.neutral.backgroundStronger};
  color: ${({ theme }) => theme.colors.neutral.textStronger};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: ${({ theme }) => `${theme.space['0.5']} ${theme.space['1']}`};
  text-align: center;
  position: fixed;
  max-width: ${({ maxWidth }) => maxWidth}px;
  left: ${({ positions }) => positions.left}px;
  top: ${({ positions }) => positions.top}px;
  opacity: 0;
  transition: ${ANIMATION_DURATION}ms opacity ease-in-out,
    ${ANIMATION_DURATION}ms transform ease-in-out;
  transform: ${({ positions }) => positions.tooltipInitialPosition};
  font-size: 0.8rem;

  &::after {
    content: ' ';
    position: absolute;
    top: ${({ positions }) => positions.arrowTop}px;
    left: ${({ positions }) => positions.arrowLeft}px;
    transform: ${({ positions }) => positions.arrowTransform}
      rotate(${({ positions }) => positions.rotate}deg);
    margin-left: -${ARROW_WIDTH}px;
    border-width: ${ARROW_WIDTH}px;
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.neutral.backgroundStronger}
      transparent transparent transparent;
  }
`

type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left'

type ComputePositionsTypes = {
  placement: TooltipPlacement
  childrenRef: RefObject<HTMLDivElement>
  tooltipRef: RefObject<HTMLDivElement>
}

const computePositions = ({
  placement,
  childrenRef,
  tooltipRef,
}: ComputePositionsTypes) => {
  const {
    top: childrenTop,
    left: childrenLeft,
    right: childrenRight,
    width: childrenWidth,
    height: childrenHeight,
  } = (childrenRef.current as HTMLDivElement).getBoundingClientRect()

  const { width: tooltipWidth, height: tooltipHeight } = (
    tooltipRef.current as HTMLDivElement
  ).getBoundingClientRect()

  switch (placement) {
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

type TooltipProps = {
  id?: string
  children: ReactNode
  maxWidth?: number
  placement?: TooltipPlacement
  text?: ReactNode
  className?: string
}

const Tooltip = ({
  children,
  text = '',
  placement = 'top',
  id,
  className,
  maxWidth = 232,
}: TooltipProps): JSX.Element => {
  const childrenRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setInterval>>()
  const [visibleInDom, setVisibleInDom] = useState(false)
  const [positions, setPositions] = useState<PositionsType>({
    ...DEFAULT_POSITIONS,
    tooltipInitialPosition: TOOLTIP_INITIAL_POSITION[placement],
  })

  const generatedId = useMemo(() => {
    if (!id) return getUUID('tooltip')

    return id
  }, [id])

  const getPositions = useCallback(() => {
    if (childrenRef.current && tooltipRef.current) {
      setPositions(computePositions({ childrenRef, placement, tooltipRef }))
    }
  }, [placement])

  /**
   * This function is called when we need to remove tooltip portal from DOM and remove event listener to it.
   */
  const unmountTooltip = useCallback(() => {
    setVisibleInDom(false)
    window.removeEventListener('resize', getPositions)
    window.removeEventListener('scroll', getPositions)
  }, [getPositions])

  /**
   * When mouse hover or stop hovering children this function display or hide tooltip. A timeout is set to allow animation
   * end, then remove tooltip from dom.
   */
  const onMouseEvent = useCallback(
    (isVisible: boolean) => () => {
      // This is when we hide the tooltip, first we set opacity to 0 then we set a timeout based on CSS animation duration
      // then we remove it from dom
      if (!isVisible && tooltipRef.current) {
        tooltipRef.current.style.opacity = '0'
        tooltipRef.current.style.transform = TOOLTIP_INITIAL_POSITION[placement]
        timer.current = setTimeout(() => unmountTooltip(), ANIMATION_DURATION)
      } else {
        // If a timeout is already set it means tooltip didn't have time to close completely and be removed from dom,
        // so we clear timeout and set back opacity of tooltip to 1, so it can be visible on screen.
        if (timer.current) {
          clearTimeout(timer.current)
          if (tooltipRef.current) {
            tooltipRef.current.style.opacity = '1'
            tooltipRef.current.style.transform = 'translateY(+0%)'
          }
        }
        setVisibleInDom(isVisible)
      }
    },
    [placement, unmountTooltip],
  )

  /**
   * Once tooltip is visible in the dom we can compute positions, then set it visible on screen and add event to
   * recompute positions on scroll or screen resize.
   */
  useEffect(() => {
    if (visibleInDom) {
      getPositions()

      window.addEventListener('resize', getPositions)
      window.addEventListener('scroll', getPositions)

      if (tooltipRef.current) {
        tooltipRef.current.style.opacity = '1'
        tooltipRef.current.style.transform = 'translateY(+0%)'
      }
    }
  }, [getPositions, placement, unmountTooltip, visibleInDom])

  /**
   * WIll render children conditionally
   */
  const renderChildren = useCallback(() => {
    if (typeof children === 'function')
      return children({
        className,
        onBlur: onMouseEvent(false),
        onFocus: onMouseEvent(true),
        onMouseEnter: onMouseEvent(true),
        onMouseLeave: onMouseEvent(false),
        ref: childrenRef,
      }) as JSX.Element

    return (
      <div
        aria-describedby={generatedId}
        onBlur={onMouseEvent(false)}
        onFocus={onMouseEvent(true)}
        onMouseEnter={onMouseEvent(true)}
        onMouseLeave={onMouseEvent(false)}
        ref={childrenRef}
      >
        {children}
      </div>
    )
  }, [children, className, generatedId, onMouseEvent])

  if (!text) {
    return children as JSX.Element
  }

  return (
    <>
      {renderChildren()}
      {visibleInDom
        ? createPortal(
            <StyledTooltip
              ref={tooltipRef}
              positions={positions}
              maxWidth={maxWidth}
              role="tooltip"
              id={generatedId}
            >
              {text}
            </StyledTooltip>,
            document.body,
          )
        : null}
    </>
  )
}

export default Tooltip
