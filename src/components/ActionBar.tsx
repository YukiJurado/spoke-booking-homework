import { Button } from './Button'

type ActionBarProps = { label: string; form?: string; disabled?: boolean; onClick?: () => void }

export function ActionBar({ label, form, disabled, onClick }: ActionBarProps) {
  return (
    <footer className="action-bar">
      <Button label={label} type={form ? 'submit' : 'button'} form={form} disabled={disabled} onClick={onClick ? event => { event.preventDefault(); onClick() } : undefined} />
    </footer>
  )
}
