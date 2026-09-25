'use client'

import { Line } from './Line'
import { skeletonStyle } from './styles.css'

export const List = ({ length = 3, col = 3 }: { length?: number; col?: number }) => (
  <ul className={skeletonStyle.listSkeletonUl}>
    {Array.from({ length }, (_li, i) => (
      <li className={skeletonStyle.listSkeletonLi} key={`skeleton-list-${i}`}>
        {Array.from({ length: col }, (_div, colIndex) => (
          <div className={skeletonStyle.listSkeletonDiv} key={`skeleton-list-col-${colIndex}`}>
            <Line />
          </div>
        ))}
      </li>
    ))}
  </ul>
)
