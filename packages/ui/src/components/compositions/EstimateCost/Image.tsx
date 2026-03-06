import { cn } from '@ultraviolet/utils'
import type { ComponentProps } from 'react'
import { estimateCostStyle } from './styles.css'

export const Image = (props: ComponentProps<'img'>) => (
  <img
    // Explicit alt otherwise there is an oxc error
    alt={props.alt}
    height={props.height}
    width={props.width}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    className={cn(props.className, estimateCostStyle.image)}
  />
)
