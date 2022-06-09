import Stepper from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Stepper', () => {
  test('renders correctly with default props', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={0}>
        <Stepper.Step>Step 1</Stepper.Step>
        <Stepper.Step>Step 2</Stepper.Step>
        <Stepper.Step>Step 3</Stepper.Step>
      </Stepper>,
    ))

  test('renders correctly with selected prop', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={1}>
        {false && (
          <>
            <Stepper.Step>Step 0</Stepper.Step>
            <Stepper.Step>Step 0</Stepper.Step>
          </>
        )}
        <Stepper.Step>Step 1</Stepper.Step>
        <Stepper.Step>Step 2</Stepper.Step>
        <Stepper.Step>Step 3</Stepper.Step>
      </Stepper>,
    ))

  test('renders correctly without animation', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={1} animated={false}>
        <Stepper.Step>Step 1</Stepper.Step>
        <Stepper.Step>Step 2</Stepper.Step>
        <Stepper.Step>Step 3</Stepper.Step>
      </Stepper>,
    ))

  test('renders correctly with all selected', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={2}>
        <Stepper.Step>Step 1</Stepper.Step>
        <Stepper.Step>Step 2</Stepper.Step>
        <Stepper.Step>Step 3</Stepper.Step>
      </Stepper>,
    ))

  test('renders correctly with steps number', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={1} isStepsNumber>
        <Stepper.Step>Step 1</Stepper.Step>
        <Stepper.Step>Step 2</Stepper.Step>
        <Stepper.Step>Step 3</Stepper.Step>
      </Stepper>,
    ))
})
