import { render } from '@testing-library/react'
import { expect } from 'vitest'

import type { ReactNode } from 'react'

export const makeShouldMatchSnapshot = (
  children: ReactNode,
  {
    wrapper,
  }: {
    wrapper?: React.JSXElementConstructor<{ children: React.ReactNode }>
  },
) => {
  const { asFragment } = render(children, { wrapper })

  expect(asFragment()).toMatchSnapshot()
}
