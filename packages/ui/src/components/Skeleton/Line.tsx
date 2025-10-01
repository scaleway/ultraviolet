'use client'

import { assignInlineVars } from '@vanilla-extract/dynamic'
import { lineSkeleton, widthLine } from './stylesVariants.css'

const sizes = ['5rem', '7.5rem', '10rem', '12.5rem']

const randomSize = () => sizes[Math.floor(Math.random() * sizes.length)]

export const Line = () => (
  <div
    className={lineSkeleton}
    style={assignInlineVars({
      [widthLine]: randomSize(),
    })}
  />
)
