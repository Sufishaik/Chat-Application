"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _button = require("@/components/ui/button");
var _dialog = require("@/components/ui/dialog");
var _input = require("@/components/ui/input");
var _multipleselect = _interopRequireDefault(require("@/components/ui/multipleselect"));
var _scrollArea = require("@/components/ui/scroll-area");
var _tooltip = require("@/components/ui/tooltip");
var _chatIndex = require("@/store/reducers/chatIndex");
var _axios = _interopRequireDefault(require("axios"));
var _react = _interopRequireWildcard(require("react"));
var _fa = require("react-icons/fa");
var _reactLottie = _interopRequireDefault(require("react-lottie"));
var _reactRedux = require("react-redux");
var _reactRouterDom = require("react-router-dom");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Channel(_ref) {
  let {
    openChannelModal,
    setOpenChannelModal
  } = _ref;
  const dispatch = (0, _reactRedux.useDispatch)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const [allContacts, setAllContacts] = (0, _react.useState)([]);
  const [selectedContacts, setSelectedContacts] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    const getMessages = async () => {
      try {
        const resp = await _axios.default.get('https://chat-application-4std.onrender.com/api/contacts/getAllContacts', {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        if (resp?.data?.contacts) {
          setAllContacts(resp.data.contacts);
        } else {
          console.warn("No messages found in the response");
        }
      } catch (err) {
        console.error("Error fetching messages", err);
      }
    };
    getMessages();
  }, []);
  const handleChannelCreate = async () => {
    try {
      if (selectedContacts.length > 0) {
        const resp = await _axios.default.post('https://chat-application-4std.onrender.com/api/channel/createChannel', {
          members: selectedContacts?.map?.(contact => contact.value)
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        });
        if (resp?.data?.channel) {
          dispatch((0, _chatIndex.setSelectedChannelContacts)(selectedContacts));
          dispatch((0, _chatIndex.addchannel)({
            ...resp.data.channel
          }));
          setSelectedContacts([]);
          setOpenChannelModal(false);
          navigate("/groupprofile");
        } else {
          console.warn("No messages found in the response");
          dispatch(setSelectedChatMessages([])); // Reset to empty
        }
      }
    } catch (err) {
      console.log("Error creating channel", err);
    }
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_dialog.Dialog, {
    open: openChannelModal,
    onOpenChange: () => {
      setOpenChannelModal(false);
    }
  }, /*#__PURE__*/_react.default.createElement(_dialog.DialogContent, {
    className: "bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col"
  }, /*#__PURE__*/_react.default.createElement(_dialog.DialogHeader, null, /*#__PURE__*/_react.default.createElement(_dialog.DialogTitle, null, "Please Select a contact to create a group"), /*#__PURE__*/_react.default.createElement(_dialog.DialogDescription, null)), /*#__PURE__*/_react.default.createElement("div", {
    className: "relative h-[100vh]"
  }, /*#__PURE__*/_react.default.createElement(_multipleselect.default, {
    onChange: setSelectedContacts,
    value: selectedContacts,
    placeholder: "Search Contacts",
    defaultOptions: allContacts,
    className: "rounded-lg  border-none py-2 bg-none",
    emptyIndicator: /*#__PURE__*/_react.default.createElement("p", {
      className: "text-center text-lg leading-10 text-gray-600"
    }, "No result found")
  }), /*#__PURE__*/_react.default.createElement(_button.Button, {
    className: "bottom-0 absolute w-full",
    onClick: handleChannelCreate
  }, "Create Channel")))));
}
var _default = exports.default = Channel;