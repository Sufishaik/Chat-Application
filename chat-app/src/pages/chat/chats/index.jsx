import { useSelector } from "react-redux";
import { Header } from "./header"
import { Messages } from "./messages"
import { SendBTN } from "./sendbtn"

export const Chats = () => {
    const chatDetails = useSelector((state) => state?.chat?.chatDetails);
    return (
        <>
            <div className={`h-[100vh] fixed top-0 w-[100vw] bg-[#1c1d25] ${chatDetails ? "lg:max-w-[50vw] lg:min-w-[35vw] md:static md:hidden lg:flex " : "md:static"} flex flex-col  md:flex-1`}>
                <Header />
                <Messages />
                <SendBTN />
            </div>
        </>
    )
}