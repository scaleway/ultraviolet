import SelectableCard from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('SelectableCard', () => {
  test('renders correctly with default props', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard onChange={() => {}} name="radio" value="choice">
        Radio card
      </SelectableCard>,
    ))

  test('renders correctly with checkbox type', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="checkbox"
        value="choice"
        type="checkbox"
      >
        Checkbox card
      </SelectableCard>,
    ))

  test('renders correctly with showTick and type radio', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="checkbox"
        value="choice"
        type="radio"
        showTick
      >
        Checkbox card
      </SelectableCard>,
    ))

  test('renders correctly with showTick and type checkbox', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="checkbox"
        value="choice"
        type="checkbox"
        showTick
      >
        Checkbox card
      </SelectableCard>,
    ))

  test('renders correctly with radio type and checked prop', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="radio"
        type="radio"
        value="choice"
        checked
      >
        Radio card
      </SelectableCard>,
    ))

  test('renders correctly with checkbox type and checked prop', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="radio"
        type="checkbox"
        value="choice"
        checked
      >
        Radio card
      </SelectableCard>,
    ))

  test('renders correctly with radio type and disabled prop', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="radio"
        type="radio"
        value="choice"
        disabled
      >
        Radio card
      </SelectableCard>,
    ))

  test('renders correctly with checkbox type and disabled prop', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="radio"
        type="checkbox"
        value="choice"
        disabled
      >
        Radio card
      </SelectableCard>,
    ))

  test('renders correctly with checkbox type and isError prop', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="radio"
        type="checkbox"
        value="choice"
        isError
      >
        Radio card
      </SelectableCard>,
    ))

  test('renders correctly with radio type and isError prop', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="radio"
        type="radio"
        value="choice"
        isError
      >
        Radio card
      </SelectableCard>,
    ))

  test('renders correctly with complex children', () =>
    shouldMatchEmotionSnapshot(
      <SelectableCard
        onChange={() => {}}
        name="radio"
        type="checkbox"
        value="choice"
        disabled
      >
        {({ checked, disabled }) => (
          <div
            style={{
              background: disabled ? 'gray' : 'green',
              color: checked ? 'green' : 'gray',
            }}
          >
            Complex radio card
          </div>
        )}
      </SelectableCard>,
    ))
})
