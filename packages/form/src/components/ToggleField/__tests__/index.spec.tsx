import { screen } from '@testing-library/react'
import { ToggleField } from '..'
import { shouldMatchEmotionSnapshotFormWrapper } from '../../../../.jest/helpers'

describe('ToggleField', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(<ToggleField name="test" />))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(<ToggleField name="test" disabled />))

  test('should render correctly checked', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <ToggleField name="test" value="test" initialValue={['test']} />,
      {
        transform: () => {
          const element = screen.getByRole<HTMLInputElement>('checkbox')
          expect(element.checked).toBeTruthy()
        },
      },
    ))

  test('should render correctly with label and checked', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <ToggleField name="test" initialValue label="test" />,
    ))
})
