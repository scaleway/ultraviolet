import { Text } from '../../Text'

type DialogTextProps = {
  children: React.ReactNode
}

export const DialogText = ({ children }: DialogTextProps) => (
  <Text as="p" variant="body" sentiment="neutral">
    {children}
  </Text>
)
