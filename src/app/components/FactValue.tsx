export function FactValue({ value }: { value: boolean | number }) {
  return value === true ? (
    <span className="text-green-500">Yes</span>
  ) : value === false ? (
    <span className="text-red-500">No</span>
  ) : (
    (value as number).toLocaleString()
  )
}
