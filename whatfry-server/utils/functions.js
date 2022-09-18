
exports.codeError = (errorKey, path) => {
    let error
    switch(errorKey){
        case 'len':
            error = {field: path, code: 8}
            break;
        case 'is_null':
            error = {field: path, code: 1}
            break;
        case 'isEmail':
            error = {field: path, code: 4}
            break;

        case 'not_unique':
            error = {field: path, code: 10}
            break;
        default:
            error = {field: path, code: 500}
    }

    return error
}

exports.parseMessage = (message, user_id) => {
    const byMe = message.sender_id === user_id
    let d  = new Date(message.createdAt)
    return {
        text: message.text,
        heure: d.getHours() + ':'+ d.getMinutes(),
        byMe
    }
}