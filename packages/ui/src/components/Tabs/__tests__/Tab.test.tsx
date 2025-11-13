import { shouldMatchSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Tab } from '../Tab'

describe('tab', () => {
  test('renders correctly', () => shouldMatchSnapshot(<Tab />))
  test('renders correctly with subtitle', () =>
    shouldMatchSnapshot(<Tab subtitle="test" />))

  test('renders correctly with counter, badge and subtitle', () =>
    shouldMatchSnapshot(<Tab badge="badge" counter={1} subtitle="subtitle" />))
})
