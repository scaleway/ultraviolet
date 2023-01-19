import userEvent from '@testing-library/user-event'
import { TextInput } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

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

  test('should render correctly label and noTopLabel', async () => {
    await shouldMatchEmotionSnapshot(
      <TextInput label="Test" value="test" noTopLabel />,
    )
    await shouldMatchEmotionSnapshot(<TextInput value="test" noTopLabel />)
    await shouldMatchEmotionSnapshot(<TextInput label="Test" value="test" />)
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

  test('should render on focus', () =>
    shouldMatchEmotionSnapshot(
      <TextInput
        id="test"
        label="Test"
        multiline
        rows={10}
        cols={50}
        onFocus={() => {}}
      />,
      {
        transform: node => {
          const input = node.getByLabelText('Test')
          input.focus()
        },
      },
    ))

  test('should render toggleable password', () =>
    shouldMatchEmotionSnapshot(
      <TextInput type="toggleable-password" name="password" />,
    ))

  test('should handle events on toggleable password', () =>
    shouldMatchEmotionSnapshot(
      <TextInput type="toggleable-password" name="password" />,
      {
        transform: async node => {
          const button = node.getByTitle('Show')
          await userEvent.click(button)
          await userEvent.type(button, '{enter}')
          await userEvent.type(button, '{space}')
        },
      },
    ))

  test('should render random', async () => {
    await shouldMatchEmotionSnapshot(<TextInput random="test" name="test" />)
    await shouldMatchEmotionSnapshot(
      <TextInput label="test" name="test" random="test" disabled />,
    )
  })

  test('should handle events on random button', () =>
    shouldMatchEmotionSnapshot(
      <TextInput random="test" name="test" onChange={() => {}} />,
      {
        transform: async node => {
          const button = node.getByTitle('Randomize')
          await userEvent.click(button)
          await userEvent.type(button, '{enter}')
          await userEvent.type(button, '{space}')
        },
      },
    ))

  test('should render toggleable password with required', () =>
    shouldMatchEmotionSnapshot(
      <TextInput type="toggleable-password" name="password" required />,
    ))

  test('should render random with required', () =>
    shouldMatchEmotionSnapshot(
      <TextInput random="test" name="test" required />,
    ))

  test('should render unit with required', () =>
    shouldMatchEmotionSnapshot(
      <TextInput label="test" name="test" unit="px" required />,
    ))

  test('should render correctly with valid true', () =>
    shouldMatchEmotionSnapshot(<TextInput label="test" name="test" valid />))

  test('should render correctly with valid false', () =>
    shouldMatchEmotionSnapshot(
      <TextInput label="test" name="test" valid={false} />,
    ))

  test('should render correctly with multiple right components', () =>
    shouldMatchEmotionSnapshot(
      <TextInput
        label="Multiple"
        random="prefix"
        unit="px"
        required
        type="toggleable-password"
        valid
      />,
    ))
})
