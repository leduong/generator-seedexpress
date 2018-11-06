<% _.each(entities, function(entity) { %>
./node_modules/.bin/sequelize model:generate --force --underscored true --name <%=  _s.underscored(entity.name) %> --attributes <% _.each(entity.attrs, function (attr) { %><%= _s.underscored(attr.attrName) %>:<%= attr.attrType.toLowerCase() %>,<% }) %>
<% }) %>
