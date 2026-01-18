import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Mail, Lock, UserCheck } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto mt-10 px-4'>
                <form onSubmit={submitHandler} className='w-full md:w-1/2 lg:w-1/3 bg-white border border-slate-100 rounded-2xl p-8 shadow-2xl shadow-indigo-100 my-10'>
                    <div className='text-center mb-8'>
                        <h1 className='font-extrabold text-3xl text-slate-900'>Welcome Back</h1>
                        <p className='text-slate-500 text-sm mt-2'>Login to access your personalized job dashboard</p>
                    </div>

                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <Label className="text-slate-700 font-semibold">Email Address</Label>
                            <div className='relative'>
                                <Mail className='absolute left-3 top-3 text-slate-400' size={18} />
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="amey@example.com"
                                    className="pl-10 border-slate-200 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <Label className="text-slate-700 font-semibold">Password</Label>
                            <div className='relative'>
                                <Lock className='absolute left-3 top-3 text-slate-400' size={18} />
                                <Input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="••••••••"
                                    className="pl-10 border-slate-200 focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className='py-2'>
                            <Label className="text-slate-700 font-semibold mb-3 block">Login as</Label>
                            <RadioGroup className="flex items-center gap-6">
                                <div className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 cursor-pointer hover:bg-indigo-50 transition-colors">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer w-4 h-4 accent-indigo-600"
                                    />
                                    <Label className="cursor-pointer text-sm font-medium">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 cursor-pointer hover:bg-indigo-50 transition-colors">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer w-4 h-4 accent-indigo-600"
                                    />
                                    <Label className="cursor-pointer text-sm font-medium">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {
                        loading ? 
                        <Button className="w-full my-6 bg-indigo-600 rounded-lg py-6"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button> 
                        : <Button type="submit" className="w-full my-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-lg shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]">Login</Button>
                    }
                    
                    <div className='text-center'>
                        <span className='text-sm text-slate-600'>Don't have an account? <Link to="/signup" className='text-indigo-600 font-bold hover:underline'>Signup</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login