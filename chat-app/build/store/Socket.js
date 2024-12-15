"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSocketContext = exports.SocketProvider = void 0;
var _react = require("react");
var _reactRedux = require("react-redux");
var _socket = require("socket.io-client");
var _chatIndex = require("./reducers/chatIndex");
const SocketContext = /*#__PURE__*/(0, _react.createContext)(null);
const useSocketContext = () => {
  return (0, _react.useContext)(SocketContext);
};
exports.useSocketContext = useSocketContext;
const SocketProvider = _ref => {
  let {
    children
  } = _ref;
  const selectedChatData = (0, _reactRedux.useSelector)(state => state?.chat?.selectedChatData);
  const ChatData = (0, _reactRedux.useSelector)(state => state?.chat);
  const selectedChatType = (0, _reactRedux.useSelector)(state => state?.chat?.selectedChatType);
  const forceUpdate = (0, _react.useState)()[1]; // Used to force a re-render
  const dispatch = (0, _reactRedux.useDispatch)();
  const userInfo = (0, _reactRedux.useSelector)(state => state.auth.userInfo);
  const socket = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    if (userInfo) {
      socket.current = (0, _socket.io)("http://localhost:3004", {
        withCredentials: true,
        query: {
          userId: userInfo?.id
        }
      });
      socket.current.on("connect", () => {
        console.log("Connected state:", socket.current.connected);
      });
      socket.current.on("contactUpdated", data => {
        console.log('Received updated contacts:', data);
      });
      const handleReceiveMessage = message => {
        if (selectedChatType !== undefined && (selectedChatData._id === message.sender?._id || selectedChatData._id === message.recipient?._id)) {
          dispatch((0, _chatIndex.addMessage)({
            message,
            userInfo
          }));
        }
        dispatch((0, _chatIndex.addContactDMContact)({
          message,
          userInfo
        }));
      };
      const handleChannelReceiveMessage = message => {
        if (selectedChatType !== undefined && selectedChatData._id === message.channelId) {
          dispatch((0, _chatIndex.addMessage)({
            message,
            userInfo
          }));
        }
        dispatch((0, _chatIndex.addContactDMContact)({
          message,
          userInfo
        }));
      };
      socket.current.on("receiveMessage", handleReceiveMessage);
      socket.current.on("recieveChannelMessage", handleChannelReceiveMessage);
      return () => {
        if (socket.current) {
          socket.current.disconnect();
        }
      };
    }
  }, [userInfo, selectedChatData, selectedChatType, dispatch, _chatIndex.setSelectedChatData, _chatIndex.setSelectedChatType, selectedChatData?._id]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SocketContext.Provider, {
    value: socket.current
  }, children));
};
exports.SocketProvider = SocketProvider;