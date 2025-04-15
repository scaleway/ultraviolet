import type { ComponentProps } from 'react'
import { Badge } from '../../Badge'
import type { SelectInputV2 } from '../../SelectInputV2'

export const mysqlOptions: ComponentProps<typeof SelectInputV2>['options'] = [
  {
    label: 'MySQL 8.0',
    value: 'mysql-8.0',
  },
  {
    label: 'MySQL 5.7',
    value: 'mysql-5.7',
  },
]

export const postgresqlOptions: ComponentProps<
  typeof SelectInputV2
>['options'] = [
  {
    label: 'PostgreSQL 13',
    value: 'postgresql-13',
  },
  {
    label: 'PostgreSQL 12',
    value: 'postgresql-12',
  },
]

export const ubuntuOptions: ComponentProps<typeof SelectInputV2>['options'] = [
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
  typeof SelectInputV2
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

export const debianOptions: ComponentProps<typeof SelectInputV2>['options'] = [
  {
    label: 'Debian 10',
    value: 'debian-10',
  },
  {
    label: 'Debian 9',
    value: 'debian-9',
  },
]

export const centosOptions: ComponentProps<typeof SelectInputV2>['options'] = [
  {
    label: 'CentOS 8',
    value: 'centos-8',
  },
  {
    label: 'CentOS 7',
    value: 'centos-7',
  },
]
