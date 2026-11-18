import { describe, expect, it } from 'vitest'
import { renderWithTheme } from '../../../__tests__/helpers'
import { LineThrough } from '../Components/LineThrough'

describe('estimateCost - LineThrough', () => {
  it('render with basic values', () => {
    const { asFragment } = renderWithTheme(<LineThrough isActive>This is a beta</LineThrough>)
    expect(asFragment()).toMatchSnapshot()
  })
})
