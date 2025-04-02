/**
 * Provide the icon component for the icon name.
 * This file is automatically generated from /utils/scripts/generate-icons-file.tsx.
 * PLEASE DO NOT EDIT HERE
 */
import { Icon } from '../Icon'
import type { IconProps } from '../Icon'

export const EarthIcon = ({ ...props }: Omit<IconProps, 'children'>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props}>
    {typeof props.size === 'string' &&
    ['medium', 'large', 'xlarge', 'xxlarge'].includes(props.size) ? (
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0m-1.503.204A6.5 6.5 0 1 1 7.95 3.83L6.927 5.62a1.453 1.453 0 0 0 1.91 2.02l.175-.087a.5.5 0 0 1 .224-.053h.146a.5.5 0 0 1 .447.724l-.028.055a.4.4 0 0 1-.357.221h-.502a2.26 2.26 0 0 0-1.88 1.006l-.044.066a2.1 2.1 0 0 0 1.085 3.156.58.58 0 0 1 .397.547v1.05a1.175 1.175 0 0 0 2.093.734l1.611-2.014c.192-.24.296-.536.296-.842 0-.316.128-.624.353-.85a1.36 1.36 0 0 0 .173-1.716l-.464-.696a.369.369 0 0 1 .527-.499l.343.257a1.04 1.04 0 0 0 1.091.098.59.59 0 0 1 .677.11z"
        clipRule="evenodd"
      />
    ) : (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM5.65653 3.02281C3.79099 3.90272 2.5 5.8006 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 7.4168 13.4092 6.8548 13.241 6.32736L12.2942 5.69612C12.1231 5.58208 11.8954 5.60464 11.75 5.75C11.6046 5.89536 11.3769 5.91792 11.2058 5.80388L10.7387 5.49248C10.423 5.28197 10 5.50833 10 5.88783C10 5.9616 10.0172 6.03435 10.0502 6.10033L10.2764 6.55279C10.4234 6.84689 10.5 7.17119 10.5 7.5C10.5 7.82881 10.4234 8.15311 10.2764 8.44721L10.1 8.8C10.0342 8.93153 10 9.07656 10 9.22361V9.33333C10 9.76607 9.85964 10.1871 9.6 10.5333L8.8 11.6C8.61115 11.8518 8.31476 12 8 12C7.44772 12 7 11.5523 7 11V10.618C7 10.2393 6.786 9.893 6.44721 9.72361L6.02492 9.51246C5.39678 9.19839 5 8.55638 5 7.8541C5 6.83011 5.83011 6 6.8541 6H7.56155C7.8037 6 8 5.8037 8 5.56155C8 5.27631 7.73194 5.06702 7.45521 5.1362L6.61996 5.34501C6.23534 5.44116 5.82847 5.32847 5.54813 5.04813C5.2179 4.7179 5.12516 4.2184 5.31483 3.79164L5.65653 3.02281Z"
      />
    )}
  </Icon>
)
