import { InformationOutlineIcon } from '@ultraviolet/icons'
import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { SENTIMENTS } from '../../../theme'
import { Badge } from '..'
import { PROMINENCES, SIZES } from '../constant'

describe('badge', () => {
  test('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(<Badge>Sample badge</Badge>))

  test('renders correctly with icon', () =>
    shouldMatchEmotionSnapshot(
      <Badge>
        <InformationOutlineIcon />
        Sample badge
      </Badge>,
    ))

  test('renders correctly when disabled', () =>
    shouldMatchEmotionSnapshot(<Badge disabled>Sample badge</Badge>))

  SENTIMENTS.forEach(sentiment => {
    test(`renders correctly sentiment ${sentiment}`, () =>
      shouldMatchEmotionSnapshot(
        <Badge sentiment={sentiment}>Sample badge</Badge>,
      ))
  })

  Object.keys(SIZES).forEach(size => {
    test(`renders correctly size ${size}`, () =>
      shouldMatchEmotionSnapshot(
        <Badge size={size as keyof typeof SIZES}>Sample badge</Badge>,
      ))
  })

  Object.keys(PROMINENCES).forEach(prominence => {
    test(`renders correctly prominence ${prominence}`, () =>
      shouldMatchEmotionSnapshot(
        <Badge prominence={prominence as keyof typeof PROMINENCES}>
          Sample badge
        </Badge>,
      ))
  })
})
