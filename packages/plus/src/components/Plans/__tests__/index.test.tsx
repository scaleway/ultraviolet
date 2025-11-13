import { fireEvent, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, it, vi } from 'vitest'
import { Plans } from '..'
import { domain, fees, gb, group, pipeline, ssl } from './features'
import { planAdvanced, planProfessional, planStarter } from './plans'

describe('plans', () => {
  it('should work with default props', () =>
    shouldMatchSnapshot(
      <Plans
        features={[gb, pipeline, domain, ssl, fees]}
        plans={[planStarter]}
      />,
    ))

  it('should work with hideLabels', () =>
    shouldMatchSnapshot(
      <Plans
        features={[gb, pipeline, domain, ssl, fees]}
        hideLabels
        plans={[planStarter]}
      />,
    ))

  it('should work with hideFeatureText', () =>
    shouldMatchSnapshot(
      <Plans
        features={[gb, pipeline, domain, ssl, fees]}
        hideFeatureText
        plans={[planStarter]}
      />,
    ))

  it('should work with value', () =>
    shouldMatchSnapshot(
      <Plans
        features={[gb, pipeline, domain, ssl, fees]}
        plans={[planStarter]}
        value="advanced"
      />,
    ))

  it('should work with popover as hint', async () => {
    const mockOnChange = vi.fn()
    const { asFragment } = renderWithTheme(
      <Plans
        features={[gb, pipeline, domain, ssl, fees]}
        fieldName="fieldName"
        onChange={mockOnChange}
        plans={[planAdvanced]}
        value="professional"
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
        features={[gb, pipeline, domain, ssl, fees]}
        fieldName="fieldName"
        onChange={mockOnChange}
        plans={[planStarter, planProfessional, planAdvanced]}
        value="professional"
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
    shouldMatchSnapshot(
      <Plans
        features={[gb, group, pipeline, domain, ssl, fees]}
        plans={[planStarter]}
      />,
    ))
})
