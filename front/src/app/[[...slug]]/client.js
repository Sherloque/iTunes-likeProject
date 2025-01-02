'use client'
 
import dynamic from 'next/dynamic'
 
const App = dynamic(() => import('../../../pages/_app'), { ssr: false })
 
export function ClientOnly() {
  return <App />
}