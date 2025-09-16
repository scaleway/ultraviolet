import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
} from 'react'

type MainProps<E extends ElementType> = {
  as?: E
  ref?: ComponentPropsWithRef<E>['ref']
}

type PropsToOmit<E extends ElementType, P> = keyof (MainProps<E> & P)

export type PolymorphicComponentProps<E extends ElementType, P> = P &
  MainProps<E> &
  Omit<ComponentPropsWithoutRef<E>, PropsToOmit<E, P>>
