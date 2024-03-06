import * as cv from "@edumolki/opencv4nodejs";
import { MatchResult, Region } from "@nut-tree/nut-js";

export async function matchImages(haystack: cv.Mat, needle: cv.Mat): Promise<MatchResult<Region>> {
    const match = await haystack.matchTemplateAsync(
        needle,
        cv.TM_SQDIFF_NORMED,
    );
    const minMax = await match.minMaxLocAsync();
    return new MatchResult(
        1.0 - minMax.minVal,
        new Region(
            minMax.minLoc.x,
            minMax.minLoc.y,
            needle.cols,
            needle.rows,
        ),
    );
}
