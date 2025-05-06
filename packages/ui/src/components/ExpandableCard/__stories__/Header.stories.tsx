import type { Decorator, StoryFn } from '@storybook/react'
import { DeleteIcon, DotsHorizontalIcon } from '@ultraviolet/icons'
import { KubernetesProductIcon } from '@ultraviolet/icons/product'
import { ExpandableCard } from '..'
import { Button, MenuV2, Stack, Text } from '../..'

export const Header: StoryFn<typeof ExpandableCard> = () => (
  <Stack gap={1}>
    <ExpandableCard header="This is a basic header">content</ExpandableCard>
    <ExpandableCard
      header={
        <Stack
          direction="row"
          justifyContent="space-between"
          gap={2}
          alignItems="center"
          width="100%"
        >
          <Stack direction="row" gap={1} alignItems="center">
            <KubernetesProductIcon />
            <div>
              <ExpandableCard.Title>A more complex header</ExpandableCard.Title>
              <Text as="p" variant="caption">
                description
              </Text>
            </div>
          </Stack>
          <Stack direction="row" gap={1} alignItems="center">
            <Button sentiment="danger" size="small">
              <DeleteIcon />
            </Button>
            <MenuV2
              disclosure={
                <Button sentiment="neutral" variant="ghost" size="small">
                  <DotsHorizontalIcon />
                </Button>
              }
            >
              <MenuV2.Item>Action 1</MenuV2.Item>
              <MenuV2.Item>Action 2</MenuV2.Item>
            </MenuV2>
          </Stack>
        </Stack>
      }
    >
      content
    </ExpandableCard>
  </Stack>
)

Header.parameters = {
  docs: {
    description: {
      story:
        'Use the `header` prop to change the header content. You can provide a simply string which is automatically formatted. For more complexe usage you can do your own rendering which can use `Expandable.Title` to stay consistent with component guidelines.',
    },
  },
}

Header.decorators = [
  Story => (
    <div style={{ minHeight: '220px' }}>
      <Story />
    </div>
  ),
] as Decorator[]
