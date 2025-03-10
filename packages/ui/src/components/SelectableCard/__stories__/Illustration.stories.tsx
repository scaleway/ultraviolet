import type { StoryFn } from '@storybook/react'
import {
  appleSiliconM2Wire,
  appleSiliconWire,
  // @ts-expect-error can't import ultraviolet/illustration in ui (cyclic dependencies)
} from '@ultraviolet/illustrations/products/appleSilicon'
import { useState } from 'react'
import { SelectableCard } from '..'
import { Badge } from '../../Badge'
import { Link } from '../../Link'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

export const Illustration: StoryFn = args => {
  const [value, onChange] = useState('label-30')
  const [value2, onChange2] = useState('label-24')

  return (
    <Stack gap={8}>
      <Stack gap={1} flex={1}>
        ProductIcon:
        <SelectableCard
          {...args}
          name="label-30"
          checked={value === 'label-30'}
          value="label-30"
          type="radio"
          onChange={event => onChange(event.currentTarget.value)}
          label={
            <Stack direction="row" gap={1} flex={1} alignItems="center">
              <Text variant="bodyStrong" as="span">
                M1
              </Text>
              <Badge sentiment="primary" size="small">
                Recommended
              </Badge>
            </Stack>
          }
          productIcon="macMini"
          showTick
        >
          Offer the best experience to your Mac, iPhone and iPad users with VNC,
          the remote desktop-sharing protocol.
          <Link target="_blank" href="scaleway.com" size="small">
            Learn more
          </Link>
        </SelectableCard>
        <SelectableCard
          {...args}
          name="label-31"
          checked={value === 'label-31'}
          value="label-31"
          type="radio"
          onChange={event => onChange(event.currentTarget.value)}
          label={
            <Stack direction="row" gap={1} flex={1} alignItems="center">
              <Text variant="bodyStrong" as="span">
                M2
              </Text>
              <Badge sentiment="primary" size="small">
                Recommended
              </Badge>
            </Stack>
          }
          productIcon="macMiniM2"
          showTick
        >
          Offer the best experience to your Mac
          <Link target="_blank" href="scaleway.com" size="small">
            Learn more
          </Link>
        </SelectableCard>
      </Stack>
      <Stack gap={1} flex={1}>
        Illustration (white — switch to dark or darker theme):
        <SelectableCard
          {...args}
          name="label-24"
          checked={value2 === 'label-24'}
          value="label-24"
          type="radio"
          onChange={event => onChange2(event.currentTarget.value)}
          label={
            <Stack direction="row" gap={1} flex={1} alignItems="center">
              <Text variant="bodyStrong" as="span">
                M1
              </Text>
              <Badge sentiment="primary" size="small">
                Recommended
              </Badge>
            </Stack>
          }
          illustration={appleSiliconWire as string}
          showTick
        >
          Offer the best experience to your Mac, iPhone and iPad users with VNC,
          the remote desktop-sharing protocol.
          <Link target="_blank" href="scaleway.com" size="small">
            Learn more
          </Link>
        </SelectableCard>
        <SelectableCard
          {...args}
          name="label-25"
          checked={value2 === 'label-25'}
          value="label-25"
          type="radio"
          onChange={event => onChange2(event.currentTarget.value)}
          label={
            <Stack direction="row" gap={1} flex={1} alignItems="center">
              <Text variant="bodyStrong" as="span">
                M2
              </Text>
              <Badge sentiment="primary" size="small">
                Recommended
              </Badge>
            </Stack>
          }
          illustration={appleSiliconM2Wire as string}
          showTick
        >
          Offer the best experience to your Mac
          <Link target="_blank" href="scaleway.com" size="small">
            Learn more
          </Link>
        </SelectableCard>
      </Stack>
    </Stack>
  )
}

Illustration.decorators = [
  StoryComponent => (
    <Stack direction="row" gap={2}>
      <StoryComponent />
    </Stack>
  ),
]

Illustration.parameters = {
  docs: {
    description: {
      story:
        'Add an illustration  from `@ultration/illustrations` or an icon from `@ultraviolet/icons` on the right-hand side of a card. If both an illustration and an icon is passed, only the icon will be shown.',
    },
  },
}
