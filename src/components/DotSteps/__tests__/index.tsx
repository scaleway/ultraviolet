import React, { useState } from 'react'
import DotSteps from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

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
})
