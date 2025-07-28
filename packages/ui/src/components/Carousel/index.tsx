'use client'

import styled from '@emotion/styled'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

const StyledWrapper = styled.div`
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
    ${({ theme }) => theme.colors.neutral.background}ff,
    ${({ theme }) => theme.colors.neutral.background}
  );
  cursor: w-resize;
  z-index: auto;
`

const StyledScrollableWrapper = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  display: flex;
  padding: 0 100px;
  gap: ${({ theme }) => theme.space['2']};
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
    ${({ theme }) => theme.colors.neutral.background},
    ${({ theme }) => theme.colors.neutral.background}ff
  );
`

const StyledBorderWrapper = styled('div', {
  shouldForwardProp: prop => !['width'].includes(prop),
})<{ width: string }>`
  display: flex;
  align-items: stretch;
  width: ${({ width }) => width};
  max-width: ${({ width }) => width};
  overflow-wrap: break-word;
  white-space: normal;
  height: auto;
  cursor: grab;
  flex-shrink: 0;
`

type CarouselItemProps = {
  children: ReactNode
  width?: string
}
export const CarouselItem = ({
  children,
  width = '240px',
}: CarouselItemProps) => (
  <StyledBorderWrapper draggable="true" width={width}>
    {children}
  </StyledBorderWrapper>
)

type CarouselProps = {
  className?: string
  children?: ReactNode
  'data-testid'?: string
}

/**
 * Carousel component allows you to scroll horizontally through a list of items.
 */
export const Carousel = ({
  children,
  className,
  'data-testid': dataTestId = 'scrollbar',
}: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  let intervalLeft: ReturnType<typeof setInterval> | undefined
  let intervalRight: ReturnType<typeof setInterval> | undefined

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
    <StyledWrapper className={className} data-testid={dataTestId}>
      <StyledBeforeScroll
        data-testid={`${dataTestId}-before`}
        onMouseLeave={() => clearInterval(intervalRight)}
        onMouseOver={handleScrollRight}
      />
      <StyledScrollableWrapper
        className={className}
        data-testid={`${dataTestId}-wrapper`}
        onDrag={() => handleScrollX(deltaX)}
        onDragEnd={() => {
          setDeltaX(0)
          setDragStartX(0)
        }}
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
        onMouseUp={e => {
          e.preventDefault()
          e.stopPropagation()
        }}
        ref={scrollRef}
      >
        {children}
      </StyledScrollableWrapper>

      <StyledAfterScroll
        data-testid={`${dataTestId}-after`}
        onMouseLeave={() => clearInterval(intervalLeft)}
        onMouseOver={handleScrollLeft}
      />
    </StyledWrapper>
  )
}

Carousel.Item = CarouselItem
