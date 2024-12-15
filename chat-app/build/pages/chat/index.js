"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Chat = void 0;
var _reactRedux = require("react-redux");
var _chats = require("./chats");
var _contact = require("./contact");
var _reactRouterDom = require("react-router-dom");
var _react = require("react");
var _sonner = require("sonner");
var _ChatDetails = require("./ChatDetailsPage/ChatDetails");
var _chatIndex = require("@/store/reducers/chatIndex");
const Chat = () => {
  const userInfo = (0, _reactRedux.useSelector)(state => state?.auth?.userInfo);
  const selectedChatType = (0, _reactRedux.useSelector)(state => state?.chat?.selectedChatType);
  const chatDetails = (0, _reactRedux.useSelector)(state => state?.chat?.chatDetails);
  const navigate = (0, _reactRouterDom.useNavigate)();
  (0, _react.useEffect)(() => {
    if (!userInfo?.profileSetup) {
      (0, _sonner.toast)("Please Setup your profile to continue");
      navigate("/profile");
    }
  }, [userInfo, navigate, _chatIndex.setSelectedChatData, _chatIndex.setSelectedChatType]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "h-[100vh]  overflow-hidden flex"
  }, /*#__PURE__*/React.createElement(_contact.Contacts, null), selectedChatType === undefined ? "" : /*#__PURE__*/React.createElement(_chats.Chats, null), selectedChatType === undefined || !chatDetails ? "" : /*#__PURE__*/React.createElement(_ChatDetails.ChatDetails, null)));
};
exports.Chat = Chat;