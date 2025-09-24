import { MoonIcon, MoonOutlineIcon } from '@ultraviolet/icons'
import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { SENTIMENTS } from '../../../theme'
import { Bullet } from '..'

describe('bullet', () => {
  test('renders correctly with a text', () =>
    shouldMatchEmotionSnapshot(<Bullet>1</Bullet>))

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

  test('renders correctly disabled', () =>
    shouldMatchEmotionSnapshot(<Bullet disabled>1</Bullet>))

  describe('sentiment', () => {
    SENTIMENTS.forEach(sentiment => {
      test(`render ${sentiment}`, () =>
        shouldMatchEmotionSnapshot(<Bullet sentiment={sentiment}>1</Bullet>))
    })
  })

  describe('size', () => {
    ;(['medium', 'small', 'xsmall', 'xxsmall'] as const).forEach(size => {
      test(`render ${size}`, () =>
        shouldMatchEmotionSnapshot(<Bullet size={size}>1</Bullet>))
    })
  })
})
