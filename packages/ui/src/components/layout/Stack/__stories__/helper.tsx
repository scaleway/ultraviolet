import { child, firstChild, secondChild, thirdChild } from './styles.css'

export const coloredChildren = [
  <div className={`${child} ${firstChild}`} key="1">
    1
  </div>,
  <div className={`${child} ${secondChild}`} key="2">
    2
  </div>,
  <div className={`${child} ${thirdChild}`} key="3">
    3
  </div>,
]
