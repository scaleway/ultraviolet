import { Card } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'

describe('Card', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(<Card title="Title">Hello</Card>))

  test('renders correctly on edition mode', () =>
    shouldMatchEmotionSnapshot(
      <Card title="Title" edition>
        Hello
      </Card>,
    ))

  test('renders correctly with small variant', () =>
    shouldMatchEmotionSnapshot(
      <Card title="Title" small>
        Hello
      </Card>,
    ))

  test('renders correctly when disabled', () =>
    shouldMatchEmotionSnapshot(
      <Card title="Title" disabled>
        Hello
      </Card>,
    ))
})
