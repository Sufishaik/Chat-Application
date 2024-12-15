import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react";

export const DiversityInfo = ({ item, setEdit, edit }) => {
    const [formData, setFormData] = useState({
        gender: "",
        disabilityStatus: "",
        identificationOptions: [],
        workPermit: "",
    });
    const handleCheckboxChange = (key, value) => {
        setFormData((prev) => {
            const updatedArray = prev[key].includes(value)
                ? prev[key].filter((item) => item !== value)
                : [...prev[key], value];
            return { ...prev, [key]: updatedArray };
        });
    };
    const handleInputChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };


    return (
        <>
            {
                edit ?

                    <div className=" px-5 w-[100vw] lg:w-[40vw] mb-3">

                        <div className="mt-3">
                            <p>Gender is {item.gender}</p>
                            <p>Disability status {item.disability_status}</p>
                            <p>Have work permits fo {item.work_permit}</p>
                        </div>
                    </div>
                    : item.title === "Diversity information" ?
                        <div className="px-5 w-[100vw] flex flex-col gap-5 lg:w-[40vw]">
                            <div>
                                <p>Companies often encourage diversity and inclusion in the workplace and may be actively seeking candidates from diverse backgrounds.
                                </p>
                                <div className="mt-3 flex flex-col">
                                    <p>What is your gender?</p>
                                    <div className="flex gap-2">
                                        <input type="checkbox" name="" id="" value="Female" checked={formData.gender === "Female"}
                                            onChange={() => handleInputChange("gender", "Female")} />
                                        <span>Female</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <input type="checkbox" name="" id="" value="Male" checked={formData.gender === "Male"}
                                            onChange={() => handleInputChange("gender", "Male")} />
                                        <span>Male</span>
                                    </div>
                                </div>
                                <div className="mt-3 flex flex-col">
                                    <p>Do you have any disabilities?</p>
                                    <div className="flex gap-2">
                                        <input type="checkbox" name="" id="" value="Yes" checked={formData.disabilityStatus === "Yes"}
                                            onChange={() => handleInputChange("disabilityStatus", "Yes")} />
                                        <span>Yes</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <input type="checkbox" name="" id="" value="No" checked={formData.disabilityStatus === "No"}
                                            onChange={() => handleInputChange("disabilityStatus", "No")} />
                                        <span>No</span>
                                    </div>
                                </div>
                                <div className="mt-3 flex flex-col">
                                    <p>Do you identify yourself with any of these options?</p>
                                    {["Single parent", "Immigrant", "Retired (60+)"].map((option) => (
                                        <div className="flex gap-2" key={option}>
                                            <input
                                                type="checkbox"
                                                value={option}
                                                checked={formData.identificationOptions.includes(option)}
                                                onChange={() => handleCheckboxChange("identificationOptions", option)}
                                            />
                                            <span>{option}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-2 mt-2">
                                    <p>In which countries are you permitted to work?
                                    </p>
                                    <Select
                                        onValueChange={(value) => handleInputChange("workPermit", value)}
                                    >
                                        <SelectTrigger className="w-[280px]">
                                            <SelectValue placeholder="Select Countries for which you have a work permit" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[white]">
                                            <SelectGroup>
                                                <SelectLabel>Countries</SelectLabel>
                                                <SelectItem value="India">India</SelectItem>
                                                <SelectItem value="China">China</SelectItem>
                                                <SelectItem value="Dubai">Dubai</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={() => {
                                    console.log("Saved Data:", formData);
                                    setEdit(null);
                                }}>Save Changes</Button>
                                <Button onClick={() => setEdit(null)}>Cancle</Button>
                            </div>
                        </div>
                        :
                        null
            }
        </>
    )
}