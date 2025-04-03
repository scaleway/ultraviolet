import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { consoleDarkTheme } from '@ultraviolet/themes'
import { renderWithTheme, shouldMatchEmotionSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { Banner } from '..'
// import image from '../__stories__/Image.png'

describe('Banner', () => {
  test('renders correctly with default values', () =>
    shouldMatchEmotionSnapshot(<Banner title="Title">Description</Banner>))

  // test.skip('renders correctly with an image', () =>
  //   shouldMatchEmotionSnapshot(
  //     <Banner title="Title" image={<img src={image} alt="" />}>
  //       Description
  //     </Banner>,
  //   ))

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

  describe('sizes and variants', () => {
    ;(['medium', 'small'] as const).map(size =>
      (['intro', 'promotional'] as const).forEach(variant => {
        test(`renders correctly with size ${size} and variant ${variant}`, () =>
          shouldMatchEmotionSnapshot(
            <Banner title="Title" size={size} variant={variant}>
              Description
            </Banner>,
          ))
      }),
    )
  })

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

  test(`should render banner and then close it`, async () => {
    renderWithTheme(
      <Banner title="Title" direction="row" data-testid="banner">
        Description
      </Banner>,
    )

    const banner = screen.getByTestId('banner')
    expect(banner).toBeVisible()

    const closeButton = screen.getByRole('button')
    await userEvent.click(closeButton)

    await waitFor(() => {
      expect(banner).not.toBeVisible()
    })
  })

  test(`should render correctly with dark theme`, () =>
    shouldMatchEmotionSnapshot(
      <Banner title="Title" linkText="Learn more">
        Descritpion
      </Banner>,
      consoleDarkTheme,
    ))
})
