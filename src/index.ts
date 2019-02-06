import * as chunker from "object-chunker";
import * as stream from "stream";
import * as through2 from "through2";

export const consumeStreamAsync = (
    stream: stream.Readable,
    /** Read `chunkSize` items, then process them. Then process next portion */
    chunkSize: number,
    /** Handler function to apply on portion of data from stream */
    handler: (data: any[]) => Promise<void>
): Promise<number> => {
    let processedItems = 0;

    return new Promise((resolve, reject) => {
        stream
            .pipe(chunker(chunkSize))
            .pipe(
                through2.obj((chunk, enc, callback) => {
                    processedItems = processedItems + chunk.length;

                    handler(chunk)
                        .then(() => {
                            callback();
                        })
                        .catch(err => {
                            callback(err);
                        });
                })
            )
            .on("error", (err: any) => reject(err))
            .on("finish", () => {
                resolve(processedItems);
            });
    });
};
