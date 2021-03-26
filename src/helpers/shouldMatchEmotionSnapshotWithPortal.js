/* eslint-disable import/no-extraneous-dependencies */
import { createSerializer } from '@emotion/jest'
import renderWithTheme from './renderWithTheme'

expect.addSnapshotSerializer(createSerializer())

export default component => {
  // Save the instance of console (disable warning about adding element directly to document.body which is necessary when testing portal components)
  const { console } = global
  global.console = { error: jest.fn() }

  const { asFragment, unmount } = renderWithTheme(component, {
    container: document.body,
  })
  expect(asFragment()).toMatchSnapshot()

  // Unmounting to don't see the warning message described above
  unmount()
  global.console = console
}
