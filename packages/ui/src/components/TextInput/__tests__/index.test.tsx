import { act, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { TextInput } from '..'

describe('TextInput', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshot(<TextInput />))

  test('should render correctly with basic props', () =>
    shouldMatchEmotionSnapshot(
      <TextInput
        id="test"
        label="Test"
        value="test"
        placeholder="type..."
        type="text"
      />,
    ))

  test('should render correctly label and noTopLabel', () => {
    shouldMatchEmotionSnapshot(
      <TextInput label="Test" value="test" noTopLabel />,
    )
    shouldMatchEmotionSnapshot(<TextInput value="test" noTopLabel />)
    shouldMatchEmotionSnapshot(<TextInput label="Test" value="test" />)
  })

  test('should render correctly with notice', () =>
    shouldMatchEmotionSnapshot(
      <TextInput label="Test" value="test" notice="Test notice" />,
    ))

  test('should render correctly disabled true', () =>
    shouldMatchEmotionSnapshot(
      <TextInput label="Test" value="test" disabled />,
    ))
  test('should render correctly required true', () =>
    shouldMatchEmotionSnapshot(
      <TextInput label="Test" value="test" required />,
    ))

  test('should render correctly error string', () =>
    shouldMatchEmotionSnapshot(
      <TextInput label="Test" value="test" error="test error" />,
    ))

  test('should render correctly multiline true', () =>
    shouldMatchEmotionSnapshot(<TextInput multiline resizable={false} />))

  test('should render correctly with height prop', () =>
    shouldMatchEmotionSnapshot(
      <TextInput height={90} label="Test" value="test" />,
    ))

  test('should render correctly with unit is px', () =>
    shouldMatchEmotionSnapshot(
      <TextInput label="test" name="test" unit="px" />,
    ))

  test('should render correctly with unit is px and required', () =>
    shouldMatchEmotionSnapshot(
      <TextInput label="test" name="test" unit="px" required />,
    ))

  test('should render correctly with null right component', () =>
    shouldMatchEmotionSnapshot(
      <TextInput
        label="test"
        name="test"
        type="toggleable-password"
        generated
      />,
    ))

  test('should render correctly with edit true', () =>
    shouldMatchEmotionSnapshot(<TextInput label="test" name="test" edit />))

  test('should render correctly with generated true', () =>
    shouldMatchEmotionSnapshot(
      <TextInput label="test" name="test" generated />,
    ))

  test('should render correctly with valid true', () =>
    shouldMatchEmotionSnapshot(<TextInput label="test" name="test" valid />))

  test('should render correctly with valid false', () =>
    shouldMatchEmotionSnapshot(
      <TextInput label="test" name="test" valid={false} />,
    ))

  test('should render correctly with readOnly true', () =>
    shouldMatchEmotionSnapshot(<TextInput label="test" name="test" readOnly />))

  test('should render correctly with fillAvailable true', () =>
    shouldMatchEmotionSnapshot(
      <TextInput label="test" name="test" fillAvailable />,
    ))

  test('should render correctly with defaultValue true', () =>
    shouldMatchEmotionSnapshot(
      <TextInput label="test" name="test" defaultValue="Test default value" />,
    ))

  test('should render correctly with ariaControls', () =>
    shouldMatchEmotionSnapshot(
      <TextInput label="test" name="test" ariaControls="test-control" />,
    ))

  test('should render multiline with props', () =>
    shouldMatchEmotionSnapshot(
      <TextInput multiline rows={10} cols={50} fillAvailable resizable />,
    ))

  test('should render on focus', () => {
    const { asFragment } = renderWithTheme(
      <TextInput
        id="test"
        label="Test"
        multiline
        rows={10}
        cols={50}
        onFocus={() => {}}
      />,
    )
    const input = screen.getByLabelText('Test')
    act(() => {
      input.focus()
    })
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render toggleable password', () => {
    shouldMatchEmotionSnapshot(
      <TextInput type="toggleable-password" name="password" />,
    )
  })

  test('should handle events on toggleable password', async () => {
    const { asFragment } = renderWithTheme(
      <TextInput
        type="toggleable-password"
        name="password"
        data-testid="test"
      />,
    )
    const button = screen.getByTestId('test-visibility-button')
    await userEvent.click(button)
    await userEvent.type(button, '{enter}')
    await userEvent.type(button, '{space}')

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render random', () => {
    shouldMatchEmotionSnapshot(<TextInput random="test" name="test" />)
    shouldMatchEmotionSnapshot(
      <TextInput label="test" name="test" random="test" disabled />,
    )
  })

  test('should handle events on random button', async () => {
    const { asFragment } = renderWithTheme(
      <TextInput
        random="test"
        name="test"
        data-testid="test"
        onChange={() => {}}
      />,
    )
    const button = screen.getByTestId('test-randomize-button')
    await userEvent.click(button)
    await userEvent.type(button, '{enter}')
    await userEvent.type(button, '{space}')
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render toggleable password with required', () => {
    const { asFragment } = renderWithTheme(
      <TextInput type="toggleable-password" name="password" required />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render random with required', () => {
    const { asFragment } = renderWithTheme(
      <TextInput random="test" name="test" required />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render unit with required', () => {
    const { asFragment } = renderWithTheme(
      <TextInput label="test" name="test" unit="px" required />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with valid true', () => {
    const { asFragment } = renderWithTheme(
      <TextInput label="test" name="test" valid />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with valid false', () => {
    const { asFragment } = renderWithTheme(
      <TextInput label="test" name="test" valid={false} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render correctly with multiple right components', () => {
    const { asFragment } = renderWithTheme(
      <TextInput
        label="Multiple"
        random="prefix"
        unit="px"
        required
        type="toggleable-password"
        valid
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
