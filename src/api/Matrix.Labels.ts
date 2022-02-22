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
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                Matrix.REST.projectGETRequest("/labelhistory")
                    .then((data: XRLabelHistory) => resolve(data.entries as XRLabelEntry[]))
                    .catch((error) => reject(error));
            });
        }

        /**
         * Get needles by category and field id for all items in a project
         */
        export function getNeedlesByCategoryAndFiledId(category: string, fieldId: Number): Promise<XRTrimNeedleItem[]> {
            return new Promise<XRTrimNeedleItem[]>((resolve, reject) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                Matrix.REST.projectGETRequest("/needle?search=mrql:category="+category+"&fieldsOut="+fieldId)
                    .then((data: XRTrimNeedle) => resolve(data.needles as XRTrimNeedleItem[]))
                    .catch((error) => reject(error));
            });
        }

    }
}
