
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import MultipleSelector from '@/components/ui/multipleselect';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { addchannel, setSelectedChannelContacts } from '@/store/reducers/chatIndex';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

import Lottie from 'react-lottie'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



function Channel({ openChannelModal, setOpenChannelModal }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [allContacts, setAllContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);

    useEffect(() => {
        const getMessages = async () => {

            try {
                const resp = await axios.get(
                    'https://chat-application-hajy.onrender.com/api/contacts/getAllContacts',

                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    }
                );

                if (resp?.data?.contacts) {

                    setAllContacts(resp.data.contacts);

                } else {
                    console.warn("No messages found in the response");

                }
            } catch (err) {
                console.error("Error fetching messages", err);

            }
        };
        getMessages()
    }, [])
    const handleChannelCreate = async () => {
        try {
            if (selectedContacts.length > 0) {
                const resp = await axios.post(
                    'https://chat-application-hajy.onrender.com/api/channel/createChannel',
                    {

                        members: selectedContacts?.map?.((contact) => contact.value)
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    }
                );
                if (resp?.data?.channel) {

                    dispatch(setSelectedChannelContacts(selectedContacts));
                    dispatch(addchannel({ ...resp.data.channel }));
                    setSelectedContacts([]);
                    setOpenChannelModal(false);
                    navigate("/groupprofile")

                } else {
                    console.warn("No messages found in the response");
                    dispatch(setSelectedChatMessages([])); // Reset to empty
                }
            }
        } catch (err) {
            console.log("Error creating channel", err);
        }

    }

    return (
        <div>

            <Dialog open={openChannelModal} onOpenChange={() => {

                setOpenChannelModal(false)
            }}>

                <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>Please Select a contact to create a group</DialogTitle>
                        <DialogDescription>
                            {/* Please Select a contact */}
                        </DialogDescription>
                    </DialogHeader>

                    <div className='relative h-[100vh]'>

                        <MultipleSelector onChange={setSelectedContacts} value={selectedContacts} placeholder="Search Contacts" defaultOptions={allContacts} className="rounded-lg  border-none py-2 bg-none" emptyIndicator={
                            <p className='text-center text-lg leading-10 text-gray-600'>No result found</p>
                        } />
                        <Button className="bottom-0 absolute w-full" onClick={handleChannelCreate}>Create Channel</Button>
                    </div>

                </DialogContent>
            </Dialog>

        </div>
    )
}

export default Channel
