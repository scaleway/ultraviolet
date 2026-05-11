import { InformationOutlineIcon } from '@ultraviolet/icons/InformationOutlineIcon'
import { shouldMatchSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { Badge } from '..'
import { SENTIMENTS } from '../../../theme'
import { PROMINENCES, SIZES } from '../constant'

describe('badge', () => {
  it('renders correctly with default values', () => shouldMatchSnapshot(<Badge>Sample badge</Badge>))

  it('renders correctly with icon', () =>
    shouldMatchSnapshot(
      <Badge>
        <InformationOutlineIcon />
        Sample badge
      </Badge>,
    ))

  it('renders correctly when disabled', () => shouldMatchSnapshot(<Badge disabled>Sample badge</Badge>))

  SENTIMENTS.forEach(sentiment => {
    it(`renders correctly sentiment ${sentiment}`, () =>
      shouldMatchSnapshot(<Badge sentiment={sentiment}>Sample badge</Badge>))
  })

  Object.keys(SIZES).forEach(size => {
    it(`renders correctly size ${size}`, () =>
      shouldMatchSnapshot(<Badge size={size as keyof typeof SIZES}>Sample badge</Badge>))
  })

  Object.keys(PROMINENCES).forEach(prominence => {
    it(`renders correctly prominence ${prominence}`, () =>
      shouldMatchSnapshot(<Badge prominence={prominence as keyof typeof PROMINENCES}>Sample badge</Badge>))
  })
})
