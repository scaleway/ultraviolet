import React from 'react'
import { Icon, icons } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Icon', () => {
  icons.forEach(icon => {
    test(`render ${icon}`, () => {
      shouldMatchEmotionSnapshot(<Icon name={icon} />)
    })
  })

  test(`render unknow`, () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()

    shouldMatchEmotionSnapshot(<Icon name="unknow" />)
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })
})
