(function(module) {
  module.factory('<%= capitalModuleName %>Service', function($resource) {
      return {
        getFoo: function() {
          return $resource('https://', {}, {
            query: {
              method: "GET",
              isArray: true
            }
          });
        }
      };
    }
  );
}(angular.module("<%= projectName %>.<%= camelModuleName %>.<%= camelModuleName %>Service", [
  'ngResource'
])));
