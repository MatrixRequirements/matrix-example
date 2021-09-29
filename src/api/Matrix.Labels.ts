/// <reference path="../../lib/core.d.ts" />
/// <reference path="../../lib/admin.d.ts" />
/// <reference path="./Matrix.REST.ts" />

namespace Matrix {
    export namespace Labels {
        /**
         * Get the label history for all items in a project
         */
        export function projectLabelHistory(): Promise<XRLabelEntry[]> {
            return new Promise<XRLabelEntry[]>((resolve, reject) => {
                Matrix.REST.projectGETRequest("/labelhistory")
                    .then((data: XRLabelHistory) => resolve(data.entries as XRLabelEntry[]))
                    .catch((error) => reject(error));
            });
        }

        export function getItemNeedles(itemId: string): Promise<XRTrimNeedleItem[]> {
            return new Promise<XRTrimNeedleItem[]>((resolve, reject) => {
                Matrix.REST.projectGETRequest("/needle?search=mrql:id="+itemId)
                    .then((data: XRTrimNeedle) => resolve(data.needles as XRTrimNeedleItem[]))
                    .catch((error) => reject(error));
            });
        }
    }
}
