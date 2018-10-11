require(['requirejs/domReady'], function (domReady) {
    domReady(function () {
        require(['app/admin/main'], function(p) {
            "use strict";
            var admin = new p.Admin();
            admin.load();
        });
    });
});
