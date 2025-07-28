import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { colors } from '../../../theme'
import { Meter } from '..'

describe('Meter', () => {
  const strengthLevels = [
    { color: colors.danger.text, text: 'veryWeak' },
    { color: colors.warning.text, text: 'weak' },
    { color: 'yellow', text: 'medium' },
    { color: colors.success.text, text: 'strong' },
    { color: colors.success.text, text: 'veryStrong' },
  ]

  test('render with ', () =>
    shouldMatchEmotionSnapshot(
      <Meter value={0} strength={strengthLevels} title="MyTitle" />,
    ))

  test('render with weak value', () =>
    shouldMatchEmotionSnapshot(
      <Meter value={1} strength={strengthLevels} title="MyTitle" />,
    ))

  test('render with medium password', () =>
    shouldMatchEmotionSnapshot(
      <Meter value={2} strength={strengthLevels} title="MyTitle" />,
    ))

  test('render with strong value', () =>
    shouldMatchEmotionSnapshot(
      <Meter value={3} strength={strengthLevels} title="MyTitle" />,
    ))

  test('render with very strong value', () =>
    shouldMatchEmotionSnapshot(
      <Meter value={4} strength={strengthLevels} title="MyTitle" />,
    ))
})
