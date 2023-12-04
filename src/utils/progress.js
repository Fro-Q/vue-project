import axios from 'axios'

function get_progress(progressList) {
  var progress = {}
  var ifFinished = false
  axios.get(`http://127.0.0.1:8000/api/progress/get_progress/`).then((response) => {
    const description = response.data.progress_description
    var percentage = response.data.progress_percentage
    if (percentage != null) {
      percentage = `${percentage.toFixed(2)}%`
    }
    const ifExist = progressList.some((item) => {
      return item.description == description
    })
    const matchedProgress = progressList.find((item) => {
      return item.description == description
    })
    if (!ifExist) {
      // set every progress in progressList to completed
      progressList.forEach((item) => {
        item.status = 'completed'
      })
      if (description != '完成') {
        progress = {
          description: description,
          percentage: percentage,
          status: 'running'
        }
        progressList.push(progress)
      } else {
        progress = {
          description: description,
          percentage: percentage,
          status: 'completed'
        }
        progressList.push(progress)
        ifFinished = true
      }
    } else if (percentage != null) {
      matchedProgress.percentage = percentage
    }
  })
  return {
    "progressList": progressList,
    "progress": progress,
    "ifFinished": ifFinished
  }
}

export default get_progress