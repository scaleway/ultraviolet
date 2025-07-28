import { Toast, ToastContainer } from '..'

export default {
  component: ToastContainer,
  subcomponents: {
    'Toast.Button': Toast.Button,
    'Toast.Link': Toast.Link,
    ToastContainer,
  },
  title: 'Components/Feedback/Toaster',
}

export { ComplexChildren } from './ComplexChildren.stories'
export { ContainerId } from './ContainerId.stories'
export { Playground } from './Playground.stories'
export { Sentiments } from './Sentiments.stories'
