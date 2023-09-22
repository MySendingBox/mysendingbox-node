import { BodyInit } from 'node-fetch';
import stream from 'stream';

async function formatRequestBody(body: BodyInit): Promise<BodyInit> {
  if (
    typeof body === 'string' ||
    body instanceof Buffer ||
    body instanceof stream.Readable
  ) {
    // If body is a string, Buffer or ReadableStream, return it directly.
    return body;
  } else if (typeof body === 'object') {
    // If body is an object, convert it to JSON and return.
    return JSON.stringify(body);
  } else {
    throw new Error('Unsupported body type');
  }
}

export default formatRequestBody;