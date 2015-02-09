(function(module) {
  module.filter('<%= capitalModuleName %>Filter', function() {
    return function() { };
  });

}(angular.module("<%= projectName %>.<%= camelModuleName %>.<%= camelModuleName %>Filter", [
    //'ModuledDependencies'
])));


