'use client'

import { UserProductIcon } from '@ultraviolet/icons/product/UserProductIcon'
import { UploadIcon } from '@ultraviolet/icons/UploadIcon'
import { cn, theme as UVTheme } from '@ultraviolet/themes'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { Text } from '../Text'
import { DEFAULT_COLORS, sizes, TEXT_VARIANT_BY_SIZE } from './constants'
import {
  colorsAvatar,
  containerAvatar,
  elementContainer,
  productIconContainer,
  svgAvatar,
  uploadContainer,
} from './styles.css'
import type { AvatarProps, SentimentColors } from './types'
import {
  finalColorAvatar,
  finalSizeAvatar,
  halvedColorAvatar,
} from './variables.css'

/**
 * The Avatar component is used to represent a user, product, or entity. It can be used to display an image, an icon, a text or a set of colors.
 */
export const Avatar = ({
  shape,
  variant,
  image,
  text,
  size = 'medium',
  sentiment = 'primary',
  colors = DEFAULT_COLORS,
  upload,
  onClick,
  className,
  children,
  'data-testid': dataTestId,
  style,
}: AvatarProps) => {
  const isHalved = colors.length > 1
  const finalColors = colors?.map(
    bgColor =>
      UVTheme.colors[bgColor as SentimentColors]?.backgroundStrong ?? bgColor,
  )

  const finalSize = sizes(UVTheme)[size]

  return (
    <div
      className={cn(className, containerAvatar({ sentiment, shape, size }))}
      data-has-background={!['user', 'image'].includes(variant)}
      data-testid={dataTestId}
      onClick={onClick}
      onKeyDown={event =>
        event.key === ' ' || event.key === 'Enter' ? onClick?.() : null
      }
      role={onClick ? 'button' : undefined}
      style={{
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundSize: image ? 'cover' : undefined,
        ...style,
      }}
    >
      {upload ? (
        <div className={uploadContainer({ shape, size })}>
          <UploadIcon prominence="stronger" sentiment="neutral" size="large" />
        </div>
      ) : null}
      {variant === 'user' ? (
        <div className={productIconContainer({ shape, size })}>
          <UserProductIcon className={svgAvatar({ shape })} />
        </div>
      ) : null}
      {variant === 'icon' ? (
        <div className={elementContainer({ shape })}>{children}</div>
      ) : null}
      {variant === 'text' ? (
        <div className={elementContainer({ shape })}>
          <Text
            as="span"
            prominence={sentiment === 'primary' ? 'stronger' : 'strong'}
            sentiment="neutral"
            variant={TEXT_VARIANT_BY_SIZE[size]}
          >
            {text}
          </Text>
        </div>
      ) : null}
      {variant === 'colors' ? (
        <span
          className={colorsAvatar({ shape, size })}
          style={assignInlineVars({
            [finalSizeAvatar]: finalSize,
            [finalColorAvatar]: finalColors[0],
            [halvedColorAvatar]: isHalved ? finalColors[1] : finalColors[0],
          })}
        />
      ) : null}
    </div>
  )
}
