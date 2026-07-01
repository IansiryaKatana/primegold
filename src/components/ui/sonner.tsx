import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    theme="light"
    className="toaster group"
    toastOptions={{
      classNames: {
        toast:
          'group toast group-[.toaster]:bg-white group-[.toaster]:text-primary-text group-[.toaster]:border-warm-border group-[.toaster]:shadow-lg',
        description: 'group-[.toast]:text-muted-text',
        actionButton: 'group-[.toast]:bg-emerald-deep group-[.toast]:text-white',
        cancelButton: 'group-[.toast]:bg-cream group-[.toast]:text-primary-text',
      },
    }}
    {...props}
  />
)

export { Toaster }
