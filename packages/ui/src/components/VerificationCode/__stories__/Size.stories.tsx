import type { StoryFn } from '@storybook/react-vite'
import { VerificationCode, verificationCodeSizes } from '..'
import { Stack } from '../..'

export const Size: StoryFn<typeof VerificationCode> = args => (
  <Stack gap={2} direction="column">
    {verificationCodeSizes.map(size => (
      <VerificationCode
        {...args}
        key={size}
        size={size}
        fields={4}
        label={size}
        initialValue="1"
      />
    ))}
  </Stack>
)

Size.parameters = {
  docs: {
    description: { story: 'use `size` prop to change the size of the input' },
  },
}
