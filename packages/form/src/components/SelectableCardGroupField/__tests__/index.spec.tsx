import {
  afterAll,
  beforeAll,
  describe,
  expect,
  jest,
  test,
} from '@jest/globals'
import { act, screen } from '@testing-library/react'
import { Form, SelectableCardGroupField } from '../..'
import {
  mockRandom,
  restoreRandom,
  shouldMatchEmotionSnapshot,
  shouldMatchEmotionSnapshotFormWrapper,
} from '../../../../.jest/helpers'
import { mockErrors } from '../../../mocks'

describe('SelectableCardField', () => {
  beforeAll(() => {
    mockRandom()
  })
  afterAll(restoreRandom)

  test('should render correctly', () =>
    shouldMatchEmotionSnapshotFormWrapper(
      <SelectableCardGroupField
        name="test"
        value="test"
        legend="test"
        onChange={() => {}}
      >
        <SelectableCardGroupField.Card value="radio 1" label="Radio 1" />
        <SelectableCardGroupField.Card value="radio 2" label="Radio 2" />
      </SelectableCardGroupField>,
    ))

  test('should render correctly checked as radiofield', () =>
    shouldMatchEmotionSnapshot(
      <Form
        onRawSubmit={() => {}}
        errors={mockErrors}
        initialValues={{ test: 'checked' }}
      >
        <SelectableCardGroupField
          name="test"
          value="checked"
          legend="test"
          type="radio"
        >
          <SelectableCardGroupField.Card
            value="checked"
            label="Radio 1"
            data-testid="checked"
          />
        </SelectableCardGroupField>
      </Form>,
      {
        transform: () => {
          const input = screen.getByLabelText('Radio 1')
          expect(input).toBeChecked()
        },
      },
    ))

  test('should render correctly checked as a checkbox', () =>
    shouldMatchEmotionSnapshot(
      <Form
        onRawSubmit={() => {}}
        errors={mockErrors}
        initialValues={{ test: 'checked' }}
      >
        <SelectableCardGroupField
          name="test"
          value={['checked']}
          legend="test"
          type="checkbox"
        >
          <SelectableCardGroupField.Card
            value="checked"
            label="Checkbox 1"
            data-testid="checked"
          />
        </SelectableCardGroupField>
      </Form>,
      {
        transform: () => {
          const input = screen.getByLabelText('Checkbox 1')
          expect(input).toBeChecked()
        },
      },
    ))

  test('should trigger events correctly', () => {
    const onChange = jest.fn(() => {})

    return shouldMatchEmotionSnapshotFormWrapper(
      <SelectableCardGroupField
        name="test"
        value="events"
        onChange={onChange}
        legend="test"
        type="checkbox"
      >
        <SelectableCardGroupField.Card value="radio 1" label="Radio 1" />
        <SelectableCardGroupField.Card value="radio 2" label="Radio 2" />{' '}
      </SelectableCardGroupField>,
      {
        transform: () => {
          const input = screen.getByLabelText('Radio 1')
          act(() => input.click())
          expect(onChange).toBeCalledTimes(1)
          act(() => input.click())
          expect(onChange).toBeCalledTimes(2)
        },
      },
    )
  })
})
