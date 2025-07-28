import { Badge } from '../../Badge'
import { Tabs } from '..'
import { Template } from './Template.stories'

export const WithSubtitle = Template.bind({})

WithSubtitle.args = {
  children: [
    <Tabs.Tab
      value={1}
      subtitle="Subtitle"
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      value={2}
      counter={1}
      subtitle="Subtitle"
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      value={3}
      counter={10}
      subtitle="Subtitle"
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      value={4}
      disabled
      subtitle="Subtitle Beta"
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      value={5}
      disabled
      counter={1}
      subtitle="Subtitle short"
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      value={6}
      disabled
      counter={10}
      subtitle="Subtitle with a long long long long long long text"
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      value={6}
      counter={10}
      subtitle="Subtitle with a long long long long long long text"
    >
      Text
    </Tabs.Tab>,
  ],
  selected: 1,
}
