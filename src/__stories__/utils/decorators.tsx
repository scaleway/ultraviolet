import { DecoratorFunction } from '@storybook/csf'
import { ReactFramework } from '@storybook/react'
import { Children, ReactNode } from 'react'

export const wrapStories = (stories: ReactNode[]) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
    {Children.toArray(stories)}
  </div>
)

export const withProps =
  <A,>(values: Partial<A>[]): DecoratorFunction<ReactFramework, A> =>
  (render, context) =>
    wrapStories(
      values.map(args =>
        render({ ...context, args: { ...context.args, ...args } }),
      ),
    )

export const withPropValues = <A, P extends keyof A>(
  property: P,
  values: A[P][],
): DecoratorFunction<ReactFramework, A> =>
  withProps(
    values.map(value => ({ [property]: value } as unknown as Partial<A>)),
  )
