import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TagsField } from '../..'
import { shouldMatchEmotionSnapshotFormWrapper } from '../../../../.jest/helpers'

describe('ToggleField', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TagsField name="test" placeholder="placeholder" />,
    ))

  test('should render correctly disabled', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TagsField name="test-disabled" placeholder="placeholder" disabled />,
    ))

  test('should render correctly with default tags', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TagsField
        name="test-tags"
        placeholder="placeholder"
        tags={['tags-1', 'tags-2']}
      />,
    ))
  test('should render correctly with default tags on initialValues Form', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TagsField name="formTags" placeholder="placeholder" />,
      {},
      {
        initialValues: {
          formTags: ['tags-1', 'tags-2'],
        },
      },
    ))

  test('should render correctly with default tags on initialValues Form', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <TagsField name="formTags" placeholder="placeholder" />,
      {
        transform: async ({ getByDisplayValue, getByText }) => {
          const input = getByDisplayValue('') as HTMLInputElement
          await userEvent.type(input, 'test{enter}')
          await waitFor(() => expect(input.value).toBe(''))
          expect(getByText('test')).toBeInTheDocument()
        },
      },
      {
        initialValues: {
          formTags: ['tags-1', 'tags-2'],
        },
      },
    ))
})
