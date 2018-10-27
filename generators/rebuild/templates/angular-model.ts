export interface <%= _s.classify(name) %> {
  id: number,
  <% _.each(attrs, function(attr) { %>
    <%= _s.underscored(attr.attrName) %>: <%=  attr.attrType.toLowerCase() %>,
      <%}) %>
}
