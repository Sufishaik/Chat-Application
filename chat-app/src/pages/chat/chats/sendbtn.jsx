import { GrAttachment } from "react-icons/gr"
import { IoSend } from 'react-icons/io5';
import EmojiPicker from 'emoji-picker-react';


import { RiEmojiStickerLine } from 'react-icons/ri';
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocketContext } from "@/store/Socket";
import axios from "axios";
import { setFileUploadProgress, setIsUploading, setSelectedChatData, setSelectedChatType } from "@/store/reducers/chatIndex";

export const SendBTN = () => {
    const emojiRef = useRef();
    const fileInputRef = useRef();
    const [message, setMessage] = useState("");
    const selectedChatType = useSelector((state) => state?.chat?.selectedChatType);
    const selectedChatData = useSelector((state) => state?.chat?.selectedChatData);
    const contacts = useSelector((state) => state?.chat?.contacts);

    const socket = useSocketContext();
    const userInfo = useSelector((state) => state.auth.userInfo);
    const dispatch = useDispatch();

    const [emojiPickerOpen, setEmpjiPickerOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setEmpjiPickerOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [emojiRef, setSelectedChatType, setSelectedChatData])

    const handleAddEmoji = async (emoji) => {
        setMessage((msg) => msg + emoji.emoji);
    }

    // console.log("type", selectedChatType)
    // console.log("data", selectedChatData?._id)
    const handleSendMessage = useMemo(() => async () => {
        if (!message) {
            alert("Please enter a message");
            return;
        }

        if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
                sender: userInfo?.id,
                content: message,
                recipient: selectedChatData?._id,
                messageType: "text",
                fileUrl: undefined,

            });
            socket.emit("contactUpdated", {
                recipientId: userInfo?.id,
                contacts: contacts,
            });
        } else if (selectedChatType === "channel") {
            socket.emit("sent-channel-msg", {
                sender: userInfo?.id,
                content: message,
                recipient: selectedChatData?._id,
                channelId: selectedChatData._id,
                messageType: "text",
                fileUrl: undefined,
                contacts: contacts,
            });
            socket.emit("contactUpdated", {
                recipientId: userInfo?.id,
                contacts: contacts,
            });
        }
        setMessage("");
    }, [message, selectedChatType, selectedChatData, userInfo, socket]);
    const handleAttachmentClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleAttachmentChange = async (event) => {
        try {
            const file = event.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                dispatch(setIsUploading(true));
                const resp = await axios.post(
                    'http://localhost:3004/api/message/upload-file',
                    formData,
                    {

                        withCredentials: true,
                        onUploadProgress: data => {
                            dispatch(setFileUploadProgress(Math.round((100 * data.loaded) / data.total)))
                        }
                    }
                );
                if (resp.status === 200 && resp.data) {
                    dispatch(setIsUploading(false));
                    if (selectedChatType === "contact") {
                        socket.emit("sendMessage", {
                            sender: userInfo.id,
                            content: undefined,
                            recipient: selectedChatData._id,
                            messageType: "file",
                            fileUrl: resp.data.filePath,
                        })
                    } else if (selectedChatType === "channel") {
                        socket.emit("sent-channel-msg", {
                            sender: userInfo.id,
                            content: undefined,
                            recipient: selectedChatData._id,
                            channelId: selectedChatData._id,
                            messageType: "file",
                            fileUrl: resp.data.filePath,
                        })
                    }
                }

            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className="h-[10vh]  bg-[#1c1d25] px-8 mb-6 flex justify-center items-center gap-6">
                <div className="bg-[#2a2b33] rounded-md flex items-center gap-5 pr-5 flex-1 ">
                    <input type="text" placeholder="Enter Message" className="text-white p-5 bg-transparent rounded-md focus:border-none focus:outline-none w-[80%] md:w-full lg:w-full xl:w-full" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button className=" focus:border-none duration-300 transition-all">
                        {/* <GrAttachment className="" onClick={handleAttachmentClick} /> */}
                        {/* <FontAwesomeIcon icon="fa-solid fa-paperclip" /> */}
                        <i class="fa-solid fa-paperclip"></i>
                    </button>
                    <input type="file" name="" id="" ref={fileInputRef} className="hidden" onChange={handleAttachmentChange} />
                    <div className="relative">
                        <button onClick={() => setEmpjiPickerOpen(true)} className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
                            <RiEmojiStickerLine className='text-2xl' />
                        </button>
                        <div className="absolute bottom-16 right-0" ref={emojiRef}>
                            <EmojiPicker theme='dark' onEmojiClick={handleAddEmoji} open={emojiPickerOpen} autoFocusSearch={false} />
                        </div>
                    </div>
                </div>
                <button className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] focus:bg-[#741bda] focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
                    <IoSend className='text-2xl' onClick={handleSendMessage} />
                </button>
            </div>
        </>
    )
}