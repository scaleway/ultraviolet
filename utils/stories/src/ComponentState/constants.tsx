import {
  ShieldCheckOutlineIcon,
  SparklesOutlineIcon,
  CancelIcon,
} from '@ultraviolet/icons'
import { Text } from '@ultraviolet/ui'

import type { ReactNode } from 'react'

export type ComponentStatus = {
  label: string
  icon: ReactNode
  description: ReactNode
}

export const COMPONENT_STATES: Record<string, ComponentStatus> = {
  deprecated: {
    icon: <CancelIcon size="medium" sentiment="danger" prominence="strong" />,
    label: 'Deprecated',
    description: (
      <Text as="p" variant="body">
        Deprecated state means the component is not recommended for use and will
        be removed in the future. When seeing a component you use being
        deprecated you should start migrating to another component as soon as
        possible. To know what to use instead you can check the story of the
        deprecated component.
      </Text>
    ),
  },
  experimental: {
    icon: (
      <SparklesOutlineIcon
        size="medium"
        sentiment="success"
        prominence="strong"
      />
    ),
    label: 'Experimental',
    description: (
      <>
        <Text as="p" variant="body">
          Experimental state means the component is being tested and props might
          change in the future. The component itself might even disappear if
          we&apos;t find a real purpose for it. This state is also used for new
          version of a component (ex: Button v2) that we want to test before
          replacing the old one. In any case{' '}
          <Text as="span" variant="bodyStronger">
            this state means the component is not ready for production
          </Text>
          .
        </Text>
        <Text as="p" variant="body">
          An experimental component won&apos;t generate major version when
          having a breaking change.
        </Text>
      </>
    ),
  },
  stable: {
    icon: (
      <ShieldCheckOutlineIcon
        size="medium"
        sentiment="success"
        prominence="strong"
      />
    ),
    label: 'Stable',
    description: (
      <Text as="p" variant="body">
        Stable state means the component is ready for production. If a breaking
        change occurs it will generate a major version.
      </Text>
    ),
  },
}

export const findComponentState = (parameters: {
  deprecated?: boolean
  experimental?: boolean
}) => {
  if (parameters?.deprecated) {
    return COMPONENT_STATES['deprecated']
  }

  if (parameters?.experimental) {
    return COMPONENT_STATES['experimental']
  }

  return COMPONENT_STATES['stable']
}
