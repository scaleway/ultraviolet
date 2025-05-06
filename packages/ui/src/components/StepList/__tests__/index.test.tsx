import { AlertCircleOutlineIcon, CheckIcon } from '@ultraviolet/icons'
import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { StepList } from '..'

describe('StepList', () => {
  test('renders correctly ', () =>
    shouldMatchEmotionSnapshot(
      <StepList>
        <StepList.Item bulletContent="1">Item 1</StepList.Item>
      </StepList>,
    ))

  test('renders correctly with bulletContent', () =>
    shouldMatchEmotionSnapshot(
      <StepList>
        <StepList.Item bulletContent={<AlertCircleOutlineIcon />}>
          Item 1
        </StepList.Item>
      </StepList>,
    ))

  test('renders correctly with bulletContent & sentiment', () =>
    shouldMatchEmotionSnapshot(
      <StepList>
        <StepList.Item
          bulletContent={<AlertCircleOutlineIcon />}
          sentiment="success"
        >
          Item 1
        </StepList.Item>
      </StepList>,
    ))

  test('renders correctly with small size', () =>
    shouldMatchEmotionSnapshot(
      <StepList>
        <StepList.Item bulletContent="1" size="small">
          Item 1 small
        </StepList.Item>
      </StepList>,
    ))

  test('renders correctly with disabled state', () =>
    shouldMatchEmotionSnapshot(
      <StepList>
        <StepList.Item bulletContent="1" disabled>
          <div>Item 1 with disabled state</div>
        </StepList.Item>
      </StepList>,
    ))

  test('renders correctly with disabled state & bullet icon', () =>
    shouldMatchEmotionSnapshot(
      <StepList>
        <StepList.Item bulletContent={<CheckIcon />} disabled>
          <div>Item 1 with disabled state</div>
        </StepList.Item>
      </StepList>,
    ))
})
