import StatusIndicator, { statuses } from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('StatusIndicator', () => {
  statuses.forEach(status => {
    test(`render ${status}`, () =>
      shouldMatchEmotionSnapshot(<StatusIndicator status={status} />))
  })

  test(`render unknow`, async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()

    await shouldMatchEmotionSnapshot(<StatusIndicator status="unknow" />)
    expect(console.error).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })

  test(`render animated`, () =>
    shouldMatchEmotionSnapshot(
      <StatusIndicator status={statuses[0]} animated />,
    ))
})
