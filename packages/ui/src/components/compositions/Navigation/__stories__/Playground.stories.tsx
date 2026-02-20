import type { StoryFn } from '@storybook/react-vite'
import { InformationIcon } from '@ultraviolet/icons/InformationIcon'
import { BaremetalCategoryIcon } from '@ultraviolet/icons/category/BaremetalCategoryIcon'
import { DataAndAnalyticsCategoryIcon } from '@ultraviolet/icons/category/DataAndAnalyticsCategoryIcon'
import { DatabaseCategoryIcon } from '@ultraviolet/icons/category/DatabaseCategoryIcon'
import { MonitoringCategoryIcon } from '@ultraviolet/icons/category/MonitoringCategoryIcon'
import { NetworkCategoryIcon } from '@ultraviolet/icons/category/NetworkCategoryIcon'
import { OrganizationDashboardCategoryIcon } from '@ultraviolet/icons/category/OrganizationDashboardCategoryIcon'
import { SecurityCategoryIcon } from '@ultraviolet/icons/category/SecurityCategoryIcon'
import { UseCaseCategoryIcon } from '@ultraviolet/icons/category/UseCaseCategoryIcon'
import type { ComponentProps } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Navigation, NavigationProvider, useNavigation } from '..'
import logo from './assets/logo.svg'
import logoSmall from './assets/logo-small.svg'
import { animation } from './styles.css'
import { Stack } from '../../../Stack'
import { Tooltip } from '../../../Tooltip'

const onClickPinUnpin: ComponentProps<
  typeof Navigation.Item
>['onClickPinUnpin'] = ({ totalPinned }) => {
  // oxlint-disable-next-line eslint/no-console
  console.log('total pinned items:', totalPinned)
}

const PlaygroundContent = ({ ...props }: ComponentProps<typeof Navigation>) => {
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
    <Navigation
      logo={
        <a
          aria-label="logo"
          href="https://scaleway.com"
          rel="noreferrer"
          target="_blank"
        >
          <Stack direction="row" gap={1}>
            <img alt="" height="22px" src={logoSmall} width="auto" />
            <img
              alt=""
              className={animation}
              data-expanded={expanded}
              height="22px"
              src={logo}
              width="auto"
            />
          </Stack>
        </a>
      }
      onToggleExpand={saveExpandedInLocalStorage}
      onWidthResize={saveWidthInLocalStorage}
      {...props}
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
              <InformationIcon />
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
  )
}

