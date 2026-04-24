import { cn } from '@ultraviolet/utils'

import { estimateCostStyle } from './styles.css'

import type { ComponentProps } from 'react'

export const Image = (props: ComponentProps<'img'>) => (
  <img
    // Explicit alt otherwise there is an oxc error
    alt={props.alt}
    height={props.height}
    width={props.width}
    {...props}
    className={cn(props.className, estimateCostStyle.image)}
  />
)
