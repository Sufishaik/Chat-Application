"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiversityInfo = void 0;
var _button = require("@/components/ui/button");
var _select = require("@/components/ui/select");
var _react = require("react");
const DiversityInfo = _ref => {
  let {
    item,
    setEdit,
    edit
  } = _ref;
  const [formData, setFormData] = (0, _react.useState)({
    gender: "",
    disabilityStatus: "",
    identificationOptions: [],
    workPermit: ""
  });
  const handleCheckboxChange = (key, value) => {
    setFormData(prev => {
      const updatedArray = prev[key].includes(value) ? prev[key].filter(item => item !== value) : [...prev[key], value];
      return {
        ...prev,
        [key]: updatedArray
      };
    });
  };
  const handleInputChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, edit ? /*#__PURE__*/React.createElement("div", {
    className: " px-5 w-[100vw] lg:w-[40vw] mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/React.createElement("p", null, "Gender is ", item.gender), /*#__PURE__*/React.createElement("p", null, "Disability status ", item.disability_status), /*#__PURE__*/React.createElement("p", null, "Have work permits fo ", item.work_permit))) : item.title === "Diversity information" ? /*#__PURE__*/React.createElement("div", {
    className: "px-5 w-[100vw] flex flex-col gap-5 lg:w-[40vw]"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "Companies often encourage diversity and inclusion in the workplace and may be actively seeking candidates from diverse backgrounds."), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 flex flex-col"
  }, /*#__PURE__*/React.createElement("p", null, "What is your gender?"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "",
    id: "",
    value: "Female",
    checked: formData.gender === "Female",
    onChange: () => handleInputChange("gender", "Female")
  }), /*#__PURE__*/React.createElement("span", null, "Female")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "",
    id: "",
    value: "Male",
    checked: formData.gender === "Male",
    onChange: () => handleInputChange("gender", "Male")
  }), /*#__PURE__*/React.createElement("span", null, "Male"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 flex flex-col"
  }, /*#__PURE__*/React.createElement("p", null, "Do you have any disabilities?"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "",
    id: "",
    value: "Yes",
    checked: formData.disabilityStatus === "Yes",
    onChange: () => handleInputChange("disabilityStatus", "Yes")
  }), /*#__PURE__*/React.createElement("span", null, "Yes")), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "",
    id: "",
    value: "No",
    checked: formData.disabilityStatus === "No",
    onChange: () => handleInputChange("disabilityStatus", "No")
  }), /*#__PURE__*/React.createElement("span", null, "No"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 flex flex-col"
  }, /*#__PURE__*/React.createElement("p", null, "Do you identify yourself with any of these options?"), ["Single parent", "Immigrant", "Retired (60+)"].map(option => /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2",
    key: option
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    value: option,
    checked: formData.identificationOptions.includes(option),
    onChange: () => handleCheckboxChange("identificationOptions", option)
  }), /*#__PURE__*/React.createElement("span", null, option)))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2 mt-2"
  }, /*#__PURE__*/React.createElement("p", null, "In which countries are you permitted to work?"), /*#__PURE__*/React.createElement(_select.Select, {
    onValueChange: value => handleInputChange("workPermit", value)
  }, /*#__PURE__*/React.createElement(_select.SelectTrigger, {
    className: "w-[280px]"
  }, /*#__PURE__*/React.createElement(_select.SelectValue, {
    placeholder: "Select Countries for which you have a work permit"
  })), /*#__PURE__*/React.createElement(_select.SelectContent, {
    className: "bg-[white]"
  }, /*#__PURE__*/React.createElement(_select.SelectGroup, null, /*#__PURE__*/React.createElement(_select.SelectLabel, null, "Countries"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "India"
  }, "India"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "China"
  }, "China"), /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Dubai"
  }, "Dubai")))))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(_button.Button, {
    onClick: () => {
      console.log("Saved Data:", formData);
      setEdit(null);
    }
  }, "Save Changes"), /*#__PURE__*/React.createElement(_button.Button, {
    onClick: () => setEdit(null)
  }, "Cancle"))) : null);
};
exports.DiversityInfo = DiversityInfo;