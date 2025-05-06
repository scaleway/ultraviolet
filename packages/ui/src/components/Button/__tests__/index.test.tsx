import { PencilIcon, PencilOutlineIcon } from '@ultraviolet/icons'
import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Button, buttonSizes, buttonVariants } from '..'
import { SENTIMENTS } from '../../../theme'

const MockOnClick = () => {}

describe('Button', () => {
  describe('variant-sentiment-disabled combination', () => {
    buttonVariants.forEach(variant => {
      SENTIMENTS.forEach(sentiment => {
        test(`render ${variant}&${sentiment}`, () =>
          shouldMatchEmotionSnapshot(
            <Button
              onClick={MockOnClick}
              variant={variant}
              sentiment={sentiment}
              disabled
            >
              Hello
            </Button>,
          ))
        test(`render ${variant}&${sentiment} disabled`, () =>
          shouldMatchEmotionSnapshot(
            <Button
              onClick={MockOnClick}
              variant={variant}
              sentiment={sentiment}
              disabled
            >
              Hello
            </Button>,
          ))
      })
    })
  })

  buttonSizes.forEach(size => {
    test(`render ${size}`, () =>
      shouldMatchEmotionSnapshot(
        <Button onClick={MockOnClick} size={size}>
          Hello
        </Button>,
      ))
  })

  test(`render with icon`, () =>
    shouldMatchEmotionSnapshot(
      <Button onClick={MockOnClick} disabled>
        <PencilIcon />
        Hello
      </Button>,
    ))

  test(`render with icon on the right`, () =>
    shouldMatchEmotionSnapshot(
      <Button onClick={MockOnClick} disabled>
        Hello
        <PencilIcon />
      </Button>,
    ))

  test(`render with icon only`, () =>
    shouldMatchEmotionSnapshot(
      <Button onClick={MockOnClick} disabled>
        <PencilOutlineIcon />
      </Button>,
    ))

  test(`render with fullWidth`, () =>
    shouldMatchEmotionSnapshot(
      <Button onClick={MockOnClick} fullWidth>
        Hello
      </Button>,
    ))

  test(`render with isLoading without icon`, () =>
    shouldMatchEmotionSnapshot(
      <Button onClick={MockOnClick} isLoading>
        Hello
      </Button>,
    ))

  test(`render with isLoading with icon`, () =>
    shouldMatchEmotionSnapshot(
      <Button onClick={MockOnClick} isLoading>
        <PencilIcon />
        Hello
      </Button>,
    ))

  test(`render with isLoading with icon variant`, () =>
    shouldMatchEmotionSnapshot(
      <Button onClick={MockOnClick}>
        <PencilOutlineIcon />
        Hello
      </Button>,
    ))

  test(`render as an anchor with href prop`, () =>
    shouldMatchEmotionSnapshot(
      <Button onClick={MockOnClick} href="http://scaleway.com">
        Scaleway
      </Button>,
    ))

  test(`render with a tooltip`, () =>
    shouldMatchEmotionSnapshot(
      <Button onClick={MockOnClick} tooltip="Hello world !">
        Hello
      </Button>,
    ))
})
