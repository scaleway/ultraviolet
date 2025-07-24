import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { PencilIcon, PencilOutlineIcon } from '@ultraviolet/icons'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { Button, buttonSizes, buttonVariants } from '..'
import { SENTIMENTS } from '../../../theme'

const MockOnClick = () => {}
const EXTENDED_SENTIMENTS = [...SENTIMENTS, 'black', 'white'] as const

describe('Button', () => {
  describe('variant-sentiment-disabled combination', () => {
    buttonVariants.forEach(variant => {
      EXTENDED_SENTIMENTS.forEach(sentiment => {
        test(`render ${variant}&${sentiment}`, async () => {
          const { asFragment } = renderWithTheme(
            <Button
              onClick={MockOnClick}
              variant={variant}
              sentiment={sentiment}
              disabled
            >
              Hello
            </Button>,
          )

          await userEvent.hover(screen.getByRole('button'))
          expect(asFragment).toMatchSnapshot()
        })
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

  test(`work with onPointerDown and onKeyDown`, async () => {
    const onPointerDown = vi.fn()
    const onKeyDown = vi.fn()
    const { asFragment } = renderWithTheme(
      <Button
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        aria-describedby="test"
        aria-disabled={false}
        aria-pressed={false}
        aria-roledescription="button"
      >
        Hello
      </Button>,
    )
    await userEvent.click(screen.getByRole('button'))
    expect(onPointerDown).toHaveBeenCalledOnce()
    await userEvent.keyboard('a')
    expect(onKeyDown).toHaveBeenCalledOnce()

    expect(asFragment).toMatchSnapshot()
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
