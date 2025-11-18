import type { StoryFn } from '@storybook/react-vite'
import { DotsHorizontalIcon } from '@ultraviolet/icons'
import { Button } from '../../index'
import { Stack } from '../../Stack'
import { Menu } from '..'

export const DefaultDisclosure = (
  <Button sentiment="neutral" size="small" variant="ghost">
    <DotsHorizontalIcon />
  </Button>
)

export const Placement: StoryFn<typeof Menu> = ({
  disclosure = DefaultDisclosure,
  ...props
}) => (
  <>
    <Stack alignItems="end" justifyContent="left" width="100%">
      <>
        Placement = &quot;auto-right&quot;: not enough room on the right, so
        second priority (left)
        <Menu disclosure={disclosure} placement="auto-right">
          <Menu.Item borderless key="borderless">
            Information with a very long name. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </Menu.Item>
          <Menu.Item borderless key="power on">
            Power on
          </Menu.Item>
        </Menu>
      </>
      <>
        Placement = &quot;right&quot;: not enough room on the right but force
        placement on the right
        <Menu disclosure={disclosure} placement="right">
          <Menu.Item borderless key="borderless">
            Information with a very long name. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit.
          </Menu.Item>
          <Menu.Item borderless key="power on">
            Power on
          </Menu.Item>
        </Menu>
      </>
    </Stack>
    <Stack
      alignItems="center"
      justifyContent="center"
      style={{
        marginTop: 100,
      }}
    >
      You can play with the placement here using storybook controls
      <Menu disclosure={disclosure} {...props}>
        <Menu.Item borderless key="borderless">
          Information with a very long name. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.
        </Menu.Item>
        <Menu.Item borderless key="power on">
          Power on
        </Menu.Item>
      </Menu>
    </Stack>
  </>
)

Placement.parameters = {
  docs: {
    description: {
      story: `You can choose to place automatically the menu or manually. There are for manual placements: "top", "bottom", "left" and "right".
There are five modes of auto-placement: "auto", "auto-left", "auto-right", "auto-top", and "auto-bottom". Those "auto-" allow to give a prioriry to the direction. For instance, auto-bottom will try to place the popup beneath the disclosure first, if there is not enough place it will try top, then left, then right. 
The priorities are :
<ul>
<li> auto-bottom : bottom > top > left > right</li>
<li>  auto-left : left > right > top > bottom</li>
<li> auto-right : right > left > top > bottom</li>
<li> auto and auto-top : top > bottom > left > right</li>
</ul>
`,
    },
  },
}
