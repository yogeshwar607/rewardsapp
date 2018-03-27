const assert = require('assert');

let Schema = null;

function init() {
    const ObjectId = Schema.Types.ObjectId;
    const logs = new Schema({
        previous: {}
    });
    const categorySchema = new Schema({
        name: { type: String, required: true },
        interests: [{ type: ObjectId, ref: 'interests' }],
        sub_category: [{
            name: {
                type: String
            }
        }],

        created_by: { type: ObjectId, ref: 'user' },

        updated_by: { type: ObjectId, ref: 'user' },
    }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

    return categorySchema;
}

module.exports = schema => {
    assert.ok(schema);
    Schema = schema;
    return init();
};