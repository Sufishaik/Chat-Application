"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chats = void 0;
var _reactRedux = require("react-redux");
var _header = require("./header");
var _messages = require("./messages");
var _sendbtn = require("./sendbtn");
const Chats = () => {
  const chatDetails = (0, _reactRedux.useSelector)(state => state?.chat?.chatDetails);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: `h-[100vh] fixed top-0 w-[100vw] bg-[#1c1d25] ${chatDetails ? "lg:max-w-[50vw] lg:min-w-[35vw] md:static md:hidden lg:flex " : "md:static"} flex flex-col  md:flex-1`
  }, /*#__PURE__*/React.createElement(_header.Header, null), /*#__PURE__*/React.createElement(_messages.Messages, null), /*#__PURE__*/React.createElement(_sendbtn.SendBTN, null)));
};
exports.Chats = Chats;