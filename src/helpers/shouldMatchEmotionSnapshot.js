/* eslint-disable import/no-extraneous-dependencies */
import { createSerializer } from '@emotion/jest'
import renderWithTheme from './renderWithTheme'

expect.addSnapshotSerializer(createSerializer())

export default async (component, { transform } = {}) => {
  const node = renderWithTheme(component)
  if (transform) await transform(node)

  expect(node.asFragment()).toMatchSnapshot()
}
