import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { EmptyState } from '..'
import kapsuleLogo from '../__stories__/illustrations/kapsule.webp'

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
        image={<img alt="kapsule logo" src={kapsuleLogo} />}
      >
        content
      </EmptyState>,
    ))

  it('should work with primary button', () =>
    shouldMatchEmotionSnapshot(
      <EmptyState
        description="test"
        primaryButton={<button type="button">Test</button>}
      >
        content
      </EmptyState>,
    ))

  it('should work with secondary button', () =>
    shouldMatchEmotionSnapshot(
      <EmptyState
        description="test"
        secondaryButton={<button type="button">Test</button>}
      >
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
      <EmptyState bordered description="test">
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
