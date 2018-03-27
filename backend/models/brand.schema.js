const assert = require('assert');

let Schema = null;

function init() {
    const ObjectId = Schema.Types.ObjectId;
    const logs = new Schema({
        previous: {},
    });
    const brandSchema = new Schema({
        name: { type: String },
        is_active: { type: Boolean },

        description: { type: String },
        images: [{ type: String }],
        videos: [{ type: String }],
        logoImg: { type: String },
        category: [{ type: String }],
        headquaters: { type: String },
        fbLink: { type: String },
        twitterLink: { type: String },
        updatedBy: { type: ObjectId, ref: 'user' },
        createdBy: { type: ObjectId, ref: 'user' },
    }, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    });

    return brandSchema;
}

module.exports = schema => {
    assert.ok(schema);
    Schema = schema;
    return init();
};