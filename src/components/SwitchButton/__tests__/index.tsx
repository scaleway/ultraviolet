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
        leftButton={{
          label: 'Left',
          value: 'left',
        }}
        rightButton={{
          label: 'Right',
          value: 'right',
        }}
      />,
    ))

  test('renders correctly with right value', () =>
    shouldMatchEmotionSnapshot(
      <SwitchButton
        name="test"
        value="right"
        onChange={() => {}}
        leftButton={{
          label: 'Left',
          value: 'left',
        }}
        rightButton={{
          label: 'Right',
          value: 'right',
        }}
      />,
    ))

  test('renders with tooltip', () =>
    shouldMatchEmotionSnapshot(
      <SwitchButton
        name="test"
        onChange={() => {}}
        leftButton={{
          label: 'Left',
          value: 'left',
        }}
        rightButton={{
          label: 'Right',
          value: 'right',
        }}
        tooltip="This is a tooltip"
      />,
    ))

  test('renders with on change', () => {
    const onChange = jest.fn()

    const node = renderWithTheme(
      <SwitchButton
        name="test"
        onChange={onChange}
        leftButton={{
          label: 'Left',
          value: 'left',
        }}
        rightButton={{
          label: 'Right',
          value: 'right',
        }}
        tooltip="This is a tooltip"
      />,
    )

    const input = node.getAllByRole('radio', {
      hidden: true,
    })

    userEvent.click(input[1])
  })
})
