import { assignInlineVars } from '@vanilla-extract/dynamic'

import { contentCardStyle, subContainerHeightVar } from './styles.css'

export const ImageContent = ({
  disabled,
  image,
  direction,
  subContainerHeight,
}: {
  disabled?: boolean
  image?: string
  direction: 'row' | 'column'
  subContainerHeight: string
}) => (
  <img
    alt=""
    className={contentCardStyle.image[direction]}
    data-disabled={disabled}
    height={direction === 'column' ? 120 : undefined}
    src={image}
    style={assignInlineVars({
      [subContainerHeightVar]: subContainerHeight,
    })}
    width={direction === 'row' ? 220 : undefined}
  />
)
