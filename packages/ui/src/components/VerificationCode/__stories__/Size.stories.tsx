import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../..'
import { VerificationCode, verificationCodeSizes } from '..'

export const Size: StoryFn<typeof VerificationCode> = args => (
  <Stack direction="column" gap={2}>
    {verificationCodeSizes.map(size => (
      <VerificationCode
        {...args}
        fields={4}
        initialValue="1"
        key={size}
        label={size}
        size={size}
      />
    ))}
  </Stack>
)

Size.parameters = {
  docs: {
    description: { story: 'use `size` prop to change the size of the input' },
  },
}
