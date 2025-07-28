import { Badge } from '../../Badge'
import { Tabs } from '..'
import { Template } from './Template.stories'

export const WithSubtitle = Template.bind({})

WithSubtitle.args = {
  children: [
    <Tabs.Tab
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
      subtitle="Subtitle"
      value={1}
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
      counter={1}
      subtitle="Subtitle"
      value={2}
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
      counter={10}
      subtitle="Subtitle"
      value={3}
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
      disabled
      subtitle="Subtitle Beta"
      value={4}
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      badge={
        <Badge sentiment="warning" size="small">
          Beta
        </Badge>
      }
      counter={1}
      disabled
      subtitle="Subtitle short"
      value={5}
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      counter={10}
      disabled
      subtitle="Subtitle with a long long long long long long text"
      value={6}
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      counter={10}
      subtitle="Subtitle with a long long long long long long text"
      value={6}
    >
      Text
    </Tabs.Tab>,
  ],
  selected: 1,
}
