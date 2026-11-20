import { radioStyle } from './styles.css'

// Outer circle fills the icon box, the ring is 2px and the dot is half the size.
const SIZES = {
  medium: { center: 10, outer: 10, inner: 8, mark: 5 },
  small: { center: 8, outer: 8, inner: 6, mark: 4 },
}

export const RadioMarkedIcon = ({ size }: { size: 'small' | 'medium' }) => {
  const { center, outer, inner, mark } = SIZES[size]

  return (
    <g>
      <circle cx={center} cy={center} r={outer} />
      <circle className={radioStyle.innerCircleRing} cx={center} cy={center} r={inner} />
      <circle className={radioStyle.mark} cx={center} cy={center} r={mark} />
    </g>
  )
}
