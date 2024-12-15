import { TabsTrigger } from "@radix-ui/react-tabs"
import { Tabs, TabsContent, TabsList } from "../../components/ui/tabs"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { useState } from "react"
import { toast } from 'sonner'
import { useDispatch, useSelector } from "react-redux"

import { useNavigate } from "react-router-dom"
import { setUserInfo } from "@/store/reducers"


export const Auth = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.auth.userInfo);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const dispatch = useDispatch();
    const validateLogin = () => {
        if (!email.length) {
            toast.error("Email is Required");
            return false;
        }
        if (!password.length) {
            toast.error("Password is Required");
            return false;
        }

        return true
    }
    const validateSignUp = () => {
        if (!email.length) {
            toast.error("Email is required")
        };
        if (!password.length) {
            toast.error("Password is required")
        };

        if (confirmPassword !== password) {
            toast.error("Passwords do not match");
        }
        return true
    };
    const handleSignup = async () => {
        try {

            if (validateSignUp()) {
                const resp = await fetch('http://localhost:3004/api/auth/signup', {
                    method: 'POST', // Specify the request method
                    credentials: 'include', // Include the credentials in the request
                    headers: {
                        'Content-Type': 'application/json' // Specify the content type
                    },
                    body: JSON.stringify({
                        // Replace with actual signup data
                        email,
                        password,
                        confirmPassword
                    })
                })

                if (resp.status === 201) {
                    const response = await resp.json();

                    dispatch(setUserInfo(response.user))


                    toast.success("Account created successfully")
                    navigate("/profile")
                } else {
                    toast.error("An error occurred")
                }
            }
        } catch (error) {
            console.error("Error during signup:", error);
            toast.error("An error occurred");
        }
    }

    const handleLogin = () => {
        if (validateLogin()) {
            fetch('http://localhost:3004/api/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }).then(async (res) => {
                if (res.status === 200) {
                    const response = await res.json();
                    dispatch(setUserInfo(response.user))
                    navigate("/chat")
                } else {
                    toast.error("An error occurred")
                }
            }).catch((err) => {
                console.error("Error during login:", err);
                toast.error("An error occurred");
            })

        }
    }
    return (
        <>
            <div className=" h-[100vh] w-[100vw] flex items-center justify-center">
                <div className="h-[80vh] bg-white bottom-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
                    <div className="flex flex-col items-center justify-center gap-10">
                        <div className="flex items-center justify-center flex-col">
                            <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
                            <p className='font-medium text-center'>Fill in the blanks to get started with the best chat app</p>
                        </div>
                        <div className='flex items-center justify-center w-full'>
                            <Tabs className='w-3/4' defaultValue="login">
                                <TabsList className="bg-transparent  outline-none rounded-none w-full flex">
                                    <TabsTrigger value="login" className="  outline-none data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2  border-t-0 border-l-0 border-r-0  bg-white rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all">
                                        Login
                                    </TabsTrigger>
                                    <TabsTrigger value="signup" className="bg-white  outline-none data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 border-t-0 border-l-0 border-r-0 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all">
                                        Sign Up
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent className="flex flex-col gap-5 " value="login">
                                    <Input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-full p-6" />
                                    <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-full p-6" />
                                    <Button className="rounded-full p-6" onClick={handleLogin}>Login</Button>
                                </TabsContent>
                                <TabsContent className="flex flex-col gap-5 " value="signup">
                                    <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="rounded-full p-6" />
                                    <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="rounded-full p-6" />
                                    <Input placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="rounded-full p-6" />
                                    <Button className="rounded-full p-6" onClick={handleSignup}>SignUp</Button>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}