"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkExperience = void 0;
var _button = require("@/components/ui/button");
var _select = require("@/components/ui/select");
var _react = require("react");
const WorkExperience = _ref => {
  let {
    item,
    edit,
    setEdit
  } = _ref;
  const [workExperience, setWorkExperience] = (0, _react.useState)({
    yearsOfExperience: "",
    currentJobTitle: "",
    currentCompany: "",
    previousCompanies: [],
    industries: []
  });
  const handleInputChange = (field, value) => {
    setWorkExperience(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSaveChanges = () => {
    // Logic to save the updated data or pass it back to the parent
    console.log("Updated Work Experience: ", workExperience);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, edit ? /*#__PURE__*/React.createElement("div", {
    className: " px-5 w-[100vw] lg:w-[40vw]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2 mt-3"
  }, /*#__PURE__*/React.createElement("p", null, "Fresher - Interned at ", item.company_name), /*#__PURE__*/React.createElement("p", null, "Total professional experience of ", item.year_of_exp, " year"), /*#__PURE__*/React.createElement("p", null, "Industry experience in ", item.industry_exp))) : item.title === "Work Experience" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "px-5 w-[100vw] flex flex-col gap-5 lg:w-[40vw]"
  }, /*#__PURE__*/React.createElement("div", null, "Are you currently on career break? ", /*#__PURE__*/React.createElement("span", null, "Update your profile")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2"
  }, /*#__PURE__*/React.createElement("p", null, "How many years of work experience do you have? Don't include internships."), /*#__PURE__*/React.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    name: "",
    id: "",
    value: workExperience.yearsOfExperience,
    onChange: e => handleInputChange("yearsOfExperience", e.target.value),
    className: "w-[100px] text-center"
  }), /*#__PURE__*/React.createElement("span", {
    className: "w-[50px] h-[30px] bg-gray-200 rounded-[2px] text-center"
  }, "years"))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3"
  }, /*#__PURE__*/React.createElement("p", null, "What is your current job title and company?"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(_select.Select, {
    value: workExperience.currentJobTitle,
    onValueChange: value => handleInputChange("currentJobTitle", value)
  }, /*#__PURE__*/React.createElement(_select.SelectTrigger, {
    className: "w-[280px]"
  }, /*#__PURE__*/React.createElement(_select.SelectValue, {
    placeholder: "eg. Software Engineer"
  })), /*#__PURE__*/React.createElement(_select.SelectContent, {
    className: "bg-[white]"
  }, /*#__PURE__*/React.createElement(_select.SelectGroup, null, /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Intern"
  }, "Fresher - Interned")))), /*#__PURE__*/React.createElement(_select.Select, {
    value: workExperience.currentCompany,
    onValueChange: value => handleInputChange("currentCompany", value)
  }, /*#__PURE__*/React.createElement(_select.SelectTrigger, {
    className: "w-[280px]"
  }, /*#__PURE__*/React.createElement(_select.SelectValue, {
    placeholder: "eg. Amazon"
  })), /*#__PURE__*/React.createElement(_select.SelectContent, {
    className: "bg-[white]"
  }, /*#__PURE__*/React.createElement(_select.SelectGroup, null, /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Atomic Loops"
  }, "Atomic Loops")))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2"
  }, /*#__PURE__*/React.createElement("p", null, "Which companies have you previously worked at?"), /*#__PURE__*/React.createElement(_select.Select, {
    value: workExperience.previousCompanies.join(", "),
    onValueChange: value => handleInputChange("previousCompanies", [...workExperience.previousCompanies, value])
  }, /*#__PURE__*/React.createElement(_select.SelectTrigger, {
    className: "w-[280px]"
  }, /*#__PURE__*/React.createElement(_select.SelectValue, {
    placeholder: "eg. Amazon"
  })), /*#__PURE__*/React.createElement(_select.SelectContent, {
    className: "bg-[white]"
  }, /*#__PURE__*/React.createElement(_select.SelectGroup, null, /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Atomic Loops"
  }, "Atomic Loops"))))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2"
  }, /*#__PURE__*/React.createElement("p", null, "Select up to 3 industries your current or previous companies operate in."), /*#__PURE__*/React.createElement(_select.Select, {
    value: workExperience.industries.join(", "),
    onValueChange: value => handleInputChange("industries", [...workExperience.industries, value])
  }, /*#__PURE__*/React.createElement(_select.SelectTrigger, {
    className: "w-[280px]"
  }, /*#__PURE__*/React.createElement(_select.SelectValue, {
    placeholder: "Select or type industries"
  })), /*#__PURE__*/React.createElement(_select.SelectContent, {
    className: "bg-[white]"
  }, /*#__PURE__*/React.createElement(_select.SelectGroup, null, /*#__PURE__*/React.createElement(_select.SelectItem, {
    value: "Computer Software / IT / Internet"
  }, "Computer Software / IT / Internet"))))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(_button.Button, {
    onClick: handleSaveChanges
  }, "Save Changes"), /*#__PURE__*/React.createElement(_button.Button, {
    onClick: () => setEdit(null)
  }, "Cancle")))) : null);
};
exports.WorkExperience = WorkExperience;