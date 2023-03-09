import { Stepper } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('Stepper', () => {
  test('renders correctly with default props', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={0}>
        <span>Step 1</span>
        <span>Step 2</span>
        <span>Step 3</span>
      </Stepper>,
    ))

  test('renders correctly with selected prop', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={1}>
        <span>Step 1</span>
        <span>Step 2</span>
        <span>Step 3</span>
      </Stepper>,
    ))

  test('renders correctly with animation', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={1} animated>
        <span>Step 1</span>
        <span>Step 2</span>
        <span>Step 3</span>
      </Stepper>,
    ))

  test('renders correctly with all selected', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={2}>
        <span>Step 1</span>
        <span>Step 2</span>
        <span>Step 3</span>
      </Stepper>,
    ))
})
