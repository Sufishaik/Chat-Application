"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectMsg = void 0;
var _avatar = require("@/components/ui/avatar");
var _chatIndex = require("@/store/reducers/chatIndex");
var _react = require("react");
var _reactRedux = require("react-redux");
const DirectMsg = () => {
  const contacts = (0, _reactRedux.useSelector)(state => state?.chat?.contacts);
  const [activeContactId, setActiveContactId] = (0, _react.useState)(null);
  const selectedChatData = (0, _reactRedux.useSelector)(state => state?.chat?.selectedChatData);
  const selectedChatType = (0, _reactRedux.useSelector)(state => state?.chat?.selectedChatType);
  const dispatch = (0, _reactRedux.useDispatch)();
  const handleChannel = (0, _react.useMemo)(() => contact => {
    const isContact = contact?.firstName;

    // Determine the type and data for the selected chat
    const chatType = isContact ? "contact" : "channel";

    // Dispatch the type and data
    dispatch((0, _chatIndex.setSelectedChatType)(chatType));
    dispatch((0, _chatIndex.setSelectedChatData)(contact));
    setActiveContactId(contact._id);
    dispatch((0, _chatIndex.resetMessageCount)({
      contact: contact._id
    }));
    dispatch((0, _chatIndex.resetUnread)({
      contactId: contact._id
    }));
    // Clear messages if switching to a new chat
    if (selectedChatData && selectedChatData._id !== contact._id) {
      dispatch((0, _chatIndex.setSelectedChatMessages)([]));
    }
  }, [_chatIndex.setSelectedChatData, _chatIndex.setSelectedChatType, dispatch, contacts] // Dependency array to ensure fresh state on every update
  );
  (0, _react.useEffect)(() => {
    if (contacts?.length > 0) {
      dispatch((0, _chatIndex.setContacts)(contacts));
    }
  }, [contacts, dispatch, selectedChatData, selectedChatType]);
  console.log("contacts", contacts);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: ""
  }, contacts?.map?.(types => /*#__PURE__*/React.createElement("div", {
    key: types.id,
    onClick: () => handleChannel(types),
    className: `flex pl-10 items-center gap-6 p-2 cursor-pointer hover:bg-blue-500 hover:bg-opacity-10
                        ${activeContactId === types._id ? 'bg-blue-500 text-white' : types.unread ? 'bg-blue-900 text-white' // Highlight for unread messages
    : 'hover:bg-neutral-400 hover:bg-opacity-10'}`
  }, /*#__PURE__*/React.createElement(_avatar.Avatar, {
    className: "h-12 w-12  rounded-full overflow-hidden"
  }, types.image ? /*#__PURE__*/React.createElement(_avatar.AvatarImage, {
    src: `https://chat-application-4std.onrender.com/${types?.image}`,
    className: "object-cover w-full h-full bg-black"
  }) : /*#__PURE__*/React.createElement("div", {
    className: `uppercase h-12 w-12 text-lg boder-[1px] flex items-center justify-center `
  }, types.firstName && types.lastName ? `${types.firstName.toUpperCase()}${types.lastName.toUpperCase()}` : types.name ? types.name.toUpperCase() : types.email ? types.email.toUpperCase() : "")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-[5rem]  items-center justify-center"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white"
  }, `${types.firstName && types.lastName ? `${types.firstName} ${types.lastName}` : types.name ? types.name : types.email ? types.email : ""}`), types?.messageCount > 0 && /*#__PURE__*/React.createElement("span", {
    className: "bg-red-600 text-white text-[12px] px-[15px] rounded-[15px]"
  }, types.messageCount))))));
};
exports.DirectMsg = DirectMsg;