'use client'

import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { CSSProperties, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { carouselStyle, widthVar } from './styles.css'

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
    className={carouselStyle.borderWrapper}
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
  'aria-label'?: string
}

/**
 * Carousel component allows you to scroll horizontally through a list of items.
 */
export const Carousel = ({
  children,
  className,
  'data-testid': dataTestId = 'scrollbar',
  'aria-label': ariaLabel = 'Carousel',
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

  const handleScrollLeftKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      handleScrollX(e.key === 'ArrowLeft' ? -25 : 25)
    }
  }

  const handleScrollRightKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      handleScrollX(e.key === 'ArrowLeft' ? 25 : -25)
    }
  }

  return (
    <div
      aria-label={ariaLabel}
      className={cn(className, carouselStyle.wrapper)}
      data-testid={dataTestId}
      role="region"
    >
      <button
        aria-label="Scroll left"
        className={carouselStyle.beforeScroll}
        data-testid={`${dataTestId}-before`}
        onClick={handleScrollLeft}
        onFocus={handleScrollLeft}
        onKeyDown={handleScrollLeftKeyDown}
        onMouseLeave={() => clearInterval(intervalLeft)}
        onMouseOver={handleScrollLeft}
        type="button"
      />
      <div
        aria-roledescription="carousel"
        className={cn(className, carouselStyle.scrollableWrapper)}
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
        tabIndex={0}
      >
        {children}
      </div>

      <button
        aria-label="Scroll right"
        className={carouselStyle.afterScroll}
        data-testid={`${dataTestId}-after`}
        onClick={handleScrollRight}
        onFocus={handleScrollRight}
        onKeyDown={handleScrollRightKeyDown}
        onMouseLeave={() => clearInterval(intervalRight)}
        onMouseOver={handleScrollRight}
        type="button"
      />
    </div>
  )
}

Carousel.Item = CarouselItem
