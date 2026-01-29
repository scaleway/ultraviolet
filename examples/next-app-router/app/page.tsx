import { Alert, Button, Stack, Text } from '@ultraviolet/ui'

export default function Home() {
  return (
    <main>
      <Stack gap={2}>
        <Text as="h1" variant="heading">
          Welcome to Ultraviolet!
        </Text>
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
