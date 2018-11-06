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

// Render the home page and list all <%= _s.classify(name) %>
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

// form a new <%= _s.classify(name) %>
router.get("/add", (req, res) => {
  res.render("<%= _.toLower(_s.classify(name)) %>/add-<%= _.toLower(_s.classify(name)) %>", {});
});

// Create a new <%= _s.classify(name) %>
router.post("/add", (req, res) => {
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

// Render the edit <%= _s.classify(name) %> page
router.get("/:id/edit", (req, res) => {
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

// Update a <%= _s.classify(name) %>
router.post("/:id/edit", (req, res) => {
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
      db.<%=  _s.underscored(name) %>.findAll({
        order: sequelize.literal("created_at DESC")
      }).then(posts => {
        let postData = [];

        posts.forEach(post => {
          postData.push(post.get({plain: true}));
        });

        res.render("<%= _.toLower(_s.classify(name)) %>/index", {
          posts: postData
        });
      });
    });
  });
});

// Delete a <%= _s.classify(name) %>
router.get("/:id/delete", (req, res) => {
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

    post.destroy().then(()=>{
      db.<%=  _s.underscored(name) %>.findAll({
        order: sequelize.literal("created_at DESC")
      }).then(posts => {
        let postData = [];

        posts.forEach(post => {
          postData.push(post.get({plain: true}));
        });

        res.render("<%= _.toLower(_s.classify(name)) %>/index", {
          posts: postData
        });
      });
    });
  });
});

// View a post
router.get("/:id", (req, res) => {
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
