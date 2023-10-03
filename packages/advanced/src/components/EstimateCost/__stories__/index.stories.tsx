import type { ComponentMeta } from '@storybook/react'
import { EstimateCost } from '..'
import { Item } from '../Item'
import { LineThrough } from '../LineThrough'
import { NumberInput } from '../NumberInput'
import { Region } from '../Region'
import { Regular } from '../Regular'
import { Strong } from '../Strong'
import { Unit } from '../Unit'

export default {
  component: EstimateCost,
  subcomponents: {
    Item,
    LineThrough,
    Region,
    Regular,
    NumberInput,
    Strong,
    Unit,
  },
  title: 'Advanced/EstimateCost',
} as ComponentMeta<typeof EstimateCost>

export { Playground } from './Playground.stories'
export { Item } from './Item.stories'
export { Region } from './Region.stories'
export { NumberInput } from './NumberInput.stories'
export { Unit } from './Unit.stories'
export { GlobalDiscount } from './GlobalDiscount.stories'
export { LocalDiscount } from './LocalDiscount.stories'
export { Design } from './Design.stories'
