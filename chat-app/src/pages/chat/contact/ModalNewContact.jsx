import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import MultipleSelector from "@/components/ui/multipleselect";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { selectedChatData, selectedChatType, setSelectedChatData, setSelectedChatType } from "@/store/reducers/chatIndex";

import { useState } from "react";
import { IoAddOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Channel from "./channels";


export const ModalNewContact = () => {
    const [openNewContactModal, setOpenNewContactModal] = useState(false);
    const [searchedContacts, setSearchedContact] = useState([]);

    const types = useSelector((state) => state?.chat?.selectedChatData);

    const selectedChatType = useSelector((state) => state?.chat?.selectedChatType);

    const [openChannelModal, setOpenChannelModal] = useState(false);
    // const [seatchedContact, setSearchedContact] = useState([]);

    const dispatch = useDispatch();

    const searchContacts = async (searchTerm) => {
        try {
            if (searchTerm.length > 0) {
                const resp = await fetch('http://localhost:3004/api/auth/searchTerm', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({

                        searchTerm
                    })
                },)
                const data = await resp.json();
                if (resp.status === 200 && data?.contacts) {
                    setSearchedContact(data?.contacts)
                }

            } else {
                setSearchedContact([])
            }
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    const handleContactSelect = (item) => {
        setOpenNewContactModal(false);
        dispatch(setSelectedChatData(item));
        dispatch(setSelectedChatType("contact"));
        setSearchedContact([]);
    }




    return (
        <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger className="bg-[#1b1c24] border-none">
                        <IoAddOutline onClick={() => {
                            setOpenNewContactModal(true)
                        }} className="h-8 w-8 text-white/80 bg-[#1b1c24] cursor-pointer duration-300 transition-all " />
                    </TooltipTrigger>
                    <TooltipContent>Select New Contact</TooltipContent>
                </Tooltip>
            </TooltipProvider>



            <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal} className="">
                <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Please Select a Contact</DialogTitle>

                    </DialogHeader>
                    <DialogHeader>
                        <DialogTitle onClick={() => {
                            setOpenNewContactModal(false)
                            setOpenChannelModal(true)
                        }}>Create a Group</DialogTitle>

                    </DialogHeader>

                    <div>
                        <Input placeholder="Search for Contact" onChange={(e) => searchContacts(e.target.value)} className="rounded-lg p-6 bg-[#2c2e3b] border-none" />
                    </div>


                    {
                        searchedContacts.length > 0 &&
                        <ScrollArea className="h-[250px]">
                            {
                                searchedContacts?.map?.((item) => {
                                    return (
                                        <>
                                            <div onClick={() => handleContactSelect(item)} className="flex gap-4 mb-5 items-center cursor-pointer">
                                                <div className="w-12 h-12 relative">
                                                    <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                                                        {
                                                            item?.image ? <AvatarImage className="object-cover w-full h-full bg-black " src={`http://localhost:3004/${item?.image}`} /> : <div className="uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center">{item?.firstName ? item?.firstName.split("").shift() : item?.email?.split("").shift()}</div>
                                                        }
                                                    </Avatar>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span>
                                                        {
                                                            item?.firstName && item?.lastName ? `${item.firstName} ${item.lastName}` : item.email
                                                        }
                                                    </span>
                                                    <span className="text-xs">{item?.email}</span>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </ScrollArea>
                    }

                </DialogContent>
            </Dialog>
            <Channel setOpenChannelModal={setOpenChannelModal} openChannelModal={openChannelModal} />
        </>
    )
}