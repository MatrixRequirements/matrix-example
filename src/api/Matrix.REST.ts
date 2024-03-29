/// <reference path="../../lib/core.d.ts" />
/// <reference path="../../lib/admin.d.ts" />

// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace Matrix {
    export namespace REST {
        /**
         * Perform a REST request with the current user for the current project
         * @param url The request URL
         */
        export function projectGETRequest(url: string): JQueryDeferred<IRestResult> {
            return restConnection.getProject(url);
        }
    }
}
