
export class ballot_details {

    title;
    closing_datetime;
    opening_datetime;

    constructor(x){
        this.title = x.title;
        this.closing_date = x.closing_datetime;
        this.opening_date = x.opening_datetime;
    }

    static get builder(){
        class BallotDetailsBuilder {
            setTitle(title){
                this.title = title;
                return this;
            }
            setClosingDateTime(closing_datetime){
                this.closing_datetime = closing_date;
                return this;
            }
            setOpeningDate(opening_datetime){
                this.opening_datetime = opening_datetime;
                return this;
            }
            build(){
                return new ballot_details(this);
            }

        }
    }

    describe() {
        const { title, closing_datetime, opening_datetime } = this;
        return {title: title, closing_datetime: closing_datetime, opening_datetime: opening_datetime };
    }
}