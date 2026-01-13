'use client'

import { Line } from './Line'
import {
  listSkeletonDiv,
  listSkeletonLi,
  listSkeletonUl,
} from './stylesVariants.css'

const Item = ({ col = 3 }: { col: number }) => (
  <li className={listSkeletonLi}>
    {Array.from({ length: col }, (_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: to fix
      <div className={listSkeletonDiv} key={`skeleton-list-col-${i}`}>
        <Line />
      </div>
    ))}
  </li>
)

export const List = ({
  length = 3,
  col = 3,
}: {
  length?: number
  col?: number
}) => (
  <ul className={listSkeletonUl}>
    {Array.from({ length }, (_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: to fix
      <Item col={col} key={`skeleton-list-${i}`} />
    ))}
  </ul>
)
