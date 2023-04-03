export interface semTemplate {
    "1":string[];
    "2":string[];
    "3":string[];
    "4":string[];
    "5":string[];
    "6":string[];
    "7":string[];
    "8":string[];
}

export interface courses {
    course_code: string;
    course_name: string;
    credits: string;
    instructor: string;
    instuctor_email: string;  
    lec: string;
    tut: string;
    lab: string;
}

export interface globalContextType {
    branch: string;
    sem: string;
    deptToChooseCourseFrom: string;
    allSemTemplates: semTemplate;
    template: string[];
    templateRows: courses[];
    allAvailableCourses: courses[];
    totalCredits: number;
    setBranch: React.Dispatch<React.SetStateAction<string>>;
    setSem: React.Dispatch<React.SetStateAction<string>>;
    setDeptToChooseCourseFrom: React.Dispatch<React.SetStateAction<string>>;
    setAllSemTemplates: React.Dispatch<React.SetStateAction<semTemplate>>;
    setTemplate: React.Dispatch<React.SetStateAction<string[]>>;
    setTemplateRows: React.Dispatch<React.SetStateAction<courses[]>>;
    setAllAvailableCourses: React.Dispatch<React.SetStateAction<courses[]>>;
    setTotalCredits: React.Dispatch<React.SetStateAction<number>>;
}