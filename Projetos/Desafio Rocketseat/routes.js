import { database } from './database.js'
import { buildRoutePath, extractQueryParams } from './utils.js'
import { parse } from 'csv-parse'
import fs from 'node:fs'

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select(search ? {
        title: search,
        description: search,
      } : null)

      return res.end(JSON.stringify(tasks))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      if (!title || !description) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'title and description are required' })
        )
      }

      const task = database.insert({
        title,
        description,
      })

      return res.writeHead(201).end(JSON.stringify(task))
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      if (!title && !description) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'title or description must be provided' })
        )
      }

      const task = database.update(id, {
        title,
        description,
      })

      if (!task) {
        return res.writeHead(404).end(
          JSON.stringify({ message: 'Task not found' })
        )
      }

      return res.end(JSON.stringify(task))
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      const success = database.delete(id)

      if (!success) {
        return res.writeHead(404).end(
          JSON.stringify({ message: 'Task not found' })
        )
      }

      return res.writeHead(204).end()
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const task = database.complete(id)

      if (!task) {
        return res.writeHead(404).end(
          JSON.stringify({ message: 'Task not found' })
        )
      }

      return res.end(JSON.stringify(task))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks/import'),
    handler: (req, res) => {
      const csvPath = './tasks.csv'
      
      if (!fs.existsSync(csvPath)) {
        return res.writeHead(400).end(
          JSON.stringify({ message: 'CSV file not found' })
        )
      }

      const tasks = []
      const parser = fs.createReadStream(csvPath)
        .pipe(parse({
          delimiter: ',',
          columns: true,
          skip_empty_lines: true
        }))

      parser.on('data', (data) => {
        if (data.title && data.description) {
          const task = database.insert({
            title: data.title,
            description: data.description
          })
          tasks.push(task)
        }
      })

      parser.on('end', () => {
        res.end(JSON.stringify({ 
          message: `${tasks.length} tasks imported successfully`,
          tasks 
        }))
      })

      parser.on('error', (err) => {
        res.writeHead(500).end(
          JSON.stringify({ message: 'Error parsing CSV file', error: err.message })
        )
      })
    }
  }
]