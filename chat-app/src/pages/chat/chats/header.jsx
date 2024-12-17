import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { closeChat, setChatDetails } from "@/store/reducers/chatIndex";
import { RiCloseFill } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux";

export const Header = () => {
    const dispatch = useDispatch()
    const selectedChatType = useSelector((state) => state?.chat?.selectedChatType);

    const types = useSelector((state) => state?.chat?.selectedChatData);

    return (
        <>
            <div className="border-b-2 border-[#2f303b] h-[10vh] px-5">
                <div className="flex items-center justify-between py-3">
                    <div className="flex gap-5 items-center justify-center cursor-pointer" onClick={() => {
                        dispatch(setChatDetails(true))
                    }}>
                        <Avatar className="h-12 w-12  rounded-full overflow-hidden ">
                            {
                                types && types?.image ? <AvatarImage src={`https://chat-application-hajy.onrender.com/${types?.image}`} className='object-cover w-full h-full bg-black' /> : <div className={`uppercase h-12 w-12 text-lg boder-[1px] flex items-center justify-center `}>
                                    {
                                        selectedChatType === "contact" ?
                                            types?.firstName ? types.firstName.split("").shift() : types?.email?.split("").shift()
                                            :
                                            types?.name
                                    }
                                </div>
                            }
                        </Avatar>
                        <span className="text-white">{`${selectedChatType === "contact" ? types?.firstName : types?.name} ${selectedChatType === "contact" ? types?.lastName : ""}`}</span>
                    </div>
                    <RiCloseFill className="h-8 text-white/50 w-8" onClick={() => dispatch(closeChat())} />
                </div>


            </div>
        </>
    )
}