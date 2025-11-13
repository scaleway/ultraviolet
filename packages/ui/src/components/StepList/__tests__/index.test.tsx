import { AlertCircleOutlineIcon, CheckIcon } from '@ultraviolet/icons'
import { shouldMatchSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { StepList } from '..'

describe('stepList', () => {
  test('renders correctly ', () =>
    shouldMatchSnapshot(
      <StepList>
        <StepList.Item bulletContent="1">Item 1</StepList.Item>
      </StepList>,
    ))

  test('renders correctly with bulletContent', () =>
    shouldMatchSnapshot(
      <StepList>
        <StepList.Item bulletContent={<AlertCircleOutlineIcon />}>
          Item 1
        </StepList.Item>
      </StepList>,
    ))

  test('renders correctly with bulletContent & sentiment', () =>
    shouldMatchSnapshot(
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
    shouldMatchSnapshot(
      <StepList>
        <StepList.Item bulletContent="1" size="small">
          Item 1 small
        </StepList.Item>
      </StepList>,
    ))

  test('renders correctly with disabled state', () =>
    shouldMatchSnapshot(
      <StepList>
        <StepList.Item bulletContent="1" disabled>
          <div>Item 1 with disabled state</div>
        </StepList.Item>
      </StepList>,
    ))

  test('renders correctly with disabled state & bullet icon', () =>
    shouldMatchSnapshot(
      <StepList>
        <StepList.Item bulletContent={<CheckIcon />} disabled>
          <div>Item 1 with disabled state</div>
        </StepList.Item>
      </StepList>,
    ))
})
