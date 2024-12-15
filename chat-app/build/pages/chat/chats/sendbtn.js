"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendBTN = void 0;
var _gr = require("react-icons/gr");
var _io = require("react-icons/io5");
var _emojiPickerReact = _interopRequireDefault(require("emoji-picker-react"));
var _ri = require("react-icons/ri");
var _react = require("react");
var _reactRedux = require("react-redux");
var _Socket = require("@/store/Socket");
var _axios = _interopRequireDefault(require("axios"));
var _chatIndex = require("@/store/reducers/chatIndex");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const SendBTN = () => {
  const emojiRef = (0, _react.useRef)();
  const fileInputRef = (0, _react.useRef)();
  const [message, setMessage] = (0, _react.useState)("");
  const selectedChatType = (0, _reactRedux.useSelector)(state => state?.chat?.selectedChatType);
  const selectedChatData = (0, _reactRedux.useSelector)(state => state?.chat?.selectedChatData);
  const contacts = (0, _reactRedux.useSelector)(state => state?.chat?.contacts);
  const socket = (0, _Socket.useSocketContext)();
  const userInfo = (0, _reactRedux.useSelector)(state => state.auth.userInfo);
  const dispatch = (0, _reactRedux.useDispatch)();
  const [emojiPickerOpen, setEmpjiPickerOpen] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    const handleClickOutside = event => {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmpjiPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef, _chatIndex.setSelectedChatType, _chatIndex.setSelectedChatData]);
  const handleAddEmoji = async emoji => {
    setMessage(msg => msg + emoji.emoji);
  };

  // console.log("type", selectedChatType)
  // console.log("data", selectedChatData?._id)
  const handleSendMessage = (0, _react.useMemo)(() => async () => {
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
        fileUrl: undefined
      });
      socket.emit("contactUpdated", {
        recipientId: userInfo?.id,
        contacts: contacts
      });
    } else if (selectedChatType === "channel") {
      socket.emit("sent-channel-msg", {
        sender: userInfo?.id,
        content: message,
        recipient: selectedChatData?._id,
        channelId: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined,
        contacts: contacts
      });
      socket.emit("contactUpdated", {
        recipientId: userInfo?.id,
        contacts: contacts
      });
    }
    setMessage("");
  }, [message, selectedChatType, selectedChatData, userInfo, socket]);
  const handleAttachmentClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleAttachmentChange = async event => {
    try {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        dispatch((0, _chatIndex.setIsUploading)(true));
        const resp = await _axios.default.post('http://localhost:3004/api/message/upload-file', formData, {
          withCredentials: true,
          onUploadProgress: data => {
            dispatch((0, _chatIndex.setFileUploadProgress)(Math.round(100 * data.loaded / data.total)));
          }
        });
        if (resp.status === 200 && resp.data) {
          dispatch((0, _chatIndex.setIsUploading)(false));
          if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
              sender: userInfo.id,
              content: undefined,
              recipient: selectedChatData._id,
              messageType: "file",
              fileUrl: resp.data.filePath
            });
          } else if (selectedChatType === "channel") {
            socket.emit("sent-channel-msg", {
              sender: userInfo.id,
              content: undefined,
              recipient: selectedChatData._id,
              channelId: selectedChatData._id,
              messageType: "file",
              fileUrl: resp.data.filePath
            });
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "h-[10vh]  bg-[#1c1d25] px-8 mb-6 flex justify-center items-center gap-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-[#2a2b33] rounded-md flex items-center gap-5 pr-5 flex-1 "
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Enter Message",
    className: "text-white p-5 bg-transparent rounded-md focus:border-none focus:outline-none w-[80%] md:w-full lg:w-full xl:w-full",
    value: message,
    onChange: e => setMessage(e.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    className: "text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
  }, /*#__PURE__*/React.createElement(_gr.GrAttachment, {
    className: "text-white",
    onClick: handleAttachmentClick
  })), /*#__PURE__*/React.createElement("input", {
    type: "file",
    name: "",
    id: "",
    ref: fileInputRef,
    className: "hidden",
    onChange: handleAttachmentChange
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setEmpjiPickerOpen(true),
    className: "text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
  }, /*#__PURE__*/React.createElement(_ri.RiEmojiStickerLine, {
    className: "text-2xl"
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-16 right-0",
    ref: emojiRef
  }, /*#__PURE__*/React.createElement(_emojiPickerReact.default, {
    theme: "dark",
    onEmojiClick: handleAddEmoji,
    open: emojiPickerOpen,
    autoFocusSearch: false
  })))), /*#__PURE__*/React.createElement("button", {
    className: "bg-[#8417ff] rounded-md flex items-center justify-center p-5 hover:bg-[#741bda] focus:bg-[#741bda] focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
  }, /*#__PURE__*/React.createElement(_io.IoSend, {
    className: "text-2xl",
    onClick: handleSendMessage
  }))));
};
exports.SendBTN = SendBTN;