import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { expect, vi } from 'vitest'

export const makeShouldMatchSnapshotWithPortal = (
  children: ReactElement,
  {
    wrapper,
  }: {
    wrapper?: React.JSXElementConstructor<{ children: React.ReactNode }>
  },
) => {
  // Save the instance of console (disable warning about adding element directly to document.body which is necessary when testing portal components)
  const { console } = globalThis
  globalThis.console = { ...console, error: vi.fn() }

  const { asFragment, unmount } = render(children, { wrapper })
  expect(asFragment()).toMatchSnapshot()

  // Unmounting to don't see the warning message described above
  unmount()
  globalThis.console = console
}
