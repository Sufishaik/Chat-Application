import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react";

export const Education = ({ item, setEdit, edit, handleRemoveQualification, qualifications, handleAddQualification, setQualifications }) => {
    const [qualificationData, setQualificationData] = useState(
        qualifications.map((qualification) => ({
            id: qualification.id,
            degree: "",
            course: "",
            year: "",
        }))
    );
    const handleUpdateQualification = (id, field, value) => {
        setQualificationData((prev) =>
            prev.map((qual) =>
                qual.id === id ? { ...qual, [field]: value } : qual
            )
        );
    };

    const handleSaveChanges = () => {

        console.log("Updated Qualifications: ", qualificationData);
    };
    return (
        <>
            {
                edit ?
                    <div className=" px-5 w-[100vw] lg:w-[40vw]">

                        <div className="mt-3 w-[50vw]">
                            <p>{item.university_name}</p>
                            <div className="flex">
                                <p>{item.degree}</p>,
                                <p>{item.year_of_passing}</p>
                            </div>
                        </div>
                    </div>
                    : item.title === "Education" ?
                        <>
                            <div className="px-5 w-[100vw] flex flex-col gap-5 lg:w-[40vw]">
                                <p>Enter your educational qualifications:</p>
                                {
                                    qualifications?.map?.((qualification, index) => {
                                        return (
                                            <>
                                                <div className="flex gap-2">
                                                    <p>Degree {index === 0 ? "" : index + 1}</p>
                                                    {
                                                        index !== 0 &&
                                                        <span className="cursor-pointer" onClick={() => handleRemoveQualification(qualification.id)}>(remove degree)</span>
                                                    }
                                                </div>
                                                <div className="flex gap-3">
                                                    <Select value={qualification.degree}
                                                        onValueChange={(value) =>
                                                            handleUpdateQualification(qualification.id, "degree", value)
                                                        }>
                                                        <SelectTrigger className="w-[280px]">
                                                            <SelectValue placeholder="Select Degree" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-[white]">
                                                            <SelectGroup>
                                                                <SelectItem value="BSC">BSC</SelectItem>
                                                                <SelectItem value="HSC">HSC</SelectItem>
                                                                <SelectItem value="MCS">MCS</SelectItem>

                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <Select value={qualification.course}
                                                        onValueChange={(value) =>
                                                            handleUpdateQualification(qualification.id, "course", value)
                                                        }>
                                                        <SelectTrigger className="w-[280px]">
                                                            <SelectValue placeholder="Select Course" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-[white]">
                                                            <SelectGroup>
                                                                <SelectItem value="Computer Science">
                                                                    Computer Science
                                                                </SelectItem>
                                                                <SelectItem value="Commerce">Commerce</SelectItem>
                                                                <SelectItem value="Civil Engineering">
                                                                    Civil Engineering
                                                                </SelectItem>
                                                                <SelectItem value="Chemistry">Chemistry</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                    <Select value={qualification.year}
                                                        onValueChange={(value) =>
                                                            handleUpdateQualification(qualification.id, "year", value)
                                                        }>
                                                        <SelectTrigger className="w-[280px]">
                                                            <SelectValue placeholder="Select Year" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-[white]">
                                                            <SelectGroup>
                                                                <SelectItem value="2023">2023</SelectItem>
                                                                <SelectItem value="2024">2024</SelectItem>
                                                                <SelectItem value="2025">2025</SelectItem>
                                                                <SelectItem value="2026">2026</SelectItem>
                                                                <SelectItem value="2027">2027</SelectItem>
                                                                <SelectItem value="2028">2028</SelectItem>
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                                <p className="flex justify-end cursor-pointer" onClick={handleAddQualification}
                                >+ Add another qualification</p>
                                <div className="flex gap-2">
                                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                                    <Button onClick={() => {
                                        setQualifications([{ id: 1 }])
                                        setEdit(null)
                                    }}>Cancle</Button>
                                </div>
                            </div>
                        </>
                        : null
            }
        </>
    )
}