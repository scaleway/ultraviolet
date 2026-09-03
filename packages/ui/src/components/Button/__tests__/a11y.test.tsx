import { PencilIcon } from '@ultraviolet/icons/PencilIcon'
import { consoleThemesMap } from '@ultraviolet/themes'
import { renderWithTheme, expectNoViolations } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { Button } from '..'

describe('button - A11y', { tags: ['a11y'] }, () => {
  it.for([...consoleThemesMap.entries()])(
    'should not have violations with default props (theme: %s)',
    async ([, currentTheme]) => {
      const { container } = renderWithTheme(
        <Button disabled>
          <PencilIcon />
          Hello
        </Button>,
        currentTheme,
      )

      await expectNoViolations(container)
    },
  )

  it('should not have violations with icon-only button labelled via accessibleLabel', async () => {
    const { container } = renderWithTheme(
      <Button accessibleLabel="Edit item">
        <PencilIcon />
      </Button>,
    )

    await expectNoViolations(container)
  })

  it('should not have violations with tooltipLabel', async () => {
    const { container } = renderWithTheme(
      <Button tooltipLabel="Edit profile">
        <PencilIcon />
      </Button>,
    )

    await expectNoViolations(container)
  })

  it('forwards ARIA attributes to the native button', () => {
    const { getByRole } = renderWithTheme(
      <Button
        aria-describedby="desc-id"
        aria-disabled
        aria-keyshortcuts="Alt+Shift+E"
        aria-pressed
        aria-roledescription="toggle button"
      >
        Edit
      </Button>,
    )
    const button = getByRole('button')

    expect(button).toHaveAttribute('aria-describedby', 'desc-id')
    expect(button).toHaveAttribute('aria-disabled', 'true')
    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(button).toHaveAttribute('aria-roledescription', 'toggle button')
    expect(button).toHaveAttribute('aria-keyshortcuts', 'Alt+Shift+E')
  })

  it('does not render undefined ARIA attributes on the button', () => {
    const { getByRole } = renderWithTheme(<Button>Edit</Button>)
    const button = getByRole('button')

    expect(button).not.toHaveAttribute('aria-describedby')
    expect(button).not.toHaveAttribute('aria-pressed')
    expect(button).not.toHaveAttribute('aria-roledescription')
    expect(button).not.toHaveAttribute('aria-keyshortcuts')
  })
})
