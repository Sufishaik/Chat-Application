import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { setChatDetails, setSelectedChatData, setSelectedChatType } from "@/store/reducers/chatIndex"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RiCloseFill } from "react-icons/ri"
import { MdFolderZip } from "react-icons/md"
import moment from "moment/moment";
import { IoMdArrowRoundDown } from "react-icons/io"
import axios from "axios"


export const ChatDetails = () => {
    const dispatch = useDispatch()
    const [image, setImage] = useState(null);
    const [len, setLen] = useState(null);
    const [activeContactId, setActiveContactId] = useState(null);

    const [groupMember, setGroupMember] = useState([])
    const userInfo = useSelector((state) => state?.auth?.userInfo);

    const selectedChatData = useSelector((state) => state?.chat?.selectedChatData);
    const selectedChatType = useSelector((state) => state?.chat?.selectedChatType);
    const selectedChatMessages = useSelector((state) => state?.chat?.selectedChatMessages);
    const checkIfImage = (filePath) => {
        const imageRegex = /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
        return imageRegex.test(filePath)
    }
    useEffect(() => {
        if (selectedChatData?.image) {
            setImage(`https://chat-application-4std.onrender.com/${selectedChatData.image}`);
        }
    }, [selectedChatData?.image]);
    useEffect(() => {
        // Calculate the count of file URLs when `selectedChatMessages` changes
        const count = selectedChatMessages?.reduce((acc, item) => {
            if (item.messageType === "file" && checkIfImage(item.fileUrl)) {
                return acc + 1;
            }
            return acc;
        }, 0);
        setLen(count);
    }, [selectedChatMessages]);

    useEffect(() => {
        const getGroupDetails = async () => {
            const resp = await axios.get(
                `https://chat-application-4std.onrender.com/api/channel/getUserChannelsWithMembers`,

                {
                    params: { channelId: selectedChatData?._id },
                    withCredentials: true
                }
            );
            if (resp?.data?.members) {
                // const members = resp.data.channels.flatMap(channel => channel.members);
                console.log("Group Members:", resp?.data?.members);

                setGroupMember(resp?.data?.members);
            }
        }
        getGroupDetails()
    }, [selectedChatData?._id, setGroupMember])
    const handleGroupMember = (item) => {
        dispatch(setSelectedChatData(item));
        dispatch(setSelectedChatType("contact"))
        dispatch(setChatDetails(false));
    }
    // console.log("selectedChatData", selectedChatData);
    console.log("group", groupMember);
    console.log("chatData", selectedChatData);


    return (
        <>
            <div className="h-[100vh]  fixed top-0 w-[100vw]  border-l-2 bg-[#1c1d25] lg:max-w-[50vw] text-white md:static flex flex-col  md:flex-1" >
                <div className="flex gap-5 items-center px-5 h-[10vh] bg-[#1c1d20] ">
                    <RiCloseFill onClick={() => {
                        dispatch(setChatDetails(false))
                    }} className="h-8 text-white/50 w-8" />
                    <span className="text-[20px]">{selectedChatType === "contact" ? "Contact Info" : "Group Info"}</span>
                </div>
                <div className="overflow-y-auto">


                    <div className="h-full mt-5 w-32 md:w-48 md:h-48 mx-auto relative items-center flex justify-center">
                        <Avatar className="h-32 w-32 rounded-full overflow-hidden md:w-48 md:h-48">
                            {
                                image ?
                                    <AvatarImage src={image} className="object-cover w-full h-full bg-black" /> :
                                    <div className="uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center">CN</div>
                            }

                        </Avatar>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-5">
                        <div className="flex flex-col p-3 gap-2 items-center">
                            <span className="text-[25px]">
                                {selectedChatType === "contact" ? `
                          ${selectedChatData?.firstName} ${selectedChatData?.lastName}` : `${selectedChatData?.name}`
                                }
                            </span>

                            {
                                selectedChatType === "contact" ?
                                    <span className="text-[25px]">{selectedChatData?.email}</span> :
                                    <div className="flex gap-2">
                                        <span>Group Members</span>
                                        <span>
                                            {
                                                selectedChatData?.members?.length
                                            }
                                        </span>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="mt-8 bg-[#1c1d15]">
                        <div className="px-8 flex flex-col gap-3 h-[15vh]">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Images and Files</span>
                                <span>{len}</span>
                            </div>
                            <div className="flex gap-5 ">
                                {
                                    selectedChatMessages?.map?.((item) => {

                                        return (
                                            <>
                                                {
                                                    item.messageType === "file" && checkIfImage(item.fileUrl) ?
                                                        <>
                                                            <div className="cursor-pointer flex border-[1px] p-2" >
                                                                <img src={`https://chat-application-4std.onrender.com/${item.fileUrl}`} height={50} width={50} alt="" />
                                                            </div>

                                                        </>
                                                        :
                                                        ""
                                                }
                                            </>
                                        )
                                    })
                                }
                            </div>

                        </div>
                    </div>

                    {
                        selectedChatType === "channel" &&
                        <div className="mt-5">
                            <div>
                                <div className="flex justify-between items-center px-8">
                                    <span className="text-[20px]">Group Members</span>
                                    <IoMdArrowRoundDown className="text-[20px]" />
                                </div>
                            </div>
                            {
                                groupMember?.map?.((types) => (
                                    <div key={types.id} onClick={() => {
                                        if (userInfo?.id !== types?._id) {
                                            handleGroupMember(types)
                                        } else {
                                            alert("You Can't send message to yourself")
                                        }
                                    }} className={`flex pl-10 items-center gap-6 p-2 cursor-pointer ${activeContactId === types._id ? 'bg-blue-500 text-white' : 'hover:bg-neutral-400 hover:bg-opacity-10'}`}
                                    >
                                        <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                                            {
                                                types.image ? <AvatarImage src={`https://chat-application-4std.onrender.com/${types?.image}`} className='object-cover w-full h-full bg-black' /> : <div className={`uppercase h-12 w-12 text-lg boder-[1px] flex items-center justify-center `}>
                                                    {
                                                        types.firstName && types.lastName
                                                            ? `${types.firstName.toUpperCase()}${types.lastName.toUpperCase()}`
                                                            : types.name
                                                                ? types.name.toUpperCase()
                                                                : types.email
                                                                    ? types.email.toUpperCase()
                                                                    : ""
                                                    }
                                                </div>
                                            }
                                        </Avatar>

                                        <span className="text-white">{
                                            userInfo?.id === types?._id ? "You" :
                                                `${types.firstName && types.lastName
                                                    ? `${types.firstName} ${types.lastName}`
                                                    : types.name
                                                        ? types.name
                                                        : types.email
                                                            ? types.email
                                                            : ""}`

                                        }</span>
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
            </div>
        </>
    )
}