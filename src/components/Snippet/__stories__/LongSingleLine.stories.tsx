import { Template } from './Template.stories'

export const LongSingleLine = Template.bind({})

LongSingleLine.args = {
  value: `pnpm add @scaleway/ui; pnpm install; pnpm start; pnpm build; pnpm test:unit; pnpm test:visual; pnpm build:storybook;`,
}
