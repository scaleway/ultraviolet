import userEvent from '@testing-library/user-event'
import { es, fr, ru } from 'date-fns/locale'
import tk from 'timekeeper'
import DateInput from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

tk.freeze(new Date(1609503120000))

describe('DateInput', () => {
  test('renders correctly with default props', () =>
    shouldMatchEmotionSnapshot(
      <DateInput
        label="Date"
        onChange={() => {}}
        onBlur={() => {}}
        onFocus={() => {}}
        locale={fr}
        value={new Date('1995-12-17T03:24:00.000+00:00').toISOString()}
        name="test"
        autoFocus={false}
        format={value =>
          value instanceof Date ? value?.toISOString() : value?.toString()
        }
      />,
    ))
  test('renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(
      <DateInput label="Date" disabled onChange={() => {}} />,
    ))

  test('renders correctly required', () =>
    shouldMatchEmotionSnapshot(
      <DateInput label="Date" required onChange={() => {}} />,
    ))

  test('renders correctly error', () =>
    shouldMatchEmotionSnapshot(
      <DateInput label="Date" error="error" onChange={() => {}} />,
    ))
  test('renders correctly error disabled', () =>
    shouldMatchEmotionSnapshot(
      <DateInput label="Date" error="error" disabled onChange={() => {}} />,
    ))

  test('renders correctly error disabled required', () =>
    shouldMatchEmotionSnapshot(
      <DateInput
        label="Date"
        error="error"
        disabled
        required
        onChange={() => {}}
      />,
    ))

  test('renders correctly min-max', () =>
    shouldMatchEmotionSnapshot(
      <DateInput
        label="Date"
        minDate={new Date('1995-12-11T03:24:00.000+00:00')}
        maxDate={new Date('1995-12-25T03:24:00.000+00:00')}
        onChange={() => {}}
      />,
    ))

  test('renders correctly with date-fns locale fr', () =>
    shouldMatchEmotionSnapshot(
      <DateInput label="Date" locale={fr} onChange={() => {}} />,
      {
        transform: async ({ getByLabelText }) => {
          const buttonContainer = getByLabelText('Date')
          await userEvent.click(buttonContainer)
        },
      },
    ))

  test('renders correctly with date-fns locale es', () =>
    shouldMatchEmotionSnapshot(
      <DateInput label="Date" locale={es} onChange={() => {}} />,
      {
        transform: async ({ getByLabelText }) => {
          const buttonContainer = getByLabelText('Date')
          await userEvent.click(buttonContainer)
        },
      },
    ))

  test('renders correctly with date-fns locale ru', () =>
    shouldMatchEmotionSnapshot(
      <DateInput label="Date" locale={ru} onChange={() => {}} />,
      {
        transform: async ({ getByLabelText }) => {
          const buttonContainer = getByLabelText('Date')
          await userEvent.click(buttonContainer)
        },
      },
    ))
})
