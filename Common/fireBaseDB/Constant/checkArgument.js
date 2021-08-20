const isString = (props) => {
    return typeof (props) === "string"
}
const isObject = (props) => {
    return typeof (props) === "Object"
}
const isBoolean = (props) => {
    return typeof (props) === "boolean"
}
const isArray = (props) => {
    return Array.isArray(props)
}

const isObjectEmpty = (props) => {
    if (isObject(props) && Object.keys(result).length === 0) {
        return true;
    }
    else {
        return false;
    }
}

const isNotObjectEmpty = (props) => {
    if (isObject(props) && !Object.keys(result).length === 0) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = { isString, isObject, isBoolean, isArray, isObjectEmpty, isNotObjectEmpty }