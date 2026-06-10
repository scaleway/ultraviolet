import { renderWithTheme } from '@utils/test'
import { resetIntersectionMocking, setupIntersectionMocking } from 'react-intersection-observer/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { EstimateCost } from '..'
import frFlag from './assets/fr.svg'

describe('estimateCost - Region', () => {
  beforeEach(() => {
    setupIntersectionMocking(vi.fn)
  })
  afterEach(() => {
    resetIntersectionMocking()
  })

  it('render region component', () => {
    const { asFragment } = renderWithTheme(
      <EstimateCost defaultTimeUnit="hours">
        <EstimateCost.Region image={frFlag} label="nl-ams" />
      </EstimateCost>,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('render region component, with custom children', () => {
    const { asFragment } = renderWithTheme(
      <EstimateCost defaultTimeUnit="hours">
        <EstimateCost.Region animated>
          <img src="" alt="" /> fr-par
        </EstimateCost.Region>
      </EstimateCost>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
