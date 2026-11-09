import type { ButtonHTMLAttributes, CSSProperties, ReactElement, ReactNode, Ref } from 'react'
import type { PopupPlacement } from '../../../types'

type ChildMenuProps = {
  toggle: () => void
}

type DisclosureElement =
  | ((disclosure: DisclosureProps) => ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>)
  | (ReactElement<ButtonHTMLAttributes<HTMLButtonElement>> & {
      ref?: Ref<HTMLButtonElement>
    })

export type DisclosureProps = { visible: boolean }

export type MenuProps = {
  id?: string
  ariaLabel?: string
  children?: ReactNode | (({ toggle }: ChildMenuProps) => ReactNode)
  className?: string
  disclosure: DisclosureElement
  hasArrow?: boolean
  visible?: boolean
  'data-testid'?: string
  maxHeight?: string
  /**
   * By default, the portal target is children container or document.body if children is a function. You can override this
   * behavior by setting a portalTarget prop.
   */
  portalTarget?: HTMLElement
  /**
   * The behavior of the menu when it is opened. If set to `click`, the menu will open when the user clicks on the disclosure.
   * If set to `hover`, the menu will open when the user hovers over the disclosure.
   */
  triggerMethod?: 'click' | 'hover'
  /**
   * If set to true, the menu will be searchable. This will add a search input at the top of the menu.
   * This doesn't work when children is a function.
   */
  searchable?: boolean
  /**
   * When set to true the menu will automatically close when a `Menu.Item` is clicked.
   */
  hideOnClickItem?: boolean
  footer?: ReactNode
  placement?: PopupPlacement
  /**
   * When set to true, the menu shrinks (height) to avoid overflow on the page
   * @deprecated popup position will flip to avoi overflow on the page, the prop is ignored
   */
  shrink?: boolean
  /**
   * @deprecated the popup is always rendered dynamically.
   * This property is ignored and will be removed in the next major release.
   */
  dynamicDomRendering?: boolean
  /**
   * @deprecated alignment is always "start", the prop is ignored
   */
  align?: 'start' | 'center'
  style?: CSSProperties
}
