'use client'
export const dynamic = 'force-dynamic'

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <main style={{ padding: 32 }}>
        <h1>Order Tracker</h1>
        <button onClick={() => signIn('google')}>Sign in with Google</button>
      </main>
    );
  }

  return (
    <main style={{ padding: 32 }}>
      <h1>Order Tracker</h1>
      <p>Welcome, {session.user.name}</p>
      <button onClick={() => signOut()}>Sign out</button>

      <div style={{ marginTop: 32 }}>
        <h3>Amazon — Order #AMZ123456</h3>
        <ul>
          <li>Wireless Mouse — 1Z999AA10123456784 (In Transit)</li>
          <li>USB-C Cable — No tracking yet (Pending)</li>
        </ul>
      </div>
    </main>
  );
}
