import Slider from '..'
import { shouldMatchEmotionSnapshot } from '../../../helpers/jestHelpers'

describe('Slider', () => {
  test(`renders correctly with default props`, () =>
    shouldMatchEmotionSnapshot(
      <Slider>
        <Slider.Item>Item 1</Slider.Item>
        <Slider.Item>Item 2</Slider.Item>
        <Slider.Item>Item 3</Slider.Item>
        <Slider.Item>Item 4</Slider.Item>
        <Slider.Item>Item 5</Slider.Item>
        <Slider.Item>Item 6</Slider.Item>
      </Slider>,
    ))
})
