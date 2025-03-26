import { isAuthenicated } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function RootLayout({children}:{children:React.ReactNode}) {
  const isUserAuthenticated = await isAuthenicated();
  if(!isUserAuthenticated){
    redirect('/sign-in')
  }
  return (
    <div className='root-layout'>
      <nav>
        <Link href={'/'} className='flex items-center gap-2'>
        <Image src={'/logo.svg'} alt='logo' width={38} height={38}/>
        <h2 className='text-primary-100' >PrepWise</h2>
        </Link>
      </nav>
      {children}
    </div>
  )
}

export default RootLayout