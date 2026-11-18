'use client'

import { theme } from '@ultraviolet/themes'
import { checkboxStyle } from './styles.css'

// Each svg is exactly the size of the visible square; the 24x24 click area lives in the wrapper.
const SIZES = {
  default: {
    size: 20,
    path: 'M15.9661 5.018C16.4052 5.4172 16.4347 6.0938 16.0323 6.5292L9.2544 13.8637C9.0557 14.0787 8.7771 14.2039 8.4829 14.2103C8.1889 14.2166 7.9051 14.1036 7.6971 13.8973L4 10.23C3.5789 9.8123 3.5789 9.1351 4 8.7174C4.4211 8.2997 5.1039 8.2997 5.525 8.7174L8.4257 11.5946L14.4426 5.0837C14.8451 4.6482 15.5272 4.6188 15.9661 5.018Z',
    dash: 'M15 9H5C4.447 9 4 9.448 4 10C4 10.552 4.447 11 5 11H15C15.553 11 16 10.552 16 10C16 9.448 15.553 9 15 9',
  },
  small: {
    size: 16,
    path: 'M12.8367 3.9612C13.1926 4.2848 13.2166 4.8333 12.8905 5.1864L7.3958 11.1322C7.2347 11.3065 7.0087 11.408 6.7705 11.4131C6.5321 11.4182 6.3019 11.3266 6.1333 11.1594L3.1362 8.1865C2.7949 7.8479 2.7949 7.2989 3.1362 6.9602C3.4776 6.6215 4.0311 6.6215 4.3725 6.9602L6.7239 9.2927L11.6017 4.0145C11.9279 3.6615 12.4809 3.6377 12.8367 3.9612Z',
    dash: 'M12.0002 7.2002H4.0002C3.5578 7.2002 3.2002 7.5586 3.2002 8.0002C3.2002 8.4418 3.5578 8.8002 4.0002 8.8002H12.0002C12.4426 8.8002 12.8002 8.4418 12.8002 8.0002C12.8002 7.5586 12.4426 7.2002 12.0002 7.2002',
  },
}

export const CheckboxIconContainer = ({
  checked,
  size,
}: {
  checked?: boolean | 'indeterminate'
  size: 'default' | 'small'
}) => {
  const { size: boxSize, path, dash } = SIZES[size]
  const strokeWidth = 2

  return (
    <g>
      <rect
        className={checkboxStyle.innerCheckbox}
        // the stroke is *centered* on the edge of the rect, so we adjust the position, size and radius
        // to render it as if it were on the *inside* of the rect.
        rx={`calc(${theme.radii.default} - ${strokeWidth / 2}px)`}
        height={boxSize - strokeWidth}
        width={boxSize - strokeWidth}
        strokeWidth={strokeWidth}
        x={strokeWidth / 2}
        y={strokeWidth / 2}
      />
      {checked === 'indeterminate' ? (
        <path className={checkboxStyle.checkMixedMark} clipRule="evenodd" d={dash} fillRule="evenodd" />
      ) : (
        <path className={checkboxStyle.iconPath} clipRule="evenodd" d={path} fillRule="evenodd" />
      )}
    </g>
  )
}
