'use client'

import { Line } from './Line'
import { skeletonStyle } from './styles.css'

const Item = ({ col = 3 }: { col: number }) => (
  <li className={skeletonStyle.listSkeletonLi}>
    {Array.from({ length: col }, (_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: to fix
      <div
        className={skeletonStyle.listSkeletonDiv}
        key={`skeleton-list-col-${i}`}
      >
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
  <ul className={skeletonStyle.listSkeletonUl}>
    {Array.from({ length }, (_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: to fix
      <Item col={col} key={`skeleton-list-${i}`} />
    ))}
  </ul>
)
