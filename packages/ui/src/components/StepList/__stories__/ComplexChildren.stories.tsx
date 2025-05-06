import { CheckIcon } from '@ultraviolet/icons'
import { StepList } from '..'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { Template } from './Template.stories'

export const ComplexChild = Template.bind({})

ComplexChild.decorators = [
  () => (
    <StepList>
      <StepList.Item bulletContent={<CheckIcon />} sentiment="success">
        <Stack gap={1}>
          <Text as="h4" variant="headingSmall">
            Lorem ipsum
          </Text>
          <Text as="p" variant="body">
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum
          </Text>
        </Stack>
      </StepList.Item>
      <StepList.Item bulletContent={<CheckIcon />}>
        <Stack gap={1}>
          <Text as="h4" variant="headingSmall">
            Sed ut perspiciatis
          </Text>
          <Text as="p" variant="body">
            unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
            veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit, sed quia consequuntur
          </Text>
        </Stack>
      </StepList.Item>
    </StepList>
  ),
]
