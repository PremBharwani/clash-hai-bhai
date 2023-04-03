import { SelectChangeEvent } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { courses, semTemplate } from "./types";
import { allTemplates } from "./constants";
import { get_all_dept_eligible_courses, get_course_details, get_eligible_courses } from "@js/get_course_utils";
import { getCredits, removeLastChars } from "./utils";

const setTemplateWithoutLastChars = (template: string[], setTemplate: Dispatch<SetStateAction<string[]>>) => {
    setTemplate(template.map((course) => {
        return removeLastChars(course);
    }))
}

const getTemplateRows = (template: string[]):courses[] => {
    return template.reduce((filtered_courses: courses[], course: string) => {
        const course_details = get_course_details(course);
        if (course_details !== undefined) {
            filtered_courses.push(course_details as courses);
        }
        return filtered_courses;
    }, [])
}
// handler function called on change of branch dropdown
export const handleChangeBranch = (
    {
        event,
        allSemTemplates,
        sem,
        deptToChooseCourseFrom,
        setAllSemTemplates,
        setTemplate,
        setTemplateRows,
        setBranch,
        setTotalCredits,
        setAllAvailableCourses
    } : {
        event: SelectChangeEvent, 
        allSemTemplates: semTemplate, 
        sem: string,
        deptToChooseCourseFrom: string,
        setAllSemTemplates: Dispatch<SetStateAction<semTemplate>>,
        setTemplate: Dispatch<SetStateAction<string[]>>,
        setTemplateRows: Dispatch<SetStateAction<courses[]>>,
        setBranch: Dispatch<SetStateAction<string>>,
        setTotalCredits: Dispatch<SetStateAction<number>>,
        setAllAvailableCourses: Dispatch<SetStateAction<courses[]>>
    }) => {
    let allSemTemplatesCopy: semTemplate = allSemTemplates;
    setBranch(event.target.value as string);

    //iterate through all templates and find the branch template
    for (const key in allTemplates) {
        if (key === event.target.value) {
            setAllSemTemplates(allTemplates[key as keyof typeof allTemplates]);
            allSemTemplatesCopy = allTemplates[key as keyof typeof allTemplates];
        }
    }

    //if sem is not empty, set template and template rows
    if (sem !== "") {
        for (const key in allSemTemplatesCopy) {
            if (key === sem) {
                const newTemplate = allSemTemplatesCopy[key as keyof typeof allSemTemplatesCopy];
                setTemplateWithoutLastChars(newTemplate,setTemplate);
                const tempObject: courses[] = getTemplateRows(newTemplate);
                setTemplateRows(tempObject);
                let credits = 0;
                tempObject.forEach((course) => {
                    credits += getCredits(course.credits);
                })
                setTotalCredits(credits);
                if (deptToChooseCourseFrom === "") {
                    const elegible_courses = get_all_dept_eligible_courses(newTemplate);
                    setAllAvailableCourses(elegible_courses);
                }
                else if (deptToChooseCourseFrom !== "") {
                    const elegible_courses = get_eligible_courses(newTemplate, deptToChooseCourseFrom);
                    setAllAvailableCourses(elegible_courses);
                }
            }
        }
    }
};

export const handleChangeSem = (
    {
        event,
        allSemTemplates,
        deptToChooseCourseFrom,
        setSem,
        setTemplate,
        setTemplateRows,
        setTotalCredits,
        setAllAvailableCourses
    }:{
        event: SelectChangeEvent,
        allSemTemplates: semTemplate,
        deptToChooseCourseFrom: string,
        setSem: Dispatch<SetStateAction<string>>,
        setTemplate: Dispatch<SetStateAction<string[]>>,
        setTemplateRows: Dispatch<SetStateAction<courses[]>>,
        setTotalCredits: Dispatch<SetStateAction<number>>,
        setAllAvailableCourses: Dispatch<SetStateAction<courses[]>>
    }) => {
    setSem(event.target.value as string);
    for (const key in allSemTemplates) {
        if (key === event.target.value) {
            const newTemplate = allSemTemplates[key as keyof typeof allSemTemplates];
            setTemplateWithoutLastChars(newTemplate,setTemplate);
            const tempObject: courses[] = getTemplateRows(allSemTemplates[key as keyof typeof allSemTemplates]);
            setTemplateRows(tempObject);
            let credits = 0;
            tempObject.forEach((course) => {
                credits += getCredits(course.credits);
            })
            setTotalCredits(credits);
            if (deptToChooseCourseFrom === "") {
                const elegible_courses = get_all_dept_eligible_courses(newTemplate);
                setAllAvailableCourses(elegible_courses);
            }
            if (deptToChooseCourseFrom !== "") {
                const elegible_courses = get_eligible_courses(newTemplate, deptToChooseCourseFrom);
                setAllAvailableCourses(elegible_courses);
            }
        }
    }
};

