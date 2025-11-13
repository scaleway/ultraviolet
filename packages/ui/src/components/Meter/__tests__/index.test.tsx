import { shouldMatchSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { colors } from '../../../theme'
import { Meter } from '..'

describe('meter', () => {
  const strengthLevels = [
    { color: colors.danger.text, text: 'veryWeak' },
    { color: colors.warning.text, text: 'weak' },
    { color: 'yellow', text: 'medium' },
    { color: colors.success.text, text: 'strong' },
    { color: colors.success.text, text: 'veryStrong' },
  ]

  test('render with ', () =>
    shouldMatchSnapshot(
      <Meter strength={strengthLevels} title="MyTitle" value={0} />,
    ))

  test('render with weak value', () =>
    shouldMatchSnapshot(
      <Meter strength={strengthLevels} title="MyTitle" value={1} />,
    ))

  test('render with medium password', () =>
    shouldMatchSnapshot(
      <Meter strength={strengthLevels} title="MyTitle" value={2} />,
    ))

  test('render with strong value', () =>
    shouldMatchSnapshot(
      <Meter strength={strengthLevels} title="MyTitle" value={3} />,
    ))

  test('render with very strong value', () =>
    shouldMatchSnapshot(
      <Meter strength={strengthLevels} title="MyTitle" value={4} />,
    ))
})
