

export class Course {
    constructor(code, name, slot, credits) {
        if (!arguments.length) {
            this.code = ""
            this.name = ""
            this.slot = ""
            this.credits = ""
        }
        else {
            this.code = code
            this.name = name
            this.slot = slot
            this.credits = credits
        }
    }
}

export default Course