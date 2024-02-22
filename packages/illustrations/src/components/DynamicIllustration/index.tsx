import { useTheme } from '@emotion/react'
import { ILLUSTRATIONS } from './Illustrations'

type DynamicIllustrationProps = {
  /**
   * Name of the illustration (only illustrations that do have a light and a dark version)
   */
  name: keyof typeof ILLUSTRATIONS.light
  'data-testid'?: string
  className?: string
}
/**
 * DynamicIllustration is a component made to automate the render of illustrations to adapt them to the current theme (dark/light).
 */
export const DynamicIllustration = ({
  name,
  'data-testid': dataTestId,
  className,
}: DynamicIllustrationProps) => {
  const theme = useTheme()

  return (
    <img
      className={className}
      data-testid={dataTestId}
      src={ILLUSTRATIONS[theme.theme === 'light' ? 'light' : 'dark'][name]}
      alt={name}
    />
  )
}
