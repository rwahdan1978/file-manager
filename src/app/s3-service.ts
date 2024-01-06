import { EventEmitter, Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs';

//import { environment } from '../environments/environment';
//import { env } from 'process';
//import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';

AWS.config.update({
        region: 'ap-south-1',
        accessKeyId: process.env.accessKeyId,
        secretAccessKey: process.env.secretAccessKey
});

const bucket = new S3(AWS.config);

@Injectable({
  providedIn: 'root'
})

export class S3Service {

  bucketName: string = 'angular-upload-files-2023-2024'
  loader: EventEmitter<boolean> = new EventEmitter<boolean>()
  currentFolder: string = 'properties2023//';

  constructor() {}

  getFolderContent(): Observable<any> {
    return new Observable((observer) => {
      this.loader.next(true);
      bucket.listObjectsV2({ Bucket: this.bucketName, Prefix: this.currentFolder, Delimiter: '/' }, (err: AWS.AWSError, data: S3.ListObjectsV2Output) => {
        this.loader.next(false);
        console.log(data)
        if (err) {
          observer.error(err);
        }
        else {
          let list: any[] = [];
          list = list.concat(data.CommonPrefixes?.map(m => { return { name: m.Prefix, contentType: 'folder' } }));
          list = list.concat(data.Contents?.filter(m => m.Key != this.currentFolder).map(m => { return { name: m.Key, contentType: 'file', modifiedTime: m.LastModified?.toDateString() } }));
          observer.next(list);
        }

      });
    })

  }

  getUrl(key:string): Observable<any> {
    return new Observable((observer) => {
      this.loader.next(true);
      bucket.getSignedUrl('getObject',{ Bucket: this.bucketName, Key:key,Expires:60*5 }, (err: Error, url: string) => {
        this.loader.next(false);
        if (err) {
          observer.error(err);
        }
        else {
          observer.next(url);
        }

      });
    })

  }

  createFolder(folderName:string): Observable<any> {
    return new Observable((observer) => {
      this.loader.next(true);
      bucket.putObject({ Bucket: this.bucketName, Key:this.currentFolder+folderName+'/' }, (err: AWS.AWSError, data: S3.PutObjectOutput) => {
        this.loader.next(false);
        if (err) {
          observer.error(err);
        }
        else {
          observer.next(data);
        }
      });
    })

  }

  upload(file:any): Observable<any> {
    return new Observable((observer) => {
      this.loader.next(true);
      bucket.upload({ Bucket: this.bucketName, Key:this.currentFolder+file.name,Body:file }, (err: Error, data: S3.ManagedUpload.SendData) => {
        this.loader.next(false);
        if (err) {
          observer.error(err);
        }
        else {
          observer.next(data);
        }
      });
    })

  }
  
}
