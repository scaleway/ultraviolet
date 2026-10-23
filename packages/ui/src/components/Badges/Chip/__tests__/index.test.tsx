import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { AddressIcon } from '@ultraviolet/icons/AddressIcon'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { Chip } from '..'

describe('chip', () => {
  it('renders correctly', () => {
    const { asFragment } = renderWithTheme(<Chip>test</Chip>)

    const chip = screen.getByRole('button', { name: 'test' })
    expect(chip).toHaveAttribute('aria-pressed', 'false')

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly wiht icon', () => {
    const { asFragment } = renderWithTheme(
      <Chip>
        <AddressIcon />
        test
      </Chip>,
    )

    const chip = screen.getByRole('button')
    expect(chip).toHaveAccessibleName('test')

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly active', () => {
    const { asFragment } = renderWithTheme(<Chip active>test</Chip>)

    const chip = screen.getByRole('button', { name: 'test' })
    expect(chip).toHaveAttribute('aria-pressed', 'true')
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly large', () => {
    const { asFragment } = renderWithTheme(<Chip size="large">test</Chip>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly disabled', () => {
    const { asFragment } = renderWithTheme(
      <Chip disabled>
        test <AddressIcon />
      </Chip>,
    )

    const chip = screen.getByRole('button', { name: 'test' })
    expect(chip).toHaveAttribute('aria-pressed', 'false')
    expect(chip).toBeDisabled()

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly active disabled', () => {
    const { asFragment } = renderWithTheme(
      <Chip active disabled>
        test
      </Chip>,
    )

    const chip = screen.getByRole('button', { name: 'test' })
    expect(chip).toHaveAttribute('aria-pressed', 'true')
    expect(chip).toBeDisabled()

    expect(asFragment()).toMatchSnapshot()
  })

  it('throw error when using Chip.Icon outside of Chip', () => {
    expect(() => renderWithTheme(<Chip.Icon icon={<AddressIcon />} />)).toThrow(
      'Chip.Icon can only be used inside a Chip component',
    )
  })

  it('should call onClick', async () => {
    const onClick = vi.fn()

    const { asFragment } = renderWithTheme(<Chip onClick={onClick}>test</Chip>)

    const chip = screen.getByRole('button', { name: 'test' })
    expect(chip).toHaveAttribute('aria-pressed', 'false')

    await userEvent.click(chip)
    expect(chip).toHaveAttribute('aria-pressed', 'true')
    expect(onClick).toHaveBeenCalledExactlyOnceWith(true)

    await userEvent.click(chip)

    expect(chip).toHaveAttribute('aria-pressed', 'false')
    expect(onClick).toHaveBeenCalledTimes(2)
    expect(onClick).toHaveBeenLastCalledWith(false)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not call onClick when disabled', async () => {
    const onClick = vi.fn()

    const { asFragment } = renderWithTheme(
      <Chip onClick={onClick} disabled>
        test
      </Chip>,
    )

    const chip = screen.getByRole('button', { name: 'test' })
    expect(chip).toHaveAttribute('aria-pressed', 'false')

    await userEvent.click(chip)
    expect(chip).toHaveAttribute('aria-pressed', 'false')

    expect(onClick).not.toHaveBeenCalled()

    expect(asFragment()).toMatchSnapshot()
  })

  it('works correctly closable', async () => {
    const onClose = vi.fn()
    const onClick = vi.fn()
    const { asFragment } = renderWithTheme(
      <Chip closeAccessibleLabel="close" onClose={onClose} onClick={onClick}>
        test
      </Chip>,
    )

    const closeButton = screen.getByRole('button', { name: 'close' })

    await userEvent.click(closeButton)
    expect(onClick).not.toHaveBeenCalled()
    expect(onClose).toHaveBeenCalledExactlyOnceWith()

    expect(asFragment()).toMatchSnapshot()
  })

  it('works correctly closable and disabled', async () => {
    const onClose = vi.fn()
    const onClick = vi.fn()
    const { asFragment } = renderWithTheme(
      <Chip closeAccessibleLabel="close" onClose={onClose} onClick={onClick} disabled>
        test
      </Chip>,
    )

    const closeButton = screen.getByRole('button', { name: 'close' })

    await userEvent.click(closeButton)
    expect(onClick).not.toHaveBeenCalled()
    expect(onClose).not.toHaveBeenCalled()

    expect(asFragment()).toMatchSnapshot()
  })
})
