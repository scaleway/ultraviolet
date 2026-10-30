import { MoonIcon } from '@ultraviolet/icons/MoonIcon'
import { renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { Bullet } from '..'

describe('bullet - Visual', { tags: ['visual'] }, () => {
  it('keeps the rendered bullet identical to the reference screenshot', async () => {
    renderWithTheme(
      <Bullet data-testid="bullet" sentiment="success">
        <MoonIcon />
      </Bullet>,
    )

    await expect(page.getByTestId('bullet')).toMatchScreenshot('bullet-success.png')
  })
})
