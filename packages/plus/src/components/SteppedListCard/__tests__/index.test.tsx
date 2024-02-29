import { describe, it } from '@jest/globals'
import { blockStorageWire } from '@ultraviolet/illustrations/products/blockStorage'
import { SteppedListContainer } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('FAQ', () => {
  it('should work with default props', () =>
    shouldMatchEmotionSnapshot(
      <SteppedListContainer
        header="Header"
        hideTooltipText="hide"
        hideButtonText="hide button"
        steps={['step1', 'step2']}
      >
        <SteppedListContainer.Step
          stepNumber={1}
          subHeader="First step"
          image={<img src={blockStorageWire} width={200} alt="blockStorage" />}
        >
          Description
        </SteppedListContainer.Step>
        <SteppedListContainer.Step
          stepNumber={2}
          subHeader={<h1>Title</h1>}
          image={<img src={blockStorageWire} width={200} alt="blockStorage" />}
        >
          Description step 2
        </SteppedListContainer.Step>
      </SteppedListContainer>,
    ))
})
