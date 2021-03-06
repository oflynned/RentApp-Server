const Joi = require("joi");

const schema = Joi.object().keys({
    user_id: Joi.string().required(),
    landlord_id: Joi.string().required(),
    listing_id: Joi.string().required(),
    creation_time: Joi.date().required(),
    last_updated: Joi.date().required(),
    status: Joi.string().required().valid("pending", "accepted", "rejected", "expired")
});

const querySchema = Joi.object().keys({
    user_id: Joi.string(),
    landlord_id: Joi.string(),
    listing_id: Joi.string()
});

module.exports = {
    validatePayload: function (o) {
        return Joi.validate(o, schema, {allowUnknown: true});
    },

    validate: function (o) {
        return Joi.validate(o, schema);
    },

    validateQuery: function (o) {
        return Joi.validate(o, querySchema);
    },

    generate: function (userId, landlordId, listingId) {
        return {
            user_id: userId,
            landlord_id: landlordId,
            listing_id: listingId,
            status: "pending",
            creation_time: new Date(),
            last_updated: new Date()
        }
    }
};