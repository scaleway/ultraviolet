// oxlint-disable-next-line import/no-namespace
import type * as ProductIcon from '@ultraviolet/icons/product'
import type {
  ChangeEventHandler,
  CSSProperties,
  FocusEventHandler,
  ReactNode,
  RefObject,
} from 'react'

import type { LabelProp, PascalToCamelCaseWithoutSuffix } from '../../types'

export type SelectableCardProps = {
  name?: string
  children?:
    | (({
        disabled,
        checked,
      }: Pick<SelectableCardProps, 'checked' | 'disabled'>) => ReactNode)
    | ReactNode
  value: string | number
  onChange: ChangeEventHandler<HTMLInputElement>
  showTick?: boolean
  type?: 'radio' | 'checkbox' | 'toggle'
  disabled?: boolean
  checked?: boolean
  className?: string
  isError?: boolean
  onFocus?: FocusEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
  id?: string
  tooltip?: string
  'data-testid'?: string
  style?: CSSProperties
  indented?: boolean
} & (
  | {
      illustration?: string
      productIcon?: never
    }
  | {
      productIcon?: PascalToCamelCaseWithoutSuffix<
        keyof typeof ProductIcon,
        'ProductIcon'
      >
      illustration?: never
    }
) &
  LabelProp

export type MultiStateProps = Pick<
  SelectableCardProps,
  | 'type'
  | 'checked'
  | 'isError'
  | 'id'
  | 'disabled'
  | 'onFocus'
  | 'label'
  | 'aria-label'
  | 'onChange'
  | 'name'
  | 'showTick'
  | 'onBlur'
  | 'value'
> & {
  innerRef: RefObject<HTMLInputElement | null>
}
