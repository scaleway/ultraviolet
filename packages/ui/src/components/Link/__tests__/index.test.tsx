import { shouldMatchSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import type { ProminenceProps } from '..'
import { Link } from '..'
import { PROMINENCES } from '../constants'

describe('link', () => {
  test(`render correctly with no sentiment`, () =>
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

  test(`render correctly with target blank`, () =>
    shouldMatchSnapshot(
      <Link href="/" target="_blank">
        Hello
      </Link>,
    ))

  test(`render correctly prop primary`, () =>
    shouldMatchSnapshot(
      <Link href="/" sentiment="primary">
        Hello
      </Link>,
    ))

  test(`render correctly with href props`, () =>
    shouldMatchSnapshot(<Link href="/">Hello</Link>))

  test(`render correctly with href props`, () =>
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

  test(`render correctly with variants props`, () =>
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

  test(`render correctly with bad sentiment`, () =>
    shouldMatchSnapshot(
      // @ts-expect-error Use a wrong sentiment
      <Link href="/" sentiment="wrong">
        Hello
      </Link>,
    ))

  test(`render correctly with sizes`, () =>
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

  test(`render correctly with oneLine`, () =>
    shouldMatchSnapshot(
      <div style={{ marginBottom: 16, marginTop: 8, width: 200 }}>
        <Link href="/" oneLine>
          Hello this is a very long text that should be truncated
        </Link>
      </div>,
    ))
})
