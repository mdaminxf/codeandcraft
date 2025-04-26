// app/admin/page.tsx
'use server';
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminUI from './AdminUI'
import AdminLoginForm from './AdminLogin';

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return(<AdminLoginForm />); // or render a custom login page
  }
  else
  {
    return <AdminUI />
  }
}
