import { screen } from '@testing-library/react'
import { MoonIcon } from '@ultraviolet/icons/MoonIcon'
import { MoonOutlineIcon } from '@ultraviolet/icons/MoonOutlineIcon'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { Bullet } from '..'
import { SENTIMENTS } from '../../../../theme'

describe('bullet', () => {
  it('renders correctly with a text', () => {
    const { asFragment } = renderWithTheme(<Bullet>1</Bullet>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with an icon', () => {
    const { asFragment } = renderWithTheme(
      <Bullet>
        <MoonIcon />
      </Bullet>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with an icon and icon variant', () => {
    const { asFragment } = renderWithTheme(
      <Bullet>
        <MoonOutlineIcon />
      </Bullet>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly aria-hidden', () => {
    const { asFragment } = renderWithTheme(
      <Bullet aria-hidden data-testid="test">
        <MoonOutlineIcon />
      </Bullet>,
    )

    const bullet = screen.getByTestId('test')
    expect(bullet).toHaveAttribute('aria-hidden', 'true')
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly disabled', () => {
    const { asFragment } = renderWithTheme(<Bullet disabled>1</Bullet>)

    expect(asFragment()).toMatchSnapshot()
  })

  describe('sentiment', () => {
    it.each(SENTIMENTS)(`render %s`, sentiment => {
      const { asFragment } = renderWithTheme(<Bullet sentiment={sentiment}>1</Bullet>)

      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('size', () => {
    it.each(['medium', 'small', 'xsmall', 'xxsmall'] as const)(`render %s`, size => {
      const { asFragment } = renderWithTheme(<Bullet size={size}>1</Bullet>)

      expect(asFragment()).toMatchSnapshot()
    })
  })
})
