import { ButtonV2, buttonSizes, buttonVariants } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'
import { SENTIMENTS } from '../../../theme'

const MockOnClick = () => {}

describe('ButtonV2', () => {
  describe('variant-sentiment-disabled combination', () => {
    buttonVariants.forEach(variant => {
      SENTIMENTS.forEach(sentiment => {
        test(`render ${variant}&${sentiment}`, () =>
          shouldMatchEmotionSnapshot(
            <ButtonV2
              onClick={MockOnClick}
              variant={variant}
              sentiment={sentiment}
              disabled
            >
              Hello
            </ButtonV2>,
          ))
        test(`render ${variant}&${sentiment} disabled`, () =>
          shouldMatchEmotionSnapshot(
            <ButtonV2
              onClick={MockOnClick}
              variant={variant}
              sentiment={sentiment}
              disabled
            >
              Hello
            </ButtonV2>,
          ))
      })
    })
  })

  buttonSizes.forEach(size => {
    test(`render ${size}`, () =>
      shouldMatchEmotionSnapshot(
        <ButtonV2 onClick={MockOnClick} size={size}>
          Hello
        </ButtonV2>,
      ))
  })

  test(`render with icon`, () =>
    shouldMatchEmotionSnapshot(
      <ButtonV2 onClick={MockOnClick} disabled icon="pencil">
        Hello
      </ButtonV2>,
    ))

  test(`render with icon on the right`, () =>
    shouldMatchEmotionSnapshot(
      <ButtonV2
        onClick={MockOnClick}
        disabled
        icon="pencil"
        iconPosition="right"
      >
        Hello
      </ButtonV2>,
    ))

  test(`render with icon only`, () =>
    shouldMatchEmotionSnapshot(
      <ButtonV2
        onClick={MockOnClick}
        disabled
        icon="pencil"
        iconPosition="right"
      />,
    ))

  test(`render with fullWidth`, () =>
    shouldMatchEmotionSnapshot(
      <ButtonV2 onClick={MockOnClick} fullWidth>
        Hello
      </ButtonV2>,
    ))

  test(`render with isLoading without icon`, () =>
    shouldMatchEmotionSnapshot(
      <ButtonV2 onClick={MockOnClick} isLoading>
        Hello
      </ButtonV2>,
    ))

  test(`render with isLoading with icon`, () =>
    shouldMatchEmotionSnapshot(
      <ButtonV2 onClick={MockOnClick} isLoading icon="pencil">
        Hello
      </ButtonV2>,
    ))
})
