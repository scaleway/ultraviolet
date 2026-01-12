import { render } from '@testing-library/react'
import type { ReactNode } from 'react'
import { expect } from 'vitest'

export const makeShouldMatchSnapshot = (
  children: ReactNode,
  {
    wrapper,
  }: {
    wrapper?: React.JSXElementConstructor<{ children: React.ReactNode }>
  },
) => {
  const { asFragment } = render(children, { wrapper })

  // biome-ignore  lint/suspicious/noMisplacedAssertion: use inside it/expect
  expect(asFragment()).toMatchSnapshot()
}
