const customResponse = {
    status: 0,
    message: '',
    result:[],
    stack: '',
    error: function (status, message, stack) {
        this.result=undefined
        this.status = status;
        this.message = JSON.parse(JSON.stringify(message, ["message", "arguments", "type", "name"]));
        this.stack = stack;
        return this;
    },
    success: function (status, result, stack) {
        this.status = status;
        this.result = result;
        this.message=undefined
        this.stack = stack;
        return this;
    }
}

module.exports = customResponse