import type { ComponentPropsWithoutRef } from 'react'

type AppLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  href: string
}

export function isInternalHref(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}

export function AppLink({ href, children, ...props }: AppLinkProps) {
  return (
    <a href={href} data-app-link={isInternalHref(href) ? 'true' : undefined} {...props}>
      {children}
    </a>
  )
}
