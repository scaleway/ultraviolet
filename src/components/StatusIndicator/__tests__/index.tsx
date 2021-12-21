import React from 'react'
import StatusIndicator, { statuses } from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('StatusIndicator', () => {
  statuses.forEach(status => {
    test(`render ${status}`, () =>
      shouldMatchEmotionSnapshot(
        <StatusIndicator
          status={status}
          tooltip={status}
          baseId="test"
          aria-describedby="test"
        />,
      ))
  })

  test(`render unknow`, async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()

    await shouldMatchEmotionSnapshot(
      <StatusIndicator
        status="unknown"
        tooltip="Unknown"
        baseId="test"
        aria-describedby="test"
      />,
    )
    expect(console.error).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })

  test(`render animated`, () =>
    shouldMatchEmotionSnapshot(
      <StatusIndicator
        status={statuses[0]}
        animated
        tooltip="Animated"
        baseId="test"
        aria-describedby="test"
      />,
    ))
})
