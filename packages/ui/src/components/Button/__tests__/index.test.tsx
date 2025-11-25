import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { PencilIcon, PencilOutlineIcon } from '@ultraviolet/icons'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { SENTIMENTS } from '../../../theme'
import { Button } from '..'
import { SIZE_KEY } from '../constants'

const buttonSizes = SIZE_KEY
const buttonVariants = ['ghost', 'filled', 'outlined'] as const

const MockOnClick = () => {}
const EXTENDED_SENTIMENTS = [...SENTIMENTS, 'black', 'white'] as const

describe('button', () => {
  describe('variant-sentiment-disabled combination', () => {
    buttonVariants.forEach(variant => {
      EXTENDED_SENTIMENTS.forEach(sentiment => {
        test(`render ${variant}&${sentiment}`, async () => {
          const { asFragment } = renderWithTheme(
            <Button
              disabled
              onClick={MockOnClick}
              sentiment={sentiment}
              variant={variant}
            >
              Hello
            </Button>,
          )

          await userEvent.hover(screen.getByRole('button'))
          expect(asFragment).toMatchSnapshot()
        })
        test(`render ${variant}&${sentiment} disabled`, () =>
          shouldMatchSnapshot(
            <Button
              disabled
              onClick={MockOnClick}
              sentiment={sentiment}
              variant={variant}
            >
              Hello
            </Button>,
          ))
      })
    })
  })

  buttonSizes.forEach(size => {
    test(`render ${size}`, () =>
      shouldMatchSnapshot(
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
        aria-describedby="test"
        aria-disabled={false}
        aria-pressed={false}
        aria-roledescription="button"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
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
    shouldMatchSnapshot(
      <Button disabled onClick={MockOnClick}>
        <PencilIcon />
        Hello
      </Button>,
    ))

  test(`render with icon on the right`, () =>
    shouldMatchSnapshot(
      <Button disabled onClick={MockOnClick}>
        Hello
        <PencilIcon />
      </Button>,
    ))

  test(`render with icon only`, () =>
    shouldMatchSnapshot(
      <Button disabled onClick={MockOnClick}>
        <PencilOutlineIcon />
      </Button>,
    ))

  test(`render with fullWidth`, () =>
    shouldMatchSnapshot(
      <Button fullWidth onClick={MockOnClick}>
        Hello
      </Button>,
    ))

  test(`render with isLoading without icon`, () =>
    shouldMatchSnapshot(
      <Button isLoading onClick={MockOnClick}>
        Hello
      </Button>,
    ))

  test(`render with isLoading with icon`, () =>
    shouldMatchSnapshot(
      <Button isLoading onClick={MockOnClick}>
        <PencilIcon />
        Hello
      </Button>,
    ))

  test(`render with isLoading with icon variant`, () =>
    shouldMatchSnapshot(
      <Button onClick={MockOnClick}>
        <PencilOutlineIcon />
        Hello
      </Button>,
    ))

  test(`render as an anchor with href prop`, () =>
    shouldMatchSnapshot(
      <Button href="http://scaleway.com" onClick={MockOnClick}>
        Scaleway
      </Button>,
    ))

  test(`render with a tooltip`, () =>
    shouldMatchSnapshot(
      <Button onClick={MockOnClick} tooltip="Hello world !">
        Hello
      </Button>,
    ))
})
