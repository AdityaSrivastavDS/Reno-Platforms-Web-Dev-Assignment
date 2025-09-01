import { getPool } from '/lib/db'
import { IncomingForm } from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

function validate(fields) {
  const errors = {}
  const required = ['name', 'address', 'city', 'state', 'contact', 'email_id']
  for (const key of required) {
    if (!fields[key] || !String(fields[key]).trim()) {
      errors[key] = `${key} is required`
    }
  }
  if (fields.email_id) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!re.test(String(fields.email_id))) errors.email_id = 'Invalid email'
  }
  if (fields.contact) {
    const contactStr = String(fields.contact).replace(/\D/g, '')
    if (contactStr.length < 7 || contactStr.length > 15) errors.contact = 'Invalid contact number'
  }
  return errors
}

async function handlePost(req, res) {
  const uploadDir = path.join(process.cwd(), 'public', 'schoolImages')
  await fs.promises.mkdir(uploadDir, { recursive: true })

  const form = new IncomingForm({
    multiples: false,
    keepExtensions: true,
    uploadDir: uploadDir,
    maxFileSize: 5 * 1024 * 1024,
  })

  form.parse(req, async (err, fields, files) => {
    try {
      if (err) return res.status(400).json({ ok: false, error: String(err) })

      // Convert fields from arrays to strings if needed (formidable may wrap them)
      Object.keys(fields).forEach(k => {
        if (Array.isArray(fields[k])) fields[k] = fields[k][0]
      })

      const errors = validate(fields)
      if (Object.keys(errors).length) {
        return res.status(422).json({ ok: false, errors })
      }

      let imageRelPath = ''
      if (files.image) {
        const file = Array.isArray(files.image) ? files.image[0] : files.image
        const ext = path.extname(file.originalFilename || file.newFilename || '')
        const safeName = `school_${Date.now()}${ext || ''}`
        const dest = path.join(uploadDir, safeName)
        await fs.promises.rename(file.filepath || file._writeStream?.path || file.path, dest)
        imageRelPath = `/schoolImages/${safeName}`
      }

      const pool = getPool()
      await pool.query(
        `INSERT INTO schools (name, address, city, state, contact, image, email_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [fields.name, fields.address, fields.city, fields.state, String(fields.contact), imageRelPath, fields.email_id]
      )

      return res.status(201).json({ ok: true, id: result.insertId, image: imageRelPath })
    } catch (e) {
      console.error(e)
      return res.status(500).json({ ok: false, error: 'Server error' })
    }
  })
}

async function handleGet(req, res) {
  try {
    const pool = getPool()
    const result = await pool.query(
      'SELECT id, name, address, city, image FROM schools ORDER BY id DESC'
    )
    return res.status(200).json({ ok: true, data: result.rows })

    return res.status(200).json({ ok: true, data: rows })
  } catch (e) {
    console.error(e)
    return res.status(500).json({ ok: false, error: 'Server error' })
  }
}

export default async function handler(req, res) {
  if (req.method === 'POST') return handlePost(req, res)
  if (req.method === 'GET') return handleGet(req, res)
  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end('Method Not Allowed')
}
