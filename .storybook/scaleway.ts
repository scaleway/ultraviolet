import { create } from '@storybook/theming'
import lightBrandImage from './assets/scaleway-text-light.png'
import darkBrandImage from './assets/scaleway-text-dark.png'

export const light = create({
  base: 'light',

  brandTitle: 'Scaleway UI',
  brandUrl: 'https://github.com/scaleway/scaleway-ui',
  brandImage: lightBrandImage,
  colorSecondary: '#4f0599',
})

export const dark = create({
  base: 'dark',

  brandTitle: 'Scaleway UI',
  brandUrl: 'https://github.com/scaleway/scaleway-ui',
  brandImage: darkBrandImage,
  colorSecondary: '#CE80FF',
})
