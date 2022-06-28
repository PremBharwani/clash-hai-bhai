

export class Course
{
    constructor(name, slot, credits)
    {
        if(!arguments.length) {
            this.name = ""
            this.slot = 0
            this.credits = 0
        }
        else {
            this.name = name
            this.slot = slot
            this.credits = credits
        }
    }
}

export default Course