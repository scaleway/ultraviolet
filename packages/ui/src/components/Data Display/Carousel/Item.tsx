import { assignInlineVars } from '@vanilla-extract/dynamic'
import type { CSSProperties, ReactNode } from 'react'
import { carouselStyle, widthVar } from './styles.css'

type CarouselItemProps = {
  children: ReactNode
  width?: string
  style?: CSSProperties
}
export const CarouselItem = ({ children, width = '240px', style }: CarouselItemProps) => (
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
CarouselItem.displayName = 'Carousel.Item'
