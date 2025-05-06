import { MoonIcon, MoonOutlineIcon } from '@ultraviolet/icons'
import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Bullet } from '..'
import { SENTIMENTS } from '../../../theme'

describe('Bullet', () => {
  test('renders correctly with a text', () =>
    shouldMatchEmotionSnapshot(<Bullet text="1" />))

  test('renders correctly with an icon', () =>
    shouldMatchEmotionSnapshot(
      <Bullet>
        <MoonIcon />
      </Bullet>,
    ))

  test('renders correctly with an icon and icon variant', () =>
    shouldMatchEmotionSnapshot(
      <Bullet>
        <MoonOutlineIcon />
      </Bullet>,
    ))

  describe('sentiment', () => {
    ;['disabled', ...SENTIMENTS].forEach(sentiment => {
      test(`render ${sentiment}`, () =>
        shouldMatchEmotionSnapshot(<Bullet sentiment={sentiment} text="1" />))
    })
  })

  describe('size', () => {
    ;(['medium', 'small', 'xsmall', 'xxsmall'] as const).forEach(size => {
      test(`render ${size}`, () =>
        shouldMatchEmotionSnapshot(<Bullet size={size} text="1" />))
    })
  })
})
