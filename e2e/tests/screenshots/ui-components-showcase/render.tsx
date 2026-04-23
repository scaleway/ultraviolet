import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Chip,
  DateInput,
  Drawer,
  EmptyState,
  ExpandableCard,
  Label,
  Link,
  List,
  Loader,
  Modal,
  Notice,
  NumberInput,
  Pagination,
  ProgressBar,
  Radio,
  RadioGroup,
  Row,
  SearchInput,
  SelectInput,
  Separator,
  Skeleton,
  Slider,
  Stack,
  Status,
  StepList,
  Stepper,
  Table,
  Tabs,
  Tag,
  Text,
  TextArea,
  TextInput,
  TimeInput,
  Toggle,
  Tooltip,
} from '@ultraviolet/ui'
import { useState } from 'react'

const UIComponentsShowcase = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('option1')
  const [toggleChecked, setToggleChecked] = useState(false)
  const [sliderValue, setSliderValue] = useState(50)
  const [selectValue, setSelectValue] = useState('')
  const [textInputValue, setTextInputValue] = useState('')
  const [numberValue, setNumberValue] = useState<number | null>(0)
  const [dateValue, setDateValue] = useState<Date | null>(null)
  const [timeValue, setTimeValue] = useState<Date | null>(null)
  const [activeTab, setActiveTab] = useState('1')
  const [searchValue, setSearchValue] = useState('')
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  return (
    <Stack
      gap={4}
      style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}
    >
      <Text
        as="h1"
        variant="headingLarge"
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        UI Components Showcase
      </Text>

      {/* Basic Components */}
      <Card>
        <Stack gap={2}>
          <Text as="h2" variant="heading">
            Basic Components
          </Text>
          <Row templateColumns="1fr 1fr 1fr" gap={2}>
            <Stack gap={2}>
              <Label>Buttons</Label>
              <Stack direction="row" gap={1}>
                <Button variant="filled">Primary</Button>
                <Button variant="outlined">Secondary</Button>
                <Button variant="ghost">Tertiary</Button>
              </Stack>
            </Stack>

            <Stack gap={2}>
              <Label>Badges & Tags</Label>
              <Stack direction="row" gap={1}>
                <Badge sentiment="primary">Primary</Badge>
                <Badge sentiment="success">Success</Badge>
                <Badge sentiment="warning">Warning</Badge>
                <Badge sentiment="danger">Danger</Badge>
              </Stack>
              <Stack direction="row" gap={1}>
                <Tag>Tag 1</Tag>
                <Tag>Tag 2</Tag>
              </Stack>
            </Stack>

            <Stack gap={2}>
              <Label>Avatars & Status</Label>
              <Stack direction="row" gap={1}>
                <Avatar shape="circle" text="UV" variant="text" />
                <Avatar shape="circle" size="large" text="JD" variant="text" />
              </Stack>
              <Stack direction="row" gap={1}>
                <Status sentiment="success" tooltip="Success" />
                <Status sentiment="danger" tooltip="Error" />
                <Status sentiment="warning" tooltip="Warning" />
              </Stack>
            </Stack>
          </Row>
        </Stack>
      </Card>

      {/* Form Components */}
      <Card>
        <Stack gap={2}>
          <Text as="h2" variant="heading">
            Form Components
          </Text>
          <Row templateColumns="1fr 1fr" gap={2}>
            <Stack gap={2}>
              <Label>Text Inputs</Label>
              <TextInput
                label="Text Input"
                value={textInputValue}
                onChangeValue={setTextInputValue}
                placeholder="Enter text"
              />
              <TextArea
                label="Text Area"
                value={textInputValue}
                onChange={setTextInputValue}
                placeholder="Enter description"
                rows={3}
              />
              <SearchInput
                value={searchValue}
                onChangeValue={setSearchValue}
                onSearch={() => {}}
                placeholder="Search..."
              />
            </Stack>

            <Stack gap={2}>
              <Label>Number & Date Inputs</Label>
              <NumberInput
                label="Number Input"
                value={numberValue}
                onChange={setNumberValue}
              />
              <DateInput
                label="Date Input"
                value={dateValue}
                onChange={setDateValue}
              />
              <TimeInput
                label="Time Input"
                value={timeValue}
                onChange={date => date && setTimeValue(date)}
              />
              <SelectInput
                label="Select"
                value={selectValue}
                onChange={setSelectValue}
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' },
                ]}
                placeholder="Select an option"
              />
            </Stack>
          </Row>
        </Stack>
      </Card>

      {/* Selection Controls */}
      <Card>
        <Stack gap={2}>
          <Text as="h2" variant="heading">
            Selection Controls
          </Text>
          <Row templateColumns="1fr 1fr 1fr 1fr" gap={2}>
            <Stack gap={2}>
              <Label>Checkbox</Label>
              <Checkbox
                checked={checkboxChecked}
                onChange={() => setCheckboxChecked(!checkboxChecked)}
              >
                Checkbox label
              </Checkbox>
            </Stack>

            <Stack gap={2}>
              <Label>Radio Group</Label>
              <RadioGroup
                value={radioValue}
                onChange={e => setRadioValue(e.target.value)}
              >
                <Radio value="option1" label="Option 1" onChange={() => {}} />
                <Radio value="option2" label="Option 2" onChange={() => {}} />
                <Radio value="option3" label="Option 3" onChange={() => {}} />
              </RadioGroup>
            </Stack>

            <Stack gap={2}>
              <Label>Toggle</Label>
              <Toggle
                checked={toggleChecked}
                onChange={() => setToggleChecked(!toggleChecked)}
                label="Toggle"
              />
            </Stack>

            <Stack gap={2}>
              <Label>Slider</Label>
              <Slider
                value={sliderValue}
                onChange={setSliderValue}
                min={0}
                max={100}
                step={1}
              />
            </Stack>
          </Row>
        </Stack>
      </Card>

      {/* Feedback Components */}
      <Card>
        <Stack gap={2}>
          <Text as="h2" variant="heading">
            Feedback & Status
          </Text>
          <Stack gap={2}>
            <Alert sentiment="info">This is an info alert</Alert>
            <Alert sentiment="success">This is a success alert</Alert>
            <Alert sentiment="warning">This is a warning alert</Alert>
            <Alert sentiment="danger">This is an error alert</Alert>
          </Stack>

          <Row templateColumns="1fr 1fr 1fr" gap={2}>
            <Stack gap={2}>
              <Label>Notice</Label>
              <Notice>Notice message</Notice>
            </Stack>

            <Stack gap={2}>
              <Label>Progress & Loaders</Label>
              <ProgressBar value={60} label="Progress" />
              <Stack direction="row" gap={2}>
                <Loader size="small" />
                <Loader size="medium" />
                <Loader size="large" />
              </Stack>
            </Stack>

            <Stack gap={2}>
              <Label>Skeleton</Label>
              <Skeleton variant="blocks" length={1} />
              <Skeleton variant="blocks" length={2} />
              <Skeleton variant="blocks" length={3} />
            </Stack>
          </Row>
        </Stack>
      </Card>

      {/* Navigation & Layout */}
      <Card>
        <Stack gap={2}>
          <Text as="h2" variant="heading">
            Navigation & Layout
          </Text>
          <Stack gap={2}>
            <Tabs
              selected={activeTab}
              onChange={value => setActiveTab(String(value))}
            >
              <Tabs.Tab key="1" label="Tab 1">
                Tab 1 content
              </Tabs.Tab>
              <Tabs.Tab key="2" label="Tab 2">
                Tab 2 content
              </Tabs.Tab>
              <Tabs.Tab key="3" label="Tab 3">
                Tab 3 content
              </Tabs.Tab>
            </Tabs>

            <StepList>
              <StepList.Item sentiment="success">Step 1</StepList.Item>
              <StepList.Item sentiment="primary">Step 2</StepList.Item>
              <StepList.Item sentiment="neutral">Step 3</StepList.Item>
            </StepList>

            <Stepper selected={2}>
              <Stepper.Step title="Step 1" />
              <Stepper.Step title="Step 2" />
              <Stepper.Step title="Step 3" />
            </Stepper>

            <Pagination page={1} pageCount={10} onChange={() => {}} />
          </Stack>
        </Stack>
      </Card>

      {/* Data Display */}
      <Card>
        <Stack gap={2}>
          <Text as="h2" variant="heading">
            Data Display
          </Text>
          <Row templateColumns="1fr 1fr" gap={2}>
            <Stack gap={2}>
              <Label>Table</Label>
              <Table
                columns={[
                  { label: 'Name' },
                  { label: 'Age' },
                  { label: 'Status' },
                ]}
              >
                <Table.Body>
                  <Table.Row id="1">
                    <Table.Cell>John Doe</Table.Cell>
                    <Table.Cell>28</Table.Cell>
                    <Table.Cell>Active</Table.Cell>
                  </Table.Row>
                  <Table.Row id="2">
                    <Table.Cell>Jane Smith</Table.Cell>
                    <Table.Cell>34</Table.Cell>
                    <Table.Cell>Inactive</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Stack>

            <Stack gap={2}>
              <Label>List & Empty State</Label>
              <List columns={[{ label: 'Title' }, { label: 'Description' }]}>
                <List.Row id="1">
                  <List.Cell>Item 1</List.Cell>
                  <List.Cell>Description 1</List.Cell>
                </List.Row>
                <List.Row id="2">
                  <List.Cell>Item 2</List.Cell>
                  <List.Cell>Description 2</List.Cell>
                </List.Row>
                <List.Row id="3">
                  <List.Cell>Item 3</List.Cell>
                  <List.Cell>Description 3</List.Cell>
                </List.Row>
              </List>
              <EmptyState
                title="No data"
                description="There is no data to display"
              >
                <Button variant="filled">Add Item</Button>
              </EmptyState>
            </Stack>
          </Row>
        </Stack>
      </Card>

      {/* Interactive Components */}
      <Card>
        <Stack gap={2}>
          <Text as="h2" variant="heading">
            Interactive Components
          </Text>
          <Row templateColumns="1fr 1fr" gap={2}>
            <Stack gap={2}>
              <Label>Expandable Cards</Label>
              <ExpandableCard
                expanded={expandedCard === '1'}
                onToggleExpand={() =>
                  setExpandedCard(expandedCard === '1' ? null : '1')
                }
                header="Expandable Card 1"
              >
                This is the content of expandable card 1
              </ExpandableCard>
              <ExpandableCard
                expanded={expandedCard === '2'}
                onToggleExpand={() =>
                  setExpandedCard(expandedCard === '2' ? null : '2')
                }
                header="Expandable Card 2"
              >
                This is the content of expandable card 2
              </ExpandableCard>
            </Stack>

            <Stack gap={2}>
              <Label>Chips & Links</Label>
              <Stack direction="row" gap={1}>
                <Chip>Chip 1</Chip>
                <Chip>Chip 2</Chip>
              </Stack>
              <Separator />
              <Link href="#">Click me</Link>
              <Separator />
              <Tooltip text="This is a tooltip">
                <Button variant="outlined">Hover me</Button>
              </Tooltip>
            </Stack>
          </Row>
        </Stack>
      </Card>

      {/* Modals & Overlays */}
      <Card>
        <Stack gap={2}>
          <Text as="h2" variant="heading">
            Modals & Overlays
          </Text>
          <Stack direction="row" gap={2}>
            <Modal disclosure={<Button variant="filled">Open Modal</Button>}>
              <Stack gap={2}>
                <Text as="h3" variant="heading">
                  Modal Title
                </Text>
                <Text as="p" variant="body">
                  This is a modal dialog
                </Text>
                <TextInput label="Name" value="" onChangeValue={() => {}} />
              </Stack>
            </Modal>

            <Drawer
              disclosure={<Button variant="outlined">Open Drawer</Button>}
            >
              <Stack gap={2}>
                <Text as="h3" variant="heading">
                  Drawer Title
                </Text>
                <Text as="p" variant="body">
                  This is a drawer
                </Text>
                <TextInput label="Field" value="" onChangeValue={() => {}} />
              </Stack>
            </Drawer>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  )
}

export default UIComponentsShowcase
