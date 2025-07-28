import type { SelectInput } from '@ultraviolet/ui'
import { Badge } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'

export const ubuntuOptions: ComponentProps<typeof SelectInput>['options'] = [
  {
    label: 'Ubuntu 20.04 Focal Fossa',
    value: 'ubuntu-20.04',
  },
  {
    label: 'Ubuntu 18.04 LTS',
    value: 'ubuntu-18.04',
  },
]

export const ubuntuOptionsLegacy: ComponentProps<
  typeof SelectInput
>['options'] = [
  {
    label: 'Ubuntu 20.04 Focal Fossa',
    value: 'ubuntu-20.04',
  },
  {
    label: 'Ubuntu 18.04 LTS',
    value: 'ubuntu-18.04',
    description: 'This version is legacy please choose a higher version.',
    optionalInfo: (
      <Badge sentiment="warning" size="small">
        Legacy
      </Badge>
    ),
  },
]

export const debianOptions: ComponentProps<typeof SelectInput>['options'] = [
  {
    label: 'Debian 10',
    value: 'debian-10',
  },
  {
    label: 'Debian 9',
    value: 'debian-9',
  },
]

export const centosOptions: ComponentProps<typeof SelectInput>['options'] = [
  {
    label: 'CentOS 8',
    value: 'centos-8',
  },
  {
    label: 'CentOS 7',
    value: 'centos-7',
  },
]
