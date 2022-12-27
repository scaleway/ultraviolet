import { act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TextBoxField } from '..'
import { shouldMatchEmotionSnapshotFormWrapper } from '../../../../.jest/helpers'
import { mockErrors } from '../../../mocks'

describe('TextBoxField', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(<TextBoxField name="test" />))

  test('should render correctly generated', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TextBoxField name="test" generated />,
    ))

  test('should render correctly random', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TextBoxField name="test" random="random" />,
    ))
  test('should render correctly notice', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TextBoxField name="test" notice="notice" />,
    ))

  test('should render correctly required', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TextBoxField name="test" required />,
    ))
  test('should render correctly id', () =>
    shouldMatchEmotionSnapshotFormWrapper(<TextBoxField name="test" id="id" />))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TextBoxField name="test" disabled />,
      {
        transform: node => {
          const input = node.getByRole('textbox')
          expect(input).toBeDisabled()
        },
      },
    ))

  test('should render correctly with minLength', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TextBoxField name="test" minLength={13} />,
      {
        transform: async node => {
          await act(async () => {
            const input = node.getByRole('textbox')
            await userEvent.type(input, 'test')
            input.blur()
          })
          expect(
            node.getByText(
              typeof mockErrors.MIN_LENGTH === 'function'
                ? mockErrors.MIN_LENGTH({
                    allValues: {},
                    label: 'test',
                    minLength: 13,
                    name: 'test',
                    value: 'test',
                  })
                : mockErrors.MIN_LENGTH,
            ),
          ).toBeVisible()
        },
      },
    ))
})
