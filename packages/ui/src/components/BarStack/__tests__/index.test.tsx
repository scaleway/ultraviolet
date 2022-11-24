import userEvent from '@testing-library/user-event'
import BarStack from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

const fakeData = [
  { id: '1', text: 'Hello', value: 20 },
  { id: '2', value: 42 },
  { id: '3', text: 'Encore', value: 42 },
  { id: '4', text: 'Next', value: 42 },
  { id: '5', text: 'Bye bye', value: 42 },
]

describe('BarStack', () => {
  test('should render correctly', () =>
    shouldMatchEmotionSnapshot(<BarStack data={fakeData} />))

  test('should render correctly with total', () =>
    shouldMatchEmotionSnapshot(<BarStack data={fakeData} total={1000} />))

  test('should render correctly with event handlers', async () => {
    const [
      onClick,
      onDoubleClick,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onMouseUp,
    ] = new Array(6).fill(1).map(() => jest.fn())

    return shouldMatchEmotionSnapshot(
      <BarStack
        data={[
          {
            id: '1',
            onClick,
            onDoubleClick,
            onMouseDown,
            onMouseEnter,
            onMouseLeave,
            onMouseUp,
            text: 'Hello',
            value: 100,
          },
        ]}
      />,
      {
        transform: async node => {
          const helloDiv = node.getByText('Hello')
          await userEvent.click(helloDiv)
          expect(onClick).toBeCalledTimes(1)
          expect(onMouseEnter).toBeCalledTimes(1)
          expect(onMouseDown).toBeCalledTimes(1)
          expect(onMouseUp).toBeCalledTimes(1)
          expect(onDoubleClick).toBeCalledTimes(0)
          expect(onMouseLeave).toBeCalledTimes(0)
          await userEvent.dblClick(helloDiv)
          expect(onDoubleClick).toBeCalledTimes(1)
          expect(onClick).toBeCalledTimes(3)
          await userEvent.unhover(helloDiv)
          expect(onMouseLeave).toBeCalledTimes(1)
        },
      },
    )
  })
})
