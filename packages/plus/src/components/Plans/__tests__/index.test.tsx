import { fireEvent, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { Plans } from '..'
import { domain, fees, gb, group, pipeline, ssl } from './features'
import { planAdvanced, planProfessional, planStarter } from './plans'

describe('Plans', () => {
  it('should work with default props', () =>
    shouldMatchEmotionSnapshot(
      <Plans
        plans={[planStarter]}
        features={[gb, pipeline, domain, ssl, fees]}
      />,
    ))

  it('should work with hideLabels', () =>
    shouldMatchEmotionSnapshot(
      <Plans
        plans={[planStarter]}
        features={[gb, pipeline, domain, ssl, fees]}
        hideLabels
      />,
    ))

  it('should work with hideFeatureText', () =>
    shouldMatchEmotionSnapshot(
      <Plans
        plans={[planStarter]}
        features={[gb, pipeline, domain, ssl, fees]}
        hideFeatureText
      />,
    ))

  it('should work with value', () =>
    shouldMatchEmotionSnapshot(
      <Plans
        plans={[planStarter]}
        features={[gb, pipeline, domain, ssl, fees]}
        value="advanced"
      />,
    ))

  it('should work with popover as hint', async () => {
    const mockOnChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <Plans
        plans={[planAdvanced]}
        features={[gb, pipeline, domain, ssl, fees]}
        value="professional"
        fieldName="fieldName"
        onChange={mockOnChange}
      />,
    )
    const hint = screen.getByTestId('hint-popover')
    await userEvent.click(hint)
    const popoverContent = screen.getByText('popover')
    expect(popoverContent).toBeVisible()

    await userEvent.keyboard('[Enter]')
    const closePopover = screen.getByRole('button', { name: 'close' })
    await userEvent.click(closePopover)

    expect(asFragment).toMatchSnapshot()
  })
  it('should work with value and onChange', async () => {
    const mockOnChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <Plans
        plans={[planStarter, planProfessional, planAdvanced]}
        features={[gb, pipeline, domain, ssl, fees]}
        value="professional"
        fieldName="fieldName"
        onChange={mockOnChange}
      />,
    )
    const plan = screen.getByTestId('advanced')
    await userEvent.click(plan)
    expect(mockOnChange).toHaveBeenCalled()
    const plan2 = screen.getByTestId('professional-ssl')
    await userEvent.click(plan2)
    await userEvent.hover(plan)
    fireEvent.mouseOut(plan)
    await userEvent.hover(plan2)
    fireEvent.mouseOut(plan2)

    expect(asFragment).toMatchSnapshot()
  })

  it('should work with group', () =>
    shouldMatchEmotionSnapshot(
      <Plans
        plans={[planStarter]}
        features={[gb, group, pipeline, domain, ssl, fees]}
      />,
    ))
})
