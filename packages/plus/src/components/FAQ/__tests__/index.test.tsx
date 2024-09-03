import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, it } from 'vitest'
import { FAQ } from '..'

describe('FAQ', () => {
  it('should work with default props', () =>
    shouldMatchEmotionSnapshot(<FAQ title="Title" description="Description" />))
  it('should work with notes', () =>
    shouldMatchEmotionSnapshot(
      <FAQ title="Title" description="Description" notes="Notes" />,
    ))
  it('should work with illustrationTest', () =>
    shouldMatchEmotionSnapshot(
      <FAQ title="Title" description="Description" illustrationText={1} />,
    ))
  it('should work with productIconName', () =>
    shouldMatchEmotionSnapshot(
      <FAQ title="Title" description="Description" productIconName="support" />,
    ))
})
