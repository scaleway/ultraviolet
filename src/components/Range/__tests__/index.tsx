import userEvent from '@testing-library/user-event'
import Range from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Range', () => {
  test('should render correctly', () => shouldMatchEmotionSnapshot(<Range />))

  test('should render correctly with one value', () =>
    shouldMatchEmotionSnapshot(<Range value={[5]} onChange={() => {}} />))

  test('should render correctly with two values', () =>
    shouldMatchEmotionSnapshot(<Range value={[5, 10]} />))

  test('should render correctly with min max', async () => {
    await shouldMatchEmotionSnapshot(<Range min={0} max={20} value={[5, 10]} />)
    await shouldMatchEmotionSnapshot(<Range min={0} max={20} value={[5]} />)
  })

  test('should render correctly with min max and out of range value', async () => {
    await shouldMatchEmotionSnapshot(<Range min={0} max={20} value={[5, 30]} />)
    await shouldMatchEmotionSnapshot(<Range min={0} max={10} value={[15]} />)
  })

  test('should render correctly with props', () =>
    shouldMatchEmotionSnapshot(
      <Range
        min={0}
        max={20}
        value={[5, 30]}
        name="test"
        cursorWidth={45}
        halfCursorWidth={20}
        limitOffset={90}
        offsetTop={120}
      />,
    ))

  test('should render correctly with input change', () =>
    shouldMatchEmotionSnapshot(
      <Range min={0} max={20} value={[5]} name="test" />,
      {
        transform: node => {
          const input = node.getByRole('textbox')
          userEvent.click(input)
          if (input.parentElement) {
            userEvent.click(input.parentElement, {
              movementX: 200,
              view: window,
            })
          }
          input.blur()
          userEvent.type(input, '{space}')
          userEvent.type(input, 'ABCDE')
          userEvent.type(input, '10')
          userEvent.type(input, 'E')
        },
      },
    ))
  test('should render correctly with two values input change', () =>
    shouldMatchEmotionSnapshot(
      <Range min={0} max={20} value={[5, 10]} name="test" />,
      {
        transform: node => {
          const input = node.getByDisplayValue('5')
          const input2 = node.getByDisplayValue('10')
          userEvent.click(input)
          userEvent.click(input2)
          if (input.parentElement) {
            userEvent.click(input.parentElement, {
              movementX: 200,
              view: window,
            })
          }
          userEvent.type(input, '{space}')
          userEvent.type(input, 'ABCDE')
          userEvent.type(input, '10')
          userEvent.type(input, 'E')
          userEvent.type(input2, '{space}')
          userEvent.type(input2, 'ABCDE')
          userEvent.type(input2, '10')
          userEvent.type(input2, 'E')
        },
      },
    ))
})
