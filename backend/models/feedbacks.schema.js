const assert = require('assert');

let Schema = null;

function init() {
    const ObjectId = Schema.Types.ObjectId;
    const logs = new Schema({
        previous: {},
    });
    const feedbacksSchema = new Schema({
        customer: { type: ObjectId, ref: 'customer' },
        type: { type: String },
        product: [{ type: ObjectId, ref: 'product' }],
        order: { type: ObjectId, ref: 'orders' },
        status: { type: String },
        isDelivered: { type: Boolean },
        feedBack_given: [{
            product: { type: ObjectId, ref: 'product' },
            fileUrls: [{ type: String }],
            text: { type: String },
            survey: [{
                ques: {
                    q: {
                        type: String
                    },
                    ans: {
                        type: String
                    }
                },
                typeO: { t: { type: String } },
                options: [{
                    o: { type: String },
                    checked: { type: Boolean }
                }]

            }]
        }]
    }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

    return feedbacksSchema;
}

module.exports = schema => {
    assert.ok(schema);
    Schema = schema;
    return init();
};