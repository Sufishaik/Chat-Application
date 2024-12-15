"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalNewContact = void 0;
var _avatar = require("@/components/ui/avatar");
var _dialog = require("@/components/ui/dialog");
var _input = require("@/components/ui/input");
var _multipleselect = _interopRequireDefault(require("@/components/ui/multipleselect"));
var _scrollArea = require("@/components/ui/scroll-area");
var _tooltip = require("@/components/ui/tooltip");
var _chatIndex = require("@/store/reducers/chatIndex");
var _react = require("react");
var _io = require("react-icons/io5");
var _reactRedux = require("react-redux");
var _channels = _interopRequireDefault(require("./channels"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ModalNewContact = () => {
  const [openNewContactModal, setOpenNewContactModal] = (0, _react.useState)(false);
  const [searchedContacts, setSearchedContact] = (0, _react.useState)([]);
  const types = (0, _reactRedux.useSelector)(state => state?.chat?.selectedChatData);
  const selectedChatType = (0, _reactRedux.useSelector)(state => state?.chat?.selectedChatType);
  const [openChannelModal, setOpenChannelModal] = (0, _react.useState)(false);
  // const [seatchedContact, setSearchedContact] = useState([]);

  const dispatch = (0, _reactRedux.useDispatch)();
  const searchContacts = async searchTerm => {
    try {
      if (searchTerm.length > 0) {
        const resp = await fetch('http://localhost:3004/api/auth/searchTerm', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            searchTerm
          })
        });
        const data = await resp.json();
        if (resp.status === 200 && data?.contacts) {
          setSearchedContact(data?.contacts);
        }
      } else {
        setSearchedContact([]);
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  const handleContactSelect = item => {
    setOpenNewContactModal(false);
    dispatch((0, _chatIndex.setSelectedChatData)(item));
    dispatch((0, _chatIndex.setSelectedChatType)("contact"));
    setSearchedContact([]);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_tooltip.TooltipProvider, null, /*#__PURE__*/React.createElement(_tooltip.Tooltip, null, /*#__PURE__*/React.createElement(_tooltip.TooltipTrigger, {
    className: "bg-[#1b1c24] border-none"
  }, /*#__PURE__*/React.createElement(_io.IoAddOutline, {
    onClick: () => {
      setOpenNewContactModal(true);
    },
    className: "h-8 w-8 text-white/80 bg-[#1b1c24] cursor-pointer duration-300 transition-all "
  })), /*#__PURE__*/React.createElement(_tooltip.TooltipContent, null, "Select New Contact"))), /*#__PURE__*/React.createElement(_dialog.Dialog, {
    open: openNewContactModal,
    onOpenChange: setOpenNewContactModal,
    className: ""
  }, /*#__PURE__*/React.createElement(_dialog.DialogContent, {
    className: "bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col"
  }, /*#__PURE__*/React.createElement(_dialog.DialogHeader, null, /*#__PURE__*/React.createElement(_dialog.DialogTitle, null, "Please Select a Contact")), /*#__PURE__*/React.createElement(_dialog.DialogHeader, null, /*#__PURE__*/React.createElement(_dialog.DialogTitle, {
    onClick: () => {
      setOpenNewContactModal(false);
      setOpenChannelModal(true);
    }
  }, "Create a Group")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(_input.Input, {
    placeholder: "Search for Contact",
    onChange: e => searchContacts(e.target.value),
    className: "rounded-lg p-6 bg-[#2c2e3b] border-none"
  })), searchedContacts.length > 0 && /*#__PURE__*/React.createElement(_scrollArea.ScrollArea, {
    className: "h-[250px]"
  }, searchedContacts?.map?.(item => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      onClick: () => handleContactSelect(item),
      className: "flex gap-4 mb-5 items-center cursor-pointer"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-12 h-12 relative"
    }, /*#__PURE__*/React.createElement(_avatar.Avatar, {
      className: "h-12 w-12 rounded-full overflow-hidden"
    }, item?.image ? /*#__PURE__*/React.createElement(_avatar.AvatarImage, {
      className: "object-cover w-full h-full bg-black ",
      src: `http://localhost:3004/${item?.image}`
    }) : /*#__PURE__*/React.createElement("div", {
      className: "uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center"
    }, item?.firstName ? item?.firstName.split("").shift() : item?.email?.split("").shift()))), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col"
    }, /*#__PURE__*/React.createElement("span", null, item?.firstName && item?.lastName ? `${item.firstName} ${item.lastName}` : item.email), /*#__PURE__*/React.createElement("span", {
      className: "text-xs"
    }, item?.email))));
  })))), /*#__PURE__*/React.createElement(_channels.default, {
    setOpenChannelModal: setOpenChannelModal,
    openChannelModal: openChannelModal
  }));
};
exports.ModalNewContact = ModalNewContact;