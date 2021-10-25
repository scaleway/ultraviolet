import { Theme } from '@emotion/react'
import React, { ElementType } from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import UniversalLink from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'
import baseTheme from '../../../theme'

describe('UniversalLink', () => {
  test.each`
    test                                        | href                               | to                          | target       | as
    ${'renders correctly with defaults'}        | ${undefined}                       | ${undefined}                | ${undefined} | ${undefined}
    ${'renders correctly with href'}            | ${'/'}                             | ${undefined}                | ${undefined} | ${undefined}
    ${'renders correctly with to prop'}         | ${undefined}                       | ${'/'}                      | ${undefined} | ${undefined}
    ${'renders correctly with an absolute utl'} | ${undefined}                       | ${'https://google.com'}     | ${'_blank'}  | ${undefined}
    ${'renders correctly with a target blank'}  | ${undefined}                       | ${'/'}                      | ${'_blank'}  | ${undefined}
    ${'renders correctly with as Link'}         | ${undefined}                       | ${'/test-react-router-dom'} | ${undefined} | ${Link}
    ${'renders correctly with as a'}            | ${'https://react.ui.scaleway.com'} | ${undefined}                | ${undefined} | ${'a'}
    ${'renders correctly with a tel link'}      | ${undefined}                       | ${'tel:+33666666'}          | ${'_blank'}  | ${undefined}
    ${'renders correctly with a mailto link'}   | ${undefined}                       | ${'mailto:test@test.com'}   | ${'_blank'}  | ${undefined}
  `(
    '$test',
    ({
      href,
      to,
      target,
      as,
    }: {
      href?: string
      to?: string
      target?: string
      as?: string | ElementType<unknown>
    }) =>
      shouldMatchEmotionSnapshot(
        <BrowserRouter>
          <UniversalLink href={href} to={to} target={target} as={as}>
            This is a link
          </UniversalLink>
        </BrowserRouter>,
      ),
  )

  test('renders correctly with modify Link on theme from react-router-dom', async () => {
    const theme: Theme = {
      linkComponent: Link,
      ...baseTheme,
    }
    await shouldMatchEmotionSnapshot(
      <BrowserRouter>
        <UniversalLink to="/test-react-router-dom">
          This is a link
        </UniversalLink>
      </BrowserRouter>,
      { theme },
    )
  })
})
