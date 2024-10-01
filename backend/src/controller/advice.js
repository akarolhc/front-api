const advice = require('./advice');

class AdviceController{
    constructor(){
        this.advice = advice;
    }

    async findAdvices(){
        return await this.advice.find();
    }

    async getAdvice(id){
        return await this.advice.findById(id);
    }

    async createAdvice(advice){
        return await this.advice.create(advice);
    }

    async updateAdvice(id, advice){
        return await this.advice.findByIdAndUpdate(id, advice, {new: true});
    }

    async deleteAdvice(id){
        return await this.advice.findByIdAndDelete(id);
    }
}
