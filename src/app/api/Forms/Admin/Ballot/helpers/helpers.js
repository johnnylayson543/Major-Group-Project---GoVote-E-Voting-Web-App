
export class ballot_details {

    title;
    closing_datetime;
    opening_datetime;

    constructor(builder){
        this.title = builder.title;
        this.closing_datetime = builder.closing_datetime;
        this.opening_datetime = builder.opening_datetime;
    }

    static builder(x){
        return new builder(x);
    }

    describe() {
        const { title, closing_datetime, opening_datetime } = this;
        return {title: title, closing_datetime: closing_datetime, opening_datetime: opening_datetime };
    }
}

class builder {

    title;
    closing_datetime;
    opening_datetime;

    constructor(x){
        this.closing_datetime = x.closing_datetime;
    }

    setTitle(title){
        this.title = title;
        return this;
    }
    setOpeningDateTime(opening_datetime){
        this.opening_datetime = opening_datetime;
        return this;
    }
    build(){
        return new ballot_details(this);
    }

}