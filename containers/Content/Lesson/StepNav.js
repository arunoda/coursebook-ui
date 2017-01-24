import Router from 'next/router'
import StepNav from '../../../components/Content/Lesson/StepNav'
import Lesson from './'
import { WithEnv } from '../../../lib/env'
const WithActions = (C) => () => C

let StepNavContainer = WithActions((onData) => ({
  onNext: async (props, href, as) => {
    const { lokkaClient } = props
    onData(null, { loading: true })

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
    onData(null, { loading: false })
    Router.push(href, as)
  },

  onPrev: (props, href, as) => Router.push(href, as)
}))(StepNav)

StepNavContainer = WithEnv(StepNavContainer)

export default StepNavContainer
