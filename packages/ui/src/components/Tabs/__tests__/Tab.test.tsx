import { shouldMatchSnapshot } from '@utils/test'
import { describe, it } from 'vitest'

import { Tab } from '../Tab'

describe('tab', () => {
  it('renders correctly', () => shouldMatchSnapshot(<Tab />))
  it('renders correctly with subtitle', () => shouldMatchSnapshot(<Tab subtitle="test" />))

  it('renders correctly with counter, badge and subtitle', () =>
    shouldMatchSnapshot(<Tab badge="badge" counter={1} subtitle="subtitle" />))
})
