import React from 'react'
import Alert, { alertTypes, alertVariants } from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Alert', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => null)
  })

  afterAll(() => {
    jest.restoreAllMocks()
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
    // @ts-expect-error "unknow" isn't part of the `variant` type but we need to test
    // the fallback to the `standart` variant in this case.
    shouldMatchEmotionSnapshot(<Alert variant="unknow">Sample Alert</Alert>))

  alertTypes.forEach(type => {
    test(`renders correctly variant ${type}`, () =>
      shouldMatchEmotionSnapshot(<Alert type={type}>Sample Alert</Alert>))
  })

  test(`renders correctly unknow theme type and fallback to defaults`, () =>
    // @ts-expect-error "unknow" isn't part of the `type` type but we need to test
    // the fallback to the `theme.colors` colors in this case.
    shouldMatchEmotionSnapshot(<Alert type="unknow">Sample Alert</Alert>))
})
