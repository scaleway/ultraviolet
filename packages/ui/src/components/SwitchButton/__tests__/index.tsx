import userEvent from '@testing-library/user-event'
import { SwitchButton } from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../../.jest/helpers'
import { FocusOverlay } from '../FocusOverlay'

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

  test('renders with on change', async () => {
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

    await userEvent.click(input[1])
  })
})

describe('FocusOverlay', () => {
  test('renders correctly when right is focused', () =>
    shouldMatchEmotionSnapshot(
      <FocusOverlay
        focusPosition="right"
        rightCardWidth={200}
        leftCardWidth={400}
        hasMouseDown={false}
      />,
    ))

  test('renders correctly when left is focused', () =>
    shouldMatchEmotionSnapshot(
      <FocusOverlay
        focusPosition="left"
        rightCardWidth={200}
        leftCardWidth={400}
        hasMouseDown={false}
      />,
    ))

  test('renders correctly when right is focused and has mouse down', () =>
    shouldMatchEmotionSnapshot(
      <FocusOverlay
        focusPosition="right"
        rightCardWidth={200}
        leftCardWidth={400}
        hasMouseDown
      />,
    ))

  test('renders correctly when left is focused and has mouse down', () =>
    shouldMatchEmotionSnapshot(
      <FocusOverlay
        focusPosition="left"
        rightCardWidth={200}
        leftCardWidth={400}
        hasMouseDown
      />,
    ))
})
