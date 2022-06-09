import styled from '@emotion/styled'
import {
  ReactNode,
  RefObject,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { getUUID } from '../../utils'

const ARROW_WIDTH = 6 // in px
const SPACE = 4 // in px
const ANIMATION_DURATION = 230 // in ms
const DEFAULT_POSITIONS = {
  arrowLeft: 50,
  arrowTop: 99,
  left: 0,
  rotate: 135,
  top: 0,
  translate: 'translate(-50%, -50)',
}

type PositionsType = {
  arrowLeft: number
  arrowTop: number
  left: number
  rotate: number
  top: number
  translate: string
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
  transition: ${ANIMATION_DURATION}ms opacity ease-in-out;
  font-size: 0.8rem;

  &::after {
    content: ' ';
    position: absolute;
    top: ${({ positions }) => positions.arrowTop}%;
    left: ${({ positions }) => positions.arrowLeft}%;
    transform: ${({ positions }) => positions.translate}
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

  console.log(
    (childrenRef.current as HTMLDivElement).getBoundingClientRect(),
    (tooltipRef.current as HTMLDivElement).getBoundingClientRect(),
  )

  switch (placement) {
    case 'bottom':
      return {
        arrowLeft: 50,
        arrowTop: -100,
        left: childrenLeft + childrenWidth / 2 - tooltipWidth / 2,
        rotate: 135,
        top: childrenTop + childrenHeight + ARROW_WIDTH + SPACE,
        translate: 'translate(-50%, 50%)',
      }
    case 'left':
      return {
        arrowLeft: 105,
        arrowTop: 50,
        left: childrenLeft - tooltipWidth - ARROW_WIDTH - SPACE,
        rotate: -90,
        top: childrenTop - tooltipHeight / 2,
        translate: 'translate(-50%, -50%)',
      }
    case 'right':
      return {
        arrowLeft: -5,
        arrowTop: 50,
        left: childrenRight + ARROW_WIDTH + SPACE,
        rotate: 90,
        top: childrenTop - tooltipHeight / 2,
        translate: 'translate(50%, -50%)',
      }
    default: // top placement is default value
      return {
        arrowLeft: 50,
        arrowTop: 99,
        left: childrenLeft + childrenWidth / 2 - tooltipWidth / 2,
        rotate: 135,
        top: childrenTop - tooltipHeight - ARROW_WIDTH - SPACE,
        translate: 'translate(-50%, -50)',
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
  /**
   * Defined whether tooltip should be rendered into a portal.
   */
  portal?: boolean
}

const Tooltip = ({
  children,
  text = '',
  placement = 'top',
  id,
  className,
  maxWidth = 232,
  portal = true,
}: TooltipProps): JSX.Element => {
  const childrenRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [visibleInDom, setVisibleInDom] = useState(false)
  const [positions, setPositions] = useState(DEFAULT_POSITIONS)

  const computedId = useMemo(() => {
    if (!id) return getUUID('tooltip')

    return id
  }, [id])

  const getPositions = useCallback(() => {
    if (childrenRef.current && tooltipRef.current && portal) {
      setPositions(computePositions({ childrenRef, placement, tooltipRef }))
    }

    if (!portal) {
      setPositions(DEFAULT_POSITIONS)
    }
  }, [placement, portal])

  /**
   * When mouse hover or stop hovering children this function display or hide tooltip. A timeout is set to allow animation
   * end, then remove tooltip from dom.
   */
  const onMouseEvent = useCallback(
    (isVisible: boolean) => () => {
      if (!isVisible && tooltipRef.current) {
        tooltipRef.current.style.opacity = '0'
        setTimeout(() => setVisibleInDom(isVisible), ANIMATION_DURATION)
      } else {
        setVisibleInDom(isVisible)
      }
    },
    [],
  )

  /**
   * Once tooltip is visible in the dom we can compute positions and then set it visible on screen.
   */
  useEffect(() => {
    getPositions()

    window.addEventListener('resize', getPositions)
    window.addEventListener('scroll', getPositions)

    if (tooltipRef.current) {
      tooltipRef.current.style.opacity = '1'
    }
  }, [getPositions, visibleInDom])

  const renderTooltip = useCallback(
    () => (
      <StyledTooltip
        ref={tooltipRef}
        positions={positions}
        maxWidth={maxWidth}
        role="tooltip"
        id={computedId}
      >
        {text}
      </StyledTooltip>
    ),
    [computedId, maxWidth, positions, text],
  )

  /**
   * Will render a portal when activated, a span when option is of and null when children tooltip is not hovered.
   * Render in dom is dynamic, only hovered children tooltip are added into the dom.
   */
  const render = useCallback(() => {
    if (portal && visibleInDom)
      return createPortal(renderTooltip(), document.body)
    if (!portal && visibleInDom) return renderTooltip()

    return null
  }, [portal, renderTooltip, visibleInDom])

  if (!text) {
    return isValidElement(children)
      ? cloneElement(children, { className })
      : (children as JSX.Element)
  }

  return (
    <>
      {isValidElement(children) ? (
        cloneElement(children, {
          onMouseEnter: onMouseEvent(true),
          onMouseLeave: onMouseEvent(false),
          ref: childrenRef,
        })
      ) : (
        <div
          onMouseEnter={onMouseEvent(true)}
          onMouseLeave={onMouseEvent(false)}
          ref={childrenRef}
        >
          {children}
        </div>
      )}
      {render()}
    </>
  )
}

export default Tooltip
