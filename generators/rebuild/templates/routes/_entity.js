var db = require('../models'),
  _ = require('lodash');


/**
 * @swagger
 * /<%= baseName %>/<%= _.camelCase(pluralize(name)) %>:
 *   get:
 *     description: Get list of <%= _s.camelize(_.capitalize(name)) %>
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         schema:
 *           description: <%= _s.camelize(_.capitalize(name)) %>
 */
exports.findAll = function(req, res) {
  var q = req.query.q || "",
    sort = req.query.sort || "id",
    order = req.query.order || "asc",
    page = parseInt(req.query.page) || 1,
    limit = parseInt(req.query.limit) || 20,
    group = req.query.group || "",
    offset = ((page - 1) * limit),
    orderBy = [sort, order.toUpperCase()],
    query = {
      order: [orderBy],
      offset: offset,
      limit: limit
    };

  if (group) {
    query = _.merge({
      group: group
    }, query);
  };

  if (q) {
    query = _.extend({
      <% var concat = []; _.each(attrs, function (attr) {
      if (attr.attrType === "String" || attr.attrType === "Char" || attr.attrType === "Text") {
        concat.push(_.camelCase(attr.attrName));
      }
    });%>
      where: ["CONCAT(<%= concat.join(', ') %>) LIKE '%" + q + "%'"]
    }, query);
  };

  db.
  <%= _s.camelize(_.capitalize(name)) %>.findAndCountAll(query)
    .then(function(result) {
      res.jsonp({
        total: result.count,
        page: page,
        limit: limit,
        from: offset + 1,
        to: offset + result.rows.length,
        results: result.rows
      });
    })
}

/**
 * @swagger
 * /<%= baseName %>/<%= _.camelCase(name) %>/{id}:
 *   get:
 *     description: Find a <%= _s.camelize(_.capitalize(name)) %> by ID
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         schema:
 *           description: <%= _s.camelize(_.capitalize(name)) %>
 *           type: object
 *           $ref: '#/definitions/<%= _s.camelize(_.capitalize(name)) %>'
 *     parameters:
 *       - name: id
 *         type: integer
 *         format: int64
 *         in: path
 *         required: true
 *         description: ID of <%= _s.camelize(_.capitalize(name)) %>
 */
exports.find = function(req, res) {
  db.
  <%= _s.camelize(_.capitalize(name)) %>.find({
    where: {
      id: req.params.id
    }
  }).then(function(entity) {
    if (entity) {
      res.json(entity)
    } else {
      res.sendStatus(404)
    }
  })
}

/**
 * @swagger
 * /<%= baseName %>/<%= _.camelCase(name) %>:
 *   post:
 *     description: Add a new <%= _s.camelize(_.capitalize(name)) %>
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       405:
 *         description: "Invalid input"
 *       404:
 *         description: "Not found"
 *       200:
 *         schema:
 *           description: <%= _s.camelize(_.capitalize(name)) %>
 *           type: object
 *           $ref: '#/definitions/<%= _s.camelize(_.capitalize(name)) %>'
 *     parameters:
 *       - name: body
 *         description: object of <%= _s.camelize(_.capitalize(name)) %>
 *         in: body
 *         required: true
 *         $ref: '#/definitions/<%= _s.camelize(_.capitalize(name)) %>'
 */
exports.create = function(req, res) {
  db.
  <%= _s.camelize(_.capitalize(name)) %>.create(req.body).then(function(entity) {
    res.statusCode = 201
    res.json(entity)
  })
}

/**
 * @swagger
 * /<%= baseName %>/<%= _.camelCase(name) %>/{id}:
 *   put:
 *     description: Update a <%= _s.camelize(_.capitalize(name)) %> by ID
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       405:
 *         description: "Invalid input"
 *       404:
 *         description: "Not found"
 *       200:
 *         schema:
 *           description: <%= _s.camelize(_.capitalize(name)) %>
 *           type: object
 *           $ref: '#/definitions/<%= _s.camelize(_.capitalize(name)) %>'
 *       parameters:
 *         - name: id
 *           type: integer
 *           format: int64
 *           in: path
 *           required: true
 *           description: ID of <%= _s.camelize(_.capitalize(name)) %>
 *         - name: body
 *           description: object of <%= _s.camelize(_.capitalize(name)) %>
 *           in: body
 *           required: true
 *           $ref: '#/definitions/<%= _s.camelize(_.capitalize(name)) %>'
 */
exports.update = function(req, res) {
  db.
  <%= _s.camelize(_.capitalize(name)) %>.find({
    where: {
      id: req.params.id
    }
  }).then(function(entity) {
    if (entity) {
      entity.updateAttributes(req.body).then(function(entity) {
        res.json(entity)
      })
    } else {
      res.sendStatus(404)
    }
  })
}


/**
 * @swagger
 * /<%= baseName %>/<%= _.camelCase(name) %>/{id}:
 *   delete:
 *     description: Delete a <%= _s.camelize(_.capitalize(name)) %> by ID
 *     produces:
 *       - application/json
 *     response:
 *       204:
 *         description: "Success"
 *       404:
 *         description: "Not found"
 *       403:
 *         description: "Access deny"
 *     parameters:
 *       - name: id
 *         type: integer
 *         format: int64
 *         in: path
 *         required: true
 *         description: ID of <%= _s.camelize(_.capitalize(name)) %>
 */
exports.destroy = function(req, res) {
  db.
  <%= _s.camelize(_.capitalize(name)) %>.find({
    where: {
      id: req.params.id
    }
  }).then(function(entity) {
    if (entity) {
      entity.destroy().then(function() {
        res.sendStatus(204)
      })
    } else {
      res.sendStatus(404)
    }
  })
}

/**
 * @swagger
 * definitions:
 *   <%= _s.camelize(_.capitalize(name)) %>:
 *     type: object
 *     properties:
 <% _.each(attrs, function (attr) { %>*       <%= _.camelCase(attr.attrName) %>:
 *         type: <%= attr.attrType.toLowerCase() %>
 <% }); %>*/
