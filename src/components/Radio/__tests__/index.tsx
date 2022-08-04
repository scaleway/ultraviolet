import Radio from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Radio', () => {
  beforeAll(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.4155913669444804)
  })

  afterAll(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(
      <Radio onChange={() => {}} name="radio" value="choice">
        Choice
      </Radio>,
    ))

  test('renders correctly when disabled', () =>
    shouldMatchEmotionSnapshot(
      <Radio onChange={() => {}} name="radio" value="choice" disabled>
        Choice
      </Radio>,
    ))

  test('renders without name', () =>
    shouldMatchEmotionSnapshot(
      <Radio onChange={() => {}} value="choice" disabled>
        Choice
      </Radio>,
    ))

  test('renders correctly when checked', () =>
    shouldMatchEmotionSnapshot(
      <Radio onChange={() => {}} name="radio" value="choice" checked>
        Choice
      </Radio>,
    ))

  test('renders correctly when error', () =>
    shouldMatchEmotionSnapshot(
      <Radio
        onChange={() => {}}
        name="radio"
        value="choice"
        error="Invalid value"
      >
        Choice
      </Radio>,
    ))
})
