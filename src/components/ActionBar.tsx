import { Button } from './Button'

type ActionBarProps = { label: string; form: string; disabled?: boolean }

export function ActionBar({ label, form, disabled }: ActionBarProps) {
  return (
    <footer className="action-bar">
      <Button label={label} type="submit" form={form} disabled={disabled} />
    </footer>
  )
}
