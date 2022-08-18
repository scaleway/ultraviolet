import userEvent from '@testing-library/user-event'
import Toggle from '..'
import {
  renderWithTheme,
  shouldMatchEmotionSnapshot,
} from '../../../helpers/jestHelpers'

describe('Toggle', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(<Toggle name="test" onChange={() => {}} />))

  test('renders correctly when checked', () =>
    shouldMatchEmotionSnapshot(
      <Toggle name="test" onChange={() => {}} checked />,
    ))

  test('renders correctly when disabled', () =>
    shouldMatchEmotionSnapshot(
      <Toggle name="test" onChange={() => {}} disabled />,
    ))

  test('renders correctly with non default size', () =>
    shouldMatchEmotionSnapshot(
      <Toggle name="test" onChange={() => {}} size="small" />,
    ))

  test('renders correctly label', () =>
    shouldMatchEmotionSnapshot(
      <Toggle name="test" onChange={() => {}} label="This is a label" />,
    ))

  test('renders correctly with labels on left', () =>
    shouldMatchEmotionSnapshot(
      <Toggle
        name="test"
        onChange={() => {}}
        labelPosition="left"
        label="This is a label"
      />,
    ))

  test('renders correctly with custom labels on right', () =>
    shouldMatchEmotionSnapshot(
      <Toggle
        name="test"
        onChange={() => {}}
        labelPosition="right"
        label="This is a label"
      />,
    ))

  test('renders correctly with complex label', () =>
    shouldMatchEmotionSnapshot(
      <Toggle
        name="test"
        onChange={() => {}}
        label={<span>Custom label rendered</span>}
      />,
    ))

  test('renders and click on toggle on', () => {
    const node = renderWithTheme(
      <Toggle name="test" onChange={() => {}} label="This is a label" />,
    )

    const input = node.getByRole('checkbox')
    userEvent.click(input)
    expect(input.getAttribute('aria-checked')).toBe('true')
  })
})
