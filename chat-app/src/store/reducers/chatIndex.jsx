import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedChatType: undefined,
    isUploading: false,
    selectedChannelContacts: [],

    contacts: [],
    chatDetails: false,
    selectedChatData: undefined,
    selectedChatMessages: [],
    fileUploadProgress: 0,
};
export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setSelectedChannelContacts(state, action) {
            state.selectedChannelContacts = action.payload || undefined;
        },
        setFileUploadProgress(state, action) {
            state.fileUploadProgress = action.payload || undefined;
        },
        setIsUploading(state, action) {
            state.isUploading = action.payload || undefined;
        },
        setChatDetails(state, action) {
            state.chatDetails = action.payload || undefined;
        },
        setSelectedChatType(state, action) {
            state.selectedChatType = action.payload || undefined;
        },

        setContacts(state, action) {
            state.contacts = action.payload || false;
        },
        setSelectedChatData(state, action) {
            state.selectedChatData = action.payload || undefined;
        },
        addchannel(state, action) {
            state.channels = action.payload || undefined
        },

        setSelectedChatMessages(state, action) {
            state.selectedChatMessages = action.payload || [];
        },
        closeChat(state) {
            state.selectedChatData = undefined;
            state.selectedChatType = undefined;
            state.selectedChatMessages = [];
        },
        addMessage(state, action) {
            const { message } = action.payload;



            if (!state.selectedChatMessages) {
                state.selectedChatMessages = [];
            }

            state.selectedChatMessages.push({
                ...message,
                recipient: state.selectedChatType === "channel" ? message.recipient : message.recipient._id,
                sender: state.selectedChatType === "channel" ? message.sender : message.sender._id,
            });

        },

        addContactDMContact: (state, action) => {
            const { message, userInfo } = action.payload;
            console.log("message", message);

            const formId = message.sender._id === userInfo?.id ? (message.recipient._id || message?.channelId) : message.sender._id;
            const channelIDS = state.contacts?.find((i) => i?._id === formId)

            const dmContact = [...state.contacts];

            const index = dmContact.findIndex((contact) => contact._id === (message?.channelId || formId));

            if (index !== -1 && index !== undefined) {

                const contact = dmContact[index];

                // Increment message count if the message is from the recipient
                if (message.sender._id !== userInfo?.id) {
                    contact.messageCount = (contact.messageCount || 0) + 1; // Initialize to 0 if undefined
                    contact.unread = true;
                }
                dmContact.splice(index, 1); // Remove existing contact
                dmContact.unshift(contact); // Add to the top
            } else {
                // Contact does not exist, add a new contact
                const fromData = message.sender._id === userInfo?.id ? (message.recipient || message.channelId) : message.sender;

                // Add messageCount property
                const newContact = {
                    ...fromData,
                    messageCount: message.sender._id !== userInfo?.id ? 1 : 0, // Start count only if sender is not the current user
                    unread: message.sender._id !== userInfo?.id,
                };

                dmContact.unshift(newContact);
            }


            state.contacts = dmContact;
        },
        resetMessageCount: (state, action) => {
            const { contact, count } = action.payload;

            const contactIDS = state.contacts.find((contactid) => contactid._id === contact);
            if (contactIDS) {
                contactIDS.messageCount = 0; // Reset the count
                // count.unread = false;
            }
        },
        resetUnread: (state, action) => {
            const { contactId } = action.payload;

            const contact = state.contacts.find((contact) => contact._id === contactId);
            if (contact) {
                contact.unread = false; // Reset unread status
            }
        },


    },
});


export const { resetMessageCount, resetUnread, setSelectedChatType, setChatDetails, setIsUploading, setSelectedChannelContacts, addchannel, setChannelModalState, setSelectedChatMessages, closeChat, setFileUploadProgress, setContacts, setSelectedChatData, selectedChatType, selectedChatData, addContactDMContact, addMessage } = chatSlice.actions;

