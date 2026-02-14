import type {
  ComponentProps,
  CSSProperties,
  DragEvent,
  ElementType,
  ReactNode,
} from 'react'
import type { Badge } from '../../../Badge'
import type { ItemType, PinUnPinType } from '../types'

export type ItemExpandedType = {
  categoryIcon: ReactNode
  containerTag: ElementType
  disabled?: boolean
  hasActiveChildren: boolean
  active?: boolean
  noExpand: boolean
  subLabel?: string
  shouldShowPinnedButton: boolean
  children: ReactNode
  dataTestId?: string
  type: ItemType
  href?: HTMLAnchorElement['href']
  rel?: HTMLAnchorElement['rel']
  id: string
  style?: CSSProperties
  target?: HTMLAnchorElement['target']
  label: string
  labelDescription: ReactNode
  hasPinnedFeatureAndNoChildren?: boolean
  badgeText?: string
  badgeSentiment?: ComponentProps<typeof Badge>['sentiment']
  isItemPinned: boolean
  pinTooltipLocale: string
  onClickPinUnpin: ((parameters: PinUnPinType) => void) | undefined
  isPinDisabled: boolean
  onToggle?: (toggle: boolean) => void
  index?: number
  onDragStopTrigger: (event: DragEvent<HTMLDivElement>) => void
  toggle?: boolean
}

export type ItemMenuType = {
  style?: CSSProperties
  children: ReactNode
  label: string
  hasActiveChildren: boolean
  categoryIcon?: ReactNode
  active?: boolean
}

export type ItemMenuItemType = {
  active?: boolean
  shouldShowPinnedButton: boolean
  disabled?: boolean
  href?: string
  onToggle?: (toggle: boolean) => void
  rel?: HTMLAnchorElement['rel']
  style?: CSSProperties
  target?: HTMLAnchorElement['target']
  hasActiveChildren: boolean
  noExpand: boolean
  labelDescription: ReactNode
  label: string
  badgeText?: string
  badgeSentiment?: ComponentProps<typeof Badge>['sentiment']
  hasHrefAndNoChildren?: boolean | ''
  pinTooltipLocale: string
  isItemPinned: boolean
  isPinDisabled: boolean
  onClickPinUnpin?: (parameters: PinUnPinType) => void
  id: string
}
