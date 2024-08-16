const Joi = require('joi');

const validateTicket = (ticket) => {
    const schema = Joi.object({
        title: Joi.string().trim().required(),
        description: Joi.string().trim().required(),
        status: Joi.string().valid('Open', 'In Progress', 'Resolved', 'Closed').default('Open'),
        priority: Joi.string().valid('Low', 'Medium', 'High', 'Critical').default('Low'),
        createdBy: Joi.string().required(), 
        assignedTo: Joi.string().allow(null), 
        createdAt: Joi.date().default(Date.now),
        updatedAt: Joi.date().default(Date.now)
    });

    return schema.validate(ticket);
};

// Export both the model and the validation function
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = {
    Ticket,
    validateTicket
};