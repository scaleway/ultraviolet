import { screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { consoleDarkTheme } from '@ultraviolet/themes'
import { renderWithTheme, shouldMatchSnapshot } from '@utils/test'
import { describe, expect, it } from 'vitest'
import { Banner } from '..'

// import image from '../__stories__/Image.png'

describe('banner', () => {
  it('renders correctly with default values', () => shouldMatchSnapshot(<Banner title="Title">Description</Banner>))

  it('renders correctly with a button', () =>
    shouldMatchSnapshot(
      <Banner buttonText="Button" title="Title">
        Description
      </Banner>,
    ))

  it('renders correctly with a link', () =>
    shouldMatchSnapshot(
      <Banner linkText="Link" title="Title">
        Description
      </Banner>,
    ))

  describe('sizes and variants', () => {
    ;(['medium', 'small'] as const).map(size =>
      (['intro', 'promotional'] as const).forEach(variant => {
        it(`renders correctly with size ${size} and variant ${variant}`, () =>
          shouldMatchSnapshot(
            <Banner size={size} title="Title" variant={variant}>
              Description
            </Banner>,
          ))
      }),
    )
  })

  it('renders correctly with direction row', () =>
    shouldMatchSnapshot(
      <Banner direction="row" title="Title">
        Description
      </Banner>,
    ))

  it('renders correctly with closable to false', () =>
    shouldMatchSnapshot(
      <Banner closable={false} direction="row" title="Title">
        Description
      </Banner>,
    ))

  it('should render banner and then close it', async () => {
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

  it('should render correctly with dark theme', () =>
    shouldMatchSnapshot(
      <Banner linkText="Learn more" title="Title">
        Descritpion
      </Banner>,
      consoleDarkTheme,
    ))
})
