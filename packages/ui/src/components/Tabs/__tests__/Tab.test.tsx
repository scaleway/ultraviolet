import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Tab } from '../Tab'

describe('Tab', () => {
  test('renders correctly', () => shouldMatchEmotionSnapshot(<Tab />))
  test('renders correctly with subtitle', () =>
    shouldMatchEmotionSnapshot(<Tab subtitle="test" />))

  test('renders correctly with counter, badge and subtitle', () =>
    shouldMatchEmotionSnapshot(
      <Tab counter={1} badge="badge" subtitle="subtitle" />,
    ))
})
