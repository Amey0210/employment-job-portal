import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, Sparkles } from 'lucide-react' // Added Sparkles for a premium look
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center py-16 md:py-24 px-4'>
            <div className='flex flex-col gap-6 max-w-4xl mx-auto'>
                {/* Modernized Badge */}
                <div className='flex items-center gap-2 mx-auto px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold text-sm animate-fade-in'>
                    <Sparkles size={16} />
                    <span>Your career journey starts here</span>
                </div>

                {/* Better Typography and Real Marketing Copy */}
                <h1 className='text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900'>
                    Search, Apply & <br /> 
                    <span className='text-indigo-600 leading-tight'>Land Your Career.</span>
                </h1>

                <p className='text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed'>
                    Connect with top-tier companies and find opportunities that match your passion. 
                    Your professional future is just one search away.
                </p>

                {/* Redesigned Floating Search Bar */}
                <div className='flex w-full md:w-[60%] lg:w-[50%] h-14 bg-white shadow-2xl shadow-indigo-100 border border-slate-100 pl-6 rounded-full items-center gap-4 mx-auto mt-8 transition-all focus-within:ring-2 focus-within:ring-indigo-100'>
                    <input
                        type="text"
                        placeholder='Job title, keywords, or company'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full text-slate-700 font-medium placeholder:text-slate-400'
                    />
                    <Button 
                        onClick={searchJobHandler} 
                        className="rounded-full h-11 w-11 p-0 mr-1.5 bg-indigo-600 hover:bg-indigo-700 shadow-md transition-all active:scale-95"
                    >
                        <Search className='h-5 w-5' />
                    </Button>
                </div>

                {/* Added: Quick Tags for "Realism" */}
                <div className='flex items-center justify-center gap-3 mt-6 text-sm text-slate-400'>
                    <span>Popular:</span>
                    <span className='hover:text-indigo-600 cursor-pointer transition-colors'>Frontend</span>
                    <span className='hover:text-indigo-600 cursor-pointer transition-colors'>Backend</span>
                    <span className='hover:text-indigo-600 cursor-pointer transition-colors'>Data Science</span>
                </div>
            </div>
        </div>
    )
}

export default HeroSection