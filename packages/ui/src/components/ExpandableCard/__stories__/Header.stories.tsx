import type { Decorator, StoryFn } from '@storybook/react-vite'
import { DeleteIcon } from '@ultraviolet/icons/DeleteIcon'
import { DotsHorizontalIcon } from '@ultraviolet/icons/DotsHorizontalIcon'
import { KubernetesProductIcon } from '@ultraviolet/icons/product'
import { Button, Menu, Stack, Text } from '../..'
import { ExpandableCard } from '..'

export const Header: StoryFn<typeof ExpandableCard> = () => (
  <Stack gap={1}>
    <ExpandableCard header="This is a basic header">content</ExpandableCard>
    <ExpandableCard
      header={
        <Stack
          alignItems="center"
          direction="row"
          gap={2}
          justifyContent="space-between"
          width="100%"
        >
          <Stack alignItems="center" direction="row" gap={1}>
            <KubernetesProductIcon />
            <div>
              <ExpandableCard.Title>A more complex header</ExpandableCard.Title>
              <Text as="p" variant="caption">
                description
              </Text>
            </div>
          </Stack>
          <Stack alignItems="center" direction="row" gap={1}>
            <Button sentiment="danger" size="small">
              <DeleteIcon />
            </Button>
            <Menu
              disclosure={
                <Button sentiment="neutral" size="small" variant="ghost">
                  <DotsHorizontalIcon />
                </Button>
              }
            >
              <Menu.Item>Action 1</Menu.Item>
              <Menu.Item>Action 2</Menu.Item>
            </Menu>
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
