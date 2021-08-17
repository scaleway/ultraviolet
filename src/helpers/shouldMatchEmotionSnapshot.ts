/* eslint-disable import/no-extraneous-dependencies */
import { createSerializer } from '@emotion/jest'
import { RenderOptions, render } from '@testing-library/react'
import { ReactNode } from 'react'
import defaultTheme from '../theme'
import renderWithTheme from './renderWithTheme'

// use only class hash (generated from css style content)
expect.addSnapshotSerializer(
  createSerializer({ classNameReplacer: className => className }),
)

interface Options {
  options?: RenderOptions
  theme?: typeof defaultTheme
  transform?: (node: ReturnType<typeof render>) => Promise<void> | void
}

export default async (
  component: ReactNode,
  { transform, options, theme }: Options = {},
): Promise<void> => {
  const node = renderWithTheme(component, options, theme)
  if (transform) await transform(node)

  expect(node.asFragment()).toMatchSnapshot()
  node.unmount()
}