export const handleChangeDepttoChooseFrom = (
    {
        event,
        template,
        setDeptToChooseCourseFrom,
        setAllAvailableCourses,
    }:{
        event: SelectChangeEvent,
        template: string[],
        setDeptToChooseCourseFrom: Dispatch<SetStateAction<string>>,
        setAllAvailableCourses: Dispatch<SetStateAction<courses[]>>
    }) => {
    setDeptToChooseCourseFrom(event.target.value as string);
    if (event.target.value === "") {
        const elegible_courses = get_all_dept_eligible_courses(template);
        setAllAvailableCourses(elegible_courses);
    }
    else {
        const elegible_courses = get_eligible_courses(template, event.target.value);
        setAllAvailableCourses(elegible_courses);
    }
}

export const handleCourseDrop = (
    {
        dropCourse,
        template,
        deptToChooseCourseFrom,
        setAllAvailableCourses,
        setTemplate,
        setTemplateRows,
        setTotalCredits,
    }:{
        dropCourse: string,
        template: string[],
        deptToChooseCourseFrom: string,
        setAllAvailableCourses: Dispatch<SetStateAction<courses[]>>,
        setTemplate: Dispatch<SetStateAction<string[]>>,
        setTemplateRows: Dispatch<SetStateAction<courses[]>>,
        setTotalCredits: Dispatch<SetStateAction<number>>
    }) => {
    setAllAvailableCourses([]);
    const templateFiltered = template.filter((value) => (removeLastChars(value) !== removeLastChars(dropCourse)));
    setTemplateWithoutLastChars(templateFiltered,setTemplate);
    const tempObject: courses[] = getTemplateRows(templateFiltered);
    setTemplateRows(tempObject);
    let credits = 0;
    tempObject.forEach((course) => {
        credits += getCredits(course.credits);
    })
    setTotalCredits(credits);
    if (deptToChooseCourseFrom === "") {
        const elegible_courses = get_all_dept_eligible_courses(templateFiltered);
        setAllAvailableCourses(elegible_courses);
    }
    else {
        const elegible_courses = get_eligible_courses(templateFiltered, deptToChooseCourseFrom);
        setAllAvailableCourses(elegible_courses);
    }
}

export const handleCourseAdd = (
    {
        addCourse,
        template,
        deptToChooseCourseFrom,
        setTemplate,
        setTemplateRows,
        setTotalCredits,
        setAllAvailableCourses,
    }:{
        template: string[],
        addCourse: string,
        deptToChooseCourseFrom: string,
        setTemplate: Dispatch<SetStateAction<string[]>>,
        setTemplateRows: Dispatch<SetStateAction<courses[]>>,
        setTotalCredits: Dispatch<SetStateAction<number>>,
        setAllAvailableCourses: Dispatch<SetStateAction<courses[]>>,
    }) => {
    const newTemplate: string[] = template.concat([addCourse]);
    const tempObject: courses[] = getTemplateRows(newTemplate);
    setTemplateWithoutLastChars(newTemplate,setTemplate);
    setTemplateRows(tempObject);
    let credits = 0;
    tempObject.forEach((course) => {
        credits += getCredits(course.credits);
    })
    setTotalCredits(credits);
    if (deptToChooseCourseFrom === "") {
        const elegible_courses = get_all_dept_eligible_courses(newTemplate);
        setAllAvailableCourses(elegible_courses);
    }
    else {
        const elegible_courses = get_eligible_courses(newTemplate, deptToChooseCourseFrom);
        setAllAvailableCourses(elegible_courses);
    }
}

export const handleCustomTemplate = (
    {
        setBranch,
        setSem,
        setTemplate,
        setTemplateRows,
        setTotalCredits,
        setAllAvailableCourses,
    }:{
        setBranch: Dispatch<React.SetStateAction<string>>,
        setSem: Dispatch<React.SetStateAction<string>>,
        setTemplate: Dispatch<SetStateAction<string[]>>,
        setTemplateRows: Dispatch<SetStateAction<courses[]>>,
        setTotalCredits: Dispatch<SetStateAction<number>>,
        setAllAvailableCourses: Dispatch<SetStateAction<courses[]>>
    }) => {
    setTemplate([]);
    setTemplateRows([] as courses[]);
    setTotalCredits(0);
    setBranch("")
    setSem("")
    const elegible_courses = get_all_dept_eligible_courses([]);
    setAllAvailableCourses(elegible_courses);
}