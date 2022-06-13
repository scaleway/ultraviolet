import Stepper from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import Typography from '../../Typography'

describe('Stepper', () => {
  test('renders correctly with default props', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={0} animated>
        <Typography>Step 1</Typography>
        <Typography>Step 2</Typography>
        <Typography>Step 3</Typography>
      </Stepper>,
    ))

  test('renders correctly with selected prop', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={1} animated>
        {false && (
          <>
            <Typography>Step 0</Typography>
            <Typography>Step 0</Typography>
          </>
        )}
        <Typography>Step 1</Typography>
        <Typography>Step 2</Typography>
        <Typography>Step 3</Typography>
      </Stepper>,
    ))

  test('renders correctly without animation', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={1}>
        <Typography>Step 1</Typography>
        <Typography>Step 2</Typography>
        <Typography>Step 3</Typography>
      </Stepper>,
    ))

  test('renders correctly with all selected', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={2} animated>
        <Typography>Step 1</Typography>
        <Typography>Step 2</Typography>
        <Typography>Step 3</Typography>
      </Stepper>,
    ))
})
