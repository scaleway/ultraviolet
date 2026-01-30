import { CheckIcon } from '@ultraviolet/icons/CheckIcon'
import { Badge } from '../../Badge'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { StepList } from '..'
import { Template } from './Template.stories'

export const ComplexChild = Template.bind({})

ComplexChild.decorators = [
  () => (
    <StepList>
      <StepList.Item bulletContent={<CheckIcon />} sentiment="success">
        <Stack alignItems="center" direction="row" gap={1}>
          <Text as="h4" variant="headingSmall">
            Lorem ipsum
          </Text>
          <Badge sentiment="warning">Beta</Badge>
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
