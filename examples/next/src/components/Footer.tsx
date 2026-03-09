import { Stack, Text } from '@ultraviolet/ui'
import { cn } from '@ultraviolet/utils'
import styles from '../../styles/component.module.scss'
import GithubAndDocumentationButtons from './GithubAndDocumentationButtons'
import Logo from './Logo'

const Footer = ({ className }: { className?: string }) => (
  <footer className={cn(className, styles.footer)}>
    <div>
      <Stack className={styles.footerRow} gap={1}>
        <Text as="p" variant="body">
          Hosted in green datacenters in France
        </Text>
        <Text as="p" prominence="weak" variant="bodySmall">
          Our datacenters are designed and built to deliver excellent energy
          efficiency. They offer a low carbon footprint with our guaranteed
          clean energy source. We embrace both disruptive and state-of-the-art
          technologies that reduce our environmental impact.
        </Text>
      </Stack>
      <Stack className={styles.disclaimerContainer} direction="row" gap="2">
        <Logo />
        <GithubAndDocumentationButtons />
      </Stack>
    </div>
  </footer>
)

export default Footer
