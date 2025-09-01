import Link from 'next/link'

export default function ShowSchools({ schools = [] }) {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Schools</h1>
          <Link href="/addSchool" className="btn border border-gray-300">Add School</Link>
        </div>

        {schools.length === 0 ? (
          <div className="text-gray-600">No schools yet. Add one to see it here.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((s) => (
              <article key={s.id} className="card">
                <div className="w-full h-48 bg-gray-100 rounded-xl overflow-hidden">
                  {s.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                </div>
                <div className="mt-3 space-y-1">
                  <h2 className="font-semibold text-lg line-clamp-1">{s.name}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">{s.address}</p>
                  <p className="text-sm text-gray-500">{s.city}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export async function getServerSideProps() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  try {
    const res = await fetch(`${base}/api/schools`)
    const json = await res.json()
    return { props: { schools: json.data || [] } }
  } catch (e) {
    return { props: { schools: [] } }
  }
}
