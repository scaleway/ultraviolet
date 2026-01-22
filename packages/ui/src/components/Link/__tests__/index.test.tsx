import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { forwardRef } from 'react'
import { describe, expect, test, vi } from 'vitest'
import type { ProminenceProps } from '..'
import { Link } from '..'
import { PROMINENCES } from '../constants'

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

describe('link', () => {
  test('render correctly with no sentiment', () =>
    shouldMatchSnapshot(<Link href="/">Hello</Link>))

  describe('sentiment', () => {
    test.each(
      ['primary', 'info'].map(sentiment => [`render ${sentiment}`, sentiment]),
    )('%s', (_, sentiment) =>
      shouldMatchSnapshot(
        <Link href="/" sentiment={sentiment as 'primary' | 'info'}>
          Hello
        </Link>,
      ))
  })

  describe('prominence', () => {
    test.each(
      Object.keys(PROMINENCES).map(prominence => [
        `render prominence ${prominence}`,
        prominence,
      ]),
    )('%s', (_, prominence) =>
      shouldMatchSnapshot(
        <Link href="/" prominence={prominence as ProminenceProps}>
          Hello
        </Link>,
      ))
  })

  test('render correctly with target blank', () =>
    shouldMatchSnapshot(
      <Link href="/" target="_blank">
        Hello
      </Link>,
    ))

  test('render correctly prop primary', () =>
    shouldMatchSnapshot(
      <Link href="/" sentiment="primary">
        Hello
      </Link>,
    ))

  test('render correctly with href props', () =>
    shouldMatchSnapshot(<Link href="/">Hello</Link>))

  test('render correctly with href props', () =>
    shouldMatchSnapshot(
      <>
        <Link href="/" iconPosition="left">
          Hello
        </Link>
        <Link href="/" iconPosition="right">
          Hello
        </Link>
        <Link href="/" iconPosition="right" target="_blank">
          Hello
        </Link>
        <Link href="/" iconPosition="left" target="_blank">
          Hello
        </Link>
      </>,
    ))

  test('render correctly with variants props', () =>
    shouldMatchSnapshot(
      <>
        <Link href="/" variant="inline">
          Hello
        </Link>
        <Link href="/" variant="standalone">
          Hello
        </Link>
      </>,
    ))

  test('render correctly with bad sentiment', () =>
    shouldMatchSnapshot(
      // @ts-expect-error Use a wrong sentiment
      <Link href="/" sentiment="wrong">
        Hello
      </Link>,
    ))

  test('render correctly with sizes', () =>
    shouldMatchSnapshot(
      <>
        <Link href="/" size="large">
          Hello
        </Link>
        ,
        <Link href="/" size="small">
          Hello
        </Link>
        ,
        <Link href="/" size="xsmall">
          Hello
        </Link>
      </>,
    ))

  test('render correctly with oneLine', () =>
    shouldMatchSnapshot(
      <div style={{ marginBottom: 16, marginTop: 8, width: 200 }}>
        <Link href="/" oneLine>
          Hello this is a very long text that should be truncated
        </Link>
      </div>,
    ))

  describe('render prop', () => {
    describe('element form', () => {
      test('render correctly with render prop', () =>
        shouldMatchSnapshot(
          <Link render={<MockNextLink href="/about" />} sentiment="primary">
            About
          </Link>,
        ))

      test('render correctly with render prop and different sentiments', () =>
        shouldMatchSnapshot(
          <>
            <Link render={<MockNextLink href="/about" />} sentiment="primary">
              Primary
            </Link>
            <Link render={<MockNextLink href="/about" />} sentiment="info">
              Info
            </Link>
          </>,
        ))

      test('render correctly with render prop and sizes', () =>
        shouldMatchSnapshot(
          <>
            <Link render={<MockNextLink href="/about" />} size="large">
              Large
            </Link>
            <Link render={<MockNextLink href="/about" />} size="small">
              Small
            </Link>
            <Link render={<MockNextLink href="/about" />} size="xsmall">
              XSmall
            </Link>
          </>,
        ))

      test('merges className correctly with render prop', () => {
        renderWithTheme(
          <Link
            data-testid="link"
            render={<MockNextLink className="custom-class" href="/about" />}
            sentiment="primary"
          >
            About
          </Link>,
        )

        const link = screen.getByTestId('link')
        expect(link.className).toContain('custom-class')
      })

      test('forwards ref correctly with render prop', () => {
        const ref = vi.fn()
        renderWithTheme(
          <Link
            ref={ref}
            render={<MockNextLink href="/about" />}
            sentiment="primary"
          >
            About
          </Link>,
        )

        expect(ref).toHaveBeenCalled()
      })

      test('handles click events with render prop', async () => {
        const onClick = vi.fn()
        renderWithTheme(
          <Link
            data-testid="link"
            render={
              <a href="/about" onClick={onClick}>
                test
              </a>
            }
            sentiment="primary"
          >
            About
          </Link>,
        )

        await userEvent.click(screen.getByTestId('link'))
        expect(onClick).toHaveBeenCalledOnce()
      })
    })

    describe('function form', () => {
      test('render correctly with render function', () =>
        shouldMatchSnapshot(
          <Link
            render={props => <MockNextLink {...props} href="/about" />}
            sentiment="primary"
          >
            About
          </Link>,
        ))

      test('passes props to render function', () => {
        renderWithTheme(
          <Link
            className="link-class"
            render={props => (
              <MockNextLink {...props} data-testid="link" href="/about" />
            )}
            sentiment="primary"
          >
            About
          </Link>,
        )

        const link = screen.getByTestId('link')
        expect(link.className).toContain('link-class')
      })

      test('forwards ref correctly with render function', () => {
        const ref = vi.fn()
        renderWithTheme(
          <Link
            ref={ref}
            render={props => <MockNextLink {...props} href="/about" />}
            sentiment="primary"
          >
            About
          </Link>,
        )

        expect(ref).toHaveBeenCalled()
      })
    })
  })
})
