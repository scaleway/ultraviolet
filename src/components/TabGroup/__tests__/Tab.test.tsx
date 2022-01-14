import userEvent from '@testing-library/user-event'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import Tab from '../Tab'

describe('Tab', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(<Tab>Test tab</Tab>))

  test('renders correctly with children', () =>
    shouldMatchEmotionSnapshot(
      <Tab name="test" onClick={() => {}}>
        Test tab
      </Tab>,
    ))

  test('renders correctly when disabled', () =>
    shouldMatchEmotionSnapshot(
      <Tab name="test" disabled>
        Test tab
      </Tab>,
    ))

  test('renders correctly when selected', () =>
    shouldMatchEmotionSnapshot(
      <Tab name="test" isSelected>
        Test tab
      </Tab>,
    ))

  test('renders correctly when as component', () =>
    shouldMatchEmotionSnapshot(
      <Tab name="test" as="a">
        Test tab
      </Tab>,
    ))

  test('renders correctly and trigger events', () =>
    shouldMatchEmotionSnapshot(<Tab name="test">Test</Tab>, {
      transform: node => {
        const tab = node.getByRole('tab')
        userEvent.type(tab, '{enter}')
        userEvent.type(tab, '{space}')
        userEvent.type(tab, 'a')
      },
    }))
})
