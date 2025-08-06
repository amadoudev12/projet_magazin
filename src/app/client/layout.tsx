// app/admin/layout.tsx
import Nav from '../components/navBar'
import { ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex">
        <Nav />
        <main className="flex-1 p-4">{children}</main>
        </div>
    )
}
