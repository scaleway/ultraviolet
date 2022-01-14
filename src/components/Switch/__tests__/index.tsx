import Switch from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Switch', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(<Switch name="test" onChange={() => {}} />))

  test('renders correctly when checked', () =>
    shouldMatchEmotionSnapshot(
      <Switch name="test" onChange={() => {}} checked />,
    ))

  test('renders correctly when disabled', () =>
    shouldMatchEmotionSnapshot(
      <Switch name="test" onChange={() => {}} disabled />,
    ))

  test('renders correctly with non default variant', () =>
    shouldMatchEmotionSnapshot(
      <Switch name="test" onChange={() => {}} variant="success" />,
    ))

  test('renders correctly with non default size', () =>
    shouldMatchEmotionSnapshot(
      <Switch name="test" onChange={() => {}} size="small" />,
    ))

  test('renders correctly with custom width', () =>
    shouldMatchEmotionSnapshot(
      <Switch name="test" onChange={() => {}} width={120} />,
    ))

  test('renders correctly labeled', () =>
    shouldMatchEmotionSnapshot(
      <Switch name="test" onChange={() => {}} labeled />,
    ))

  test('renders correctly with custom inside labels', () =>
    shouldMatchEmotionSnapshot(
      <Switch
        name="test"
        onChange={() => {}}
        labeled
        onLabel="Yes"
        offLabel="No"
      />,
    ))

  test('renders correctly with label inside', () =>
    shouldMatchEmotionSnapshot(
      <Switch name="test" onChange={() => {}} labeled="inside" />,
    ))

  test('renders correctly with labels on left', () =>
    shouldMatchEmotionSnapshot(
      <Switch name="test" onChange={() => {}} labeled="left" />,
    ))

  test('renders correctly with custom labels on right', () =>
    shouldMatchEmotionSnapshot(
      <Switch
        name="test"
        onChange={() => {}}
        labeled="right"
        onLabel="Checked"
        offLabel="Unchecked"
      />,
    ))

  test('renders correctly with custom label render on left', () =>
    shouldMatchEmotionSnapshot(
      <Switch
        name="test"
        onChange={() => {}}
        labeled="left"
        onLabel={<span>Custom label rendered</span>}
        offLabel={
          <span style={{ fontWeight: 'bold' }}>Custom label rendered</span>
        }
      />,
    ))

  test('renders correctly when checked and labeled', () =>
    shouldMatchEmotionSnapshot(
      <Switch name="test" onChange={() => {}} checked labeled="inside" />,
    ))

  test('renders correctly when checked and labeled on right', () =>
    shouldMatchEmotionSnapshot(
      <Switch name="test" onChange={() => {}} checked labeled="right" />,
    ))

  test('renders correctly when checked and labeled on left', () =>
    shouldMatchEmotionSnapshot(
      <Switch name="test" onChange={() => {}} checked labeled="left" />,
    ))
})
