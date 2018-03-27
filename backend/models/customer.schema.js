const assert = require('assert');
const bcrypt = require('bcrypt');

let Schema = null;

function init() {
    const ObjectId = Schema.Types.ObjectId;
    const logs = new Schema({
        previous: {},
    });
    const customerSchema = new Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        mobile_no: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        is_active: { type: Boolean },
        dob: { type: Date },
        state: { type: String },
        city: { type: String },
        gender: { type: String },
        country: { type: String },
        verify: {

            mobile_no: { type: Boolean },
            email: { type: Boolean }

        },
        updatedBy: { type: ObjectId, ref: 'user' },
        interests: [{ type: ObjectId, ref: 'interests' }],
        addressess: [{
            lable: { type: String },
            name: { type: String },
            mobile_no: { type: String },
            address: { type: String },
            near_by: { type: String },
            pincode: { type: String },
            state: { type: String },
            city: { type: String },
            country: { type: String },
            address_type: { type: String },
        }, ],
    }, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    });

    customerSchema.post('save', () => {});

    customerSchema.methods.comparePassword = customerPassword => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(customerPassword, this.password, (err, isMatch) => {
                if (err) return reject(err);
                resolve(isMatch);
            });
        });
    };
    return customerSchema;
}

module.exports = schema => {
    assert.ok(schema);
    Schema = schema;
    return init();
};