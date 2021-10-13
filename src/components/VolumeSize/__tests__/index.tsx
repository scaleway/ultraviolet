import React from 'react'
import VolumeSize from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('VolumeSize', () => {
  test('renders correctly with minimal props', () =>
    shouldMatchEmotionSnapshot(<VolumeSize minSize={0} value={5} unit="GB" />))

  test('renders correctly with all props', () =>
    shouldMatchEmotionSnapshot(
      <VolumeSize
        maxLabel="max"
        maxSize={20}
        minLabel="min"
        minSize={0}
        requiredLabel="req"
        title="Test"
        unit="GB"
        tooBigMessage="Test too big"
        tooSmallMessage="Test too small"
        value={15}
      />,
    ))

  test('renders correctly with non modifiable value', () =>
    shouldMatchEmotionSnapshot(
      <VolumeSize
        minSize={15}
        maxSize={15}
        title="Test"
        unit="GB"
        tooBigMessage="Test too big"
        tooSmallMessage="Test too small"
        value={15}
      />,
    ))

  test('renders correctly without maxSize', () =>
    shouldMatchEmotionSnapshot(
      <VolumeSize
        minSize={0}
        title="Test"
        unit="GB"
        tooBigMessage="Test too big"
        tooSmallMessage="Test too small"
        value={15}
      />,
    ))

  test('should display too small error', () =>
    shouldMatchEmotionSnapshot(
      <VolumeSize
        minSize={20}
        title="Test"
        unit="GB"
        tooBigMessage="Test too big"
        tooSmallMessage="Test too small"
        value={15}
      />,
    ))

  test('should display too big error', () =>
    shouldMatchEmotionSnapshot(
      <VolumeSize
        minSize={0}
        maxSize={20}
        title="Test"
        unit="GB"
        tooBigMessage="Test too big"
        tooSmallMessage="Test too small"
        value={25}
      />,
    ))
})
