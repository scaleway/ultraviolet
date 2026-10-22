import type { StoryFn } from '@storybook/react-vite'
import { CreditCardIcon } from '@ultraviolet/icons'
import { CheckIcon } from '@ultraviolet/icons/CheckIcon'
import { Bullet } from '..'
import { Stack } from '../../../Layout/Stack'
import { VisuallyHidden } from '../../../Other/VisuallyHidden'

export const Icon: StoryFn = props => (
  <Stack direction="column" gap="2">
    <Stack direction="row" gap="1">
      With <code>VisuallyHidden</code>:
      <Bullet {...props} sentiment="success">
        <VisuallyHidden>Done</VisuallyHidden>
        <CheckIcon />
      </Bullet>
    </Stack>
    <Stack direction="row" gap="1">
      With the <code>tooltipLabel</code> prop:
      <Bullet {...props} sentiment="success" tooltipLabel="Done">
        <CheckIcon />
      </Bullet>
    </Stack>
    <Stack gap="1">
      If the bullet is purely decorative, use the aria-hidden prop:
      <ul>
        <li>
          When purely decorative:
          <Bullet {...props} sentiment="primary" aria-hidden>
            <CreditCardIcon />
          </Bullet>
        </li>
        <li>
          When accompanied by text:
          <Stack direction="row" gap="1" alignItems="center">
            <Bullet {...props} sentiment="success" aria-hidden>
              <CheckIcon />
            </Bullet>
            Done
          </Stack>
        </li>
      </ul>
    </Stack>
  </Stack>
)

Icon.parameters = {
  docs: {
    description: {
      story:
        'To add an icon, simply pass it as a child of the `Bullet` component. The sentiment of the icon will automatically follow the sentiment of the bullet. **Do not forget to label the icon** (use the `VisuallyHidden` component, use the `tooltipLabel` prop directly on the `Bullet`, rely on adjacent text, or use the `accessibleLabel` prop on the icon as a last resort)',
    },
  },
}
