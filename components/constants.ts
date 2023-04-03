import { course_data } from "@js/course_data.js"
import { template_data } from '@js/template.js'

export const allDepts = Object.keys(course_data);

export const allTemplates = template_data;
export const allBranches: string[] = Object.keys(allTemplates);

export const semesters = ["1","2","3","4","5","6","7","8"];