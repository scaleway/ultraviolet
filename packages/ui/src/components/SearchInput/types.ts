import type { Popup, TextInputV2 } from '@ultraviolet/ui'
import type { ComponentProps, DispatchWithoutAction, ReactNode } from 'react'

type ChildrenProps = {
  searchTerms: string
  isOpen: boolean
  toggleIsOpen: DispatchWithoutAction
}

export type SearchBarChildrenFunctionProps = ({
  searchTerms,
  isOpen,
  toggleIsOpen,
}: ChildrenProps) => ReactNode

export type SearchInputProps = {
  popupPlacement?: ComponentProps<typeof Popup>['placement']
  threshold?: number
  children: SearchBarChildrenFunctionProps | ReactNode
  onSearch: (value: string) => void
  onClose?: () => void
  ['data-testid']?: string
  /**
   * If set to true images will be shown with key shortcut to focus the input on the right of the search bar
   */
  shortcut?: boolean
} & Pick<
  ComponentProps<typeof TextInputV2>,
  'placeholder' | 'size' | 'label' | 'loading' | 'error' | 'disabled'
>
