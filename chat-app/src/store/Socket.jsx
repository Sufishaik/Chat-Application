
import { createContext, useEffect, useContext, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { addContactDMContact, addMessage, setSelectedChatData, setSelectedChatType } from "./reducers/chatIndex";

const SocketContext = createContext(null);
export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
    const selectedChatData = useSelector((state) => state?.chat?.selectedChatData);
    const ChatData = useSelector((state) => state?.chat);
    const selectedChatType = useSelector((state) => state?.chat?.selectedChatType);
    const forceUpdate = useState()[1]; // Used to force a re-render
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.auth.userInfo);
    const socket = useRef();

    useEffect(() => {
        if (userInfo) {

            socket.current = io("http://localhost:3004/", {

                withCredentials: true,
                query: { userId: userInfo?.id },
            })

            socket.current.on("connect", () => {

                console.log("Connected state:", socket.current.connected);
            });

            socket.current.on("contactUpdated", (data) => {
                console.log('Received updated contacts:', data);

            });

            const handleReceiveMessage = (message) => {
                if (
                    selectedChatType !== undefined &&
                    (selectedChatData._id === message.sender?._id || selectedChatData._id === message.recipient?._id)
                ) {
                    dispatch(addMessage({ message, userInfo }));
                }
                dispatch(addContactDMContact({ message, userInfo }));

            }

            const handleChannelReceiveMessage = (message) => {


                if (selectedChatType !== undefined && (selectedChatData._id === message.channelId)) {
                    dispatch(addMessage({ message, userInfo }));
                }
                dispatch(addContactDMContact({ message, userInfo }));
            }

            socket.current.on("receiveMessage", handleReceiveMessage)
            socket.current.on("recieveChannelMessage", handleChannelReceiveMessage)

            return () => {
                if (socket.current) {
                    socket.current.disconnect();

                }
            }
        }
    }, [userInfo, selectedChatData, selectedChatType, dispatch, setSelectedChatData, setSelectedChatType, selectedChatData?._id]);
    return (


        <>
            <SocketContext.Provider value={socket.current}>
                {children}
            </SocketContext.Provider>
        </>
    )
}