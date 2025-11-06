import { shouldMatchSnapshot } from '@utils/test'
import { describe, test } from 'vitest'
import { Card } from '..'

describe('card', () => {
  test('renders correctly with header', () =>
    shouldMatchSnapshot(<Card header="Title">Hello</Card>))

  test('renders correctly with advanced header', () =>
    shouldMatchSnapshot(<Card header={<h2>Advanced Title</h2>}>Hello</Card>))
  test('renders correctly with advanced subHeader', () =>
    shouldMatchSnapshot(
      <Card subHeader={<h2>Advanced subHeader</h2>}>Hello</Card>,
    ))
  test('renders correctly with subHeader', () =>
    shouldMatchSnapshot(<Card subHeader="Title">Hello</Card>))

  test('renders correctly with header and subHeader', () =>
    shouldMatchSnapshot(
      <Card header="Main title" subHeader="Title">
        Hello
      </Card>,
    ))

  test('renders correctly with advanced header and subHeader', () =>
    shouldMatchSnapshot(
      <Card
        header={<h2>Advanced Title</h2>}
        subHeader={<h2>Advanced subHeader</h2>}
      >
        Hello
      </Card>,
    ))

  test('renders correctly without header', () =>
    shouldMatchSnapshot(<Card>Hello</Card>))

  test('renders correctly with disabled', () =>
    shouldMatchSnapshot(<Card disabled>Hello</Card>))

  test('renders correctly with disabled and header', () =>
    shouldMatchSnapshot(
      <Card disabled header="Title">
        Hello
      </Card>,
    ))

  test('renders correctly with active', () =>
    shouldMatchSnapshot(<Card active>Hello</Card>))

  test('renders correctly with active and disabled', () =>
    shouldMatchSnapshot(
      <Card active disabled>
        Hello
      </Card>,
    ))

  test('renders correctly with className', () =>
    shouldMatchSnapshot(<Card className="test">Hello</Card>))

  test('renders correctly with data-testid', () =>
    shouldMatchSnapshot(<Card data-testid="test">Hello</Card>))
})
