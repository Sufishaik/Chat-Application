
import { DirectMsg } from "./direactMsg"
import { ProfileContact } from "./profile"
import ChatIcon from "../../../assests/chat.png"
import { IoAddOutline } from "react-icons/io5";
import { ModalNewContact } from "./ModalNewContact";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContacts } from "@/store/reducers/chatIndex";
import axios from "axios";


export const Contacts = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch contacts for DM
                const contactResp = await axios.get(
                    'https://chat-application-clit.onrender.com/api/contacts/getContactsForDM',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    }
                );

                const contacts = contactResp.data?.contacts || [];

                // Fetch user channels
                const channelResp = await axios.get(
                    'https://chat-application-clit.onrender.com/api/channel/getUserChannel',
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    }
                );

                const channels = channelResp.data?.channels || [];

                // Merge contacts and channels
                const combinedData = [...contacts, ...channels];
                dispatch(setContacts(combinedData));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [dispatch, setContacts]);

    return (
        <>
            <div className="relative  bg-[#1b1c24] border-r-2 border-[#2f303b] md:w-[35vw] lg:w-[40vw] xl:w-[20vw] w-full">
                <img src={ChatIcon} className="h-15 mx-auto  object-contain mt-2 w-20" alt="" />
                <div className="flex items-center justify-between  w-full flex-col gap-0">
                    <div className="flex items-center justify-between  w-full pr-10">
                        <h1 className="uppercase tracking-widest text-neutral-400 pl-10 font-bold text-opacity-90 text-sm">Direct Message</h1>
                        <ModalNewContact />

                    </div>
                    <div className=" overflow-y-auto scrollbar-hidden w-full">
                        <DirectMsg />
                    </div>
                </div>

                <ProfileContact />
            </div>
        </>
    )
}