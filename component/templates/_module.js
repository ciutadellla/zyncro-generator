
(function(module) {
  <% if (includeFilter == true) { %>
    module.filter('<%= capitalModuleName %>Filter', function() {
      return function() { };
    });
  <% } %>
  <% if (includeDirective == true) { %>
    module.directive('<%= capitalModuleName %>Directive', function($window, $log) {
      return {
        restrict: 'E',
        replace: true,
        scope: 'scope',
        link: 'link',
        templateUrl: '@@themes_dir@@'
      };
    });
  <% } %>
  <% if (includeService == true) { %>
    module.factory('<%= capitalModuleName %>Service', function($resource) {
      return{}
    }
  <% } %>
}(angular.module("<%= projectName %>.components.<%= camelModuleName %>", [
  //'ComponentDependencies'
])));