export const Playground: StoryFn<ComponentProps<typeof Navigation>> = props => {
  const navigationExpanded = localStorage.getItem('expanded') === 'true'
  const navigationWidth = Number(localStorage.getItem('width')) || undefined
  const storageItems = localStorage.getItem('pinnedItems')
  const pinnedItems = storageItems ? storageItems.split(',') : []

  return (
    <div
      style={{
        background: '#f1f1f1',
        display: 'flex',
        height: '800px',
        margin: '-10px 0', // This is to compensate the border added by storybook around the story
      }}
    >
      <NavigationProvider
        initialExpanded={navigationExpanded}
        initialPinned={pinnedItems}
        initialWidth={navigationWidth}
        pinLimit={2}
        pinnedFeature
      >
        <PlaygroundContent {...props} />
      </NavigationProvider>
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flex: '1',
          flexDirection: 'column',
          gap: '16px',
          overflowY: 'scroll',
          padding: '16px',
        }}
      >
        <img
          alt="logo"
          height="256px"
          src="https://via.placeholder.com/256"
          width="256px"
        />
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor
          aliquam dui, a laoreet ante faucibus a. In accumsan pharetra dui, a
          lobortis eros suscipit ut. In dapibus quam et massa commodo tincidunt.
          Cras bibendum pharetra ultricies. Sed eget vulputate dui. Morbi nisi
          ipsum, gravida at tristique eu, varius ut nibh. Curabitur non odio
          neque. Curabitur in ante non risus malesuada tempus. Maecenas vel
          ipsum justo. Sed sed nulla eu diam vestibulum molestie vitae nec
          risus. Cras volutpat sollicitudin est in blandit. Proin non sem non
          dolor vulputate faucibus quis pulvinar justo. In porta quis risus
          luctus volutpat. Quisque sagittis aliquam justo, vitae ultrices eros.
          Sed ac arcu ligula. Pellentesque condimentum mattis lacus ut dapibus.
          Nam in sapien eros. Phasellus sagittis ipsum congue augue porta
          placerat. Maecenas quis egestas mauris, non eleifend elit. In turpis
          risus, ultrices ut sem a, auctor lobortis nisi. In molestie porttitor
          commodo. Pellentesque eu convallis nunc. Cras vel ipsum odio. Mauris
          faucibus ac nunc eget vehicula. Quisque at eros aliquam, pretium lacus
          eu, volutpat ligula. Fusce fringilla dolor non pulvinar accumsan.
          Curabitur ullamcorper purus neque, fringilla sollicitudin urna tempus
          quis. Etiam sagittis, purus et venenatis sodales, sapien ipsum
          vestibulum nisl, ut laoreet dolor diam nec erat. Donec ullamcorper
          ante non dolor lobortis, quis lacinia ante ultrices. Pellentesque quis
          condimentum arcu. Nulla ac fringilla eros. Nam at leo at lorem
          sagittis auctor. Suspendisse fringilla pulvinar efficitur. Suspendisse
          non eleifend enim. Pellentesque sit amet lectus vitae enim luctus
          feugiat. Pellentesque porttitor augue at dui placerat congue sed at
          quam. Praesent imperdiet augue urna. Proin a ligula vitae enim
          venenatis ultricies ac vel sapien. Ut dolor massa, vulputate commodo
          accumsan quis, dapibus et purus. Suspendisse at purus massa. Nunc et
          ante at felis pharetra laoreet vel et lectus. Integer euismod urna
          eget mollis commodo. Phasellus blandit mauris sed fermentum accumsan.
          Curabitur eros felis, rutrum vitae dolor sed, efficitur laoreet est.
          Pellentesque blandit eros sed pellentesque vestibulum. Suspendisse nec
          magna diam. Suspendisse feugiat nisi ut augue condimentum, sed
          ullamcorper mauris porta. Sed porttitor libero in condimentum
          scelerisque. Vestibulum ut felis maximus, mollis ante vitae, consequat
          ante. Vivamus ac lacinia arcu, eget fermentum lectus. Vivamus gravida
          sodales metus a facilisis. Nam condimentum massa ut magna sagittis,
          quis varius augue sagittis. Aenean vitae ipsum ac lectus consequat
          convallis ut nec augue. Donec orci tortor, tincidunt rutrum cursus
          non, blandit sed quam. Nunc pulvinar euismod ultrices. Curabitur non
          arcu sed augue faucibus aliquet vitae vitae odio. Cras tincidunt eget
          mi quis rhoncus. Curabitur eleifend pharetra tincidunt. Cras quis
          tortor pellentesque, porttitor massa eget, mattis felis. Nulla aliquet
          sodales tortor sit amet accumsan. Sed vitae interdum ipsum. Sed ut
          volutpat nunc. Praesent aliquam ipsum ex, ac interdum odio vestibulum
          dictum. Suspendisse neque quam, rhoncus aliquam diam eu, finibus
          fringilla metus. Aliquam tristique enim arcu, non dapibus augue
          volutpat eu. Integer ut sollicitudin nulla. Integer et est rutrum,
          placerat orci in, fermentum neque. Sed facilisis nulla a orci finibus
          tempus. Duis consectetur nisi nisl, ut eleifend libero facilisis a.
          Nam quis neque lacus. Morbi a risus vestibulum, varius ex nec, varius
          purus. In non quam risus. Mauris finibus justo erat, sed laoreet sem
          luctus a. In cursus augue id eros ultricies, a pulvinar turpis
          lobortis. Donec malesuada pellentesque venenatis. Nullam semper metus
          at ligula venenatis egestas. Aenean metus nisl, sodales eget
          condimentum sit amet, ullamcorper a nunc. Nullam pulvinar ornare
          turpis a cursus. Ut egestas, nunc eu tempor sollicitudin, eros est
          porttitor magna, vel lobortis quam est in felis. Nam sed sem est.
          Morbi congue egestas felis, eu auctor ex. Integer non diam eu nibh
          congue malesuada. Suspendisse ullamcorper nec odio in eleifend. Nullam
          vehicula, risus quis sodales semper, diam risus ornare odio, ac
          consectetur nisi orci at arcu. Aliquam vulputate nulla non urna
          venenatis aliquet. Aenean tincidunt purus nisi, sit amet semper orci
          lobortis non. Phasellus turpis dolor, rhoncus id pretium eget, auctor
          sed lacus. Cras rutrum urna bibendum augue feugiat tempus. Quisque
          iaculis sapien tellus, consequat semper felis consectetur ac.
          Suspendisse tristique orci pretium, venenatis ante et, venenatis
          risus. Phasellus scelerisque, nisi quis egestas ultrices, arcu libero
          fringilla libero, ut molestie arcu turpis sed leo. Nullam finibus
          libero tristique neque eleifend hendrerit. Praesent non molestie
          libero, sit amet dapibus est. In congue ac nibh id sodales. Mauris
          aliquet ante sit amet est varius congue quis vitae elit. In lectus ex,
          malesuada quis eros eu, gravida ullamcorper lorem. Aliquam porttitor
          odio condimentum nisi pellentesque ullamcorper quis vitae mauris.
          Pellentesque et tortor sem. Duis suscipit orci massa. Duis a tellus
          vitae nunc semper eleifend. Pellentesque venenatis maximus tellus in
          bibendum. Ut risus justo, viverra id lacinia quis, egestas at augue.
          Nulla dolor odio, malesuada nec posuere sed, molestie vitae quam.
          Suspendisse at augue augue.
        </div>
      </div>
    </div>
  )
}
