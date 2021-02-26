declare function applyResponsiveView(): void;
declare var xDown: any;
declare var yDown: any;
declare function getTouches(evt: any): any;
declare function handleTouchStart(evt: any): void;
declare function handleTouchMove(evt: any): void;
/**
// debugging functionality for old browsers
(function () {
    var method:string;
    var noop = function () {
    };
    var methods:string[] = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
*/ 
//# sourceMappingURL=app.d.ts.map