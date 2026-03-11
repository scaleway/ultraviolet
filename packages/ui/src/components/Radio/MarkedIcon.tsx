import { radioStyle } from './styles.css'

export const RadioMarkedIcon = () => (
  <g>
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <circle className={radioStyle.innerCircleRing} cx="12" cy="12" r="8" />
    <circle className={radioStyle.mark} cx="12" cy="12" r="5" />
  </g>
)
