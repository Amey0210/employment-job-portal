import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div className='bg-[#f8fafc] min-h-screen'> {/* Added a very light slate background */}
      <Navbar />
      <div className='relative'>
        {/* Abstract Background Blur (Adds a premium feel) */}
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-indigo-100/50 blur-[120px] rounded-full -z-10' />
        
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
      </div>
      <Footer />
    </div>
  )
}

export default Home