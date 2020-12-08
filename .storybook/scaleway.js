import { create } from '@storybook/theming/create'
import brandImage from './assets/scaleway-text.png'

export default create({
  base: 'light',

  brandTitle: 'Scaleway UI',
  brandUrl: 'https://github.com/chambo-e/scw-ui',
  brandImage,
  colorSecondary: '#4f0599',
})
