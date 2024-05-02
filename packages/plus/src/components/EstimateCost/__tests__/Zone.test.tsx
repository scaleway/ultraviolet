import { shouldMatchEmotionSnapshot } from '@utils/test'
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils'
import { afterEach, beforeEach, describe, test, vi } from 'vitest'
import { EstimateCost } from '..'
import frFlag from './assets/fr.svg'

describe('EstimateCost - Zone', () => {
  beforeEach(() => {
    setupIntersectionMocking(vi.fn)
  })
  afterEach(() => {
    resetIntersectionMocking()
  })

  test('render zone component', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost defaultTimeUnit="hours">
        <EstimateCost.Zone label="fr-par-1" image={frFlag} />
      </EstimateCost>,
    ))

  test('render region component, with animation', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost defaultTimeUnit="hours">
        <EstimateCost.Zone label="nl-ams-1" image={frFlag} animated />
      </EstimateCost>,
    ))
})
