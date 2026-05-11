import { renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { Skeleton, skeletonTypes } from '..'

describe('skeleton', () => {
  it('renders default variant', () => {
    const { asFragment } = renderWithTheme(<Skeleton />)
    expect(asFragment()).toMatchSnapshot()
  })

  it.each(skeletonTypes)('renders correctly with type="%s"', type => {
    const { asFragment } = renderWithTheme(<Skeleton variant={type} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
