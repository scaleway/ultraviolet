import React from 'react'
import { availableIcons, CategoryIcon } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('CategoryIcon', () => {
  availableIcons.forEach(icon => {
    test(`render ${icon}`, () => {
      shouldMatchEmotionSnapshot(<CategoryIcon name={icon} />)
    })
  })

  test(`render unknow`, () => {
    const spy = jest.spyOn(console, 'error').mockImplementation()

    shouldMatchEmotionSnapshot(<CategoryIcon name="unknow" />)
    expect(console.error).toHaveBeenCalledTimes(1)
    spy.mockRestore()
  })
})
