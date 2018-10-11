requirejs.config({
    baseUrl: '/js',
    paths: {
        'lib': '/js/lib',
        'core': '/js/core'
    }
});

requirejs(['/js/admin.js']);
