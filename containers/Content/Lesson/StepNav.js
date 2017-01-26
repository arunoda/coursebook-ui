import Router from 'next/router'
import StepNav from '../../../components/Content/Lesson/StepNav'
import Lesson from './'
import { GetEnv } from '../../../lib/env'
import * as userActions from '../../../actions/user'
import WithActions from '../../../lib/with-actions'

let StepNavContainer = WithActions((props, changeProps) => ({
  onNext: async (nextStep) => {
    const { lokkaClient, courseId, lessonId } = props
    changeProps({ loading: true })

    // Do the mutation
    if (!nextStep.visited) {
      await lokkaClient.mutate(`
        {
          markVisited(
            courseId: "${courseId}"
            lessonId: "${lessonId}"
            stepId: "${nextStep.id}"
          )
        }
      `)
    }

    // Update the local cache for the changes in the mutation
    Lesson.updateCache({ courseId, lessonId }, (item) => {
      const step = item.course.lessons[0].steps.find((s) => s.id === nextStep.id)
      step.visited = true

      return item
    })

    // Change the route
    changeProps({ loading: false })
    const as = `/${courseId}/${lessonId}/${nextStep.id}`
    const href = `/content?course=${courseId}&lesson=${lessonId}&step=${nextStep.id}`
    Router.push(href, as)
  },

  onPrev: (prevStep) => {
    const { courseId, lessonId } = props
    let as = `/${courseId}/${lessonId}`
    let href = `/content?course=${courseId}&lesson=${lessonId}`

    if (prevStep) {
      as = `${as}/${prevStep.id}`
      href = `${href}&step=${prevStep.id}`
    }

    Router.push(href, as)
  },

  onLogin: () => {
    userActions.login()
  }
}))(StepNav)

StepNavContainer = GetEnv()(StepNavContainer)

export default StepNavContainer
