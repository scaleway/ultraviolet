import { DecoratorFunction } from '@storybook/csf'
import { ReactFramework } from '@storybook/react'
import React from 'react'

const wrapStories = (stories: React.ReactNode[]) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
    {React.Children.toArray(stories)}
  </div>
)

export const withProps =
  <A,>(values: Partial<A>[]): DecoratorFunction<ReactFramework, A> =>
  (render, context) =>
    wrapStories(
      values.map(args =>
        // eslint-disable-next-line
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
