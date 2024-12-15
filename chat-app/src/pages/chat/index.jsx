import { useSelector } from "react-redux";
import { Chats } from "./chats"
import { Contacts } from "./contact"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { ChatDetails } from "./ChatDetailsPage/ChatDetails";
import { setSelectedChatData, setSelectedChatType } from "@/store/reducers/chatIndex";

export const Chat = () => {
    const userInfo = useSelector((state) => state?.auth?.userInfo);
    const selectedChatType = useSelector((state) => state?.chat?.selectedChatType);
    const chatDetails = useSelector((state) => state?.chat?.chatDetails);

    const navigate = useNavigate();
    useEffect(() => {
        if (!userInfo?.profileSetup) {
            toast("Please Setup your profile to continue");
            navigate("/profile")
        }
    }, [userInfo, navigate, setSelectedChatData, setSelectedChatType])

    return (
        <>
            <div className="h-[100vh]  overflow-hidden flex">
                <Contacts />
                {
                    selectedChatType === undefined ? "" : <Chats />
                }
                {
                    selectedChatType === undefined || !chatDetails ? "" : <ChatDetails />
                }

            </div>
        </>
    )
}