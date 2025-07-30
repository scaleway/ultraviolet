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
      key={1}
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
      key={2}
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
      key={3}
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
      key={4}
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
      key={5}
      subtitle="Subtitle short"
      value={5}
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      counter={10}
      disabled
      key={6}
      subtitle="Subtitle with a long long long long long long text"
      value={6}
    >
      Text
    </Tabs.Tab>,
    <Tabs.Tab
      counter={10}
      key={7}
      subtitle="Subtitle with a long long long long long long text"
      value={6}
    >
      Text
    </Tabs.Tab>,
  ],
  selected: 1,
}
