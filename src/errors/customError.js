
class CustomError{
    constructor(status, description){
        this.status = status;
        this.description = description;
    }
}

module.exports = CustomError;