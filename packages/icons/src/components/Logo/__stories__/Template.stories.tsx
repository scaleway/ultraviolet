import type { StoryFn } from '@storybook/react-vite'
import { GoogleLogo } from '../__generated__'

export const Template: StoryFn = ({ ...props }) => <GoogleLogo {...props} />
