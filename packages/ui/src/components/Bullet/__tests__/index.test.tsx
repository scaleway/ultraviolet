import { MoonIcon } from '@ultraviolet/icons/MoonIcon'
import { MoonOutlineIcon } from '@ultraviolet/icons/MoonOutlineIcon'
import { shouldMatchSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { SENTIMENTS } from '../../../theme'
import { Bullet } from '..'

describe('bullet', () => {
  test('renders correctly with a text', () =>
    shouldMatchSnapshot(<Bullet>1</Bullet>))

  test('renders correctly with an icon', () =>
    shouldMatchSnapshot(
      <Bullet>
        <MoonIcon />
      </Bullet>,
    ))

  test('renders correctly with an icon and icon variant', () =>
    shouldMatchSnapshot(
      <Bullet>
        <MoonOutlineIcon />
      </Bullet>,
    ))

  test('renders correctly disabled', () =>
    shouldMatchSnapshot(<Bullet disabled>1</Bullet>))

  describe('sentiment', () => {
    SENTIMENTS.forEach(sentiment => {
      test(`render ${sentiment}`, () =>
        shouldMatchSnapshot(<Bullet sentiment={sentiment}>1</Bullet>))
    })
  })

  describe('size', () => {
    ;(['medium', 'small', 'xsmall', 'xxsmall'] as const).forEach(size => {
      test(`render ${size}`, () =>
        shouldMatchSnapshot(<Bullet size={size}>1</Bullet>))
    })
  })
})
