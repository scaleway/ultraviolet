import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import React, {
  ElementType,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import Box, { BoxProps } from '../Box'

const StyledWrapper = styled(Box)`
  position: relative;
  margin-left: -100px;
  margin-right: -100px;
`

const StyledBeforeScroll = styled.span`
  position: absolute;
  width: 100px;
  height: 100%;
  content: '';
  background: linear-gradient(
    -90deg,
    rgba(255, 255, 255, 0),
    ${({ theme }) => theme.colors.neutral.backgroundWeak}
  );
  cursor: w-resize;
  z-index: auto;
`

const StyledScrollableWrapper = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  padding-left: 100px;
  padding-right: 100px;
  padding-bottom: 16px;

  > *:not(:last-child) {
    margin-right: 16px;
  }
`

const StyledAfterScroll = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100px;
  height: 100%;
  content: '';
  cursor: e-resize;
  z-index: auto;
  background: linear-gradient(
    -90deg,
    ${({ theme }) => theme.colors.neutral.backgroundWeak},
    rgba(255, 255, 255, 0)
  );
`

const StyledBorderWrapper = styled(Box)`
  display: inline-block;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.neutral.borderWeak};
  height: 261px;
  width: 248px;
  max-width: 240px;
  overflow-wrap: break-word;
  white-space: normal;
  cursor: grab;

  &:hover,
  &:active,
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary.border};
    transition: box-shadow 0.2s ease;
    box-shadow: ${({ theme }) => theme.shadows.focusPrimary};
  }

  img {
    border-radius: 3px 3px 0% 0%;
  }
`

type SliderItemProps = {
  as?: string | ElementType<unknown>
  children: ReactNode
}
export const SliderItem = ({ as, ...props }: SliderItemProps): JSX.Element => (
  <StyledBorderWrapper as={as} {...props} draggable="true" />
)

SliderItem.propTypes = {
  as: PropTypes.string,
}

type SliderProps = {
  children?: ReactNode
} & BoxProps

const Slider = ({ children, ...props }: SliderProps): JSX.Element => {
  const scrollRef = useRef<HTMLDivElement>(null)
  let intervalLeft: ReturnType<typeof setInterval>
  let intervalRight: ReturnType<typeof setInterval>

  const handleScrollRight = () => {
    intervalRight = setInterval(() => {
      if (scrollRef.current?.scrollTo && scrollRef.current?.scrollLeft) {
        scrollRef.current.scrollTo?.(scrollRef.current.scrollLeft - 25, 0)
      }
    }, 30)
  }
  const handleScrollLeft = () => {
    intervalLeft = setInterval(() => {
      if (scrollRef.current?.scrollTo && scrollRef.current?.scrollLeft) {
        scrollRef.current.scrollTo(scrollRef.current.scrollLeft + 25, 0)
      }
    }, 30)
  }

  const handleScrollX = (scrollX = 25) => {
    if (scrollRef.current?.scrollTo && scrollRef.current?.scrollLeft) {
      scrollRef.current.scrollTo?.(scrollRef.current.scrollLeft + scrollX, 0)
    }
  }

  const cleanUp = () => {
    clearInterval(intervalLeft)
    clearInterval(intervalRight)
  }

  useEffect(() => cleanUp)
  const [dragStartX, setDragStartX] = useState(0)
  const [deltaX, setDeltaX] = useState(0)

  return (
    <StyledWrapper {...props}>
      <StyledBeforeScroll
        onMouseOver={handleScrollRight}
        onMouseLeave={() => clearInterval(intervalRight)}
      />
      <StyledScrollableWrapper
        ref={scrollRef}
        onDragOver={e => {
          setDeltaX(dragStartX - e.pageX)
          setDragStartX(e.pageX)
        }}
        onDragStart={e => {
          const blankImg = new Image()
          blankImg.src =
            'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

          e.dataTransfer.setDragImage(blankImg, 0, 0)
          setDragStartX(e.clientX)
        }}
        onDrag={() => handleScrollX(deltaX)}
        onDragEnd={() => {
          setDeltaX(0)
          setDragStartX(0)
        }}
        onMouseUp={e => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        {children}
      </StyledScrollableWrapper>

      <StyledAfterScroll
        onMouseOver={handleScrollLeft}
        onMouseLeave={() => clearInterval(intervalLeft)}
      />
    </StyledWrapper>
  )
}

Slider.Item = SliderItem

Slider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Slider
