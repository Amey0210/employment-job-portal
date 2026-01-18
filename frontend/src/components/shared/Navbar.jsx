import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, BriefcaseBusiness } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    return (
        // Changed: Added sticky position, backdrop blur, and a subtle bottom border
        <div className='bg-white/80 sticky top-0 z-50 backdrop-blur-md border-b border-slate-100'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-20 px-4'>
                <div>
                    {/* Changed: Modernized Logo with Indigo accent and better spacing */}
                    <Link to="/">
                        <h1 className='text-2xl font-extrabold tracking-tight text-slate-900'>
                            Job<span className='text-indigo-600'>Hunt</span>
                        </h1>
                    </Link>
                </div>
                <div className='flex items-center gap-10'>
                    <ul className='flex font-semibold text-slate-600 items-center gap-8'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li className='hover:text-indigo-600 transition-colors'><Link to="/admin/companies">Companies</Link></li>
                                    <li className='hover:text-indigo-600 transition-colors'><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='hover:text-indigo-600 transition-colors'><Link to="/">Home</Link></li>
                                    <li className='hover:text-indigo-600 transition-colors'><Link to="/jobs">Jobs</Link></li>
                                    <li className='hover:text-indigo-600 transition-colors'><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-4'>
                                <Link to="/login">
                                    <Button variant="ghost" className="hover:bg-indigo-50 hover:text-indigo-600">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    {/* Changed: Custom Indigo background instead of tutorial purple */}
                                    <Button className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200">Get Started</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer border-2 border-indigo-100 hover:border-indigo-300 transition-all">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="user profile" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 mt-2 border-slate-100 shadow-xl rounded-xl">
                                    <div className='p-2'>
                                        <div className='flex items-start gap-4 mb-4'>
                                            <Avatar className="h-12 w-12 border border-slate-100">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="user profile" />
                                            </Avatar>
                                            <div className='space-y-1'>
                                                <h4 className='font-bold text-slate-900 leading-none'>{user?.fullname}</h4>
                                                <p className='text-xs text-slate-500 italic'>{user?.profile?.bio || "No bio added yet"}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            {
                                                user && user.role === 'student' && (
                                                    <Link to="/profile" className='flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors'>
                                                        <User2 size={18} />
                                                        <span className='text-sm font-medium'>My Profile</span>
                                                    </Link>
                                                )
                                            }
                                            <button 
                                                onClick={logoutHandler}
                                                className='flex items-center gap-3 p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors'
                                            >
                                                <LogOut size={18} />
                                                <span className='text-sm font-medium'>Sign Out</span>
                                            </button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar