module.exports = {
    identity: 'todo',
    connection: 'default',
    attributes: {
        date: {
            type: 'datetime',
            defaultsTo: function () { return new Date(); },
            required: true,
        },
        status: {
            type: 'string',
            enum: ['new', 'success', 'rejected', 'pending'],
            required: true,
        },
        megbizott: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
            required: true,
        }
    }
}