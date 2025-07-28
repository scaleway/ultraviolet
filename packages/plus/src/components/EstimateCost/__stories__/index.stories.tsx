import type { Meta } from '@storybook/react-vite'
import { EstimateCost } from '..'
import { Item } from '../Components/Item'
import { LineThrough } from '../Components/LineThrough'
import { NumberInput } from '../Components/NumberInput'
import { Region } from '../Components/Region'
import { Regular } from '../Components/Regular'
import { Strong } from '../Components/Strong'
import { Unit } from '../Components/Unit'

export default {
  component: EstimateCost,
  subcomponents: {
    Item,
    LineThrough,
    NumberInput,
    Region,
    Regular,
    Strong,
    Unit,
  },
  title: 'Plus/Compositions/EstimateCost',
} as Meta

export { DefaultLocales } from './DefaultLocales.stories'
export { Design } from './Design.stories'
export { GlobalDiscount } from './GlobalDiscount.stories'
export { Item } from './Item.stories'
export { LocalDiscount } from './LocalDiscount.stories'
export { NegativeValues } from './NegativeValues.stories'
export { NewPrice } from './NewPrice.stories'
export { NumberInput } from './NumberInput.stories'
export { Playground } from './Playground.stories'
export { Region } from './Region.stories'
export { Unit } from './Unit.stories'
