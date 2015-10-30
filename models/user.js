var bcrypt = require('bcryptjs');

module.exports = {
    identity: 'user',
    connection: 'default',
    attributes: {
        password: {
            type: 'string',
            required: true,
        },
        forename: {
            type: 'string',
            required: true,
        },
        role: {
            type: 'string',
            enum: ['child', 'parent'],
            required: true,
            defaultsTo: 'child'
        },
        
        errors: {
            collection: 'todo',
            via: 'user'
        },
        
        validPassword: function (password) {
            return bcrypt.compareSync(password, this.password);
        }
    },
    
    beforeCreate: function(values, next) {
        bcrypt.hash(values.password, 10, function(err, hash) {
            if (err) {
                return next(err);
            }
            values.password = hash;
            next();
        });
    }
};