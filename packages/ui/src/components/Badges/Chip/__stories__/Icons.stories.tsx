import type { StoryFn } from '@storybook/react-vite'
import { FilterIcon } from '@ultraviolet/icons/FilterIcon'
import { Chip } from '..'
import { Stack } from '../../../Layout/Stack'

export const Icons: StoryFn<typeof Chip> = ({ ...args }) => (
  <Stack direction="row" gap={1}>
    <Chip {...args}>
      Trailing icon
      <FilterIcon />
    </Chip>
    <Chip {...args}>
      <FilterIcon />
      Leading icon
    </Chip>
  </Stack>
)

Icons.parameters = {
  docs: {
    description: {
      story:
        'To add an icon on the chip, use an icon directly inside the children of `Chip`. Color/sentiment will automatically adapt. Avoid icon-only chip and do not forget to add a label in case the icon conveys meaning (with component `VisuallyHidden`).\n\n **Subcomponent `Chip.Icon` is deprecated**, use prop `onClose` for a closable chip or an icon directly inside the chip instead.',
    },
  },
}
