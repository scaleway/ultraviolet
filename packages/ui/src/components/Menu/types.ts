import type {
  ButtonHTMLAttributes,
  ComponentProps,
  ReactElement,
  ReactNode,
  Ref,
} from 'react'
import type { Popup } from '../Popup'

type ChildMenuProps = {
  toggle: () => void
}

type DisclosureElement =
  | ((
      disclosure: DisclosureProps,
    ) => ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>)
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
  placement?: Exclude<ComponentProps<typeof Popup>['placement'], 'nested-menu'>
  /**
   * When set to true, the menu does not shrink (height) to avoid overflow on the page
   */
  noShrink?: boolean
} & Pick<
  ComponentProps<typeof Popup>,
  'dynamicDomRendering' | 'align' | 'style'
>
