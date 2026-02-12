import { screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { renderWithForm } from '@utils/test'
import { describe, expect, test, vi } from 'vitest'
import { PlansField } from '..'
import { domain, fees, gb, pipeline, ssl } from './features'
import { planAdvanced, planStarter } from './plans'

describe('plansField', () => {
  test('should render correctly', async () => {
    const { asFragment } = renderWithForm(
      <PlansField
        features={[gb, pipeline, domain, ssl, fees]}
        name="plans"
        plans={[planStarter, planAdvanced]}
      />,
    )
    const advancedPlan = screen.getByText('€109.99')
    await userEvent.click(advancedPlan)

    expect(asFragment()).toMatchSnapshot()
  })

  test('should render required', () => {
    const { asFragment } = renderWithForm(
      <PlansField
        features={[gb, pipeline, domain, ssl, fees]}
        name="plans"
        plans={[planStarter, planAdvanced]}
        required
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render with on change', async () => {
    const onChange = vi.fn()
    const { asFragment } = renderWithForm(
      <PlansField
        features={[gb, pipeline, domain, ssl, fees]}
        name="plans"
        onChange={onChange}
        plans={[planStarter, planAdvanced]}
      />,
    )
    const advancedPlan = screen.getByText('€109.99')
    await userEvent.click(advancedPlan)
    expect(onChange).toHaveBeenCalledOnce()

    expect(asFragment()).toMatchSnapshot()
  })
})
