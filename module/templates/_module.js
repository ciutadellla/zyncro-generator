(function(module) {
    module.config(function ($stateProvider) {
        $stateProvider.state('<%= insertDep %>', {
            url: '/<%= name %>',
            resolve:{},
            views: {
                "main@": {
                    controller: '<%= capitalModuleName %>Controller',
                    templateUrl: '@@themes_dir@@/<%= stateUrl %>/<%= name %>.tpl.html'
                }
            },
            data:{ pageTitle: '<%= capitalModuleName %>' }
        });
    });



    module.controller('<%= capitalModuleName %>Controller', function ($scope) {
    var init = function() {
    };
    init();
  });


}(angular.module("<%= insertDep %>", [
    'ui.router'
])));
