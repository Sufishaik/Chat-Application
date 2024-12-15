"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobPreferences = void 0;
var _button = require("@/components/ui/button");
var _multipleselect = _interopRequireDefault(require("@/components/ui/multipleselect"));
var _select = require("@/components/ui/select");
var _axios = _interopRequireDefault(require("axios"));
var _react = require("react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const JobPreferences = _ref => {
  let {
    item,
    fetchData,
    edit,
    setEdit,
    working_values,
    setSelectedWorkingValues,
    selectedWorkingValue
  } = _ref;
  const [location, setLocation] = (0, _react.useState)("");
  const [openToWorking, setOpenToWorking] = (0, _react.useState)(selectedWorkingValue);
  const [currentSalary, setCurrentSalary] = (0, _react.useState)("");
  const [noticePeriod, setNoticePeriod] = (0, _react.useState)("");
  const handleSave = async () => {
    const str = openToWorking?.map?.(val => val?.label);
    const editData = {
      location,
      open_to_working: str.toString(),
      title: "Job Preferences",
      current_salary: currentSalary,
      notice_period: noticePeriod
    };
    const resp = await _axios.default.put('http://localhost:3030/posts/1', editData, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    if (resp.data) {
      console.log("Updated Successfully", resp.data);
      setLocation("");
      setOpenToWorking([]);
      setCurrentSalary("");
      setNoticePeriod("");
      setEdit(null);
      fetchData();
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, edit ? /*#__PURE__*/React.createElement("div", {
    className: " px-5 w-[100vw] lg:w-[40vw]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2 mt-3 w-[50vw]"
  }, /*#__PURE__*/React.createElement("p", null, "Currently located in ", item.location), /*#__PURE__*/React.createElement("p", null, "Only willing to work in ", item.open_to_working), /*#__PURE__*/React.createElement("p", null, "Current Salary Rs. ", item.current_salary), /*#__PURE__*/React.createElement("p", null, "Can start working ", item.notice_period))) : item.title === "Job Preferences" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "px-5 w-[100vw] flex flex-col gap-5 lg:w-[40vw]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2"
  }, /*#__PURE__*/React.createElement("p", null, "Where are you currently located?"), /*#__PURE__*/React.createElement(_select.Select, {
    onValueChange: setLocation
  }, /*#__PURE__*/React.createElement(_select.SelectTrigger, {
    className: "w-[280px]"
  }, /*#__PURE__*/React.createElement(_select.SelectValue, {
    placeholder: "Select your location"
  })), /*#__PURE__*/React.createElement(_select.SelectContent, {
    className: "bg-[white]"
  }, /*#__PURE__*/React.createElement(_select.SelectGroup, null, /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "India"
  }, "India"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "China"
  }, "China"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Singapur"
  }, "Singapure"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "London"
  }, "London"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Canada"
  }, "Canada"))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col "
  }, /*#__PURE__*/React.createElement("p", null, "Where are you open to working?"), /*#__PURE__*/React.createElement(_multipleselect.default, {
    className: "rounded-lg   border-none py-2 bg-none",
    options: working_values,
    onChange: values => {
      setOpenToWorking(values);
      setSelectedWorkingValues(values);
    },
    placeholder: "Search work availability",
    value: openToWorking
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2"
  }, /*#__PURE__*/React.createElement("p", null, "What is your current annual salary? Don't specify offer in hand here."), /*#__PURE__*/React.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-[50px] border-[1px] h-[30px] bg-gray-200 rounded-[2px] text-center"
  }, "Rs."), /*#__PURE__*/React.createElement("input", {
    type: "number",
    name: "",
    id: "",
    className: "w-[100px] text-center",
    value: currentSalary,
    onChange: e => setCurrentSalary(e.target.value)
  }), /*#__PURE__*/React.createElement("span", {
    className: "w-[50px] h-[30px] bg-gray-200 rounded-[2px] text-center"
  }, "LPA"))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2"
  }, /*#__PURE__*/React.createElement("p", null, "What is your notice period?"), /*#__PURE__*/React.createElement(_select.Select, {
    onValueChange: setNoticePeriod
  }, /*#__PURE__*/React.createElement(_select.SelectTrigger, {
    className: "w-[280px]"
  }, /*#__PURE__*/React.createElement(_select.SelectValue, {
    placeholder: "Select Notice Period"
  })), /*#__PURE__*/React.createElement(_select.SelectContent, {
    className: "bg-[white]"
  }, /*#__PURE__*/React.createElement(_select.SelectGroup, null, /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "15 days"
  }, "Immediately"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "15 days"
  }, "15 days"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "1 month"
  }, "1 month"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "2 months"
  }, "2 months"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "3+ months"
  }, "3+ months"))))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(_button.Button, {
    onClick: handleSave
  }, "Save Changes"), /*#__PURE__*/React.createElement(_button.Button, {
    onClick: () => setEdit(null)
  }, "Cancle")))) : null);
};
exports.JobPreferences = JobPreferences;