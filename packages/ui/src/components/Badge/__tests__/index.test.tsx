import { InformationOutlineIcon } from '@ultraviolet/icons'
import { shouldMatchSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { SENTIMENTS } from '../../../theme'
import { Badge } from '..'
import { PROMINENCES, SIZES } from '../constant'

describe('badge', () => {
  test('renders correctly with default values', () =>
    shouldMatchSnapshot(<Badge>Sample badge</Badge>))

  test('renders correctly with icon', () =>
    shouldMatchSnapshot(
      <Badge>
        <InformationOutlineIcon />
        Sample badge
      </Badge>,
    ))

  test('renders correctly when disabled', () =>
    shouldMatchSnapshot(<Badge disabled>Sample badge</Badge>))

  SENTIMENTS.forEach(sentiment => {
    test(`renders correctly sentiment ${sentiment}`, () =>
      shouldMatchSnapshot(<Badge sentiment={sentiment}>Sample badge</Badge>))
  })

  Object.keys(SIZES).forEach(size => {
    test(`renders correctly size ${size}`, () =>
      shouldMatchSnapshot(
        <Badge size={size as keyof typeof SIZES}>Sample badge</Badge>,
      ))
  })

  Object.keys(PROMINENCES).forEach(prominence => {
    test(`renders correctly prominence ${prominence}`, () =>
      shouldMatchSnapshot(
        <Badge prominence={prominence as keyof typeof PROMINENCES}>
          Sample badge
        </Badge>,
      ))
  })
})
