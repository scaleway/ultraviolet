import { renderWithTheme } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { page } from 'vitest/browser'
import { SelectInput } from '..'
import { dataUnGrouped } from './resources'

describe('selectInput - Visual', { tags: ['visual'] }, () => {
  it('keeps the placeholder select identical to the reference screenshot', async () => {
    renderWithTheme(<SelectInput label="Label" name="planets" options={dataUnGrouped} />)

    await expect(page.getByTestId('select-input-planets')).toMatchScreenshot('select-input.png')
  })

  it('keeps the selected select identical to the reference screenshot', async () => {
    renderWithTheme(
      <SelectInput label="Label" name="planets" options={dataUnGrouped} value="earth" helper="Our home planet" />,
    )

    await expect(page.getByTestId('select-input-planets')).toMatchScreenshot('select-input-selected.png')
  })
})
