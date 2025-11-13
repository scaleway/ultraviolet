import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { consoleDarkTheme } from '@ultraviolet/themes'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, test } from 'vitest'
import { Banner } from '..'

// import image from '../__stories__/Image.png'

describe('banner', () => {
  test('renders correctly with default values', () =>
    shouldMatchSnapshot(<Banner title="Title">Description</Banner>))

  // test.skip('renders correctly with an image', () =>
  //   shouldMatchSnapshot(
  //     <Banner title="Title" image={<img src={image} alt="" />}>
  //       Description
  //     </Banner>,
  //   ))

  test('renders correctly with a button', () =>
    shouldMatchSnapshot(
      <Banner buttonText="Button" title="Title">
        Description
      </Banner>,
    ))

  test('renders correctly with a link', () =>
    shouldMatchSnapshot(
      <Banner linkText="Link" title="Title">
        Description
      </Banner>,
    ))

  describe('sizes and variants', () => {
    ;(['medium', 'small'] as const).map(size =>
      (['intro', 'promotional'] as const).forEach(variant => {
        test(`renders correctly with size ${size} and variant ${variant}`, () =>
          shouldMatchSnapshot(
            <Banner size={size} title="Title" variant={variant}>
              Description
            </Banner>,
          ))
      }),
    )
  })

  test('renders correctly with direction row', () =>
    shouldMatchSnapshot(
      <Banner direction="row" title="Title">
        Description
      </Banner>,
    ))

  test('renders correctly with closable to false', () =>
    shouldMatchSnapshot(
      <Banner closable={false} direction="row" title="Title">
        Description
      </Banner>,
    ))

  test(`should render banner and then close it`, async () => {
    renderWithTheme(
      <Banner data-testid="banner" direction="row" title="Title">
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
    shouldMatchSnapshot(
      <Banner linkText="Learn more" title="Title">
        Descritpion
      </Banner>,
      consoleDarkTheme,
    ))
})
