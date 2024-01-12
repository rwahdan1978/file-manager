import { Component, OnInit } from '@angular/core';
import { S3Content } from '../s3-content';
import { S3Service } from '../s3-service';
import { environments } from 'src/environments/enviroment';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

AWS.config.update({
  accessKeyId: environments.aws.AWS_ACCESS_KEY_ID,
  secretAccessKey: environments.aws.AWS_SECRET_ACCESS_KEY,
  region: environments.aws.AWS_DEFAULT_REGION ////'ap-south-1'
});

var s3 = new S3(AWS.config);

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  contentList: S3Content[] = [];
  constructor(public s3Service: S3Service) {
  }
  ngOnInit(): void {
    this.openFolder(this.s3Service.currentFolder);
  }

  back(): void {
    //---    Document/One/Two/
    let thepath = "FamilyDocuments/" + this.s3Service.currentFolder
    let arr = thepath.split('/');
    arr.splice(arr.length - 2, 1);
    let folderName = arr.join('/');
    this.openFolder(folderName);
  }

  openFolder(folder: string) {
    this.s3Service.currentFolder = folder;
    this.s3Service.getFolderContent().subscribe(m => {
      this.contentList = m;
    })
  }

  viewFile(key: string) {
    this.s3Service.getUrl(key).subscribe(m => {
      window.open(m, '_blank');
    })
  }

  deleteFile(key: string){
    var params = {
      Bucket: 'angular-upload-files-2023-2024', 
      Key: key
    };

    s3.deleteObject(params, function(err, data) {
      if (err) console.log(err)     
      else 
      {
        window.location.reload();
      }   
  });

  }

  deleteFolder(key: string){
    let theKey = "FamilyDocuments/" + key
    var params = {
      Bucket: 'angular-upload-files-2023-2024', 
      Key: theKey
    };

    s3.deleteObject(params, function(err, data) {
      if (err) console.log(err)     
      else 
      {
        window.location.reload();
      }   
  });

  }

}
