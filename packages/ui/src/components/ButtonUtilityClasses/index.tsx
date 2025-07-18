import type { ReactNode } from 'react'
import './styles.css'
// eslint-disable-next-line import/no-relative-packages
import '../../../../themes/public/style/light.css'

type ButtonUtilityClassesProps = {
  children: ReactNode
}

export const ButtonUtilityClasses = ({
  children,
}: ButtonUtilityClassesProps) => (
  <button type="button" className="radius-default color-primary-background">
    {children}
  </button>
)
