import { SortIcon as SortIconUV } from '@ultraviolet/icons/SortIcon'
import { SouthShortIcon } from '@ultraviolet/icons/SouthShortIcon'
import { listStyle } from './styles.css'

export const SortIcon = ({ order }: { order?: 'ascending' | 'descending' }) =>
  order ? (
    <SouthShortIcon className={listStyle.sortIcon[order]} sentiment="primary" />
  ) : (
    <SortIconUV sentiment="neutral" />
  )
