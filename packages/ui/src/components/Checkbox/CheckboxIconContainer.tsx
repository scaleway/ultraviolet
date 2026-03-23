'use client'

import { useTheme } from '@ultraviolet/themes'

import { checkboxStyle } from './styles.css'

export const CheckboxIconContainer = ({
  checked,
}: {
  checked?: boolean | 'indeterminate'
}) => {
  const theme = useTheme()

  return (
    <g>
      <rect
        className={checkboxStyle.innerCheckbox}
        height="16"
        rx={theme.radii.small}
        strokeWidth="2"
        width="16"
        x="4"
        y="4"
      />
      {checked !== 'indeterminate' ? (
        <path
          className={checkboxStyle.iconPath}
          clipRule="evenodd"
          d="M15.6678 5.26709C16.0849 5.6463 16.113 6.28907 15.7307 6.70276L9.29172 13.6705C9.10291 13.8748 8.83818 13.9937 8.55884 13.9998C8.2795 14.0058 8.0098 13.8984 7.81223 13.7024L4.30004 10.2185C3.89999 9.82169 3.89999 9.17831 4.30004 8.78149C4.70009 8.38467 5.34869 8.38467 5.74874 8.78149L8.50441 11.5149L14.2205 5.32951C14.6028 4.91583 15.2508 4.88788 15.6678 5.26709Z"
          fill="white"
          fillRule="evenodd"
          height={9}
          width={12}
          x="5"
          y="4"
        />
      ) : (
        <rect
          className={checkboxStyle.checkMixedMark}
          height="2"
          rx="1"
          width="12"
          x="6"
          y="11"
        />
      )}
    </g>
  )
}
