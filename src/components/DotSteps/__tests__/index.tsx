import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import DotSteps from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

const DotStepsComponent = () => {
  const [step, setStep] = useState(2)

  return <DotSteps steps={10} step={step} setStep={setStep} />
}
describe('DotSteps', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(<DotSteps setStep={() => {}} />))

  test('renders correctly wit 10 steps, default step=4', () =>
    shouldMatchEmotionSnapshot(
      <DotSteps steps={10} step={4} setStep={() => {}} />,
    ))

  test('renders correctly useState function', () =>
    shouldMatchEmotionSnapshot(<DotStepsComponent />))

  test('triggers onclick', () => {
    const onClick = jest.fn()

    return shouldMatchEmotionSnapshot(<DotSteps setStep={onClick} />, {
      transform: async () => {
        const currentStep = document.querySelector('div[aria-selected=true]')
        if (!currentStep) throw new Error('current step element not found')
        await userEvent.click(currentStep)
        expect(onClick).toHaveBeenCalledTimes(1)
      },
    })
  })
})
