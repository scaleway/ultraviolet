import { fireEvent, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { blockStorageWire } from '@ultraviolet/illustrations/products/blockStorage'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, it, test } from 'vitest'
import { SteppedListCard } from '..'

describe('SteppedListCard', () => {
  it('should work with default props', () =>
    shouldMatchEmotionSnapshot(
      <SteppedListCard
        header={<h1>Header</h1>}
        hideTooltipText="hide"
        hideText="hide button"
        showText="show button"
        showTooltipText="show"
        steps={['step1', 'step2']}
      >
        <SteppedListCard.Step
          stepNumber={1}
          subHeader="First step"
          image={<img src={blockStorageWire} width={200} alt="blockStorage" />}
        >
          Description
        </SteppedListCard.Step>
        <SteppedListCard.Step
          stepNumber={2}
          subHeader={<h1>Title</h1>}
          image={<img src={blockStorageWire} width={200} alt="blockStorage" />}
        >
          Description step 2
        </SteppedListCard.Step>
      </SteppedListCard>,
    ))

  it('should hide the toggle button', () =>
    shouldMatchEmotionSnapshot(
      <SteppedListCard
        header={<h1>Header</h1>}
        showToggleOption={false}
        steps={['step1', 'step2']}
      >
        <SteppedListCard.Step
          stepNumber={1}
          subHeader="First step"
          image={<img src={blockStorageWire} width={200} alt="blockStorage" />}
        >
          Description
        </SteppedListCard.Step>
        <SteppedListCard.Step
          stepNumber={2}
          subHeader={<h1>Title</h1>}
          image={<img src={blockStorageWire} width={200} alt="blockStorage" />}
        >
          Description step 2
        </SteppedListCard.Step>
      </SteppedListCard>,
    ))

  it('should work with custom hide action', () =>
    shouldMatchEmotionSnapshot(
      <SteppedListCard
        header="Header"
        steps={['step1', 'step2']}
        // oxlint-disable-next-line no-console
        onClickHide={() => console.log('test')}
      >
        <SteppedListCard.Step
          stepNumber={1}
          subHeader={<h1>First step</h1>}
          image={<img src={blockStorageWire} width={200} alt="blockStorage" />}
        >
          Description
        </SteppedListCard.Step>
        <SteppedListCard.Step
          stepNumber={2}
          subHeader={<h1>Title</h1>}
          image={<img src={blockStorageWire} width={200} alt="blockStorage" />}
        >
          Description step 2
        </SteppedListCard.Step>
      </SteppedListCard>,
    ))

  test('should handle checked steps and navigation', async () => {
    renderWithTheme(
      <SteppedListCard
        header="Header"
        steps={['step1', 'step2']}
        // oxlint-disable-next-line no-console
        onClickHide={() => console.log('test')}
      >
        <SteppedListCard.Step
          stepNumber={1}
          subHeader="step1title"
          image={<img src={blockStorageWire} width={200} alt="blockStorage" />}
          data-testid="step1id"
        >
          {nextStep => (
            <>
              step1desc{' '}
              <button onClick={() => nextStep(true)} type="button">
                step1 button next
              </button>
            </>
          )}
        </SteppedListCard.Step>
        <SteppedListCard.Step
          stepNumber={2}
          subHeader="step2title"
          image={<img src={blockStorageWire} width={200} alt="blockStorage" />}
        >
          {nextStep => (
            <>
              <p data-testid="step2desc">step2desc</p>
              <button onClick={() => nextStep(false)} type="button">
                step2 button next
              </button>
            </>
          )}
        </SteppedListCard.Step>
        <SteppedListCard.Step
          stepNumber={3}
          subHeader="step3title"
          image={<img src={blockStorageWire} width={200} alt="blockStorage" />}
        >
          {nextStep => (
            <>
              <p data-testid="step3desc">step3desc</p>
              <button onClick={() => nextStep(false)} type="button">
                step3 button next
              </button>
            </>
          )}
        </SteppedListCard.Step>
      </SteppedListCard>,
    )

    // Check "button next" with validation = true
    const buttonNext = screen.getByText('step1 button next')
    fireEvent.click(buttonNext)

    const contentStep2 = screen.getByTestId('step2desc')
    expect(contentStep2).toBeVisible()

    // Check click on step title to navigate (step validated)
    const clickOnChecked = screen.getByText('step1')
    await userEvent.click(clickOnChecked)
    expect(contentStep2).not.toBeVisible()

    // Check click on step title to navigate (step not validated)
    const clickOnNotChecked = screen.getByText('step2')
    await userEvent.click(clickOnNotChecked)
    const contentStep2clicked = screen.getByText('step2 button next')
    expect(contentStep2clicked).toBeVisible()
  })

  test('should handle custom hide button', async () => {
    renderWithTheme(
      <SteppedListCard
        header="Header"
        steps={['step1', 'step2']}
        // oxlint-disable-next-line no-console
        onClickHide={() => console.log('hide clicked')}
      >
        <SteppedListCard.Step
          stepNumber={1}
          subHeader="step1title"
          image={<img src={blockStorageWire} width={200} alt="blockStorage" />}
          data-testid="step1id"
        >
          {nextStep => (
            <>
              step1desc
              <button onClick={() => nextStep(true)} type="button">
                step1 button next
              </button>
            </>
          )}
        </SteppedListCard.Step>
        <SteppedListCard.Step
          stepNumber={2}
          subHeader="step2title"
          image={<img src={blockStorageWire} width={200} alt="blockStorage" />}
        >
          {nextStep => (
            <>
              <p data-testid="step2desc">step2desc</p>
              <button onClick={() => nextStep(false)} type="button">
                step2 button next
              </button>
            </>
          )}
        </SteppedListCard.Step>
      </SteppedListCard>,
    )

    // Check click on hide button
    const clickOnHide = screen.getByText('Hide')
    const content = screen.getByText('step1')
    fireEvent.click(clickOnHide)
    expect(content).toBeInTheDocument()

    // Last step navigation with custom hide button
    const goToLastStep = screen.getByText('step2')
    await userEvent.click(goToLastStep)
    const buttonNext = screen.getByText('step2 button next')
    fireEvent.click(buttonNext)
    expect(content).toBeInTheDocument()
  })

  test('should handle default hide button', async () => {
    renderWithTheme(
      <SteppedListCard header="Header" steps={['step1', 'step2']}>
        <SteppedListCard.Step
          stepNumber={1}
          subHeader="step1title"
          image={<img src={blockStorageWire} width={200} alt="blockStorage" />}
          data-testid="step1id"
        >
          {nextStep => (
            <>
              step1desc
              <button onClick={() => nextStep(true)} type="button">
                step1 button next
              </button>
            </>
          )}
        </SteppedListCard.Step>
        <SteppedListCard.Step
          stepNumber={2}
          subHeader="step2title"
          image={<img src={blockStorageWire} width={200} alt="blockStorage" />}
        >
          {nextStep => (
            <>
              <p data-testid="step2desc">step2desc</p>
              <button onClick={() => nextStep(false)} type="button">
                step2 button next
              </button>
            </>
          )}
        </SteppedListCard.Step>
      </SteppedListCard>,
    )

    // Check click on hide button
    const clickOnHide = screen.getByText('Hide')
    const content = screen.getByText('step1')
    fireEvent.click(clickOnHide)
    expect(content).not.toBeInTheDocument()

    // Last step navigation with default hide button
    fireEvent.click(clickOnHide)
    const goToLastStep = screen.getByText('step2')
    await userEvent.click(goToLastStep)
    const buttonNext = screen.getByText('step2 button next')
    fireEvent.click(buttonNext)
    expect(content).not.toBeInTheDocument()
  })

  it('should work with pre-completed step', () =>
    shouldMatchEmotionSnapshot(
      <SteppedListCard header={<h1>Header</h1>} steps={['step1', 'step2']}>
        <SteppedListCard.Step
          stepNumber={1}
          subHeader="First step"
          image={<img src={blockStorageWire} width={200} alt="blockStorage" />}
        >
          Description
        </SteppedListCard.Step>
        <SteppedListCard.Step
          stepNumber={2}
          subHeader={<div>Title</div>}
          image={<img src={blockStorageWire} width={200} alt="blockStorage" />}
          completed
        >
          Description step 2
        </SteppedListCard.Step>
      </SteppedListCard>,
    ))
})
