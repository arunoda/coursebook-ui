import Router from 'next/router'
import StepNav from '~/components/Content/Lesson/StepNav'
import Lesson from './'
import Header from '~/containers/Header'
import * as userActions from '~/actions/user'
import WithActions from '~/lib/with-actions'

export default WithActions((env, props, changeProps) => ({
  onNext: async (nextStep) => {
    const { lokkaClient } = env
    const { courseId, lessonId } = props
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

      // Update the local cache for the changes in the mutation
      Lesson.updateCache({ courseId, lessonId }, (item) => {
        const step = item.course.lessons[0].steps.find((s) => s.id === nextStep.id)
        step.visited = true

        return item
      })

      // Update the local cache for points
      Header.updateCache({}, (item) => {
        if (nextStep.type === 'text') {
          item.user.points += nextStep.points
        }

        return item
      })
    }

    // Change the route
    changeProps({ loading: false })
    const as = `/${courseId}/${lessonId}/${nextStep.id}`
    const href = `/content?course=${courseId}&lesson=${lessonId}&step=${nextStep.id}`
    await changeRoute(href, as)
  },

  onPrev: async (prevStep) => {
    const { courseId, lessonId } = props
    let as = `/${courseId}/${lessonId}`
    let href = `/content?course=${courseId}&lesson=${lessonId}`

    if (prevStep) {
      as = `${as}/${prevStep.id}`
      href = `${href}&step=${prevStep.id}`
    }

    await changeRoute(href, as)
  },

  onLogin: () => {
    userActions.login()
  }
}))(StepNav)

async function changeRoute(href, as) {
  await Router.push(href, as)
  window.scrollTo(0, 0)
}
