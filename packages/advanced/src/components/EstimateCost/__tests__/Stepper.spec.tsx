import { afterAll, beforeAll, describe, jest, test } from '@jest/globals'
import {
  shouldMatchEmotionSnapshot,
  transformOptions,
} from 'helpers/tests/jestHelpers'
import { EstimateCost } from '..'

describe('EstimateCost - NumberInput Item', () => {
  beforeAll(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(Math, 'random').mockRestore()
  })

  test('render basic props', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="NumberInput">
          <EstimateCost.NumberInput />
        </EstimateCost.Item>
      </EstimateCost>,
      transformOptions,
    ))

  test('render basic with overlay', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="NumberInput">
          <EstimateCost.NumberInput />
        </EstimateCost.Item>
      </EstimateCost>,
      transformOptions,
    ))

  test('render with values', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item
          label="Chocolates"
          subLabel="Chocolate is never free :("
          price={1}
          unit="chocolate"
          amount={50}
          longFractionDigits
        >
          <EstimateCost.NumberInput minValue={0} maxValue={51} />
        </EstimateCost.Item>
      </EstimateCost>,
      transformOptions,
    ))

  test('render with getAmountValue', () =>
    shouldMatchEmotionSnapshot(
      <EstimateCost>
        <EstimateCost.Item label="NumberInput">
          <EstimateCost.NumberInput getAmountValue={value => value} />
        </EstimateCost.Item>
      </EstimateCost>,
      transformOptions,
    ))
})
