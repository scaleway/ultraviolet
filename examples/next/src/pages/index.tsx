import { emptyLight } from '@ultraviolet/illustrations/various/empty'
import { Card, Stack } from '@ultraviolet/ui'
import Image from 'next/image'
import { Link } from '../components/Link'

const Index = () => (
  <Card header="Examples">
    <Stack direction="column" gap="2">
      <Image alt="emptylight" height="120" src={emptyLight} width="120" />
      <Link href="/simple" sentiment="primary">
        Simple
      </Link>
      <Link href="/login" sentiment="primary">
        login
      </Link>
      <Link href="/advanced" sentiment="primary">
        advanced
      </Link>
    </Stack>
  </Card>
)

export default Index
