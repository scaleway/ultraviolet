import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { PencilIcon } from '@ultraviolet/icons/PencilIcon'
import { PencilOutlineIcon } from '@ultraviolet/icons/PencilOutlineIcon'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { forwardRef } from 'react'
import { describe, expect, test, vi } from 'vitest'
import { SENTIMENTS } from '../../../theme'
import { Button } from '..'
import { SIZE_KEY } from '../constants'

const buttonSizes = SIZE_KEY
const buttonVariants = ['ghost', 'filled', 'outlined'] as const

const MockOnClick = () => {}
const EXTENDED_SENTIMENTS = [...SENTIMENTS, 'black', 'white'] as const

// Mock component simulating Next.js Link
const MockNextLink = forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
>(({ href, children, ...props }, ref) => (
  <a href={href} ref={ref} {...props}>
    {children}
  </a>
))
MockNextLink.displayName = 'MockNextLink'

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

  test('work with onPointerDown and onKeyDown', async () => {
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

  test('render with icon', () =>
    shouldMatchSnapshot(
      <Button disabled onClick={MockOnClick}>
        <PencilIcon />
        Hello
      </Button>,
    ))

  test('render with icon on the right', () =>
    shouldMatchSnapshot(
      <Button disabled onClick={MockOnClick}>
        Hello
        <PencilIcon />
      </Button>,
    ))

  test('render with icon only', () =>
    shouldMatchSnapshot(
      <Button disabled onClick={MockOnClick}>
        <PencilOutlineIcon />
      </Button>,
    ))

  test('render with fullWidth', () =>
    shouldMatchSnapshot(
      <Button fullWidth onClick={MockOnClick}>
        Hello
      </Button>,
    ))

  test('render with isLoading without icon', () =>
    shouldMatchSnapshot(
      <Button isLoading onClick={MockOnClick}>
        Hello
      </Button>,
    ))

  test('render with isLoading with icon', () =>
    shouldMatchSnapshot(
      <Button isLoading onClick={MockOnClick}>
        <PencilIcon />
        Hello
      </Button>,
    ))

  test('render with isLoading with icon variant', () =>
    shouldMatchSnapshot(
      <Button onClick={MockOnClick}>
        <PencilOutlineIcon />
        Hello
      </Button>,
    ))

  test('render as an anchor with href prop', () =>
    shouldMatchSnapshot(
      <Button href="http://scaleway.com" onClick={MockOnClick}>
        Scaleway
      </Button>,
    ))

  test('render with a tooltip', () =>
    shouldMatchSnapshot(
      <Button onClick={MockOnClick} tooltip="Hello world !">
        Hello
      </Button>,
    ))

  describe('render prop', () => {
    describe('element form', () => {
      test('render correctly with render prop', () =>
        shouldMatchSnapshot(
          <Button render={<MockNextLink href="/about" />}>About</Button>,
        ))

      test('render correctly with render prop and different variants', () =>
        shouldMatchSnapshot(
          <>
            <Button render={<MockNextLink href="/about" />} variant="filled">
              Filled
            </Button>
            <Button render={<MockNextLink href="/about" />} variant="outlined">
              Outlined
            </Button>
            <Button render={<MockNextLink href="/about" />} variant="ghost">
              Ghost
            </Button>
          </>,
        ))

      test('render correctly with render prop and different sentiments', () =>
        shouldMatchSnapshot(
          <>
            <Button render={<MockNextLink href="/about" />} sentiment="primary">
              Primary
            </Button>
            <Button render={<MockNextLink href="/about" />} sentiment="danger">
              Danger
            </Button>
            <Button render={<MockNextLink href="/about" />} sentiment="neutral">
              Neutral
            </Button>
          </>,
        ))

      test('render correctly with render prop and sizes', () =>
        shouldMatchSnapshot(
          <>
            <Button render={<MockNextLink href="/about" />} size="large">
              Large
            </Button>
            <Button render={<MockNextLink href="/about" />} size="medium">
              Medium
            </Button>
            <Button render={<MockNextLink href="/about" />} size="small">
              Small
            </Button>
          </>,
        ))

      test('merges className correctly with render prop', () => {
        renderWithTheme(
          <Button
            data-testid="button"
            render={<MockNextLink className="custom-class" href="/about" />}
          >
            About
          </Button>,
        )

        const button = screen.getByTestId('button')
        expect(button.className).toContain('custom-class')
      })

      test('forwards ref correctly with render prop', () => {
        const ref = vi.fn()
        renderWithTheme(
          <Button ref={ref} render={<MockNextLink href="/about" />}>
            About
          </Button>,
        )

        expect(ref).toHaveBeenCalled()
      })

      test('handles click events with render prop', async () => {
        const onClick = vi.fn()
        renderWithTheme(
          <Button
            data-testid="button"
            render={
              <a href="/about" onClick={onClick}>
                test
              </a>
            }
          >
            About
          </Button>,
        )

        await userEvent.click(screen.getByTestId('button'))
        expect(onClick).toHaveBeenCalledOnce()
      })

      test('render correctly with render prop and fullWidth', () =>
        shouldMatchSnapshot(
          <Button fullWidth render={<MockNextLink href="/about" />}>
            About
          </Button>,
        ))
    })

    describe('function form', () => {
      test('render correctly with render function', () =>
        shouldMatchSnapshot(
          <Button render={props => <MockNextLink {...props} href="/about" />}>
            About
          </Button>,
        ))

      test('passes props to render function', () => {
        renderWithTheme(
          <Button
            className="button-class"
            render={props => (
              <MockNextLink {...props} data-testid="button" href="/about" />
            )}
          >
            About
          </Button>,
        )

        const button = screen.getByTestId('button')
        expect(button.className).toContain('button-class')
      })

      test('forwards ref correctly with render function', () => {
        const ref = vi.fn()
        renderWithTheme(
          <Button
            ref={ref}
            render={props => <MockNextLink {...props} href="/about" />}
          >
            About
          </Button>,
        )

        expect(ref).toHaveBeenCalled()
      })
    })
  })
})
