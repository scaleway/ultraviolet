import userEvent from '@testing-library/user-event'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import Snippet from '../index'

const TEST_VALUE_MULTILINE = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
`

const TEST_VALUE_SINGLELINE =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

describe('Snippet', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(<Snippet>{TEST_VALUE_SINGLELINE}</Snippet>))

  test('renders correctly in multiline ', () =>
    shouldMatchEmotionSnapshot(<Snippet>{TEST_VALUE_MULTILINE}</Snippet>))

  test('renders correctly in multiline with prefix lines number', () =>
    shouldMatchEmotionSnapshot(
      <Snippet prefix="lines">{TEST_VALUE_MULTILINE}</Snippet>,
    ))

  test('renders correctly in multiline with prefix command', () =>
    shouldMatchEmotionSnapshot(
      <Snippet prefix="command">{TEST_VALUE_MULTILINE}</Snippet>,
    ))

  test('renders correctly with single line with prefix command', () =>
    shouldMatchEmotionSnapshot(
      <Snippet prefix="command">{TEST_VALUE_SINGLELINE}</Snippet>,
    ))

  test('renders correctly with single line with prefix lines number', () =>
    shouldMatchEmotionSnapshot(
      <Snippet prefix="lines">{TEST_VALUE_SINGLELINE}</Snippet>,
    ))

  test('renders correctly with copyText', () =>
    shouldMatchEmotionSnapshot(
      <Snippet copyText="Test">{TEST_VALUE_SINGLELINE}</Snippet>,
    ))

  test('renders correctly with copiedText', () =>
    shouldMatchEmotionSnapshot(
      <Snippet copiedText="Test">{TEST_VALUE_SINGLELINE}</Snippet>,
    ))

  test('renders correctly with hideText', () =>
    shouldMatchEmotionSnapshot(
      <Snippet hideText="Test">{TEST_VALUE_MULTILINE}</Snippet>,
    ))

  test('renders correctly with showText', () =>
    shouldMatchEmotionSnapshot(
      <Snippet showText="Test">{TEST_VALUE_MULTILINE}</Snippet>,
    ))

  it('should click on extend button to display full content on ', () =>
    shouldMatchEmotionSnapshot(<Snippet>{TEST_VALUE_MULTILINE}</Snippet>, {
      transform: async ({ getAllByRole }) => {
        await userEvent.click(getAllByRole('button')[1])
      },
    }))
})
