/// <reference path="../../lib/core.d.ts" />
/// <reference path="../../lib/admin.d.ts" />

namespace Matrix {
    export namespace Labels {
        /**
         * Get all labels on a Matrix project
         * @return list of all label names
         */
        export function getLabels(): string[] {
            // dada
            return new LabelTools().getLabelNames();
        }
    }
}