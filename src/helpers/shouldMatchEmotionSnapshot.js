/* eslint-disable import/no-extraneous-dependencies */
import { createSerializer } from '@emotion/jest'
import renderWithTheme from './renderWithTheme'

expect.addSnapshotSerializer(createSerializer())

export default async (component, { transform, modifyTheme } = {}) => {
  const node = renderWithTheme(component, modifyTheme)
  if (transform) await transform(node)

  expect(node.asFragment()).toMatchSnapshot()
}
