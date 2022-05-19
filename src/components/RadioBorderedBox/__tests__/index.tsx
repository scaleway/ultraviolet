import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ChangeEvent } from 'react'
import RadioBorderedBox from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('RadioBorderedBox', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <RadioBorderedBox
        label="Choice"
        onChange={() => {}}
        name="radio"
        value="choice"
      >
        Choice description
      </RadioBorderedBox>,
    ))

  test('renders correctly when disabled', () =>
    shouldMatchEmotionSnapshot(
      <RadioBorderedBox
        label="Choice"
        onChange={() => {}}
        name="radio"
        value="choice"
        disabled
      >
        Choice description
      </RadioBorderedBox>,
    ))

  test('renders correctly when error', () =>
    shouldMatchEmotionSnapshot(
      <RadioBorderedBox
        label="Choice"
        onChange={() => {}}
        name="radio"
        value="choice"
        error="Invalid value"
      >
        Choice description
      </RadioBorderedBox>,
    ))

  test('renders correctly when checked', () =>
    shouldMatchEmotionSnapshot(
      <RadioBorderedBox
        label="Choice"
        onChange={() => {}}
        name="radio"
        value="choice"
        checked
      >
        Choice description
      </RadioBorderedBox>,
    ))

  test('renders correctly with label desc and badge', () =>
    shouldMatchEmotionSnapshot(
      <RadioBorderedBox
        label="Choice"
        labelDescription="(something)"
        badgeText="Badge"
        badgeVariant="warning"
        badgeSize="small"
        onChange={() => {}}
        name="radio"
        value="choice"
        disabled
      >
        Choice description
      </RadioBorderedBox>,
    ))

  test('renders correctly and triggers change on borderedbox click', () => {
    let choice = ''

    return shouldMatchEmotionSnapshot(
      <RadioBorderedBox
        checked={choice === 'choice1'}
        id="radiotest"
        label="Choice 1"
        name="radioborderedbox"
        value="choice1"
        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          choice = evt.target.value
        }}
      >
        Choice 1 description
      </RadioBorderedBox>,
      {
        transform: async () => {
          userEvent.click(document.body)
          await waitFor(() => expect(choice).not.toBe('choice1'))
        },
      },
    )
  })
})
