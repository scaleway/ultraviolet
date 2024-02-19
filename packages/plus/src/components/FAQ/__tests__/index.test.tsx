import { describe, it } from '@jest/globals'
import { FAQ } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

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
  it('should work with illustration', () =>
    shouldMatchEmotionSnapshot(
      <FAQ title="Title" description="Description" productIconName="support" />,
    ))
})
