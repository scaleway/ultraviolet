import { MoonIcon } from '@ultraviolet/icons/MoonIcon'
import { MoonOutlineIcon } from '@ultraviolet/icons/MoonOutlineIcon'
import { shouldMatchSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { Bullet } from '..'
import { SENTIMENTS } from '../../../theme'

describe('bullet', () => {
  it('renders correctly with a text', () => shouldMatchSnapshot(<Bullet>1</Bullet>))

  it('renders correctly with an icon', () =>
    shouldMatchSnapshot(
      <Bullet>
        <MoonIcon />
      </Bullet>,
    ))

  it('renders correctly with an icon and icon variant', () =>
    shouldMatchSnapshot(
      <Bullet>
        <MoonOutlineIcon />
      </Bullet>,
    ))

  it('renders correctly disabled', () => shouldMatchSnapshot(<Bullet disabled>1</Bullet>))

  describe('sentiment', () => {
    it.each(SENTIMENTS)(`render %s`, sentiment => shouldMatchSnapshot(<Bullet sentiment={sentiment}>1</Bullet>))
  })

  describe('size', () => {
    it.each(['medium', 'small', 'xsmall', 'xxsmall'] as const)(`render %s`, size =>
      shouldMatchSnapshot(<Bullet size={size}>1</Bullet>),
    )
  })
})
