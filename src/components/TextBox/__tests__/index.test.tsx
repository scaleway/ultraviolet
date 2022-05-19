import userEvent from '@testing-library/user-event'
import TextBox from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('TextBox', () => {
  test('should render correctly', () => shouldMatchEmotionSnapshot(<TextBox />))

  test('should render correctly with basic props', () =>
    shouldMatchEmotionSnapshot(
      <TextBox
        id="test"
        label="Test"
        value="test"
        placeholder="type..."
        type="text"
      />,
    ))

  test('should render correctly label and noTopLabel', async () => {
    await shouldMatchEmotionSnapshot(
      <TextBox label="Test" value="test" noTopLabel />,
    )
    await shouldMatchEmotionSnapshot(<TextBox value="test" noTopLabel />)
    await shouldMatchEmotionSnapshot(<TextBox label="Test" value="test" />)
  })

  test('should render correctly with notice', () =>
    shouldMatchEmotionSnapshot(
      <TextBox label="Test" value="test" notice="Test notice" />,
    ))

  test('should render correctly disabled true', () =>
    shouldMatchEmotionSnapshot(<TextBox label="Test" value="test" disabled />))
  test('should render correctly required true', () =>
    shouldMatchEmotionSnapshot(<TextBox label="Test" value="test" required />))

  test('should render correctly error string', () =>
    shouldMatchEmotionSnapshot(
      <TextBox label="Test" value="test" error="test error" />,
    ))

  test('should render correctly multiline true', () =>
    shouldMatchEmotionSnapshot(<TextBox multiline resizable={false} />))

  test('should render correctly with height prop', () =>
    shouldMatchEmotionSnapshot(
      <TextBox height={90} label="Test" value="test" />,
    ))

  test('should render correctly with unit is px', () =>
    shouldMatchEmotionSnapshot(<TextBox label="test" name="test" unit="px" />))

  test('should render correctly with unit is px and required', () =>
    shouldMatchEmotionSnapshot(
      <TextBox label="test" name="test" unit="px" required />,
    ))

  test('should render correctly with null right component', () =>
    shouldMatchEmotionSnapshot(
      <TextBox label="test" name="test" type="toggleable-password" generated />,
    ))

  test('should render correctly with edit true', () =>
    shouldMatchEmotionSnapshot(<TextBox label="test" name="test" edit />))

  test('should render correctly with generated true', () =>
    shouldMatchEmotionSnapshot(<TextBox label="test" name="test" generated />))

  test('should render correctly with valid true', () =>
    shouldMatchEmotionSnapshot(<TextBox label="test" name="test" valid />))

  test('should render correctly with valid false', () =>
    shouldMatchEmotionSnapshot(
      <TextBox label="test" name="test" valid={false} />,
    ))

  test('should render correctly with readOnly true', () =>
    shouldMatchEmotionSnapshot(<TextBox label="test" name="test" readOnly />))

  test('should render correctly with fillAvailable true', () =>
    shouldMatchEmotionSnapshot(
      <TextBox label="test" name="test" fillAvailable />,
    ))

  test('should render correctly with defaultValue true', () =>
    shouldMatchEmotionSnapshot(
      <TextBox label="test" name="test" defaultValue="Test default value" />,
    ))

  test('should render correctly with ariaControls', () =>
    shouldMatchEmotionSnapshot(
      <TextBox label="test" name="test" ariaControls="test-control" />,
    ))

  test('should render multiline with props', () =>
    shouldMatchEmotionSnapshot(
      <TextBox multiline rows={10} cols={50} fillAvailable resizable />,
    ))

  test('should render on focus', () =>
    shouldMatchEmotionSnapshot(
      <TextBox
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
      <TextBox type="toggleable-password" name="password" />,
    ))

  test('should handle events on toggleable password', () =>
    shouldMatchEmotionSnapshot(
      <TextBox type="toggleable-password" name="password" />,
      {
        transform: node => {
          const button = node.getByTitle('Show')
          userEvent.click(button)
          userEvent.type(button, '{enter}')
          userEvent.type(button, '{space}')
        },
      },
    ))

  test('should render random', async () => {
    await shouldMatchEmotionSnapshot(<TextBox random="test" name="test" />)
    await shouldMatchEmotionSnapshot(
      <TextBox label="test" name="test" random="test" disabled />,
    )
  })

  test('should handle events on random button', () =>
    shouldMatchEmotionSnapshot(
      <TextBox random="test" name="test" onChange={() => {}} />,
      {
        transform: node => {
          const button = node.getByTitle('Randomize')
          userEvent.click(button)
          userEvent.type(button, '{enter}')
          userEvent.type(button, '{space}')
        },
      },
    ))
})
