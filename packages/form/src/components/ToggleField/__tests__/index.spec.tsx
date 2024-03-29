import { describe, expect, test } from '@jest/globals'
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
      <ToggleField name="test" />,
      {
        transform: () => {
          const element = screen.getByRole<HTMLInputElement>('checkbox')
          expect(element.checked).toBeTruthy()
        },
      },
      {
        initialValues: {
          test: true,
        },
      },
    ))

  test('should render correctly with label and checked', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <ToggleField name="test" label="test" />,
      {},
      {
        initialValues: {
          test: true,
        },
      },
    ))
})
