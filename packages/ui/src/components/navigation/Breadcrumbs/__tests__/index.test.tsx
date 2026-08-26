import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme } from '@utils/test'
import type { PropsWithChildren } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { Breadcrumbs } from '..'

const CustomLink = ({ children, ...props }: PropsWithChildren<{ href: string }>) => (
  <a data-custom-link="true" {...props}>
    {children}
  </a>
)

describe('breadcrumbs', () => {
  it('renders correctly with default values', () => {
    const { asFragment } = renderWithTheme(
      <Breadcrumbs>
        <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
        <Breadcrumbs.Item to="/step1/step2">
          I&apos;m a very long long long long long long long long long long long long step
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>Step 3</Breadcrumbs.Item>
      </Breadcrumbs>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with minWidth and maxWidth', () => {
    const { asFragment } = renderWithTheme(
      <Breadcrumbs>
        <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
        <Breadcrumbs.Item maxWidth="200px" minWidth="100px" to="/step1/step2">
          I&apos;m a very long long long long long long long long long long long long step
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>Step 3</Breadcrumbs.Item>
      </Breadcrumbs>,
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('click on middle item', async () => {
    const onClick = vi.fn()
    const { asFragment } = renderWithTheme(
      <Breadcrumbs>
        <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={onClick}>Step 2</Breadcrumbs.Item>
        <Breadcrumbs.Item>Step 3</Breadcrumbs.Item>
      </Breadcrumbs>,
    )
    const step2 = screen.getByText('Step 2')
    await userEvent.click(step2)
    expect(onClick).toHaveBeenCalledOnce()
    expect(asFragment()).toMatchSnapshot()
  })

  it('last item should no be clickable', () => {
    const onClick = vi.fn()
    const { asFragment } = renderWithTheme(
      <Breadcrumbs>
        <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
        <Breadcrumbs.Item to="/step1/step2">
          I&apos;m a very long long long long long long long long long long long long step
        </Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={onClick}>Step 3</Breadcrumbs.Item>
      </Breadcrumbs>,
    )
    const step3 = screen.getByText('Step 3')
    expect(step3).toHaveStyle('pointer-events: none')
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders correctly with invalid child', () => {
    const { asFragment } = renderWithTheme(<Breadcrumbs>Invalid child</Breadcrumbs>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render with custom render prop', () => {
    const { asFragment } = renderWithTheme(
      <Breadcrumbs>
        <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
        <Breadcrumbs.Item render={<CustomLink href="/custom" />}>Custom Link</Breadcrumbs.Item>
        <Breadcrumbs.Item>Step 3</Breadcrumbs.Item>
      </Breadcrumbs>,
    )

    const customLink = screen.getByRole('link', { name: 'Custom Link' })
    expect(customLink).toHaveAttribute('data-custom-link', 'true')
    expect(customLink).toHaveAttribute('href', '/custom')
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render with render function prop', () => {
    const { debug } = renderWithTheme(
      <Breadcrumbs>
        <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
        <Breadcrumbs.Item render={props => <CustomLink {...props} href="/function-custom" />}>
          Function Render
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>Step 3</Breadcrumbs.Item>
      </Breadcrumbs>,
    )

    debug()

    const step1Link = screen.getByRole('link', { name: 'Step 1' })
    expect(step1Link).toHaveAttribute('href', '/step1')
    const functionLink = screen.getByRole('link', { name: 'Function Render' })
    expect(functionLink).toHaveAttribute('href', '/function-custom')
    expect(functionLink).toHaveAttribute('data-custom-link', 'true')
  })
})
