import React, { useEffect, useState } from 'react'
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
import { setLoading } from '@/redux/authSlice'
import { Loader2, User, Mail, Phone, Lock, Upload } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [])

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-4'>
                <form onSubmit={submitHandler} className='w-full md:w-1/2 lg:w-[450px] bg-white border border-slate-100 rounded-2xl p-8 shadow-2xl shadow-indigo-100 my-10'>
                    <div className='text-center mb-8'>
                        <h1 className='font-extrabold text-3xl text-slate-900'>Create Account</h1>
                        <p className='text-slate-500 text-sm mt-2'>Join our community and land your next big role</p>
                    </div>

                    <div className='space-y-4'>
                        <div className='space-y-2'>
                            <Label className="text-slate-700 font-semibold">Full Name</Label>
                            <div className='relative'>
                                <User className='absolute left-3 top-3 text-slate-400' size={18} />
                                <Input
                                    type="text"
                                    value={input.fullname}
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    placeholder="Amey Patel"
                                    className="pl-10 border-slate-200 focus:ring-indigo-500 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <Label className="text-slate-700 font-semibold">Email</Label>
                            <div className='relative'>
                                <Mail className='absolute left-3 top-3 text-slate-400' size={18} />
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="amey@gmail.com"
                                    className="pl-10 border-slate-200 focus:ring-indigo-500 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <Label className="text-slate-700 font-semibold">Phone Number</Label>
                            <div className='relative'>
                                <Phone className='absolute left-3 top-3 text-slate-400' size={18} />
                                <Input
                                    type="text"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="98XXXXXXXX"
                                    className="pl-10 border-slate-200 focus:ring-indigo-500 rounded-lg"
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
                                    className="pl-10 border-slate-200 focus:ring-indigo-500 rounded-lg"
                                />
                            </div>
                        </div>

                        <div className='flex flex-col gap-4 py-2'>
                            <Label className="text-slate-700 font-semibold">Register as</Label>
                            <RadioGroup className="flex items-center gap-4">
                                <div className="flex-1 flex items-center space-x-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 hover:bg-indigo-50 transition-colors">
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
                                <div className="flex-1 flex items-center space-x-2 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 hover:bg-indigo-50 transition-colors">
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

                        <div className='space-y-2'>
                            <Label className="text-slate-700 font-semibold">Profile Picture</Label>
                            <div className='flex items-center gap-2 w-full'>
                                <Input
                                    accept="image/*"
                                    type="file"
                                    onChange={changeFileHandler}
                                    className="cursor-pointer border-dashed border-2 border-slate-200 bg-slate-50 hover:bg-indigo-50 transition-colors py-2"
                                />
                            </div>
                        </div>
                    </div>

                    {
                        loading ? 
                        <Button className="w-full my-6 bg-indigo-600 rounded-lg py-6"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button> 
                        : <Button type="submit" className="w-full my-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-lg shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]">Signup</Button>
                    }
                    
                    <div className='text-center'>
                        <span className='text-sm text-slate-600'>Already have an account? <Link to="/login" className='text-indigo-600 font-bold hover:underline'>Login</Link></span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup