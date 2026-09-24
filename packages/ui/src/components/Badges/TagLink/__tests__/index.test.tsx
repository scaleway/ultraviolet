import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProfileIcon } from '@ultraviolet/icons'
import { renderWithTheme } from '@utils/test'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { TagLink } from '..'
import { SENTIMENTS } from '../styles.css'

let writeTextMock: ReturnType<typeof vi.fn>

describe('tagLink', () => {
  beforeEach(() => {
    writeTextMock = vi.spyOn(navigator.clipboard, 'writeText').mockImplementation(async () => {
      /* empty */
    })
    vi.spyOn(navigator.clipboard, 'writeText').mockImplementation(async () => {
      /* empty */
    })
  })

  it('renders correctly', () => {
    const { asFragment } = renderWithTheme(
      <TagLink prefixText="label" link="link" href="example.com" prefixIcon={<ProfileIcon size="xsmall" />} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it.each(SENTIMENTS)('renders with sentiment %s', sentiment => {
    const { asFragment } = renderWithTheme(
      <TagLink prefixText="label" link="link" href="example.com" sentiment={sentiment} />,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly loading', () => {
    const { asFragment } = renderWithTheme(
      <TagLink prefixText="label" link="link" href="example.com" loading="loading" />,
    )

    expect(screen.queryByText('label')).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'link' })).not.toBeInTheDocument()
    expect(screen.getByText('loading')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with variant code', () => {
    const { asFragment } = renderWithTheme(<TagLink prefixText="label" link="link" href="example.com" variant="code" />)

    expect(asFragment()).toMatchSnapshot()
  })
  it('should work closable', async () => {
    const onClose = vi.fn()
    const { asFragment } = renderWithTheme(
      <TagLink prefixText="label" link="link" href="example.com" onClose={onClose} />,
    )

    await userEvent.click(screen.getByRole('button', { name: 'Remove tag label: link' }))
    expect(onClose).toHaveBeenCalledTimes(1)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should work copiable', async () => {
    const { asFragment } = renderWithTheme(<TagLink prefixText="label" link="link" href="example.com" copiable />)

    await userEvent.click(screen.getByRole('button', { name: 'Copy' }))
    expect(writeTextMock).toHaveBeenCalledExactlyOnceWith('link')

    expect(asFragment()).toMatchSnapshot()
  })
})
