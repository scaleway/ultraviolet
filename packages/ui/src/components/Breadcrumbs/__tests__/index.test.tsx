import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { Breadcrumbs } from '..'

describe('breadcrumbs', () => {
  test('renders correctly with default values', () =>
    shouldMatchSnapshot(
      <Breadcrumbs>
        <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
        <Breadcrumbs.Item to="/step1/step2">
          I&apos;m a very long long long long long long long long long long long
          long step
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>Step 3</Breadcrumbs.Item>
      </Breadcrumbs>,
    ))

  test('renders correctly with minWidth and maxWidth', () =>
    shouldMatchSnapshot(
      <Breadcrumbs>
        <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
        <Breadcrumbs.Item maxWidth="200px" minWidth="100px" to="/step1/step2">
          I&apos;m a very long long long long long long long long long long long
          long step
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>Step 3</Breadcrumbs.Item>
      </Breadcrumbs>,
    ))

  test('click on middle item', async () => {
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

  test('last item should no be clickable', () => {
    const onClick = vi.fn()
    const { asFragment } = renderWithTheme(
      <Breadcrumbs>
        <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
        <Breadcrumbs.Item to="/step1/step2">
          I&apos;m a very long long long long long long long long long long long
          long step
        </Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={onClick}>Step 3</Breadcrumbs.Item>
      </Breadcrumbs>,
    )
    const step3 = screen.getByText('Step 3')
    expect(step3).toHaveStyle('pointer-events: none')
    expect(asFragment()).toMatchSnapshot()
  })

  test('renders correctly with invalid child', () => {
    const { asFragment } = renderWithTheme(
      <Breadcrumbs>Invalid child</Breadcrumbs>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
