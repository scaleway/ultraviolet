import ContainerV2 from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('ContainerV2', () => {
  test('renders correctly', () =>
    shouldMatchEmotionSnapshot(<ContainerV2 title="Title">Hello</ContainerV2>))

  test('renders correctly on edition mode', () =>
    shouldMatchEmotionSnapshot(
      <ContainerV2 title="Title" edition>
        Hello
      </ContainerV2>,
    ))

  test('renders correctly with small variant', () =>
    shouldMatchEmotionSnapshot(
      <ContainerV2 title="Title" small>
        Hello
      </ContainerV2>,
    ))

  test('renders correctly when disabled', () =>
    shouldMatchEmotionSnapshot(
      <ContainerV2 title="Title" disabled>
        Hello
      </ContainerV2>,
    ))
})
