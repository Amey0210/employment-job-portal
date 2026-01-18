import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
   
    return (
        <div className='max-w-7xl mx-auto my-20 px-4'>
            {/* Improved Heading: Cleaner typography and indigo accent */}
            <div className='mb-10'>
                <h1 className='text-4xl font-extrabold text-slate-900'>
                    <span className='text-indigo-600'>Latest & Top </span> 
                    Job Openings
                </h1>
                <p className='text-slate-500 mt-2 font-medium'>
                    Discover your next career move from these top-rated opportunities.
                </p>
            </div>

            {/* Improved Grid: Responsive columns and better spacing */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5'>
                {
                    allJobs.length <= 0 ? (
                        <div className='col-span-full text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200'>
                            <span className='text-slate-400 font-medium'>No Jobs Available at the moment. Check back later!</span>
                        </div>
                    ) : (
                        allJobs?.slice(0, 6).map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default LatestJobs