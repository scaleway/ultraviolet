import BulletList from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('BulletList', () => {
  test('renders correctly ', () =>
    shouldMatchEmotionSnapshot(
      <BulletList>
        <div>a</div>
        <div>b</div>
        <div>c</div>
      </BulletList>,
    ))

  test('renders correctly with custom keyPrefix', () =>
    shouldMatchEmotionSnapshot(
      <BulletList keyPrefix="test">
        <div>a</div>
        <div>b</div>y<div>c</div>
      </BulletList>,
    ))
})
