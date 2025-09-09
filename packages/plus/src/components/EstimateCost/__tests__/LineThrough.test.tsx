import { renderWithTheme } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { LineThrough } from '../Components/LineThrough'

describe('estimateCost - LineThrough', () => {
  test('render with basic values', () => {
    const { asFragment } = renderWithTheme(
      <LineThrough isActive>This is a beta</LineThrough>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
