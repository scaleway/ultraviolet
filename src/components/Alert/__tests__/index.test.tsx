/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import Alert, { alertTypes, alertVariants } from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('Alert', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => null)
  })

  test('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(<Alert>Sample Alert</Alert>))

  test('renders correctly with custom icon', () =>
    shouldMatchEmotionSnapshot(<Alert icon="eye">Sample Alert</Alert>))

  test('renders correctly with title', () =>
    shouldMatchEmotionSnapshot(<Alert title="title">Sample Alert</Alert>))

  alertVariants.forEach(variant => {
    test(`renders correctly variant ${variant}`, () =>
      shouldMatchEmotionSnapshot(<Alert variant={variant}>Sample Alert</Alert>))
  })

  test(`renders correctly unknow variant and fallback to standard`, () =>
    // @ts-ignore
    shouldMatchEmotionSnapshot(<Alert variant="unknow">Sample Alert</Alert>))

  alertTypes.forEach(type => {
    test(`renders correctly variant ${type}`, () =>
      shouldMatchEmotionSnapshot(<Alert type={type}>Sample Alert</Alert>))
  })

  test(`renders correctly unknow theme type and fallback to defaults`, () =>
    // @ts-ignore
    shouldMatchEmotionSnapshot(<Alert type="unknow">Sample Alert</Alert>))
})
