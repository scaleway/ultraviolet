import { shouldMatchSnapshot } from '@utils/test'
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils'
import { afterEach, beforeEach, describe, test, vi } from 'vitest'
import { EstimateCost } from '..'
import frFlag from './assets/fr.svg'

describe('estimateCost - Zone', () => {
  beforeEach(() => {
    setupIntersectionMocking(vi.fn)
  })
  afterEach(() => {
    resetIntersectionMocking()
  })

  test('render zone component', () =>
    shouldMatchSnapshot(
      <EstimateCost defaultTimeUnit="hours">
        <EstimateCost.Zone image={frFlag} label="fr-par-1" />
      </EstimateCost>,
    ))

  test('render region component, with animation', () =>
    shouldMatchSnapshot(
      <EstimateCost defaultTimeUnit="hours">
        <EstimateCost.Zone animated image={frFlag} label="nl-ams-1" />
      </EstimateCost>,
    ))
})
