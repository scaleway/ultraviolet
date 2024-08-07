import { shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Card } from '..'

describe('Card', () => {
  test('renders correctly with header', () =>
    shouldMatchEmotionSnapshot(<Card header="Title">Hello</Card>))

  test('renders correctly with advanced header', () =>
    shouldMatchEmotionSnapshot(
      <Card header={<h2>Advanced Title</h2>}>Hello</Card>,
    ))

  test('renders correctly without header', () =>
    shouldMatchEmotionSnapshot(<Card>Hello</Card>))

  test('renders correctly with disabled', () =>
    shouldMatchEmotionSnapshot(<Card disabled>Hello</Card>))

  test('renders correctly with disabled and header', () =>
    shouldMatchEmotionSnapshot(
      <Card header="Title" disabled>
        Hello
      </Card>,
    ))

  test('renders correctly with isActive', () =>
    shouldMatchEmotionSnapshot(<Card isActive>Hello</Card>))

  test('renders correctly with className', () =>
    shouldMatchEmotionSnapshot(<Card className="test">Hello</Card>))

  test('renders correctly with data-testid', () =>
    shouldMatchEmotionSnapshot(<Card data-testid="test">Hello</Card>))
})
