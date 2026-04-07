import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'

export type ContentCardProps = {
  direction?: 'row' | 'column'
  /**
   * The image to display at the top of the card (if direction is column) or to the left of the card (if direction is row).
   * By default, the image will be cropped to fit the card.
   */
  image?: string
  /**
   * The icon the second element of the card to be displayed after the image. We allow any ReactNode but recommend
   * using `<ProductIcon>` from `@ultraviolet/icons`.
   */
  icon?: ReactNode
  subtitle?: string
  title: string
  /*
   * Define the HTML Section Heading element level (h1 - h6) to use for the header
   */
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

  description?: string
  children?: ReactNode
  /**
   * The href to link the card to. If not provided, the card will not be clickable.
   */
  href?: HTMLAnchorElement['href']
  target?: HTMLAnchorElement['target']
  onClick?: MouseEventHandler<HTMLElement>
  disabled?: boolean
  loading?: boolean
  className?: string
  style?: CSSProperties
}
