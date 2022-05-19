import Container from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Container', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(<Container title="Title">Hello</Container>))

  test('renders correctly on edition mode', () =>
    shouldMatchEmotionSnapshot(
      <Container title="Title" edition>
        Hello
      </Container>,
    ))

  test('renders correctly with small variant', () =>
    shouldMatchEmotionSnapshot(
      <Container title="Title" small>
        Hello
      </Container>,
    ))

  test('renders correctly when disabled', () =>
    shouldMatchEmotionSnapshot(
      <Container title="Title" disabled>
        Hello
      </Container>,
    ))
})
