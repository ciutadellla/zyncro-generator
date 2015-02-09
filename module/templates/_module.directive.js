(function(module) {
  module.controller('<%= capitalModuleName %>Controller', function ($scope) {
    var init = function() {
    };
    init();
  });

}(angular.module("<%= projectName %>.<%= camelModuleName %>.<%= camelModuleName %>Controller", [
  //'ModuledDependencies'
])));
