import AnswerBox from '~/components/Content/Lesson/AnswerBox'
import Lesson from './'
import WithActions from '~/lib/with-actions'

export default WithActions((env, props, changeProps) => ({
  onSubmit: async (answer) => {
    if (!answer) {
      throw new Error('Need an answer')
    }

    const { lokkaClient } = env
    const { courseId, lessonId, step } = props
    changeProps({ loading: true })

    const { updatedStep } = await lokkaClient.mutate(`
      {
        updatedStep: submitAnswer(
          courseId: "${courseId}"
          lessonId: "${lessonId}"
          stepId: "${step.id}"
          answer: "${answer}"
        ) {
          ...${AnswerBox.fragment(lokkaClient)}
        }
      }
    `)

    // Update the cache for the updated state
    Lesson.updateCache({ courseId, lessonId }, (item) => {
      const oldStep = item.course.lessons[0].steps.find((s) => s.id === step.id)
      Object.assign(oldStep, updatedStep)

      return item
    })

    // send the updated step to the component
    changeProps({ loading: false })
  }
}))(AnswerBox)
