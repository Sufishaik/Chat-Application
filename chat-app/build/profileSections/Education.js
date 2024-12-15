"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Education = void 0;
var _button = require("@/components/ui/button");
var _select = require("@/components/ui/select");
var _react = require("react");
const Education = _ref => {
  let {
    item,
    setEdit,
    edit,
    handleRemoveQualification,
    qualifications,
    handleAddQualification,
    setQualifications
  } = _ref;
  const [qualificationData, setQualificationData] = (0, _react.useState)(qualifications.map(qualification => ({
    id: qualification.id,
    degree: "",
    course: "",
    year: ""
  })));
  const handleUpdateQualification = (id, field, value) => {
    setQualificationData(prev => prev.map(qual => qual.id === id ? {
      ...qual,
      [field]: value
    } : qual));
  };
  const handleSaveChanges = () => {
    console.log("Updated Qualifications: ", qualificationData);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, edit ? /*#__PURE__*/React.createElement("div", {
    className: " px-5 w-[100vw] lg:w-[40vw]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-3 w-[50vw]"
  }, /*#__PURE__*/React.createElement("p", null, item.university_name), /*#__PURE__*/React.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React.createElement("p", null, item.degree), ",", /*#__PURE__*/React.createElement("p", null, item.year_of_passing)))) : item.title === "Education" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "px-5 w-[100vw] flex flex-col gap-5 lg:w-[40vw]"
  }, /*#__PURE__*/React.createElement("p", null, "Enter your educational qualifications:"), qualifications?.map?.((qualification, index) => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2"
    }, /*#__PURE__*/React.createElement("p", null, "Degree ", index === 0 ? "" : index + 1), index !== 0 && /*#__PURE__*/React.createElement("span", {
      className: "cursor-pointer",
      onClick: () => handleRemoveQualification(qualification.id)
    }, "(remove degree)")), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-3"
    }, /*#__PURE__*/React.createElement(_select.Select, {
      value: qualification.degree,
      onValueChange: value => handleUpdateQualification(qualification.id, "degree", value)
    }, /*#__PURE__*/React.createElement(_select.SelectTrigger, {
      className: "w-[280px]"
    }, /*#__PURE__*/React.createElement(_select.SelectValue, {
      placeholder: "Select Degree"
    })), /*#__PURE__*/React.createElement(_select.SelectContent, {
      className: "bg-[white]"
    }, /*#__PURE__*/React.createElement(_select.SelectGroup, null, /*#__PURE__*/React.createElement(SelectItem, {
      value: "BSC"
    }, "BSC"), /*#__PURE__*/React.createElement(SelectItem, {
      value: "HSC"
    }, "HSC"), /*#__PURE__*/React.createElement(SelectItem, {
      value: "MCS"
    }, "MCS")))), /*#__PURE__*/React.createElement(_select.Select, {
      value: qualification.course,
      onValueChange: value => handleUpdateQualification(qualification.id, "course", value)
    }, /*#__PURE__*/React.createElement(_select.SelectTrigger, {
      className: "w-[280px]"
    }, /*#__PURE__*/React.createElement(_select.SelectValue, {
      placeholder: "Select Course"
    })), /*#__PURE__*/React.createElement(_select.SelectContent, {
      className: "bg-[white]"
    }, /*#__PURE__*/React.createElement(_select.SelectGroup, null, /*#__PURE__*/React.createElement(SelectItem, {
      value: "Computer Science"
    }, "Computer Science"), /*#__PURE__*/React.createElement(SelectItem, {
      value: "Commerce"
    }, "Commerce"), /*#__PURE__*/React.createElement(SelectItem, {
      value: "Civil Engineering"
    }, "Civil Engineering"), /*#__PURE__*/React.createElement(SelectItem, {
      value: "Chemistry"
    }, "Chemistry")))), /*#__PURE__*/React.createElement(_select.Select, {
      value: qualification.year,
      onValueChange: value => handleUpdateQualification(qualification.id, "year", value)
    }, /*#__PURE__*/React.createElement(_select.SelectTrigger, {
      className: "w-[280px]"
    }, /*#__PURE__*/React.createElement(_select.SelectValue, {
      placeholder: "Select Year"
    })), /*#__PURE__*/React.createElement(_select.SelectContent, {
      className: "bg-[white]"
    }, /*#__PURE__*/React.createElement(_select.SelectGroup, null, /*#__PURE__*/React.createElement(SelectItem, {
      value: "2023"
    }, "2023"), /*#__PURE__*/React.createElement(SelectItem, {
      value: "2024"
    }, "2024"), /*#__PURE__*/React.createElement(SelectItem, {
      value: "2025"
    }, "2025"), /*#__PURE__*/React.createElement(SelectItem, {
      value: "2026"
    }, "2026"), /*#__PURE__*/React.createElement(SelectItem, {
      value: "2027"
    }, "2027"), /*#__PURE__*/React.createElement(SelectItem, {
      value: "2028"
    }, "2028"))))));
  }), /*#__PURE__*/React.createElement("p", {
    className: "flex justify-end cursor-pointer",
    onClick: handleAddQualification
  }, "+ Add another qualification"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement(_button.Button, {
    onClick: handleSaveChanges
  }, "Save Changes"), /*#__PURE__*/React.createElement(_button.Button, {
    onClick: () => {
      setQualifications([{
        id: 1
      }]);
      setEdit(null);
    }
  }, "Cancle")))) : null);
};
exports.Education = Education;