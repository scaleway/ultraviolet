import Stepper from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import Typography from '../../Typography'

describe('Stepper', () => {
  test('renders correctly with default props', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={0}>
        <Typography>Step 1</Typography>
        <Typography>Step 2</Typography>
        <Typography>Step 3</Typography>
      </Stepper>,
    ))

  test('renders correctly with selected prop', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={1}>
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

  test('renders correctly with animation', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={1} animated>
        <Typography>Step 1</Typography>
        <Typography>Step 2</Typography>
        <Typography>Step 3</Typography>
      </Stepper>,
    ))

  test('renders correctly with all selected', () =>
    shouldMatchEmotionSnapshot(
      <Stepper selected={2}>
        <Typography>Step 1</Typography>
        <Typography>Step 2</Typography>
        <Typography>Step 3</Typography>
      </Stepper>,
    ))
})
