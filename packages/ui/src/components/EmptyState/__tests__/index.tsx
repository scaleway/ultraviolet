import { Button } from '@scaleway/ui'
import { EmptyState } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'
import kapsuleLogo from './kapsule.webp'

describe('EmptySpace', () => {
  it('should work without parameters', () =>
    shouldMatchEmotionSnapshot(<EmptyState description="test" />))

  it('should work with image', () =>
    shouldMatchEmotionSnapshot(
      <EmptyState description="test" image={kapsuleLogo}>
        content
      </EmptyState>,
    ))

  it('should work with image as component', () =>
    shouldMatchEmotionSnapshot(
      <EmptyState
        description="test"
        image={<img src={kapsuleLogo} alt="kapsule logo" />}
      >
        content
      </EmptyState>,
    ))

  it('should work with primary button', () =>
    shouldMatchEmotionSnapshot(
      <EmptyState description="test" primaryButton={<Button>Test</Button>}>
        content
      </EmptyState>,
    ))

  it('should work with secondary button', () =>
    shouldMatchEmotionSnapshot(
      <EmptyState description="test" secondaryButton={<Button>Test</Button>}>
        content
      </EmptyState>,
    ))

  it('should work with learn more', () =>
    shouldMatchEmotionSnapshot(
      <EmptyState
        description="test"
        learnMore={{ link: 'https://scaleway.com', text: 'Learn more' }}
      >
        content
      </EmptyState>,
    ))

  it('should work with border', () =>
    shouldMatchEmotionSnapshot(
      <EmptyState description="test" bordered>
        content
      </EmptyState>,
    ))

  it('should work with size', () =>
    shouldMatchEmotionSnapshot(
      <EmptyState description="test" size="small">
        content
      </EmptyState>,
    ))

  it('should work with title', () =>
    shouldMatchEmotionSnapshot(
      <EmptyState description="test" title="test">
        content
      </EmptyState>,
    ))
})
