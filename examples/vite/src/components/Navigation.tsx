import {
  BaremetalCategoryIcon,
  DataAndAnalyticsCategoryIcon,
  DatabaseCategoryIcon,
  MonitoringCategoryIcon,
  NetworkCategoryIcon,
  OrganizationDashboardCategoryIcon,
  SecurityCategoryIcon,
  UseCaseCategoryIcon,
} from '@ultraviolet/icons/category'
import { InformationOutlineIcon } from '@ultraviolet/icons/InformationOutlineIcon'
import {
  Navigation,
  NavigationProvider,
  useNavigation,
} from '@ultraviolet/plus'
import { Tooltip } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { useCallback, useEffect, useState } from 'react'

const onClickPinUnpin: ComponentProps<
  typeof Navigation.Item
>['onClickPinUnpin'] = ({ totalPinned }) => {
  // oxlint-disable-next-line eslint/no-console
  console.log('total pinned items:', totalPinned)
}

const INavigation = () => {
  const [active, setActive] = useState('Instance')
  const [pinnedItemsExpanded, setPinnedItemsExpanded] = useState(false)
  const [expanded, setExpanded] = useState(true)

  const { pinnedItems } = useNavigation()

  const saveExpandedInLocalStorage = useCallback((localExpanded: boolean) => {
    setExpanded(localExpanded)
    // oxlint-disable-next-line eslint/no-console
    console.log(
      `expanded state with value ${localExpanded} saved in local storage`,
    )
    localStorage.setItem('expanded', localExpanded.toString())
  }, [])

  useEffect(() => {
    // oxlint-disable-next-line eslint/no-console
    console.log('pinned items:', pinnedItems)
    localStorage.setItem('pinnedItems', pinnedItems.toString())
  }, [pinnedItems])

  const saveWidthInLocalStorage = useCallback((width: number) => {
    // oxlint-disable-next-line eslint/no-console
    console.log(`width of ${width} saved in local storage`)
    localStorage.setItem('width', width.toString())
  }, [])

  return (
    <NavigationProvider
      initialExpanded={expanded}
      initialPinned={pinnedItems}
      initialWidth={300}
      pinLimit={5}
      pinnedFeature
    >
      <Navigation
        onToggleExpand={saveExpandedInLocalStorage}
        onWidthResize={saveWidthInLocalStorage}
      >
        <Navigation.Item
          active={active === 'Organization Dashboard'}
          categoryIcon={<OrganizationDashboardCategoryIcon variant="neutral" />}
          id="organization-dashboard"
          label="Organization Dashboard"
          noPinButton
          onClickPinUnpin={onClickPinUnpin}
          onToggle={() => setActive('Organization Dashboard')}
        />
        <Navigation.Item
          active={active === 'Project Dashboard'}
          badgeSentiment="primary"
          badgeText="setup"
          categoryIcon={<UseCaseCategoryIcon variant="neutral" />}
          id="project-dashboard"
          label="Project Dashboard"
          noPinButton
          onClickPinUnpin={onClickPinUnpin}
          onToggle={() => setActive('Project Dashboard')}
        />
        <Navigation.PinnedItems
          itemWrapper={(item, id) => (
            <Tooltip placement="top" text={id}>
              {item}
            </Tooltip>
          )}
          onToggle={toggle => setPinnedItemsExpanded(!!toggle)}
          toggle={pinnedItemsExpanded}
        />
        <Navigation.Separator />
        <Navigation.Group label="Products">
          <Navigation.Item
            categoryIcon={<BaremetalCategoryIcon variant="primary" />}
            id="compute"
            label="Compute"
            labelDescription={
              <Tooltip text="All computer cloud">
                <InformationOutlineIcon size="xsmall" />
              </Tooltip>
            }
            subLabel="All compute ressources"
          >
            <Navigation.Item
              active={active === 'Instance'}
              badgeSentiment="success"
              badgeText="new"
              id="instance"
              label="Instance"
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('Instance')}
            />
            <Navigation.Item
              active={active === 'Elastic Metal'}
              disabled
              id="elastic-metal"
              label="Elastic Metal"
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('Elastic Metal')}
            />
            <Navigation.Item
              active={active === 'Dedibox'}
              href="https://scaleway.com"
              id="dedibox"
              label="Dedibox"
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('Dedibox')}
              target="_blank"
            />
            <Navigation.Item
              active={active === 'Very long product name with spaces'}
              badgeSentiment="danger"
              badgeText="internal"
              id="very-long-product-name-with-spaces"
              label="Very long product name with spaces"
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('Very long product name with spaces')}
            />
            <Navigation.Item
              active={active === 'Verylongproductnamewithoutspace'}
              badgeSentiment="danger"
              badgeText="internal"
              id="verylongproductnamewithoutspace"
              label="Verylongproductnamewithoutspace"
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('Verylongproductnamewithoutspace')}
            />
            <Navigation.Item id="advanced" label="Advanced">
              <Navigation.Item
                active={active === 'Kubernetes'}
                id="kubernetes"
                label="Kubernetes"
                onClickPinUnpin={onClickPinUnpin}
                onToggle={() => setActive('Kubernetes')}
              />
              <Navigation.Item
                active={active === 'OpenStack'}
                id="openstack"
                label="OpenStack"
                onClickPinUnpin={onClickPinUnpin}
                onToggle={() => setActive('OpenStack')}
              />
            </Navigation.Item>
          </Navigation.Item>
          <Navigation.Item
            categoryIcon={<DataAndAnalyticsCategoryIcon variant="primary" />}
            id="storage"
            label="Storage"
          >
            <Navigation.Item
              active={active === 'Block Storage'}
              id="block-storage"
              label="Block Storage"
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('Block Storage')}
            />
            <Navigation.Item
              active={active === 'Object Storage'}
              badgeSentiment="warning"
              badgeText="beta"
              id="object-storage"
              label="Object Storage"
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('Object Storage')}
            />
          </Navigation.Item>
          <Navigation.Item
            categoryIcon={<NetworkCategoryIcon variant="primary" />}
            id="network"
            label="Network with a very long name"
          >
            <Navigation.Item
              active={active === 'Load Balancer'}
              id="load-balancer"
              label="Load Balancer"
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('Load Balancer')}
            />
            <Navigation.Item
              active={active === 'IP'}
              id="ip"
              label="IP"
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('IP')}
            />
            <Navigation.Item
              active={active === 'VPC'}
              id="vpc"
              label="VPC"
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('VPC')}
            />
          </Navigation.Item>
          <Navigation.Item
            categoryIcon={<DatabaseCategoryIcon variant="primary" />}
            id="database"
            label="Database"
          >
            <Navigation.Item
              active={active === 'Managed Database'}
              id="managed-database"
              label="Managed Database"
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('Managed Database')}
            />
            <Navigation.Item
              active={active === 'Redis'}
              id="redis"
              label="Redis"
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('Redis')}
            />
            <Navigation.Item
              active={active === 'Elasticsearch'}
              id="elasticsearch"
              label="Elasticsearch"
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('Elasticsearch')}
            />
          </Navigation.Item>
          <Navigation.Item
            categoryIcon={<MonitoringCategoryIcon variant="primary" />}
            id="monitoring"
            label="Monitoring"
          >
            <Navigation.Item
              active={active === 'Logs'}
              id="logs"
              label="Logs"
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('Logs')}
            />
            <Navigation.Item
              active={active === 'Metrics'}
              id="metrics"
              label="Metrics"
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('Metrics')}
            />
            <Navigation.Item
              active={active === 'Alerts'}
              id="alerts"
              label="Alerts"
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('Alerts')}
            />
          </Navigation.Item>
          <Navigation.Item
            categoryIcon={<SecurityCategoryIcon variant="primary" />}
            id="security"
            label="Security"
          >
            <Navigation.Item
              active={active === 'Firewall'}
              id="firewall"
              label="Firewall"
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('Firewall')}
            />
            <Navigation.Item
              active={active === 'Certificate'}
              id="certificate"
              label="Certificate"
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('Certificate')}
            />
            <Navigation.Item
              active={active === 'VPN'}
              id="vpn"
              label="VPN"
              onClickPinUnpin={onClickPinUnpin}
              onToggle={() => setActive('VPN')}
            />
          </Navigation.Item>
        </Navigation.Group>
        <Navigation.Separator />
        <Navigation.Item id="quick-links" label="Quick Links" noExpand>
          <Navigation.Item
            active={active === 'Support'}
            id="support"
            label="Support"
            noPinButton
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('Support')}
          />
          <Navigation.Item
            active={active === 'Abuse'}
            id="abuse"
            label="Abuse"
            noPinButton
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('Abuse')}
          />
          <Navigation.Item
            active={active === 'Documentation'}
            badgeSentiment="success"
            badgeText="new"
            href="http://scaleway.com"
            id="documentation"
            label="Documentation"
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('Documentation')}
            target="_blank"
          />
          <Navigation.Item
            active={active === 'Feature Request'}
            href="http://scaleway.com"
            id="feature-request"
            label="Feature Request"
            onClickPinUnpin={onClickPinUnpin}
            onToggle={() => setActive('Feature Request')}
            target="_blank"
          />
        </Navigation.Item>
      </Navigation>
    </NavigationProvider>
  )
}

export { INavigation as Navigation }
