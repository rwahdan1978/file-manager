import { EventEmitter, Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Observable } from 'rxjs';
import { environments } from '../environments/enviroment'

AWS.config.update({
  accessKeyId: environments.aws.AWS_ACCESS_KEY_ID,
  secretAccessKey: environments.aws.AWS_SECRET_ACCESS_KEY,
  region: environments.aws.AWS_DEFAULT_REGION ////'ap-south-1'
});
 
const bucket = new S3(AWS.config);

@Injectable({
  providedIn: 'root'
})

export class S3Service {

  bucketName: string = 'angular-upload-files-2023-2024';
  loader: EventEmitter<boolean> = new EventEmitter<boolean>();
  currentFolder: string = 'FamilyDocuments/';

  constructor() {}

  getFolderContent(): Observable<any> {
    return new Observable((observer) => {
      this.loader.next(false);
      bucket.listObjectsV2({ Bucket: this.bucketName, Prefix: this.currentFolder, Delimiter: '/' }, (err: AWS.AWSError, data: S3.ListObjectsV2Output) => {
        this.loader.next(false);
        if (err) {
          observer.error(err);
        }
        else {

          let list: any[] = [];
          //folders --- ?.replace(this.currentFolder,"")
          list = list.concat(data.CommonPrefixes?.map(m => { return { name: m.Prefix?.replace(this.currentFolder,""), contentType: 'folder' } }));
          //files inside folder
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
function replace(Key: string | undefined): any {
  throw new Error('Function not implemented.');
}

