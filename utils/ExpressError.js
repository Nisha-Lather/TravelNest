class ExpressError extends Error{
    constructor(statusCode,message){
        super();
        this.statusCode=this.statusCode;
        this.message=messsage;
    }
}
module.exports=ExpressError;