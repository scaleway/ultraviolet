import type { Icon } from '@ultraviolet/icons/legacy'
import type { ComponentProps, MouseEvent } from 'react'
import type { SENTIMENTS, sizes } from './constants'

// This type defines an array of string that should have a length of 0, 1, or 2
export type Colors =
  | []
  | [string]
  | [string, string]
  | readonly [string, string]
  | readonly [string]
  | readonly []

export type SentimentColors =
  | 'primary'
  | 'neutral'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'

export type Shape = 'circle' | 'square'

type CommonProps = {
  shape: Shape
  size?: keyof ReturnType<typeof sizes>
  upload?: boolean
  onClick?: (event?: MouseEvent<HTMLDivElement>) => void
  className?: string
  'data-testid'?: string
}

type VariantUser = {
  variant: 'user'
  image?: never
  icon?: never
  text?: never
  sentiment?: never
  colors?: never
}

type VariantImage = {
  variant: 'image'
  image: string
  icon?: never
  text?: never
  sentiment?: never
  colors?: never
}

type VariantIcon = {
  variant: 'icon'
  image?: never
  icon: ComponentProps<typeof Icon>['name']
  text?: never
  sentiment?: (typeof SENTIMENTS)[number]
  colors?: never
}

type VariantText = {
  variant: 'text'
  image?: never
  icon?: never
  text: string
  sentiment?: (typeof SENTIMENTS)[number]
  colors?: never
}

type VariantColors = {
  variant: 'colors'
  image?: never
  icon?: never
  text?: never
  sentiment?: never
  /**
   * An array of colors to use for the avatar. If only one color is provided, the avatar will have a solid background.
   * If two colors are provided, the avatar will have a split in two background.
   *
   * **Note**: only 2 colors maximum are allowed.
   */
  colors?: Colors
}

export type AvatarV2Props = CommonProps &
  (VariantImage | VariantIcon | VariantText | VariantColors | VariantUser)
