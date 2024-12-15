import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { setUserInfo } from '@/store/reducers';
import axios from 'axios';
import { FiEdit2 } from 'react-icons/fi';
import { IoPowerSharp } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const ProfileContact = () => {
    const userInfo = useSelector((state) => state?.auth?.userInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const resp = await axios.post(
                'https://chat-application-4std.onrender.com/api/auth/logout',
                {},
                { withCredentials: true },

            );
            if (resp.status === 200) {
                toast.success("Successfully Logout")
                navigate("/auth");
                dispatch(setUserInfo(null));
            }
        } catch (err) {
            console.log("Error", err);
        }
    }

    return (
        <>
            <div className="flex h-15 items-center justify-center mx-[0px auto] pr-10 gap-4 p-2 bg-[#2a2b33] w-full pl-10 absolute bottom-0 cursor-pointer">
                <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                    {
                        userInfo.image ? <AvatarImage src={`https://chat-application-4std.onrender.com/${userInfo.image}`} className='object-cover w-full h-full bg-black' /> : <div className={`uppercase h-12 w-12 text-lg boder-[1px] flex items-center justify-center `}>

                            {userInfo.firstName ? userInfo.firstName.split("").shift() : userInfo?.email?.split("").shift()}
                        </div>
                    }
                </Avatar>
                <div className='flex items-center gap-2'>
                    <span className='text-white'>{`${userInfo?.firstName} ${userInfo?.lastName}`}</span>
                    <FiEdit2 className='text-black' onClick={() => navigate("/profile")} />
                    <IoPowerSharp className='text-red-500' onClick={handleLogout} />
                </div>
            </div>
        </>
    )
}
