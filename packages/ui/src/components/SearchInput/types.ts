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
} & Pick<
  ComponentProps<typeof TextInputV2>,
  'placeholder' | 'size' | 'label' | 'loading' | 'suffix'
>
