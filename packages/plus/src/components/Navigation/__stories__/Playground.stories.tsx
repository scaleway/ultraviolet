import { Navigation } from '..'
import { Template } from './Template'

export const Playground = Template.bind({})

Playground.args = {
  ...Template.args,
  children: [
    <>
      <Navigation.Item label="Organization Dashboard" categoryIcon="console" />
      <Navigation.Item label="Project Dashboard" categoryIcon="useCase" />
      <Navigation.Group label="Products">
        <Navigation.Item
          label="Compute"
          subLabel="All compute ressources"
          categoryIcon="baremetal"
          badgeText="New"
          badgeSentiment="success"
          href="#"
        >
          <Navigation.Item label="Instance" />
          <Navigation.Item label="Elastic Metal" />
          <Navigation.Item label="Advanced">
            <Navigation.Item label="Kubernetes" />
            <Navigation.Item label="OpenStack" />
          </Navigation.Item>
        </Navigation.Item>
        <Navigation.Item label="Storage" categoryIcon="managedServices">
          <Navigation.Item label="Block Storage" />
          <Navigation.Item
            label="Object Storage"
            badgeText="beta"
            badgeSentiment="warning"
          />
          <Navigation.Item label="File Storage" href="#" />
        </Navigation.Item>
        <Navigation.Item label="Network" categoryIcon="network">
          <Navigation.Item label="Load Balancer" />
          <Navigation.Item label="IP" />
          <Navigation.Item label="VPC" />
        </Navigation.Item>
        <Navigation.Item label="Database" categoryIcon="database">
          <Navigation.Item label="Managed Database" />
          <Navigation.Item label="Redis" />
          <Navigation.Item label="Elasticsearch" />
        </Navigation.Item>
        <Navigation.Item label="Monitoring" categoryIcon="observability">
          <Navigation.Item label="Logs" />
          <Navigation.Item label="Metrics" />
          <Navigation.Item label="Alerts" />
        </Navigation.Item>
        <Navigation.Item label="Security" categoryIcon="security">
          <Navigation.Item label="Firewall" />
          <Navigation.Item label="Certificate" />
          <Navigation.Item label="VPN" />
        </Navigation.Item>
      </Navigation.Group>
    </>,
  ],
}

Playground.decorators = [
  Story => (
    <div
      style={{
        height: '600px',
        width: '100%',
        display: 'flex',
        overflow: 'hidden',
        background: 'lightgray',
        margin: '-10px 0', // This is to compensate the border added by storybook around the story
      }}
    >
      <Story />
    </div>
  ),
]
