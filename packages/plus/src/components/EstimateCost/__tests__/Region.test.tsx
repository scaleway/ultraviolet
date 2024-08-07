import { renderWithTheme } from '@utils/test'
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { EstimateCost } from '..'
import frFlag from './assets/fr.svg'

describe('EstimateCost - Region', () => {
  beforeEach(() => {
    setupIntersectionMocking(vi.fn)
  })
  afterEach(() => {
    resetIntersectionMocking()
  })

  test('render region component', () => {
    const { asFragment } = renderWithTheme(
      <EstimateCost defaultTimeUnit="hours">
        <EstimateCost.Region label="nl-ams" image={frFlag} />
      </EstimateCost>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
