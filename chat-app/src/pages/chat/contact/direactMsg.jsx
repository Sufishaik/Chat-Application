import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { resetMessageCount, resetUnread, setContacts, setSelectedChatData, setSelectedChatMessages, setSelectedChatType } from "@/store/reducers/chatIndex";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const DirectMsg = () => {
    const contacts = useSelector((state) => state?.chat?.contacts);
    const [activeContactId, setActiveContactId] = useState(null);
    const selectedChatData = useSelector((state) => state?.chat?.selectedChatData);
    const selectedChatType = useSelector((state) => state?.chat?.selectedChatType);

    const dispatch = useDispatch();
    const handleChannel = useMemo(
        () => (contact) => {
            const isContact = contact?.firstName;

            // Determine the type and data for the selected chat
            const chatType = isContact ? "contact" : "channel";

            // Dispatch the type and data
            dispatch(setSelectedChatType(chatType));
            dispatch(setSelectedChatData(contact));
            setActiveContactId(contact._id);
            dispatch(resetMessageCount({ contact: contact._id }))
            dispatch(resetUnread({ contactId: contact._id }));
            // Clear messages if switching to a new chat
            if (selectedChatData && selectedChatData._id !== contact._id) {
                dispatch(setSelectedChatMessages([]));
            }
        },
        [setSelectedChatData, setSelectedChatType, dispatch, contacts], // Dependency array to ensure fresh state on every update
    );
    useEffect(() => {
        if (contacts?.length > 0) {
            dispatch(setContacts(contacts));
        }
    }, [contacts, dispatch, selectedChatData, selectedChatType])




    return (
        <>

            <div className="">
                {
                    contacts?.map?.((types) => (
                        <div key={types.id} onClick={() => handleChannel(types)} className={`flex pl-10 items-center gap-6 p-2 cursor-pointer hover:bg-blue-500 hover:bg-opacity-10
                        ${activeContactId === types._id
                                ? 'bg-blue-500 text-white'
                                : types.unread
                                    ? 'bg-blue-900 text-white' // Highlight for unread messages
                                    : 'hover:bg-neutral-400 hover:bg-opacity-10'
                            }`}
                        >
                            <Avatar className="h-12 w-12  rounded-full overflow-hidden">
                                {
                                    types.image ? <AvatarImage src={`https://chat-application-clit.onrender.com/${types?.image}`} className='object-cover w-full h-full bg-black' /> : <div className={`uppercase h-12 w-12 text-lg boder-[1px] flex items-center justify-center `}>
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
                            <div className="flex gap-[5rem]  items-center justify-center">
                                <span className="text-white">{`${types.firstName && types.lastName
                                    ? `${types.firstName} ${types.lastName}`
                                    : types.name
                                        ? types.name
                                        : types.email
                                            ? types.email
                                            : ""}`}</span>
                                {
                                    types?.messageCount > 0 && (
                                        <span className="bg-red-600 text-white text-[12px] px-[15px] rounded-[15px]">{types.messageCount}</span>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>


        </>
    )
}