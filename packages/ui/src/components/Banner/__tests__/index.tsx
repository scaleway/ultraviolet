import { describe, test } from '@jest/globals'
import { Banner } from '..'
import { shouldMatchEmotionSnapshot } from '../../../../.jest/helpers'
import image from '../__stories__/Image.png'

describe('Banner', () => {
  test('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(<Banner title="Title">Description</Banner>))

  test('renders correctly with an image', () =>
    shouldMatchEmotionSnapshot(
      <Banner title="Title" image={<img src={image} alt="" />}>
        Description
      </Banner>,
    ))

  test('renders correctly with a button', () =>
    shouldMatchEmotionSnapshot(
      <Banner title="Title" buttonText="Button">
        Description
      </Banner>,
    ))

  test('renders correctly with a link', () =>
    shouldMatchEmotionSnapshot(
      <Banner title="Title" linkText="Link">
        Description
      </Banner>,
    ))

  test('renders correctly with size small', () =>
    shouldMatchEmotionSnapshot(
      <Banner title="Title" size="small">
        Description
      </Banner>,
    ))

  test('renders correctly with type promotional', () =>
    shouldMatchEmotionSnapshot(
      <Banner title="Title" variant="promotional">
        Description
      </Banner>,
    ))

  test('renders correctly with direction row', () =>
    shouldMatchEmotionSnapshot(
      <Banner title="Title" direction="row">
        Description
      </Banner>,
    ))

  test('renders correctly with closable to false', () =>
    shouldMatchEmotionSnapshot(
      <Banner title="Title" direction="row" closable={false}>
        Description
      </Banner>,
    ))
})
