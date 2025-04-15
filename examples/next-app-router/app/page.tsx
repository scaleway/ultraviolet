import { Button, styled } from '@ultraviolet/ui'
import styles from './page.module.css'

const StyledButton = styled(Button)`
  background-color: #0070f3;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
`

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <StyledButton>Click Me</StyledButton>
      </main>
    </div>
  )
}
