const async = require("async");
const express = require("express");
const sequelize = require("sequelize");

const db = require("../models");

const router = express.Router();

const getForm = (reqBody) => {
  let model = {};
  <% _.each(attrs, function(attr) { %>
  model.<%= _s.underscored(attr.attrName) %> = reqBody.<%= _s.underscored(attr.attrName) %> || null;<%}) %>
  return model;
}

// Render the home page and list all blog posts
router.get("/", (req, res) => {
  db.<%=  _s.underscored(name) %>.findAll({order: sequelize.literal("created_at DESC")}).then(posts => {
    let postData = [];

    async.eachSeries(posts, (post, callback) => {
      post = post.get({plain: true});
      postData.push(post);
      callback();
    }, err => {
      return res.render("<%= _.toLower(_s.classify(name)) %>/index", {posts: postData});
    });
  });
});

// Create a new post
router.post("/", (req, res, next) => {
  db.<%=  _s.underscored(name) %>.create(getForm(req.body)).then(newPost => {
    db.<%=  _s.underscored(name) %>.findAll({
      order: sequelize.literal("created_at DESC")
    }).then(posts => {
      let postData = [];

      posts.forEach(post => {
        postData.push(post.get({plain: true}));
      });

      res.render("<%= _.toLower(_s.classify(name)) %>/index", {
        post: newPost,
        posts: postData
      });
    });
  });
});

// Render the edit post page
router.get("/:id/edit", (req, res, next) => {
  db.<%=  _s.underscored(name) %>.findOne({
    where: {
      id: req.params.id
    }
  }).then(post => {
    if (!post) {
      return res.render("error", {
        message: "Page not found.",
        error: {
          status: 404
        }
      });
    }

    post = post.get({plain: true});
    res.render("<%= _.toLower(_s.classify(name)) %>/edit-<%= _.toLower(_s.classify(name)) %>", {post});
  });
});

// Update a post
router.post("/:id/edit", (req, res, next) => {
  db.<%=  _s.underscored(name) %>.findOne({
    where: {
      id: req.params.id
    }
  }).then(post => {
    if (!post) {
      return res.render("error", {
        message: "Page not found.",
        error: {
          status: 404
        }
      });
    }

    post.update(getForm(req.body)).then(() => {
      post = post.get({plain: true});
      res.redirect("/<%= _.toLower(_s.classify(name)) %>/" + req.body.id);
    });
  });
});

// Delete a post
router.post("/:id/delete", (req, res, next) => {
  db.<%=  _s.underscored(name) %>.findOne({
    where: {
      id: req.params.id
    }
  }).then(post => {
    if (!post) {
      return res.render("error", {
        message: "Page not found.",
        error: {
          status: 404
        }
      });
    }

    post.destroy();
    res.redirect("/<%= _.toLower(_s.classify(name)) %>/");
  });
});

// View a post
router.get("/:id", (req, res, next) => {
  db.<%=  _s.underscored(name) %>.findOne({
    where: {
      id: req.params.id
    }
  }).then(post => {
    if (!post) {
      return res.render("error", {
        message: "Page not found.",
        error: {
          status: 404
        }
      });
    }

    post = post.get({plain: true});
    res.render("<%= _.toLower(_s.classify(name)) %>/view-<%= _.toLower(_s.classify(name)) %>", {post});
  });
});

module.exports = router;
