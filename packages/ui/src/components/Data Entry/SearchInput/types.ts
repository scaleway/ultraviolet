import type { ComponentProps, DispatchWithoutAction, ReactNode } from 'react'
import type { Popup } from '../../Overlay/Popup/v2'
import type { TextInput } from '../TextInput'
import type { KeyGroup } from './KeyGroup'

type ChildrenProps = {
  searchTerms: string
  isOpen: boolean
  toggleIsOpen: DispatchWithoutAction
}

export type SearchBarChildrenFunctionProps = ({ searchTerms, isOpen, toggleIsOpen }: ChildrenProps) => ReactNode

export type SearchInputProps = {
  /**
   * @deprecated the Popup is always aligned at the bottom start of the SearchInput (and flips when missing space).
   * This property is ignored.
   */
  popupPlacement?: ComponentProps<typeof Popup.Panel>['placement']
  threshold?: number
  children?: SearchBarChildrenFunctionProps | ReactNode
  onSearch: (value: string) => void
  onClose?: () => void
  ['data-testid']?: string
  /**
   * If set to true images will be shown with key shortcut to focus the input on the right of the search bar.
   * If set to an array of strings, the strings will be used as the key shortcuts.
   */
  shortcut?: boolean | ComponentProps<typeof KeyGroup>['keys']
  className?: string
} & Omit<
  ComponentProps<typeof TextInput>,
  'prefix' | 'suffix' | 'clearable' | 'success' | 'onRandomize' | 'onChange' | 'type' | 'onChangeValue' | 'helper'
>
