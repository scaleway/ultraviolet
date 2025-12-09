'use client'

import { cn } from '@ultraviolet/themes'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import {
  afterScroll,
  beforeScroll,
  borderWrapper,
  scrollableWrapper,
  widthVar,
  wrapper,
} from './styles.css'

type CarouselItemProps = {
  children: ReactNode
  width?: string
  style?: CSSProperties
}
export const CarouselItem = ({
  children,
  width = '240px',
  style,
}: CarouselItemProps) => (
  <div
    className={borderWrapper}
    draggable="true"
    style={{
      ...assignInlineVars({
        [widthVar]: width,
      }),
      ...style,
    }}
  >
    {children}
  </div>
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
    <div className={cn(className, wrapper)} data-testid={dataTestId}>
      <span
        className={beforeScroll}
        data-testid={`${dataTestId}-before`}
        onFocus={handleScrollRight}
        onMouseLeave={() => clearInterval(intervalRight)}
        onMouseOver={handleScrollRight}
      />
      <div
        className={cn(className, scrollableWrapper)}
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
      </div>

      <span
        className={afterScroll}
        data-testid={`${dataTestId}-after`}
        onFocus={handleScrollLeft}
        onMouseLeave={() => clearInterval(intervalLeft)}
        onMouseOver={handleScrollLeft}
      />
    </div>
  )
}

Carousel.Item = CarouselItem
