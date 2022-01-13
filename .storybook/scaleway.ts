import { create } from '@storybook/theming'
import brandImage from './assets/scaleway-text.png'

export default create({
  base: 'light',

  brandTitle: 'Scaleway UI',
  brandUrl: 'https://github.com/scaleway/scaleway-ui',
  brandImage,
  colorSecondary: '#4f0599',
})
