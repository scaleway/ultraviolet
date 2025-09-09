import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { FAQ } from '..'

describe('fAQ', () => {
  it('should work with default props', () =>
    shouldMatchEmotionSnapshot(<FAQ description="Description" title="Title" />))
  it('should work with notes', () =>
    shouldMatchEmotionSnapshot(
      <FAQ description="Description" notes="Notes" title="Title" />,
    ))
  it('should work with illustrationTest', () =>
    shouldMatchEmotionSnapshot(
      <FAQ description="Description" illustrationText={1} title="Title" />,
    ))
  it('should work with productIconName', () =>
    shouldMatchEmotionSnapshot(
      <FAQ description="Description" productIconName="support" title="Title" />,
    ))
})
