import Reminder from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Reminder', () => {
  test('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(<Reminder text="This is a sample Test" />))

  test('renders correctly when bordered', () =>
    shouldMatchEmotionSnapshot(
      <Reminder bordered text="This is a sample Test" />,
    ))

  test('renders correctly with variant', () =>
    shouldMatchEmotionSnapshot(
      <Reminder variant="info" bordered text="This is a sample Test" />,
    ))

  test('renders correctly with bold', () =>
    shouldMatchEmotionSnapshot(
      <Reminder variant="info" bordered text="This is a [bold] Test" />,
    ))
})
