import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  jest,
  test,
} from '@jest/globals'
import {
  resetIntersectionMocking,
  setupIntersectionMocking,
} from 'react-intersection-observer/test-utils'
import { EstimateCost } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'
import frFlag from './assets/fr.svg'

describe('EstimateCost - Zone', () => {
  beforeAll(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(Math, 'random').mockRestore()
  })

  beforeEach(() => {
    setupIntersectionMocking(jest.fn)
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
