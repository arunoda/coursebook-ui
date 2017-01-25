import Router from 'next/router'
import StepNav from '../../../components/Content/Lesson/StepNav'
import Lesson from './'
import { WithEnv } from '../../../lib/env'
const WithActions = (C) => () => C

let StepNavContainer = WithActions((props, changeProps) => ({
  onNext: async (href, as) => {
    const { lokkaClient } = props
    changeProps({ loading: true })

    // Do the mutation
    await lokkaClient.mutate('..')

    // Update the local cache for the changes in the mutation
    const { courseId, lessonId, stepId } = props
    Lesson.updateCache({ courseId, lessonId }, (item) => {
      const step = item.lessons[0].steps.find((s) => s.id === stepId)
      step.visited = true

      return item
    })

    // Change the route
    changeProps({ loading: false })
    Router.push(href, as)
  },

  onPrev: (href, as) => Router.push(href, as)
}))(StepNav)

StepNavContainer = WithEnv(StepNavContainer)

export default StepNavContainer
