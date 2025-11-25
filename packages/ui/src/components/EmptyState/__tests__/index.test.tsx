import { shouldMatchSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { EmptyState } from '..'
import kapsuleLogo from '../__stories__/illustrations/kapsule.webp'

describe('emptySpace', () => {
  it('should work without parameters', () =>
    shouldMatchSnapshot(<EmptyState description="test" />))

  it('should work with image', () =>
    shouldMatchSnapshot(
      <EmptyState description="test" image={kapsuleLogo}>
        content
      </EmptyState>,
    ))

  it('should work with image as component', () =>
    shouldMatchSnapshot(
      <EmptyState
        description="test"
        image={<img alt="kapsule logo" src={kapsuleLogo} />}
      >
        content
      </EmptyState>,
    ))

  it('should work with primary button', () =>
    shouldMatchSnapshot(
      <EmptyState
        description="test"
        primaryButton={<button type="button">Test</button>}
      >
        content
      </EmptyState>,
    ))

  it('should work with secondary button', () =>
    shouldMatchSnapshot(
      <EmptyState
        description="test"
        secondaryButton={<button type="button">Test</button>}
      >
        content
      </EmptyState>,
    ))

  it('should work with learn more', () =>
    shouldMatchSnapshot(
      <EmptyState
        description="test"
        learnMore={{ link: 'https://scaleway.com', text: 'Learn more' }}
      >
        content
      </EmptyState>,
    ))

  it('should work with border', () =>
    shouldMatchSnapshot(
      <EmptyState bordered description="test">
        content
      </EmptyState>,
    ))

  it('should work with size', () =>
    shouldMatchSnapshot(
      <EmptyState description="test" size="small">
        content
      </EmptyState>,
    ))

  it('should work with title', () =>
    shouldMatchSnapshot(
      <EmptyState description="test" title="test">
        content
      </EmptyState>,
    ))
})
