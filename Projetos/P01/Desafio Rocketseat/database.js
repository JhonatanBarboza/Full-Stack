import { randomUUID } from 'node:crypto'

class Database {
  #tasks = []

  select(search) {
    let tasks = this.#tasks

    if (search) {
      tasks = tasks.filter(task => {
        return Object.entries(search).some(([key, value]) => {
          return task[key]?.toLowerCase().includes(value.toLowerCase())
        })
      })
    }

    return tasks
  }

  insert(task) {
    const taskWithId = {
      id: randomUUID(),
      ...task,
      created_at: new Date(),
      updated_at: new Date(),
      completed_at: null
    }

    this.#tasks.push(taskWithId)

    return taskWithId
  }

  update(id, task) {
    const taskIndex = this.#tasks.findIndex(task => task.id === id)

    if (taskIndex > -1) {
      this.#tasks[taskIndex] = { 
        ...this.#tasks[taskIndex], 
        ...task, 
        updated_at: new Date() 
      }
      return this.#tasks[taskIndex]
    }

    return null
  }

  delete(id) {
    const taskIndex = this.#tasks.findIndex(task => task.id === id)

    if (taskIndex > -1) {
      this.#tasks.splice(taskIndex, 1)
      return true
    }

    return false
  }

  complete(id) {
    const taskIndex = this.#tasks.findIndex(task => task.id === id)

    if (taskIndex > -1) {
      const task = this.#tasks[taskIndex]
      task.completed_at = task.completed_at ? null : new Date()
      task.updated_at = new Date()
      return task
    }

    return null
  }
}

export const database = new Database()