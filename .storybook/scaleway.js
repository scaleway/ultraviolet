import { create } from '@storybook/theming/create'
import logo from './public/scaleway-text.png'

export default create({
  base: 'light',

  brandTitle: 'Scaleway UI',
  brandUrl: 'https://github.com/chambo-e/scw-ui',
  brandImage: logo,
})
