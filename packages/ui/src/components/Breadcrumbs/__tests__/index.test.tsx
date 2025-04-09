import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { Breadcrumbs } from '..'

describe('Breadcrumbs', () => {
  test('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(
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
    shouldMatchEmotionSnapshot(
      <Breadcrumbs>
        <Breadcrumbs.Item to="/step1">Step 1</Breadcrumbs.Item>
        <Breadcrumbs.Item to="/step1/step2" minWidth="100px" maxWidth="200px">
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
    expect(onClick).toHaveBeenCalledTimes(1)
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
