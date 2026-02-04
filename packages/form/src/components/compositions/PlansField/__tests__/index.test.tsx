import { renderWithForm } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { PlansField } from '..'
import { domain, fees, gb, pipeline, ssl } from './features'
import { planAdvanced, planStarter } from './plans'

describe('plansField', () => {
  test('should render correctly', () => {
    const { asFragment } = renderWithForm(
      <PlansField
        features={[gb, pipeline, domain, ssl, fees]}
        name="plans"
        plans={[planStarter]}
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  test('should render reuqired', () => {
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
})
