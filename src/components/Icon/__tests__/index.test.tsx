import React from 'react'
import Icon, { icons } from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Icon', () => {
  icons.forEach(icon => {
    test(`render ${icon}`, () =>
      shouldMatchEmotionSnapshot(<Icon name={icon} />))
  })

  test(`render unknow`, async () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()

    // @ts-expect-error we check a failing case
    await shouldMatchEmotionSnapshot(<Icon name="unknown" />)
    expect(console.error).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })
})
