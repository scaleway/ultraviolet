import { radioStyle } from './styles.css'

export const RadioMarkedIcon = ({ size = 'medium' }: { size: 'small' | 'medium' }) => (
  <g>
    <circle className={radioStyle.focusRing} cx="12" cy="12" r={size === 'medium' ? '10' : '8'} strokeWidth="6" />
    <circle cx="12" cy="12" r={size === 'medium' ? '10' : '8'} strokeWidth="2" />
    <circle className={radioStyle.innerCircleRing} cx="12" cy="12" r={size === 'medium' ? '8' : '6'} />
    <circle className={radioStyle.mark} cx="12" cy="12" r={size === 'medium' ? '5' : '4'} />
  </g>
)
