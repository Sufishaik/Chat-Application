"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;
var _avatar = require("@/components/ui/avatar");
var _chatIndex = require("@/store/reducers/chatIndex");
var _ri = require("react-icons/ri");
var _reactRedux = require("react-redux");
const Header = () => {
  const dispatch = (0, _reactRedux.useDispatch)();
  const selectedChatType = (0, _reactRedux.useSelector)(state => state?.chat?.selectedChatType);
  const types = (0, _reactRedux.useSelector)(state => state?.chat?.selectedChatData);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "border-b-2 border-[#2f303b] h-[10vh] px-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-5 items-center justify-center cursor-pointer",
    onClick: () => {
      dispatch((0, _chatIndex.setChatDetails)(true));
    }
  }, /*#__PURE__*/React.createElement(_avatar.Avatar, {
    className: "h-12 w-12  rounded-full overflow-hidden "
  }, types && types?.image ? /*#__PURE__*/React.createElement(_avatar.AvatarImage, {
    src: `https://chat-application-4std.onrender.com/${types?.image}`,
    className: "object-cover w-full h-full bg-black"
  }) : /*#__PURE__*/React.createElement("div", {
    className: `uppercase h-12 w-12 text-lg boder-[1px] flex items-center justify-center `
  }, selectedChatType === "contact" ? types?.firstName ? types.firstName.split("").shift() : types?.email?.split("").shift() : types?.name)), /*#__PURE__*/React.createElement("span", {
    className: "text-white"
  }, `${selectedChatType === "contact" ? types?.firstName : types?.name} ${selectedChatType === "contact" ? types?.lastName : ""}`)), /*#__PURE__*/React.createElement(_ri.RiCloseFill, {
    className: "h-8 text-white/50 w-8",
    onClick: () => dispatch((0, _chatIndex.closeChat)())
  }))));
};
exports.Header = Header;