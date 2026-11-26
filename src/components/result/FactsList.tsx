type Fact = { label: string; value: string; sub?: string }

export default function FactsList({ facts }: { facts: Fact[] }) {
  return (
    <dl className="flex flex-col divide-y divide-gray-100 rounded-input bg-gray-0">
      {facts.map(({ label, value, sub }) => (
        <div key={label} className="flex items-center justify-between px-4 py-[10px]">
          <dt className="text-body-m text-gray-600">{label}</dt>
          <dd className="flex items-center gap-1.5">
            <span className="text-title-s text-gray-900">{value}</span>
            {sub && <span className="text-caption-r text-gray-500">{sub}</span>}
          </dd>
        </div>
      ))}
    </dl>
  )
}
