import React from 'react'
import DateInput from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('DateInput', () => {
  test('renders correctly with default props', () => {
    shouldMatchEmotionSnapshot(<DateInput label="Time" />)
  })
  test('renders correctly disabled', () => {
    shouldMatchEmotionSnapshot(<DateInput label="Date" disabled />)
  })

  test('renders correctly required', () => {
    shouldMatchEmotionSnapshot(<DateInput label="Date" required />)
  })
  test('renders correctly disabled required', () => {
    shouldMatchEmotionSnapshot(
      <DateInput
        label="Date"
        diasbled
        required
        value={new Date('December 17, 1995 03:24:00')}
      />,
    )
  })

  test('renders correctly currentLocale', () => {
    shouldMatchEmotionSnapshot(<DateInput label="Date" currentLocale="fr-FR" />)
  })

  test('renders correctly error', () => {
    shouldMatchEmotionSnapshot(<DateInput label="Date" error />)
  })
  test('renders correctly error disabled', () => {
    shouldMatchEmotionSnapshot(<DateInput label="Date" error disabled />)
  })

  test('renders correctly error disabled required', () => {
    shouldMatchEmotionSnapshot(
      <DateInput label="Date" error disabled required />,
    )
  })
})
