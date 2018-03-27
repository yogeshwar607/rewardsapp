const assert = require('assert');

let Schema = null;

function init() {
    const ObjectId = Schema.Types.ObjectId;
    const logs = new Schema({
        previous: {},
    });
    const otpSchema = new Schema({
        mobile_no: { type: String, required: true, unique: true },
        otps: [{ type: String }]


    }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

    return otpSchema;
}

module.exports = schema => {
    assert.ok(schema);
    Schema = schema;
    return init();
};