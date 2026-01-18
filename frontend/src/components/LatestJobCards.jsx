import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group'
        >
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-indigo-600 text-sm uppercase tracking-wider'>{job?.company?.name}</h1>
                    <p className='text-xs text-slate-400 font-medium'>India • Just Now</p>
                </div>
                {/* Visual placeholder for a logo or icon */}
                <div className='h-10 w-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-indigo-50 transition-colors'>
                    <span className='text-indigo-600 font-bold'>{job?.company?.name?.charAt(0)}</span>
                </div>
            </div>

            <div className='my-4'>
                <h1 className='font-extrabold text-slate-800 text-xl group-hover:text-indigo-600 transition-colors'>
                    {job?.title}
                </h1>
                <p className='text-sm text-slate-500 line-clamp-2 mt-1 leading-relaxed'>
                    {job?.description}
                </p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className='bg-indigo-50 text-indigo-700 border-none hover:bg-indigo-100 transition-colors' variant="outline">
                    {job?.position} Positions
                </Badge>
                <Badge className='bg-emerald-50 text-emerald-700 border-none hover:bg-emerald-100 transition-colors' variant="outline">
                    {job?.jobType}
                </Badge>
                <Badge className='bg-amber-50 text-amber-700 border-none hover:bg-amber-100 transition-colors' variant="outline">
                    {job?.salary} LPA
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards