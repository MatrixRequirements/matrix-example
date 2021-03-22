/// <reference path="../../lib/core.d.ts" />
/// <reference path="../../lib/admin.d.ts" />

namespace Matrix {
    export namespace Request {
        /**
         * Perform a REST request with the current user
         * @param url The request URL
         */
        export function getRequest(url: string) {
            restConnection.getProject("");
        }
    }
}