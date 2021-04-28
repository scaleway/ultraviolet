/* eslint-disable import/no-extraneous-dependencies */
import { createSerializer } from '@emotion/jest'
import renderWithTheme from './renderWithTheme'

expect.addSnapshotSerializer(createSerializer())

export default async (component, { transform, options, theme } = {}) => {
  const node = renderWithTheme(component, options, theme)
  if (transform) await transform(node)

  expect(node.asFragment()).toMatchSnapshot()
  node.unmount()
}
