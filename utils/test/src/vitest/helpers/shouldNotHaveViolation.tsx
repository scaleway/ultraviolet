import { render } from '@testing-library/react'
import { expect } from 'vitest'
import { axe } from 'vitest-axe'

import type { ReactNode } from 'react'

export const makeshouldNotHaveViolation = async (
  children: ReactNode,
  {
    wrapper,
  }: {
    wrapper?: React.JSXElementConstructor<{ children: React.ReactNode }>
  },
) => {
  const { container } = render(children, { wrapper })

  const res = await axe(container)
  expect(res).toHaveNoViolations()
}
