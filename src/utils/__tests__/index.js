import React from 'react'
import shouldMatchEmotionSnapshot from '../../helpers/shouldMatchEmotionSnapshot'
import { getUUID, useUUID } from '../ids'

const Component = ({ prefix = undefined } = {}) => useUUID(prefix)

describe('ids', () => {
  beforeAll(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  describe('getUUID', () => {
    test('returns correctly without arguments', () => {
      expect(getUUID()).toMatchSnapshot()
    })

    test('returns correctly with a prefix', () => {
      expect(getUUID('ah')).toMatchSnapshot()
    })
  })

  describe('useUUID', () => {
    test('renders correctly without arguments', () => {
      shouldMatchEmotionSnapshot(<Component />)
    })

    test('renders correctly with a prefix', () => {
      shouldMatchEmotionSnapshot(<Component prefix="ah" />)
    })
  })
})
