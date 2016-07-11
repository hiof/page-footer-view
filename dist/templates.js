this["Hiof"] = this["Hiof"] || {};
this["Hiof"]["Templates"] = this["Hiof"]["Templates"] || {};

this["Hiof"]["Templates"]["footer/pageFooter"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<aside class=\"lo-full padding-off\">\n  <ul class=\"page-footer-view list list-inline\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.data : depth0), {"name":"each","hash":{},"fn":this.program(2, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </ul>\n</aside>\n";
},"2":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.url : stack1), {"name":"if","hash":{},"fn":this.program(3, data),"inverse":this.program(5, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    <li><a href=\""
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.url : stack1), depth0))
    + "\" class=\"btn btn-primary btn-line\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.name : stack1), depth0))
    + "</a></li>\n";
},"5":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "    <li>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.name : stack1), depth0))
    + "</li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.data : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});