import { afterAll, beforeAll, describe, jest, test } from '@jest/globals'
import {
  shouldMatchEmotionSnapshot,
  transformOptions,
} from 'helpers/tests/jestHelpers'
import { EstimateCost } from '..'

describe('EstimateCost - Zone', () => {
  beforeAll(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(Math, 'random').mockRestore()
  })

  test('render zone component', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost defaultTimeUnit="hours">
        <EstimateCost.Zone zone="fr-par-1" />
      </EstimateCost>,
      transformOptions,
    ))

  test('render region component, with animation', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost defaultTimeUnit="hours">
        <EstimateCost.Zone zone="nl-ams-1" animated />
      </EstimateCost>,
      transformOptions,
    ))
})
