import { afterAll, beforeAll, describe, jest, test } from '@jest/globals'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'
import { EstimateCost } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('EstimateCost - Zone', () => {
  beforeAll(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.4155913669444804)
    mockAllIsIntersecting(true)
  })

  afterAll(() => {
    jest.spyOn(Math, 'random').mockRestore()
  })

  test('render zone component', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost defaultTimeUnit="hours">
        <EstimateCost.Zone zone="fr-par-1" />
      </EstimateCost>,
    ))

  test('render region component, with animation', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost defaultTimeUnit="hours">
        <EstimateCost.Zone zone="nl-ams-1" animated />
      </EstimateCost>,
    ))
})
