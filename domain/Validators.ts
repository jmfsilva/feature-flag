
const required = (value) => {
    if(!value) {
        throw new Error("Field is required")
    }
    return value
}

const notNullOrEmpty = (value: string) => {

    if(!value) {
        throw new Error("String cannot be null or empty")
    }

    return value
}

const requiredClosedRange = (value: number, start: number, end: number) => {

    if(value < start || value > end) {
        throw new Error(`Value has to be within [${start}, ${end}]`)
    }

    return value
}

export {
    required,
    notNullOrEmpty,
    requiredClosedRange
}