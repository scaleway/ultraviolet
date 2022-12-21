import StepList from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('StepList', () => {
  test('renders correctly ', () =>
    shouldMatchEmotionSnapshot(
      <StepList>
        <StepList.Item bulletText="1">Item 1</StepList.Item>
      </StepList>,
    ))

  test('renders correctly with bulletIcon', () =>
    shouldMatchEmotionSnapshot(
      <StepList>
        <StepList.Item bulletIcon="alert">Item 1</StepList.Item>
      </StepList>,
    ))

  test('renders correctly with bulletIcon & variant', () =>
    shouldMatchEmotionSnapshot(
      <StepList>
        <StepList.Item bulletIcon="alert" variant="success">
          Item 1
        </StepList.Item>
      </StepList>,
    ))

  test('renders correctly with small size', () =>
    shouldMatchEmotionSnapshot(
      <StepList>
        <StepList.Item bulletText="1" size="small">
          Item 1 small
        </StepList.Item>
      </StepList>,
    ))

  test('renders correctly with disabled state', () =>
    shouldMatchEmotionSnapshot(
      <StepList>
        <StepList.Item bulletText="1" disabled>
          <div>Item 1 with disabled state</div>
        </StepList.Item>
      </StepList>,
    ))

  test('renders correctly with disabled state & bullet icon', () =>
    shouldMatchEmotionSnapshot(
      <StepList>
        <StepList.Item bulletIcon="check" disabled>
          <div>Item 1 with disabled state</div>
        </StepList.Item>
      </StepList>,
    ))
})
