import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileListComponent } from './file-list/file-list.component';
import { UploadComponent } from './upload/upload.component';
import { NewFolderComponent } from './new-folder/new-folder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminPassComponent } from './adminPass/adminPass.component';

@NgModule({
  declarations: [	
    AppComponent,
    FileListComponent,
    UploadComponent,
    NewFolderComponent,
      AdminPassComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
