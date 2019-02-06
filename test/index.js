import test from "ava";
import byLine from "byline";
import fs from "fs";
import path from "path";

import { consumeStreamAsync } from "../";

test("Example 1", async t => {
    let result = "";

    const stream = byLine(
        fs.createReadStream(path.resolve(__dirname, "test-asset.txt"), {
            encoding: "utf8"
        })
    );

    const processedItemsCount = await consumeStreamAsync(
        stream,
        1,
        async lines => {
            result += lines[0];
        }
    );

    t.is(processedItemsCount, 3);
    t.is(result, "123");
});
