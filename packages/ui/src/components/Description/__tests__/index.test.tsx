import { screen } from '@testing-library/react'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'

import { Description } from '..'

describe('description', () => {
  it('renders correctly with default props', () => {
    const { asFragment } = renderWithTheme(<Description id="id" />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with helper string', () => {
    const { asFragment } = renderWithTheme(
      <Description id="id" helper="Helper" />,
    )
    expect(screen.getByText('Helper')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with helper ReactNode', () => {
    const { asFragment } = renderWithTheme(
      <Description id="id" helper={<div>Helper</div>} />,
    )
    expect(screen.getByText('Helper')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly small', () => {
    const { asFragment } = renderWithTheme(
      <Description id="id" helper="Helper" size="small" />,
    )
    expect(screen.getByText('Helper')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly medium', () => {
    const { asFragment } = renderWithTheme(
      <Description id="id" helper="Helper" size="medium" />,
    )
    expect(screen.getByText('Helper')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly disabled', () => {
    const { asFragment } = renderWithTheme(
      <Description id="id" helper="Helper" disabled />,
    )
    expect(screen.getByText('Helper')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with success string', () => {
    const { asFragment } = renderWithTheme(
      <Description id="id" success="Success" />,
    )
    expect(screen.getByText('Success')).toBeVisible()
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with success string disabled', () => {
    const { asFragment } = renderWithTheme(
      <Description id="id" success="Success" disabled />,
    )
    expect(screen.getByText('Success')).toBeVisible()
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with success true', () => {
    const { asFragment } = renderWithTheme(
      <Description id="id" success helper="Helper" />,
    )
    expect(screen.getByText('Helper')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with error', () => {
    const { asFragment } = renderWithTheme(
      <Description id="id" error="Error" />,
    )
    expect(screen.getByText('Error')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with error disabled', () => {
    const { asFragment } = renderWithTheme(
      <Description id="id" error="Error" disabled />,
    )
    expect(screen.getByText('Error')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with error true', () => {
    const { asFragment } = renderWithTheme(
      <Description id="id" error helper="helper" />,
    )
    expect(screen.getByText('helper')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders errors when helper, error and sucess are defined', () => {
    const { asFragment } = renderWithTheme(
      <Description id="id" helper="helper" error="error" success="success" />,
    )
    expect(screen.getByText('error')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders success when helper and sucess are defined', () => {
    const { asFragment } = renderWithTheme(
      <Description id="id" helper="helper" success="success" />,
    )
    expect(screen.getByText('success')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with aria-describedby', () => {
    const { asFragment } = renderWithTheme(
      <div>
        <Description id="id-helper" size="small" helper="helper" />
        <input
          data-testid="test-input"
          aria-describedby="id-helper"
          type="text"
        />
      </div>,
    )

    const input = screen.getByRole('textbox')
    expect(input).toHaveAccessibleDescription('helper')

    expect(asFragment()).toMatchSnapshot()
  })
})
