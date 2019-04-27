export default function wait(tasks, callback) {
  let tasksFinished = 0
  tasks.forEach(
    (task) => {
      task(
        () => {
          tasksFinished++;
          if (tasksFinished == tasks.length) {
            callback()
          }
        }
      )
    }
  )
}
