import { afterAll, beforeAll, describe, jest, test } from '@jest/globals'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'
import { CustomUnitInput } from '../Components/CustomUnitInput'

describe('EstimateCost - CustomUnitInput', () => {
  beforeAll(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(Math, 'random').mockRestore()
  })

  test('render default values', () =>
    shouldMatchEmotionSnapshot(
      <CustomUnitInput
        setIteration={() => {}}
        iteration={{ value: 1, unit: 'hours' }}
        timeUnits={['seconds', 'minutes', 'hours', 'days', 'months']}
      />,
    ))
})
