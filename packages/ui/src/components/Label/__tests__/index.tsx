import { Label } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('Label', () => {
  it(`renders correctly`, () =>
    shouldMatchEmotionSnapshot(<Label>I&apos;m a Label</Label>))
})
