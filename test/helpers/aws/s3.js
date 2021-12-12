'use strict'

import AWS from 'aws-sdk';
import './init.js'
import logger from "../logger.js";

const S3 = new AWS.S3()

/**
 * @param bucket
 * @returns {Promise<S3.ListObjectsV2Output & {$response: Response<S3.ListObjectsV2Output, Error & {code: string, message: string, retryable?: boolean, statusCode?: number, time: Date, hostname?: string, region?: string, retryDelay?: number, requestId?: string, extendedRequestId?: string, cfId?: string, originalError?: Error}>}>}
 */
export async function getListOfFilesFormBucket(bucket) {
    logger.info(`Get list of files from: ${bucket}`)
    return await S3.listObjectsV2({Bucket: bucket}).promise()
}

/**
 *
 * @param bucket {string}
 * @param key {string}
 * @param file {Buffer}
 * @param ext {string}
 * @param mime {string}
 * @returns {Promise<ManagedUpload.SendData>}
 */
export async function uploadFile(bucket, key, file, ext, mime) {
    const params = {
        Bucket: bucket,
        Key: `${key}.${ext}`,
        Body: file,
        ContentType: mime,
    };

    return await S3.upload(params).promise();
}
