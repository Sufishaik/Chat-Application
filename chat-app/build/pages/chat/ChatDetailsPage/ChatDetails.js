"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatDetails = void 0;
var _avatar = require("@/components/ui/avatar");
var _chatIndex = require("@/store/reducers/chatIndex");
var _react = require("react");
var _reactRedux = require("react-redux");
var _ri = require("react-icons/ri");
var _md = require("react-icons/md");
var _moment = _interopRequireDefault(require("moment/moment"));
var _io = require("react-icons/io");
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ChatDetails = () => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const [image, setImage] = (0, _react.useState)(null);
  const [len, setLen] = (0, _react.useState)(null);
  const [activeContactId, setActiveContactId] = (0, _react.useState)(null);
  const [groupMember, setGroupMember] = (0, _react.useState)([]);
  const userInfo = (0, _reactRedux.useSelector)(state => state?.auth?.userInfo);
  const selectedChatData = (0, _reactRedux.useSelector)(state => state?.chat?.selectedChatData);
  const selectedChatType = (0, _reactRedux.useSelector)(state => state?.chat?.selectedChatType);
  const selectedChatMessages = (0, _reactRedux.useSelector)(state => state?.chat?.selectedChatMessages);
  const checkIfImage = filePath => {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  };
  (0, _react.useEffect)(() => {
    if (selectedChatData?.image) {
      setImage(`http://localhost:3004/${selectedChatData.image}`);
    }
  }, [selectedChatData?.image]);
  (0, _react.useEffect)(() => {
    // Calculate the count of file URLs when `selectedChatMessages` changes
    const count = selectedChatMessages?.reduce((acc, item) => {
      if (item.messageType === "file" && checkIfImage(item.fileUrl)) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setLen(count);
  }, [selectedChatMessages]);
  (0, _react.useEffect)(() => {
    const getGroupDetails = async () => {
      const resp = await _axios.default.get(`http://localhost:3004/api/channel/getUserChannelsWithMembers`, {
        params: {
          channelId: selectedChatData?._id
        },
        withCredentials: true
      });
      if (resp?.data?.members) {
        // const members = resp.data.channels.flatMap(channel => channel.members);
        console.log("Group Members:", resp?.data?.members);
        setGroupMember(resp?.data?.members);
      }
    };
    getGroupDetails();
  }, [selectedChatData?._id, setGroupMember]);
  const handleGroupMember = item => {
    dispatch((0, _chatIndex.setSelectedChatData)(item));
    dispatch((0, _chatIndex.setSelectedChatType)("contact"));
    dispatch((0, _chatIndex.setChatDetails)(false));
  };
  // console.log("selectedChatData", selectedChatData);
  console.log("group", groupMember);
  console.log("chatData", selectedChatData);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "h-[100vh]  fixed top-0 w-[100vw]  border-l-2 bg-[#1c1d25] lg:max-w-[50vw] text-white md:static flex flex-col  md:flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-5 items-center px-5 h-[10vh] bg-[#1c1d20] "
  }, /*#__PURE__*/React.createElement(_ri.RiCloseFill, {
    onClick: () => {
      dispatch((0, _chatIndex.setChatDetails)(false));
    },
    className: "h-8 text-white/50 w-8"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[20px]"
  }, selectedChatType === "contact" ? "Contact Info" : "Group Info")), /*#__PURE__*/React.createElement("div", {
    className: "overflow-y-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full mt-5 w-32 md:w-48 md:h-48 mx-auto relative items-center flex justify-center"
  }, /*#__PURE__*/React.createElement(_avatar.Avatar, {
    className: "h-32 w-32 rounded-full overflow-hidden md:w-48 md:h-48"
  }, image ? /*#__PURE__*/React.createElement(_avatar.AvatarImage, {
    src: image,
    className: "object-cover w-full h-full bg-black"
  }) : /*#__PURE__*/React.createElement("div", {
    className: "uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center"
  }, "CN"))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center mt-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col p-3 gap-2 items-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[25px]"
  }, selectedChatType === "contact" ? `
                          ${selectedChatData?.firstName} ${selectedChatData?.lastName}` : `${selectedChatData?.name}`), selectedChatType === "contact" ? /*#__PURE__*/React.createElement("span", {
    className: "text-[25px]"
  }, selectedChatData?.email) : /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "Group Members"), /*#__PURE__*/React.createElement("span", null, selectedChatData?.members?.length)))), /*#__PURE__*/React.createElement("div", {
    className: "mt-8 bg-[#1c1d15]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-8 flex flex-col gap-3 h-[15vh]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-500"
  }, "Images and Files"), /*#__PURE__*/React.createElement("span", null, len)), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-5 "
  }, selectedChatMessages?.map?.(item => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, item.messageType === "file" && checkIfImage(item.fileUrl) ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "cursor-pointer flex border-[1px] p-2"
    }, /*#__PURE__*/React.createElement("img", {
      src: `http://localhost:3004/${item.fileUrl}`,
      height: 50,
      width: 50,
      alt: ""
    }))) : "");
  })))), selectedChatType === "channel" && /*#__PURE__*/React.createElement("div", {
    className: "mt-5"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center px-8"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[20px]"
  }, "Group Members"), /*#__PURE__*/React.createElement(_io.IoMdArrowRoundDown, {
    className: "text-[20px]"
  }))), groupMember?.map?.(types => /*#__PURE__*/React.createElement("div", {
    key: types.id,
    onClick: () => {
      if (userInfo?.id !== types?._id) {
        handleGroupMember(types);
      } else {
        alert("You Can't send message to yourself");
      }
    },
    className: `flex pl-10 items-center gap-6 p-2 cursor-pointer ${activeContactId === types._id ? 'bg-blue-500 text-white' : 'hover:bg-neutral-400 hover:bg-opacity-10'}`
  }, /*#__PURE__*/React.createElement(_avatar.Avatar, {
    className: "h-12 w-12  rounded-full overflow-hidden"
  }, types.image ? /*#__PURE__*/React.createElement(_avatar.AvatarImage, {
    src: `http://localhost:3004/${types?.image}`,
    className: "object-cover w-full h-full bg-black"
  }) : /*#__PURE__*/React.createElement("div", {
    className: `uppercase h-12 w-12 text-lg boder-[1px] flex items-center justify-center `
  }, types.firstName && types.lastName ? `${types.firstName.toUpperCase()}${types.lastName.toUpperCase()}` : types.name ? types.name.toUpperCase() : types.email ? types.email.toUpperCase() : "")), /*#__PURE__*/React.createElement("span", {
    className: "text-white"
  }, userInfo?.id === types?._id ? "You" : `${types.firstName && types.lastName ? `${types.firstName} ${types.lastName}` : types.name ? types.name : types.email ? types.email : ""}`)))))));
};
exports.ChatDetails = ChatDetails;