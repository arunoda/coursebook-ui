import AnswerBox from '~/components/Content/Lesson/AnswerBox'
import Lesson from './'
import Header from '~/containers/Header'
import WithActions from '~/lib/with-actions'

export default WithActions((env, props, changeProps) => ({
  onSubmit: async (answer) => {
    if (!answer) {
      throw new Error('Need an answer')
    }

    const { lokkaClient } = env
    const { courseId, lessonId, step } = props
    changeProps({ loading: true })

    let updatedStep;

    try {
      const result = await lokkaClient.mutate(`
        {
          updatedStep: submitAnswer(
            courseId: "${courseId}"
            lessonId: "${lessonId}"
            stepId: "${step.id}"
            answer: "${answer}"
          ) {
            ...${AnswerBox.fragment(lokkaClient)},
            points
          }
        }
      `)
      updatedStep = result.updatedStep
    } catch(error) {
      changeProps({ loading: false, error })
      return
    }

    // Update the cache for the updated state
    Lesson.updateCache({ courseId, lessonId }, (item) => {
      const oldStep = item.course.lessons[0].steps.find((s) => s.id === step.id)
      Object.assign(oldStep, updatedStep)

      return item
    })

    // Update the cache for the points
    if (updatedStep.correctAnswer === answer) {
      Header.updateCache({}, (item) => {
        item.user.points += updatedStep.points
        return item
      })
    }

    // send the updated step to the component
    changeProps({ loading: false })
  }
}))(AnswerBox)
