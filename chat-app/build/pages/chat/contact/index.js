"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contacts = void 0;
var _direactMsg = require("./direactMsg");
var _profile = require("./profile");
var _chat = _interopRequireDefault(require("../../../assests/chat.png"));
var _io = require("react-icons/io5");
var _ModalNewContact = require("./ModalNewContact");
var _react = require("react");
var _reactRedux = require("react-redux");
var _chatIndex = require("@/store/reducers/chatIndex");
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Contacts = () => {
  const dispatch = (0, _reactRedux.useDispatch)();
  (0, _react.useEffect)(() => {
    const fetchData = async () => {
      try {
        // Fetch contacts for DM
        const contactResp = await _axios.default.get('https://chat-application-4std.onrender.com/api/contacts/getContactsForDM', {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        const contacts = contactResp.data?.contacts || [];

        // Fetch user channels
        const channelResp = await _axios.default.get('https://chat-application-4std.onrender.com/api/channel/getUserChannel', {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        const channels = channelResp.data?.channels || [];

        // Merge contacts and channels
        const combinedData = [...contacts, ...channels];
        dispatch((0, _chatIndex.setContacts)(combinedData));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [dispatch, _chatIndex.setContacts]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "relative  bg-[#1b1c24] border-r-2 border-[#2f303b] md:w-[35vw] lg:w-[40vw] xl:w-[20vw] w-full"
  }, /*#__PURE__*/React.createElement("img", {
    src: _chat.default,
    className: "h-15 mx-auto  object-contain mt-2 w-20",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between  w-full flex-col gap-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between  w-full pr-10"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "uppercase tracking-widest text-neutral-400 pl-10 font-bold text-opacity-90 text-sm"
  }, "Direct Message"), /*#__PURE__*/React.createElement(_ModalNewContact.ModalNewContact, null)), /*#__PURE__*/React.createElement("div", {
    className: " overflow-y-auto scrollbar-hidden w-full"
  }, /*#__PURE__*/React.createElement(_direactMsg.DirectMsg, null))), /*#__PURE__*/React.createElement(_profile.ProfileContact, null)));
};
exports.Contacts = Contacts;