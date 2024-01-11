import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { S3Service } from './s3-service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'drive-management';
  isLoading: boolean = false;
  constructor(private s3Service: S3Service, private cdRef: ChangeDetectorRef,
    private location: LocationStrategy) { 
      history.pushState(null, '', window.location.href);  
      this.location.onPopState(() => {
      history.pushState(null, '', window.location.href);
  });
  }
  ngOnInit(): void {
    this.s3Service.loader.subscribe((m: boolean) => {
      this.isLoading = m;
    })
  }

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }
}
