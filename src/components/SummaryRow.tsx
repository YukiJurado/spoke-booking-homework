export function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="summary-row">
      <dt className="summary-row__label">{label}</dt>
      <dd className="summary-row__value">{value}</dd>
    </div>
  )
}
