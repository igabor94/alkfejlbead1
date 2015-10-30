var express = require('express');

var router = express.Router();

//Viewmodel réteg
var statusTexts = {
    'new': 'Új',
    'success': 'Kész',
    'rejected': 'Elutasítva',
    'pending': 'Folyamatban',
};
var statusClasses = {
    'new': 'danger',
    'success': 'success',
    'rejected': 'default',
    'pending': 'warning',
};

function decorateTodos(isParent, forename, todoContainer) {
    return todoContainer.map(function (e) {
        e.statusText = statusTexts[e.status];
        e.statusClass = statusClasses[e.status];
        e.canDelete = isParent;
        e.canChange = isParent || e.megbizott == 'Akárki' || forename == e.megbizott;
        return e;
    });
}

router.get('/list', function (req, res) {
    req.app.models.todo.find().then(function (todos) {
        //console.log(todos);

        //megjelenítés
        res.render('todos/list', {
            todos: decorateTodos(res.locals.user.role == 'parent', res.locals.user.forename, todos),
            messages: req.flash('info')
        });
    });
});

function getEditPermission(user, todo) {
    todo.cantFullyChange = user.role != 'parent';
    todo.cantStatusChange = todo.cantFullyChange && !(todo.megbizott == 'Akárki' || user.forename == todo.megbizott);
    return todo;
}

router.get('/del/:id', function (req, res) {
    if(res.locals.user.role == 'parent') {
        req.app.models.todo.destroy({id: req.params.id})
            .then(function (error) {
                //siker
                req.flash('info', 'feladat sikeresen törölve!');
                res.redirect('/todos/list');
            })
            .catch(function (err) {
                //hiba
                console.log(err);
            });  
    } else {
        req.flash('info', 'Hozzáférés megtagadva!');
        res.redirect('/todos/list');
    }
});

router.get('/edit/:id', function (req, res) {
    var validationErrors = (req.flash('validationErrors') || [{}]).pop();
    req.app.models.todo.findOne({ id: req.params.id }).then(function (todo) {
        req.app.models.user.find().where({ forename: { '!': todo.megbizott }}).then(function (users) {
            if(todo.megbizott == 'Akárki') {
                users.unshift({forename:'Akárki'});
            } else {
                users.unshift({forename:todo.megbizott});
                users.push({forename:'Akárki'});
            }
            
            var statuses = [{key:todo.status, value:statusTexts[todo.status]}];
            for (var key in statusTexts) {
                if (statusTexts.hasOwnProperty(key) && key != todo.status) {
                    statuses.push({key:key, value:statusTexts[key]});
                }
            }
            
            res.render('todos/edit', {
                validationErrors: validationErrors,
                data: getEditPermission(res.locals.user,todo),
                users: users,
                statuses: statuses,
            });
        });
    });
});
router.post('/edit/:id', function (req, res) {
    // adatok ellenőrzése
    if(typeof req.body.leiras != 'undefined') {
        req.sanitizeBody('leiras').escape();
        req.checkBody('leiras', 'Hibás leírás').notEmpty().withMessage('Kötelező megadni!');
    }
    
    var validationErrors = req.validationErrors(true);
    /*
    console.log(validationErrors);
    console.log(req.body);
    */
    
    if (validationErrors) {
        // űrlap megjelenítése a hibákkal és a felküldött adatokkal
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        res.redirect('/todos/edit/'+req.params.id);
    }
    else {
        if(res.locals.user.role == 'parent') {
            editTodo(req,res,req.body.id,{
                status: req.body.status,
                megbizott: req.body.megbizott,
                description: req.body.leiras
            });
        } else {
            req.app.models.todo.findOne({ id: req.body.id }).then(function (todo) {
                if(getEditPermission(res.locals.user, todo).cantStatusChange) {
                    req.flash('info', 'Hozzáférés megtagadva!');
                    res.redirect('/todos/list');
                } else {
                    editTodo(req,res,req.body.id,{ status: req.body.status });
                }
            }).catch(function (err) {
                //hiba
                console.log(err);
            });
        }
    }
});

function editTodo(req, res, id, obj) {
    req.app.models.todo.update({id: id},obj)
            .then(function (error) {
                //siker
                req.flash('info', 'feladat sikeresen módosítva!');
                res.redirect('/todos/list');
            })
            .catch(function (err) {
                //hiba
                console.log(err);
            });  
}

router.get('/new', function (req, res) {
    var validationErrors = (req.flash('validationErrors') || [{}]).pop();
    var data = (req.flash('data') || [{}]).pop();
    req.app.models.user.find().then(function (users) {
    
        res.render('todos/new', {
            validationErrors: validationErrors,
            data: data,
            users: users,
        });
    });
});
router.post('/new', function (req, res) {
    // adatok ellenőrzése
    req.sanitizeBody('leiras').escape();
    req.checkBody('leiras', 'Hibás leírás').notEmpty().withMessage('Kötelező megadni!');
    
    var validationErrors = req.validationErrors(true);
    /*
    console.log(validationErrors);
    console.log(req.body);
    */
    
    if (validationErrors) {
        // űrlap megjelenítése a hibákkal és a felküldött adatokkal
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        res.redirect('/todos/new');
    }
    else {
        // adatok elmentése (ld. később) és a hibalista megjelenítése
        req.app.models.todo.create({
            status: 'new',
            megbizott: req.body.megbizott,
            description: req.body.leiras
        })
        .then(function (error) {
            //siker
            req.flash('info', 'feladat sikeresen felvéve!');
            res.redirect('/todos/list');
        })
        .catch(function (err) {
            //hiba
            console.log(err);
        });
    }
});

module.exports = router;