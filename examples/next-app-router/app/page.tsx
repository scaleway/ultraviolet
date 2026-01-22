import { AbuseProductIcon } from '@ultraviolet/icons/product/AbuseProductIcon'
import { Alert, Button, Stack, Text, Link as UVLink } from '@ultraviolet/ui'
import '@ultraviolet/fonts/fonts.css'
import '@ultraviolet/ui/styles'
import '@ultraviolet/themes/global'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <Stack gap={2}>
        <Text as="h1" variant="heading">
          Welcome to Ultraviolet! <AbuseProductIcon />
        </Text>

        {/* render prop test section */}
        <Alert sentiment="info" title="Testing render prop">
          <Stack direction="column" gap={2} width="100%">
            <Text as="p" variant="body">
              Testing the new{' '}
              <Text as="code" variant="code">
                render
              </Text>{' '}
              prop with Next.js Link:
            </Text>
            <Stack alignItems="center" direction="row" gap={2}>
              <UVLink render={<Link href="/" />} sentiment="primary">
                UV Link (element form)
              </UVLink>
              <UVLink render={<Link href="/" />} sentiment="info" size="small">
                UV Link (small)
              </UVLink>
            </Stack>
            <Stack alignItems="center" direction="row" gap={2}>
              <Button render={<Link href="/" />} variant="filled">
                Button (filled)
              </Button>
              <Button render={<Link href="/" />} variant="outlined">
                Button (outlined)
              </Button>
              <Button render={<Link href="/" />} variant="ghost">
                Button (ghost)
              </Button>
            </Stack>
          </Stack>
        </Alert>
        <Text as="p" variant="body">
          Ultraviolet is a powerful and flexible UI library for building modern
          web applications.
        </Text>
        <Text as="p" variant="body">
          Ultraviolet works with Next.js app router by providing{' '}
          <Text as="code" variant="code">
            {'<ThemeRegistry />'}
          </Text>
          .
        </Text>
        <Text as="p" variant="body">
          All components will work seamlessly with Next.js app router.
        </Text>
        <Alert sentiment="warning" title="Known limitations">
          <Stack direction="column" width="100%">
            <ul>
              <Text as="li" variant="body">
                Components are not server component ready they all have{' '}
                <Text as="code" variant="code">
                  &quot;use client&quot;
                </Text>{' '}
                on top.
              </Text>
              <Text as="li" variant="body">
                When using{' '}
                <Text as="code" variant="code">
                  styled
                </Text>{' '}
                from{' '}
                <Text as="code" variant="code">
                  emotion/styled
                </Text>{' '}
                will require you to add{' '}
                <Text as="code" variant="code">
                  &quot;use client&quot;
                </Text>{' '}
                on top of your component file.
              </Text>
            </ul>
          </Stack>
        </Alert>
        <Button>Button</Button>
      </Stack>
    </main>
  )
}
