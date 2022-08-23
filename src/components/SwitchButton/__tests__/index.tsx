import userEvent from '@testing-library/user-event'
import SwitchButton from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../helpers/jestHelpers'

describe('SwitchButton', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <SwitchButton
        name="test"
        onChange={() => {}}
        leftText="Left choice"
        leftValue="left"
        rightText="Right choice"
        rightValue="right"
      />,
    ))

  test('renders correctly with right value', () =>
    shouldMatchEmotionSnapshot(
      <SwitchButton
        name="test"
        value="right"
        onChange={() => {}}
        leftText="Left choice"
        leftValue="left"
        rightText="Right choice"
        rightValue="right"
      />,
    ))

  test('renders with tooltip', () =>
    shouldMatchEmotionSnapshot(
      <SwitchButton
        name="test"
        onChange={() => {}}
        leftText="Left choice"
        leftValue="left"
        rightText="Right choice"
        rightValue="right"
        tooltip="This is a tooltip"
      />,
    ))

  test('renders with on change', () => {
    const node = renderWithTheme(
      <SwitchButton
        name="test"
        onChange={() => {}}
        leftText="Left choice"
        leftValue="left"
        rightText="Right choice"
        rightValue="right"
        tooltip="This is a tooltip"
      />,
    )

    const input = node.getAllByRole('radio')

    userEvent.hover(input[1])
    userEvent.click(input[1])
  })
})
