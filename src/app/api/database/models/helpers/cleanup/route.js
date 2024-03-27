import mongoose from 'mongoose';
import { Admin } from '../../Admin';
import { Ballot } from '../../Ballot';
import { Candidate } from '../../Candidate';
import { Election } from '../../Election';
//import { Log } from '../../Log';
import { Person } from '../../Person';
//import { Teller } from '../../Teller';
import { User } from '../../User';
import { Vote } from '../../Vote';
import { Voter } from '../../Voter';

const models = [Admin, Ballot, Candidate, Election, Person, User, Vote, Voter];

export async function GET(req, res) {

    const result = await cleanupOrphans();

    return Response.json({ "data": "okay", "result": result});
}

async function cleanupOrphans() {
    let deletedEntries;
    
    for (const model of models) {
        let model_OfDeletedEntries = {};
        const modelName1 = model.modelName;
        deletedEntries[modelName1] = {};
        let deletedCount = 0;
        const foreign_keys = getAttributesWithRef(model.schema);
        console.log("foreign keys");
        console.log(foreign_keys);
        if (foreign_keys) {
            const all_entries = await model.find({});
            for (const entry of all_entries) {
                for (const foreign_key_key in foreign_keys) {
                    const foreign_key_value = entry[foreign_key_key];

                    const check_key = (foreign_keys[foreign_key_key] != 'Person') ? '_id' : 'ppsn';

                    const foreign_entry_check = await mongoose.model(foreign_keys[foreign_key_key]).findOne({ [check_key] : foreign_key_value });
                    //console.log("foreign_entry_check: ");
                    //console.log(foreign_entry_check);
                    
                    if (foreign_entry_check == {} || foreign_entry_check == null) {
                        
                        console.log("foreign_entry_check == {} for  model " + model.modelName + " and entry " + entry._id + " : ");
                        console.log("entry: ");
                        console.log(entry);
                        console.log(foreign_entry_check == {});
                        console.log("[check_key]: entry[foreign_key_key] } :")
                        console.log({[foreign_key_key]: entry[foreign_key_key] });
                        const deleted = await model.deleteOne({ [foreign_key_key]: entry[foreign_key_key] });
                        console.log("deleted: ");
                        console.log(deleted);
                        model_OfDeletedEntries['delete'].push(deleted);
                        
                    }

                }
            }
        }
        deletedEntries[modelName1].push(model_OfDeletedEntries);
    }
    console.log("deleted entries: ");
    console.log(deletedEntries);
    return Response.json({data: 'okay', result: deletedEntries})

}

function getAttributesWithRef(schema) {
    let attributesWithRef = {};

    schema.eachPath((path, schemaType) => {
        if (schemaType.options && schemaType.options.ref) {
            attributesWithRef[path] = schemaType.options.ref;
        } else if (schemaType.caster && schemaType.caster.options && schemaType.caster.options.ref) {
            attributesWithRef[path] = schemaType.caster.options.ref;
        }
    });
    return attributesWithRef;
}