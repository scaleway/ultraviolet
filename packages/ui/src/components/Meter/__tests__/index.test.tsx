import { shouldMatchSnapshot } from '@utils/test'
import { describe, it } from 'vitest'

import { Meter } from '..'
import { colors } from '../../../theme'

describe('meter', () => {
  const strengthLevels = [
    { color: colors.danger.text, text: 'veryWeak' },
    { color: colors.warning.text, text: 'weak' },
    { color: 'yellow', text: 'medium' },
    { color: colors.success.text, text: 'strong' },
    { color: colors.success.text, text: 'veryStrong' },
  ]

  it('render with ', () => shouldMatchSnapshot(<Meter strength={strengthLevels} title="MyTitle" value={0} />))

  it('render with weak value', () => shouldMatchSnapshot(<Meter strength={strengthLevels} title="MyTitle" value={1} />))

  it('render with medium password', () =>
    shouldMatchSnapshot(<Meter strength={strengthLevels} title="MyTitle" value={2} />))

  it('render with strong value', () =>
    shouldMatchSnapshot(<Meter strength={strengthLevels} title="MyTitle" value={3} />))

  it('render with very strong value', () =>
    shouldMatchSnapshot(<Meter strength={strengthLevels} title="MyTitle" value={4} />))
})
