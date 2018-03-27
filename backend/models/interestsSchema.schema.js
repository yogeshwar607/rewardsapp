const assert = require('assert');

let Schema = null;

function init() {
    const ObjectId = Schema.Types.ObjectId;
    const logs = new Schema({
        previous: {}
    });
    const interestSchema = new Schema({
        name: { type: String, required: true },
        category: [{ type: ObjectId, ref: 'category' }],

        created_by: { type: ObjectId, ref: 'user' },

        updated_by: { type: ObjectId, ref: 'user' },
    }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

    return interestSchema;
}

module.exports = schema => {
    assert.ok(schema);
    Schema = schema;
    return init();
};