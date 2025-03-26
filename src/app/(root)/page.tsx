import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import { getCurrentUser, getInterviewsByUserId, getLatestInterviews } from '@/lib/actions/auth.action'
import Image from 'next/image'
import Link from 'next/link'
import React, { use } from 'react'

async function HomePage() {
  const user=await getCurrentUser();
  const id=user?.id;
  const [userInterviews, allInterview] = await Promise.all([
    getInterviewsByUserId(id),
    getLatestInterviews({ userId: id }),
  ]);
  console.log(allInterview)
  const hasPastInterviews = userInterviews.length! > 0;
  const hasUpcomingInterviews = allInterview.length! > 0;
  return (
    <>
      <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
          <h2>Get Interview-Ready with AI-Powered Practice & FeedBack</h2>
          <p className='text-lg'>
            Practice on real interview questions & get instant feedback 
          </p>
          <Button asChild className="btn-primary">
            <Link href={'/interview'}>Start an Interview</Link>
          </Button>
        </div>
        <Image src='/robot.png' alt='robot-dude' width={400} height={400} className='max-sm:hidden'/>
      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Your Interviews</h2>
        <div className='interviews-section'>

          {hasPastInterviews?
          userInterviews?.map((interview:Interview)=>(
            <InterviewCard key={interview.id} { ... interview}/>
          )) : <p>You haven&apos;t taken any interviews yet</p>}
        </div>
      </section>
      <section className='flex flex-col gap-6 mt-8'>
        <h2>Take an interview</h2>
        <div className='interviews-section'>
        {hasUpcomingInterviews?
          allInterview?.map((interview:Interview)=>(
            <InterviewCard key={interview.id} { ... interview}/>
          )) : <p>There are no interviews available</p>}
        </div>
      </section>
    </>
  )
}

export default HomePage