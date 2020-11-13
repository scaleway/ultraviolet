import React from 'react'
import { StatusIndicator, statuses } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('StatusIndicator', () => {
  statuses.forEach(status => {
    test(`render ${status}`, () => {
      shouldMatchEmotionSnapshot(<StatusIndicator status={status} />)
    })
  })

  test(`render unknow`, () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()

    shouldMatchEmotionSnapshot(<StatusIndicator status="unknow" />)
    expect(console.error).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })
})
