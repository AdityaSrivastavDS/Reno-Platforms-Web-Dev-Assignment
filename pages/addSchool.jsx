import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Link from 'next/link'

export default function AddSchool() {
  const { register, handleSubmit, formState:{ errors, isSubmitting }, reset } = useForm()
  const [serverMsg, setServerMsg] = useState(null)

  const onSubmit = async (data) => {
    setServerMsg(null)
    const formData = new FormData()
    for (const key of Object.keys(data)) {
      formData.append(key, data[key])
    }
    if (data.image && data.image[0]) {
      formData.set('image', data.image[0])
    }
    const res = await fetch('/api/schools', { method: 'POST', body: formData })
    const json = await res.json()
    if (json.ok) {
      setServerMsg({ type: 'success', text: 'School added successfully!' })
      reset()
    } else {
      setServerMsg({ type: 'error', text: json.error || 'Please check your inputs.' })
    }
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Add School</h1>
          <Link href="/showSchools" className="btn border border-gray-300">View Schools</Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="card space-y-4" encType="multipart/form-data">
          <div>
            <label className="label">School Name</label>
            <input className="input" placeholder="Springfield Public School" {...register('name', { required: 'Name is required' })} />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="label">Address</label>
            <input className="input" placeholder="123, Main Street" {...register('address', { required: 'Address is required' })} />
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">City</label>
              <input className="input" placeholder="Bangalore" {...register('city', { required: 'City is required' })} />
              {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <label className="label">State</label>
              <input className="input" placeholder="Karnataka" {...register('state', { required: 'State is required' })} />
              {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Contact</label>
              <input className="input" placeholder="9876543210" {...register('contact', { required: 'Contact is required', minLength: { value: 7, message: 'Too short' }, maxLength: { value: 15, message: 'Too long' }, pattern: { value: /^[0-9+\-()\s]+$/, message: 'Invalid characters' } })} />
              {errors.contact && <p className="text-red-600 text-sm mt-1">{errors.contact.message}</p>}
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" placeholder="info@school.com" {...register('email_id', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })} />
              {errors.email_id && <p className="text-red-600 text-sm mt-1">{errors.email_id.message}</p>}
            </div>
          </div>

          <div>
            <label className="label">School Image</label>
            <input className="input" type="file" accept="image/*" {...register('image')} />
            <p className="text-xs text-gray-500 mt-1">Optional. Max 5MB.</p>
          </div>

          <button disabled={isSubmitting} className="btn btn-primary">
            {isSubmitting ? 'Saving...' : 'Save School'}
          </button>

          {serverMsg && (
            <p className={serverMsg.type === 'success' ? 'text-green-700' : 'text-red-600'}>{serverMsg.text}</p>
          )}
        </form>
      </div>
    </main>
  )
}
