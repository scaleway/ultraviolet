import { es, fr, ru } from 'date-fns/locale/'
import React from 'react'
import DateInput from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('DateInput', () => {
  test('renders correctly with default props', () => {
    shouldMatchEmotionSnapshot(
      <DateInput
        label="Date"
        onChange={() => {}}
        onBlur={() => {}}
        onFocus={() => {}}
        locale={fr}
        value={new Date('1995-12-17T03:24:00.000+00:00')}
        name="test"
        autoFocus={false}
        format={value => value?.toISOString()}
      />,
    )
  })
  test('renders correctly disabled', () => {
    shouldMatchEmotionSnapshot(<DateInput label="Date" disabled />)
  })

  test('renders correctly required', () => {
    shouldMatchEmotionSnapshot(<DateInput label="Date" required />)
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

  test('renders correctly min-max', () => {
    shouldMatchEmotionSnapshot(
      <DateInput
        label="Date"
        minDate={new Date('1995-12-11T03:24:00.000+00:00')}
        maxDate={new Date('1995-12-25T03:24:00.000+00:00')}
      />,
    )
  })

  test('renders correctly with date-fns locale fr', () => {
    shouldMatchEmotionSnapshot(<DateInput label="Date fns fr" locale={fr} />)
  })
  test('renders correctly with date-fns locale es', () => {
    shouldMatchEmotionSnapshot(<DateInput label="Date fns es" locale={es} />)
  })

  test('renders correctly with date-fns locale ru', () => {
    shouldMatchEmotionSnapshot(<DateInput label="Date fns ru" locale={ru} />)
  })
})
