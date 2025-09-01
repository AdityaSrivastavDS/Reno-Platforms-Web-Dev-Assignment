import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-6 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">School Directory Mini Project</h1>
        <p className="text-gray-600">
          Add school details and browse them like an e-commerce grid. Built with Next.js, MySQL, Tailwind and react-hook-form.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link className="btn btn-primary" href="/addSchool">Add a School</Link>
          <Link className="btn border border-gray-300" href="/showSchools">View Schools</Link>
        </div>
      </div>
    </main>
  )
}
