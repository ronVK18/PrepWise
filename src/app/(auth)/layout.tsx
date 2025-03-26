import { isAuthenicated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import React from 'react'

async function layout({children}:{children:React.ReactNode}) {
  const isUserAuthenticated = await isAuthenicated();
    if(isUserAuthenticated){
      redirect('/')
    }
  return (
    <div className='auth-layout'>{children}</div>
  )
}

export default layout