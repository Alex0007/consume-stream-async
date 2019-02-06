# consume-stream-async

Apply async handler to stream data easily

```js
import { consumeStreamAsync } from "../";

const stream = fs
    .createReadStream("super-big-file.csv")
    .pipe(csv.createStream());

const processedItemsCount = await consumeStreamAsync(
    // Any readable stream. Can be a database cursor, for example
    stream,
    // Process by portions of this items count
    10000,
    // Your async handler
    async csvItems => {
        // Your async side-effect handler here that will be applied to portions of data

        await getRepository(MyCollection).insert(csvItems);
    }
);
```
