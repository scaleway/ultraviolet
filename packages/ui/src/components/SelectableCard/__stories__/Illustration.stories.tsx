import type { StoryFn } from '@storybook/react-vite'
import {
  appleSiliconM2Wire,
  appleSiliconWire,
  // @ts-expect-error can't import ultraviolet/illustration in ui (cyclic dependencies)
} from '@ultraviolet/illustrations/products/appleSilicon'
import { useState } from 'react'
import { Badge } from '../../Badge'
import { Link } from '../../Link'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { SelectableCard } from '..'

export const Illustration: StoryFn = args => {
  const [value, onChange] = useState('label-30')
  const [value2, onChange2] = useState('label-24')

  return (
    <Stack gap={8}>
      <Stack flex={1} gap={1}>
        ProductIcon:
        <SelectableCard
          {...args}
          checked={value === 'label-30'}
          label={
            <Stack alignItems="center" direction="row" flex={1} gap={1}>
              <Text as="span" variant="bodyStrong">
                M1
              </Text>
              <Badge sentiment="primary" size="small">
                Recommended
              </Badge>
            </Stack>
          }
          name="label-30"
          onChange={event => onChange(event.currentTarget.value)}
          productIcon="macMini"
          showTick
          type="radio"
          value="label-30"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="body">
            Offer the best experience to your Mac, iPhone and iPad users with
            VNC, the remote desktop-sharing protocol.
          </Text>
          <Link href="scaleway.com" size="small" target="_blank">
            Learn more
          </Link>
        </SelectableCard>
        <SelectableCard
          {...args}
          checked={value === 'label-31'}
          label={
            <Stack alignItems="center" direction="row" flex={1} gap={1}>
              <Text as="span" variant="bodyStrong">
                M2
              </Text>
              <Badge sentiment="primary" size="small">
                Recommended
              </Badge>
            </Stack>
          }
          name="label-31"
          onChange={event => onChange(event.currentTarget.value)}
          productIcon="macMiniM2"
          showTick
          type="radio"
          value="label-31"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="body">
            Offer the best experience to your Mac
          </Text>
          <Link href="scaleway.com" size="small" target="_blank">
            Learn more
          </Link>
        </SelectableCard>
      </Stack>
      <Stack flex={1} gap={1}>
        Illustration (white — switch to dark or darker theme):
        <SelectableCard
          {...args}
          checked={value2 === 'label-24'}
          illustration={appleSiliconWire as string}
          label={
            <Stack alignItems="center" direction="row" flex={1} gap={1}>
              <Text as="span" variant="bodyStrong">
                M1
              </Text>
              <Badge sentiment="primary" size="small">
                Recommended
              </Badge>
            </Stack>
          }
          name="label-24"
          onChange={event => onChange2(event.currentTarget.value)}
          showTick
          type="radio"
          value="label-24"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="body">
            Offer the best experience to your Mac, iPhone and iPad users with
            VNC, the remote desktop-sharing protocol.
          </Text>
          <Link href="scaleway.com" size="small" target="_blank">
            Learn more
          </Link>
        </SelectableCard>
        <SelectableCard
          {...args}
          checked={value2 === 'label-25'}
          illustration={appleSiliconM2Wire as string}
          label={
            <Stack alignItems="center" direction="row" flex={1} gap={1}>
              <Text as="span" variant="bodyStrong">
                M2
              </Text>
              <Badge sentiment="primary" size="small">
                Recommended
              </Badge>
            </Stack>
          }
          name="label-25"
          onChange={event => onChange2(event.currentTarget.value)}
          showTick
          type="radio"
          value="label-25"
        >
          <Text as="p" prominence="weak" sentiment="neutral" variant="body">
            Offer the best experience to your Mac
          </Text>
          <Link href="scaleway.com" size="small" target="_blank">
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
