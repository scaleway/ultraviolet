import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import UniversalLink from '..'
import shouldMatchEmotionSnapshot from '../../../helpers/shouldMatchEmotionSnapshot'

describe('UniversalLink', () => {
  test('renders correctly with defaults', () => {
    shouldMatchEmotionSnapshot(<UniversalLink>This is a link</UniversalLink>)
  })

  test('renders correctly with href', () => {
    shouldMatchEmotionSnapshot(
      <UniversalLink href="/">This is a link</UniversalLink>,
    )
  })

  test('renders correctly with to prop', () => {
    shouldMatchEmotionSnapshot(
      <UniversalLink to="/">This is a link</UniversalLink>,
    )
  })

  test('renders correctly with an absolute utl', () => {
    shouldMatchEmotionSnapshot(
      <UniversalLink to="https://google.com" target="_blank">
        This is a link
      </UniversalLink>,
    )
  })

  test('renders correctly with a target blank', () => {
    shouldMatchEmotionSnapshot(
      <UniversalLink to="/" target="_blank">
        This is a link
      </UniversalLink>,
    )
  })

  test('renders correctly with as Link ', () => {
    shouldMatchEmotionSnapshot(
      <BrowserRouter>
        <UniversalLink to="/test-react-router-dom" as={Link}>
          This is a link
        </UniversalLink>
      </BrowserRouter>,
    )
  })

  test('renders correctly with as a ', () => {
    shouldMatchEmotionSnapshot(
      <BrowserRouter>
        <UniversalLink href="https://react.ui.scaleway.com" as="a">
          This is a link
        </UniversalLink>
      </BrowserRouter>,
    )
  })

  test('renders correctly with modify Link on theme from react-router-dom', () => {
    const theme = {
      linkComponent: Link,
    }
    shouldMatchEmotionSnapshot(
      <BrowserRouter>
        <UniversalLink to="/test-react-router-dom">
          This is a link
        </UniversalLink>
      </BrowserRouter>,
      { theme },
    )
  })
})
