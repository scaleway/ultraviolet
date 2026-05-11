import { Stack } from '@ultraviolet/ui'
import { CheckboxSelectableCard } from './CheckboxSelectableCard'
import { RadioSelectableCard } from './RadioSelectableCard'
import { ToggleSelectableCard } from './ToggleSelectableCard'

const Render = () => (
  <Stack gap={2}>
    <CheckboxSelectableCard />
    <RadioSelectableCard />
    <ToggleSelectableCard />
  </Stack>
)

export default Render
