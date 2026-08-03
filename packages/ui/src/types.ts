import type { HTMLAttributes, AllHTMLAttributes, AriaAttributes, ReactNode } from 'react'

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }
type SingleXOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U

export type XOR<T extends unknown[]> = T extends [infer Only]
  ? Only
  : T extends [infer A, infer B, ...infer Rest]
    ? XOR<[SingleXOR<A, B>, ...Rest]>
    : never

/**
 * Enforces that at least one of the given keys is provided.
 * Useful for accessible labelling patterns like `label | aria-label | aria-labelledby`.
 */
export type AtLeastOne<T extends Record<string, unknown>> = {
  [K in keyof T]: { [P in K]: T[P] } & { [P in Exclude<keyof T, K>]?: T[P] }
}[keyof T]

export type PascalToCamelCase<S extends string> = S extends `${infer P1}${infer P2}` ? `${Lowercase<P1>}${P2}` : S

export type RemoveSuffix<S extends string, Suffix extends string> = S extends `${infer Prefix}${Suffix}` ? Prefix : S

/**
 * This type removes the suffix from a PascalCase string and converts it to camelCase. Pretty useful for Icon, CategoryIcon and ProductIcon components.
 * Their names being `AddressIcon` but we might need to have `address` as the prop name.
 */
export type PascalToCamelCaseWithoutSuffix<
  T extends string,
  Suffix extends string,
> = T extends `${infer Prefix}${Suffix}`
  ? `${PascalToCamelCase<Prefix extends `${infer First}${infer Rest}` ? `${First}${Rest}` : never>}`
  : never

/**
 * @deprecated use type FormComponentProps instead which will handle all form props required.
 */
export type LabelProp =
  | {
      label: ReactNode
      'aria-label'?: never
      id?: string
    }
  | {
      label?: never
      'aria-label': string
      id?: string
    }
  | {
      label?: never
      'aria-label'?: never
      id: string
    }

export type CheckboxLabelProp =
  | {
      children: ReactNode
      'aria-label'?: string
    }
  | {
      children?: never
      'aria-label': string
    }

type DefaultLabel = {
  label: string
  'aria-label': string
  'aria-labelledby': string
}

export type PartialLabelProps = Partial<DefaultLabel>

export type LabelProps = AtLeastOne<DefaultLabel>

type BaseAriaProps = Pick<AriaAttributes, 'aria-describedby' | 'aria-labelledby'>

type StyleBaseProps<E extends HTMLElement> = Pick<HTMLAttributes<E>, 'style' | 'className'>

type InputBaseProps<E extends HTMLElement> = Pick<HTMLAttributes<E>, 'onFocus' | 'onBlur' | 'onKeyDown' | 'autoFocus'>

type DefaultProps<E extends HTMLElement> = {
  'data-testid'?: string
  helper?: ReactNode
} & Pick<AllHTMLAttributes<E>, 'disabled' | 'required' | 'readOnly' | 'id' | 'name'>

/*
 * Avoid the case by default we PartialLabelProps and surcharged with LabelProps component where we try to enforce the type
 **/
type Label<Enforce extends boolean> = [Enforce] extends [true] ? LabelProps : PartialLabelProps

export type BaseFormComponentProps<
  E extends HTMLElement = HTMLInputElement,
  LabelEnforced extends boolean = false,
> = DefaultProps<E> & InputBaseProps<E> & StyleBaseProps<E> & BaseAriaProps & Label<LabelEnforced>
