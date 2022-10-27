import userEvent from '@testing-library/user-event'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../helpers/jestHelpers'
import Snippet from '../index'

const TEST_VALUE = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
`

describe('Snippet', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(<Snippet value={TEST_VALUE} />))

  test('renders correctly with multiline', () =>
    shouldMatchEmotionSnapshot(<Snippet value={TEST_VALUE} multiline />))

  test('renders correctly with multiline with prefix lines number', () =>
    shouldMatchEmotionSnapshot(
      <Snippet value={TEST_VALUE} multiline prefix="lines" />,
    ))

  test('renders correctly with multiline with prefix command', () =>
    shouldMatchEmotionSnapshot(
      <Snippet value={TEST_VALUE} multiline prefix="command" />,
    ))

  test('renders correctly with single line with prefix command', () =>
    shouldMatchEmotionSnapshot(<Snippet value={TEST_VALUE} prefix="command" />))

  test('renders correctly with single line with prefix lines number', () =>
    shouldMatchEmotionSnapshot(<Snippet value={TEST_VALUE} prefix="lines" />))

  test('renders correctly with copyText', () =>
    shouldMatchEmotionSnapshot(<Snippet value={TEST_VALUE} copyText="Test" />))

  test('renders correctly with copiedText', () =>
    shouldMatchEmotionSnapshot(
      <Snippet value={TEST_VALUE} copiedText="Test" />,
    ))

  test('renders correctly with hideText', () =>
    shouldMatchEmotionSnapshot(<Snippet value={TEST_VALUE} hideText="Test" />))

  test('renders correctly with showText', () =>
    shouldMatchEmotionSnapshot(<Snippet value={TEST_VALUE} showText="Test" />))

  it('should click on extend button to display full content on multiline', async () => {
    const node = renderWithTheme(<Snippet multiline value={TEST_VALUE} />)

    await userEvent.click(node.getByRole('button', { name: 'Show' }))
  })
})
