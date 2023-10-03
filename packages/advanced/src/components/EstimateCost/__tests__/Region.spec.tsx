import { afterAll, beforeAll, describe, jest, test } from '@jest/globals'
import {
  shouldMatchEmotionSnapshot,
  transformOptions,
} from 'helpers/tests/jestHelpers'
import { EstimateCost } from '..'

describe('EstimateCost - Region', () => {
  beforeAll(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(Math, 'random').mockRestore()
  })

  test('render region component', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost defaultTimeUnit="hours">
        <EstimateCost.Region region="nl-ams" />
      </EstimateCost>,
      transformOptions,
    ))

  test('render region component, with zone and region', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost defaultTimeUnit="hours">
        <EstimateCost.Region region="nl-ams" zone="nl-ams-1" />
      </EstimateCost>,
      transformOptions,
    ))

  test('render region component, with animation', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost defaultTimeUnit="hours">
        <EstimateCost.Region region="nl-ams" animated />
      </EstimateCost>,
      transformOptions,
    ))
})
