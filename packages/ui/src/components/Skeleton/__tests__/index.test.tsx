import { renderWithTheme } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { Skeleton, skeletonTypes } from '..'

describe('skeleton', () => {
  test('renders default variant', () => {
    const { asFragment } = renderWithTheme(<Skeleton />)
    expect(asFragment()).toMatchSnapshot()
  })

  test.each(skeletonTypes)('renders correctly with type="%s"', type => {
    const { asFragment } = renderWithTheme(<Skeleton variant={type} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
