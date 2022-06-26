import { ComponentProps } from 'react'
import ButtonV2, { buttonSizes } from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import { Color, SENTIMENTS } from '../../../theme'

describe('ButtonV2', () => {
  describe('variant & prominence strong', () => {
    test.each(
      SENTIMENTS.map(variant => [
        `render ${variant} with prominence strong`,
        variant,
      ]),
    )('%s', (_, variant) =>
      shouldMatchEmotionSnapshot(
        <ButtonV2
          prominence="strong"
          variant={variant as Color}
          text="Hello"
        />,
      ),
    )
  })

  describe('variant & prominence weak', () => {
    test.each(
      SENTIMENTS.map(variant => [
        `render ${variant} with prominence weak`,
        variant,
      ]),
    )('%s', (_, variant) =>
      shouldMatchEmotionSnapshot(
        <ButtonV2 prominence="weak" variant={variant as Color} text="Hello" />,
      ),
    )
  })

  describe('size', () => {
    test.each(buttonSizes.map(size => [`render ${size}`, size]))(
      '%s',
      (_, size) =>
        shouldMatchEmotionSnapshot(
          <ButtonV2
            size={size as ComponentProps<typeof ButtonV2>['size']}
            text="Hello"
          />,
        ),
    )
  })

  test(`should render correctly when disabled`, () =>
    shouldMatchEmotionSnapshot(<ButtonV2 disabled text="Hello" />))

  test(`should render correctly without a text`, () =>
    shouldMatchEmotionSnapshot(<ButtonV2 aria-label="check icon" />))

  test(`should render correctly without a text and an icon`, () =>
    shouldMatchEmotionSnapshot(<ButtonV2 aria-label="check icon" />))

  test(`should render correctly when extendable`, () =>
    shouldMatchEmotionSnapshot(<ButtonV2 extend icon="plus" text="Hello" />))

  test(`should render correctly loading`, () =>
    shouldMatchEmotionSnapshot(<ButtonV2 isLoading text="Hello" />))

  test(`should render correctly with a tooltip`, () =>
    shouldMatchEmotionSnapshot(
      <ButtonV2
        icon="check"
        tooltipBaseId="test"
        tooltip="world"
        aria-describedby="test"
        text="Hello"
      />,
    ))
})
