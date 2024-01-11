import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { S3Service } from '../s3-service';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app-adminPass',
  templateUrl: './adminPass.component.html',
  styleUrls: ['./adminPass.component.css']
})
export class AdminPassComponent implements OnInit {
  thepass: any;
  first: any = 0;
  adminPassForm: FormGroup = this.formBuilder.group({
    thepass: ['', Validators.required]
  });
  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(): void {
    this.thepass = this.adminPassForm.controls['thepass'].value;
    if (this.thepass === "Fatima@2020" && this.first === 0) 
    {  
    this.first = 1;
    this.router.navigate(['/']);
    }

  }

}
