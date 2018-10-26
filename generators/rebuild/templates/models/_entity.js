module.exports = function(sequelize, DataTypes) {
  var <%= _s.camelize(_.capitalize(name)) %> = sequelize.define('<%= _s.camelize(_.capitalize(name)) %>', {
    <% _.each(attrs, function (attr) { %>
    <%= _s.underscored(attr.attrName) %>: {
      type: DataTypes.<%= (attr.attrType.toUpperCase() === "EMAIL") ? "STRING" : attr.attrType.toUpperCase() %>
      <% if (attr.attrType.toUpperCase() == 'ENUM') { %>(<% var delim = ''; _.each(attr.enumValues, function (value) { %>
      <%= delim %>
      '<%= value %>' <% delim = ', '; }) %>)<% }; %>,
      validate: {
        <% if (attr.maxLength) { if (attr.minLength) { %>
        len: [
          <%= attr.minLength %>, <%= attr.maxLength %>
        ],
        <% } else { %>
        len: [
          0, <%= attr.maxLength %>
        ],
        <% } };
        if (attr.min) { %>
        min: <%= attr.min %>,
        <% };
        if (attr.max) { %>
        max: <%= attr.max %>,
        <% };%>
      },
      <% if (attr.attrType == 'DateOnly') { %>
      get: function() {
        var value = this.getDataValue('<%= attr.attrName %>')
        return value
          ? value.toISOString().substring(0, 10)
          : value
      }
      <% }; %>
    },
    <% }); %>
  }, {
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: true,

    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: false,

    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: true,

    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    // freezeTableName: true,

    // define the table's name
    tableName: '<%= _s.camelize(_.capitalize(name)) %>'
  })

  return <%= _s.camelize(_.capitalize(name)) %>
}
