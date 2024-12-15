
import { useEffect, useRef, useState } from "react"
import { IoArrowBack } from "react-icons/io5"
import { FaTrash, FaPlus } from "react-icons/fa"

import { useDispatch, useSelector } from "react-redux"

import { toast } from "sonner"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { setUserInfo } from "@/store/reducers"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { addchannel } from "@/store/reducers/chatIndex"
export const CHannelProfile = () => {
    const [image, setImage] = useState(null);
    const [channelName, setChannelName] = useState('');
    const [hovered, setHovered] = useState(false);

    const selectedChannelContacts = useSelector((state) => state?.chat?.selectedChannelContacts);
    const channels = useSelector((state) => state?.chat?.channels);

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const validateProfile = () => {
        if (!channelName) {
            toast.error('Please Enter First Name');
            return false;
        }

        return true;
    }

    const fileInputRef = useRef(null);
    // console.log("channels", channels)


    const handleSave = async () => {
        if (validateProfile()) {
            try {
                const resp = await axios.post(
                    'https://chat-application-4std.onrender.com/api/channel/updateName',
                    { name: channelName, channelId: channels?._id },
                    { withCredentials: true },

                );

                if (resp.status === 200) {
                    const updatedChannels = { ...channels, name: resp?.data?.name };
                    dispatch(addchannel(updatedChannels))


                    toast.success("Name added successfully");


                    navigate("/")


                }
                else {


                    toast.error("Failed to update profile. Please try again.");

                }

            } catch (err) {
                console.log("Error", err);
                toast.error("An error occurred while updating the profile.");

            }
        }
    }
    const handleInputFile = () => {
        fileInputRef.current.click();
    }
    const handleImageFunc = async (event) => {
        // const file = fileInputRef?.current?.files?.[0];
        const file = event?.target?.files?.[0];


        if (file) {
            const formData = new FormData();
            formData.append('channelImg', file);
            formData.append('channelId', channels?._id);
            try {
                const resp = await axios.post(
                    'https://chat-application-4std.onrender.com/api/channel/addChannelImg',
                    formData,
                    { withCredentials: true },
                );

                if (resp.status === 200) {
                    const data = resp.data;
                    if (data?.image) {
                        const imageUrl = `https://chat-application-4std.onrender.com/${data.image}`;
                        const updatedChannels = { ...channels, image: resp?.data?.image };
                        dispatch(addchannel(updatedChannels))
                        setImage(imageUrl);

                        toast.success("Image added successfully");
                    } else {

                        toast.error("Failed to get image data from response");
                    }
                }
            } catch (error) {
                console.error("Error uploading image", error);
                toast.error("Failed to upload image");
            }

            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader?.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleDeleteImg = async () => {
        try {
            const resp = await axios.delete(
                'https://chat-application-4std.onrender.com/api/auth/deleteImg',

                { withCredentials: true },

            );

            if (resp.status === 200) {


                setImage(null)
                toast.success("Image Deleted successfully");
            }
        } catch (err) {
            console.log("Error", err)
        }

    }


    useEffect(() => {
        if (channels?.image) {
            setImage(`https://chat-application-4std.onrender.com/${channels.image}`);
        }
    }, [channels?.image]);
    useEffect(() => {

        console.log("Channels updated:", channels);
    }, [channels]);
    return (
        <>
            <div className="bg-[#1b1c24] h-[100vh]  flex items-center justify-center  md:justify-center flex-col gap-10">
                <div className="w-[80vw] md:w-max flex flex-col items-center justify-center gap-8">
                    <div className="fixed top-0 left-0">
                        <IoArrowBack className='text-4xl lg:text-6xl text-white/90 cursor-pointer ' />
                    </div>
                    <div className="w-[80vw]  flex justify-center items-center gap-10">
                        <div className="flex flex-2 flex-wrap items-center justify-center gap-[5rem]">
                            <div className="h-full w-32 md:w-48 md:h-48 mx-auto relative items-center flex justify-center" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                                <Avatar className="h-32 w-32 rounded-full overflow-hidden md:w-48 md:h-48">
                                    {
                                        image ?
                                            <AvatarImage src={image} className="object-cover w-full h-full bg-black" /> :
                                            <div className="uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center">CN</div>
                                    }

                                </Avatar>
                                {
                                    hovered && (
                                        <div className="ring-fuchsia-50 rounded-full absolute inset-0 flex items-center justify-center bg-black/50">
                                            {
                                                image ? <FaTrash className="text-white text-3xl cursor-pointer" onClick={handleDeleteImg} /> :
                                                    <FaPlus className="text-white text-3xl cursor-pointer" onClick={handleInputFile} />
                                            }
                                        </div>
                                    )
                                }
                                <input type="file" accept=".png, .jpg, .jpeg, .svg, .webp" ref={fileInputRef} className="hidden" name="profileImg" onChange={handleImageFunc} />
                            </div>

                            <div className="flex flex-col gap-8 pl-7">
                                <Input placeholder="Enter Channel Name" onChange={(e) => setChannelName(e.target.value)} value={channelName} className="text-white" />


                            </div>
                        </div>
                    </div>

                    <div className="w-[60vw] md:w-[80vw] lg:w-[35vw]">
                        <Button className="bg-purple-700 text-white/50 outline-none hover:bg-purple-900 transition-all w-full h-16 duration-300 rounded-full" onClick={handleSave}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}