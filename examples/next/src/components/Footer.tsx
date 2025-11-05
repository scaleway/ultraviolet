import { Text } from '@ultraviolet/ui'
import { disclaimerContainer, footer, footerRow } from './componentsStyles.css'
import GithubAndDocumentationButtons from './GithubAndDocumentationButtons'
import Logo from './Logo'

const Footer = () => (
  <footer className={footer}>
    <div className={footerRow}>
      <div>
        <Text as="p" variant="body">
          Hosted in green datacenters in France
        </Text>
        <Text as="p" prominence="weak" variant="bodySmall">
          Our datacenters are designed and built to deliver excellent energy
          efficiency. They offer a low carbon footprint with our guaranteed
          clean energy source. We embrace both disruptive and state-of-the-art
          technologies that reduce our environmental impact.
        </Text>
      </div>
      <div className={disclaimerContainer}>
        <Logo />
        <GithubAndDocumentationButtons />
      </div>
    </div>
  </footer>
)

export default Footer
