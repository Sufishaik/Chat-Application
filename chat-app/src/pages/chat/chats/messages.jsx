import { setSelectedChatMessages } from "@/store/reducers/chatIndex";
import axios from "axios";
import moment from "moment/moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdFolderZip } from "react-icons/md"
import { IoMdArrowRoundDown } from "react-icons/io"
import { IoCloseSharp } from 'react-icons/io5'


export const Messages = () => {
    const selectedChatData = useSelector((state) => state?.chat?.selectedChatData);
    const selectedChatType = useSelector((state) => state?.chat?.selectedChatType);
    const [showImage, setShowImage] = useState(false);
    const userInfo = useSelector((state) => state?.auth?.userInfo);

    const scrollRef = useRef()

    const [imageURL, setImageURL] = useState(null);
    const selectedChatMessages = useSelector((state) => state?.chat?.selectedChatMessages);
    const checkIfImage = (filePath) => {
        const imageRegex = /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
        return imageRegex.test(filePath)
    }
    // console.log("userInfo?.id", userInfo?.id)
    const dispatch = useDispatch();
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behaviour: "smooth" })
        }
    }, [selectedChatMessages])
    useEffect(() => {
        const getMessages = async () => {

            try {
                const resp = await axios.post(
                    'https://chat-application-hajy.onrender.com/api/auth/getMessages',
                    {
                        id: selectedChatData._id
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    }
                );

                if (resp?.data?.messages) {

                    dispatch(setSelectedChatMessages(resp.data.messages));
                } else {
                    console.warn("No messages found in the response");
                    dispatch(setSelectedChatMessages([])); // Reset to empty
                }
            } catch (err) {
                console.error("Error fetching messages", err);
                dispatch(setSelectedChatMessages([])); // Reset to empty on error
            }
        };
        const getChannelMessages = async () => {

            try {
                const resp = await axios.get(
                    `https://chat-application-hajy.onrender.com/api/channel/getChannelMessage/${selectedChatData._id}`,

                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    }
                );

                if (resp?.data?.message) {
                    dispatch(setSelectedChatMessages(resp.data.message));

                } else {
                    console.warn("No messages found in the response");
                    dispatch(setSelectedChatMessages([]));

                }
            } catch (err) {
                console.error("Error fetching messages", err);

            }
        };
        if (selectedChatData?._id && selectedChatType === "contact") {
            getMessages();
        }
        if (selectedChatData?._id && selectedChatType === "channel") {
            getChannelMessages();
        }
    }, [selectedChatData, setSelectedChatMessages]);
    let lastDate = null;

    return (
        <>
            <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 ">
                {selectedChatMessages?.map?.((msg) => {

                    const messageDate = moment(msg.timestamp).format("YYYY-MM-DD");
                    const showDate = messageDate !== lastDate;
                    lastDate = messageDate;

                    return (
                        <>

                            {
                                showDate &&
                                <div className='text-center text-gray-500 my-2'>
                                    {moment(msg.timestamp).format("LL")}
                                </div>
                            }
                            {
                                msg.messageType === "text" && selectedChatType === "contact" &&
                                <div key={msg?.id} className={`flex flex-col ${msg.sender === selectedChatData._id ? "items-start" : "items-end"} mb-5 gap-3`}>

                                    <div className={`p-3 max-w-[50%] rounded-xl ${msg.sender !== selectedChatData?._id ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50  " : "bg-[#2a2b33]/5 text-white/80 border-[#fffff]/20"}`}>
                                        {msg.content}
                                    </div>
                                    <div className='text-xs text-gray-600'>
                                        {moment(msg.timestamp).format("LT")}
                                    </div>
                                </div>
                            }
                            {
                                msg.messageType === "text" && selectedChatType === "channel" &&
                                <div key={msg?.id} className={`flex flex-col ${msg.sender?._id !== userInfo?.id ? "items-start" : "items-end"} mb-5 gap-3`}>

                                    <div className={`p-3 max-w-[50%] rounded-xl ${msg.sender?._id !== selectedChatData?._id ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50  " : "bg-[#2a2b33]/5 text-white/80 border-[#fffff]/20"}`}>
                                        {msg.content}
                                    </div>
                                    <div className='text-xs text-gray-600'>
                                        {moment(msg.timestamp).format("LT")}
                                    </div>
                                </div>
                            }
                            <div ref={scrollRef}></div>

                            {
                                msg.messageType === "file" &&
                                <>
                                    <div className={`flex flex-col ${selectedChatType === "contact" ? msg.sender === selectedChatData._id ? "items-start" : "items-end" : msg.sender?._id !== userInfo?.id ? "items-start" : "items-end"} mb-5 gap-3`}>
                                        <div className={`${msg.sender !== selectedChatData._id ? "" : "bg-[#2a2b33]/5 text-white/80 border-[#fffff]/20"} border flex flex-col p-4 rounded my-1 break-words`}>
                                            {
                                                checkIfImage(msg.fileUrl) ?
                                                    <>
                                                        <div className="cursor-pointer" onClick={() => {
                                                            setShowImage(true);
                                                            setImageURL(msg.fileUrl);
                                                        }}>
                                                            <img src={`https://chat-application-hajy.onrender.com/${msg.fileUrl}`} height={200} width={200} alt="" />
                                                        </div>
                                                        <div className='text-xs text-gray-600'>
                                                            {moment(msg.timestamp).format("LT")}
                                                        </div>
                                                    </>
                                                    :
                                                    (<div className='flex items-center justify-center gap-4'>
                                                        <span className='text-white/8 text-3xl bg-black/20 rounded-full p-3'>
                                                            <MdFolderZip />
                                                        </span>
                                                        <span className=''>{msg?.fileUrl?.split("/").pop()}</span>
                                                        <span className='bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300'><IoMdArrowRoundDown /></span>
                                                    </div>)
                                            }
                                        </div>
                                    </div>
                                </>
                            }
                            <div ref={scrollRef}></div>
                            {
                                showImage && <div className='fixed top-10  h-[60vh] w-[50vw] flex items-center justify-center backdrop-blur-lg flex-col'>
                                    <div>
                                        <img src={`https://chat-application-hajy.onrender.com/${imageURL}`} className='h-[30vh] w-full bg-cover' alt="" />
                                    </div>
                                    <div className='flex gap-5 fixed top-0 mt-5'>
                                        <button className='bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300' >
                                            <IoMdArrowRoundDown />
                                        </button>
                                        <button className='bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300' onClick={() => {
                                            setShowImage(false);
                                            setImageURL(null);
                                        }}>
                                            <IoCloseSharp />
                                        </button>
                                    </div>
                                </div>
                            }
                        </>
                    )
                }
                )}
            </div>
        </>
    )
}