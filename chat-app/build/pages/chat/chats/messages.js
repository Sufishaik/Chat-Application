"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Messages = void 0;
var _chatIndex = require("@/store/reducers/chatIndex");
var _axios = _interopRequireDefault(require("axios"));
var _moment = _interopRequireDefault(require("moment/moment"));
var _react = require("react");
var _reactRedux = require("react-redux");
var _md = require("react-icons/md");
var _io = require("react-icons/io");
var _io2 = require("react-icons/io5");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Messages = () => {
  const selectedChatData = (0, _reactRedux.useSelector)(state => state?.chat?.selectedChatData);
  const selectedChatType = (0, _reactRedux.useSelector)(state => state?.chat?.selectedChatType);
  const [showImage, setShowImage] = (0, _react.useState)(false);
  const userInfo = (0, _reactRedux.useSelector)(state => state?.auth?.userInfo);
  const scrollRef = (0, _react.useRef)();
  const [imageURL, setImageURL] = (0, _react.useState)(null);
  const selectedChatMessages = (0, _reactRedux.useSelector)(state => state?.chat?.selectedChatMessages);
  const checkIfImage = filePath => {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  };
  // console.log("userInfo?.id", userInfo?.id)
  const dispatch = (0, _reactRedux.useDispatch)();
  (0, _react.useEffect)(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behaviour: "smooth"
      });
    }
  }, [selectedChatMessages]);
  (0, _react.useEffect)(() => {
    const getMessages = async () => {
      try {
        const resp = await _axios.default.post('http://localhost:3004/api/auth/getMessages', {
          id: selectedChatData._id
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        if (resp?.data?.messages) {
          dispatch((0, _chatIndex.setSelectedChatMessages)(resp.data.messages));
        } else {
          console.warn("No messages found in the response");
          dispatch((0, _chatIndex.setSelectedChatMessages)([])); // Reset to empty
        }
      } catch (err) {
        console.error("Error fetching messages", err);
        dispatch((0, _chatIndex.setSelectedChatMessages)([])); // Reset to empty on error
      }
    };
    const getChannelMessages = async () => {
      try {
        const resp = await _axios.default.get(`http://localhost:3004/api/channel/getChannelMessage/${selectedChatData._id}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        if (resp?.data?.message) {
          dispatch((0, _chatIndex.setSelectedChatMessages)(resp.data.message));
        } else {
          console.warn("No messages found in the response");
          dispatch((0, _chatIndex.setSelectedChatMessages)([]));
        }
      } catch (err) {
        console.error("Error fetching messages", err);
      }
    };
    if (selectedChatData?._id && selectedChatType === "contact") {
      getMessages();
    }
    if (selectedChatData?._id && selectedChatType === "channel") {
      getChannelMessages();
    }
  }, [selectedChatData, _chatIndex.setSelectedChatMessages]);
  let lastDate = null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 "
  }, selectedChatMessages?.map?.(msg => {
    const messageDate = (0, _moment.default)(msg.timestamp).format("YYYY-MM-DD");
    const showDate = messageDate !== lastDate;
    lastDate = messageDate;
    return /*#__PURE__*/React.createElement(React.Fragment, null, showDate && /*#__PURE__*/React.createElement("div", {
      className: "text-center text-gray-500 my-2"
    }, (0, _moment.default)(msg.timestamp).format("LL")), msg.messageType === "text" && selectedChatType === "contact" && /*#__PURE__*/React.createElement("div", {
      key: msg?.id,
      className: `flex flex-col ${msg.sender === selectedChatData._id ? "items-start" : "items-end"} mb-5 gap-3`
    }, /*#__PURE__*/React.createElement("div", {
      className: `p-3 max-w-[50%] rounded-xl ${msg.sender !== selectedChatData?._id ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50  " : "bg-[#2a2b33]/5 text-white/80 border-[#fffff]/20"}`
    }, msg.content), /*#__PURE__*/React.createElement("div", {
      className: "text-xs text-gray-600"
    }, (0, _moment.default)(msg.timestamp).format("LT"))), msg.messageType === "text" && selectedChatType === "channel" && /*#__PURE__*/React.createElement("div", {
      key: msg?.id,
      className: `flex flex-col ${msg.sender?._id !== userInfo?.id ? "items-start" : "items-end"} mb-5 gap-3`
    }, /*#__PURE__*/React.createElement("div", {
      className: `p-3 max-w-[50%] rounded-xl ${msg.sender?._id !== selectedChatData?._id ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50  " : "bg-[#2a2b33]/5 text-white/80 border-[#fffff]/20"}`
    }, msg.content), /*#__PURE__*/React.createElement("div", {
      className: "text-xs text-gray-600"
    }, (0, _moment.default)(msg.timestamp).format("LT"))), /*#__PURE__*/React.createElement("div", {
      ref: scrollRef
    }), msg.messageType === "file" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: `flex flex-col ${selectedChatType === "contact" ? msg.sender === selectedChatData._id ? "items-start" : "items-end" : msg.sender?._id !== userInfo?.id ? "items-start" : "items-end"} mb-5 gap-3`
    }, /*#__PURE__*/React.createElement("div", {
      className: `${msg.sender !== selectedChatData._id ? "" : "bg-[#2a2b33]/5 text-white/80 border-[#fffff]/20"} border flex flex-col p-4 rounded my-1 break-words`
    }, checkIfImage(msg.fileUrl) ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "cursor-pointer",
      onClick: () => {
        setShowImage(true);
        setImageURL(msg.fileUrl);
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: `http://localhost:3004/${msg.fileUrl}`,
      height: 200,
      width: 200,
      alt: ""
    })), /*#__PURE__*/React.createElement("div", {
      className: "text-xs text-gray-600"
    }, (0, _moment.default)(msg.timestamp).format("LT"))) : /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-center gap-4"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-white/8 text-3xl bg-black/20 rounded-full p-3"
    }, /*#__PURE__*/React.createElement(_md.MdFolderZip, null)), /*#__PURE__*/React.createElement("span", {
      className: ""
    }, msg?.fileUrl?.split("/").pop()), /*#__PURE__*/React.createElement("span", {
      className: "bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
    }, /*#__PURE__*/React.createElement(_io.IoMdArrowRoundDown, null)))))), /*#__PURE__*/React.createElement("div", {
      ref: scrollRef
    }), showImage && /*#__PURE__*/React.createElement("div", {
      className: "fixed top-10  h-[60vh] w-[50vw] flex items-center justify-center backdrop-blur-lg flex-col"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
      src: `http://localhost:3004/${imageURL}`,
      className: "h-[30vh] w-full bg-cover",
      alt: ""
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-5 fixed top-0 mt-5"
    }, /*#__PURE__*/React.createElement("button", {
      className: "bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
    }, /*#__PURE__*/React.createElement(_io.IoMdArrowRoundDown, null)), /*#__PURE__*/React.createElement("button", {
      className: "bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300",
      onClick: () => {
        setShowImage(false);
        setImageURL(null);
      }
    }, /*#__PURE__*/React.createElement(_io2.IoCloseSharp, null)))));
  })));
};
exports.Messages = Messages;