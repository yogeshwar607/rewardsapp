const assert = require('assert');

let Schema = null;

function init() {
    const ObjectId = Schema.Types.ObjectId;
    const logs = new Schema({
        previous: {},
    });
    const ordersSchema = new Schema({
        customer: { type: ObjectId, ref: 'customer' },
        products: [{ type: ObjectId, ref: 'product' }],
        date_of_order: { type: Date, required: true },
        status: { type: String, required: true },
        updatedBy: { type: ObjectId, ref: 'customer' },
        // createdBy: { type: ObjectId, ref: 'customer' },
        address: {
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
        },
    }, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    });

    return ordersSchema;
}

module.exports = schema => {
    assert.ok(schema);
    Schema = schema;
    return init();
};