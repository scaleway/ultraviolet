import { screen } from '@testing-library/react'
import { renderWithTheme } from '@utils/test'
import { describe, expect, test } from 'vitest'

import { Helper } from '..'

describe('helper', () => {
  test('renders correctly with default props', () => {
    const { asFragment } = renderWithTheme(<Helper id="id" />)

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with helper string', () => {
    const { asFragment } = renderWithTheme(<Helper id="id" helper="Helper" />)
    expect(screen.getByText('Helper')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with helper ReactNode', () => {
    const { asFragment } = renderWithTheme(
      <Helper id="id" helper={<div>Helper</div>} />,
    )
    expect(screen.getByText('Helper')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly small', () => {
    const { asFragment } = renderWithTheme(
      <Helper id="id" helper="Helper" size="small" />,
    )
    expect(screen.getByText('Helper')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly medium', () => {
    const { asFragment } = renderWithTheme(
      <Helper id="id" helper="Helper" size="medium" />,
    )
    expect(screen.getByText('Helper')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly disabled', () => {
    const { asFragment } = renderWithTheme(
      <Helper id="id" helper="Helper" disabled />,
    )
    expect(screen.getByText('Helper')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with success string', () => {
    const { asFragment } = renderWithTheme(<Helper id="id" success="Success" />)
    expect(screen.getByText('Success')).toBeVisible()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with success string disabled', () => {
    const { asFragment } = renderWithTheme(
      <Helper id="id" success="Success" disabled />,
    )
    expect(screen.getByText('Success')).toBeVisible()
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with success true', () => {
    const { asFragment } = renderWithTheme(
      <Helper id="id" success helper="Helper" />,
    )
    expect(screen.getByText('Helper')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with error', () => {
    const { asFragment } = renderWithTheme(<Helper id="id" error="Error" />)
    expect(screen.getByText('Error')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with error disabled', () => {
    const { asFragment } = renderWithTheme(
      <Helper id="id" error="Error" disabled />,
    )
    expect(screen.getByText('Error')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })
  test('renders correctly with error true', () => {
    const { asFragment } = renderWithTheme(
      <Helper id="id" error helper="helper" />,
    )
    expect(screen.getByText('helper')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders errors when helper, error and sucess are defined', () => {
    const { asFragment } = renderWithTheme(
      <Helper id="id" helper="helper" error="error" success="success" />,
    )
    expect(screen.getByText('error')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders success when helper and sucess are defined', () => {
    const { asFragment } = renderWithTheme(
      <Helper id="id" helper="helper" success="success" />,
    )
    expect(screen.getByText('success')).toBeVisible()

    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with aria-describedby', () => {
    const { asFragment } = renderWithTheme(
      <div>
        <Helper id="id-helper" size="small" helper="helper" />
        <input data-testid="test-input" aria-describedby="id-helper" />
      </div>,
    )

    const input = screen.getByTestId('test-input')
    const helper = screen.getByText('helper')

    expect(input).toHaveAttribute('aria-describedby', 'id-helper')
    expect(helper).toHaveAttribute('id', 'id-helper')

    expect(asFragment()).toMatchSnapshot()
  })
})
