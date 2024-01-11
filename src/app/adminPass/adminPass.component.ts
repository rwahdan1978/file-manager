import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { LocationStrategy } from '@angular/common';
import { filter, first } from 'rxjs';

@Component({
  selector: 'my-app-adminPass',
  templateUrl: './adminPass.component.html',
  styleUrls: ['./adminPass.component.css']
})
export class AdminPassComponent implements OnInit {
  thepass: any;
  first: any = 0;
  public isActive: any;

  adminPassForm: FormGroup = this.formBuilder.group({
    thepass: ['', Validators.required]
  });
  constructor(private formBuilder: FormBuilder, private router: Router,
              private location: LocationStrategy) { 
                history.pushState(null, '', window.location.href);  
                this.location.onPopState(() => {
                history.pushState(null, '', window.location.href);
});  
              }

  ngOnInit() {
    
      this.isActive = localStorage.getItem("active");
      this.first = 0;

  }

  onSubmit(): void {
    this.thepass = this.adminPassForm.controls['thepass'].value;
    if (this.thepass === "Fatima@2020") 
    {  
      localStorage.setItem('active', "1");
      this.isActive = localStorage.getItem("active");
      this.first = 1;
      this.adminPassForm.reset();
      this.router.navigate(['/']);
    }
  }

  goBack(){
    this.isActive = localStorage.removeItem('active');
    window.open(
      'https://ramiwahdan.com/#/',
      '_self' // <- This is what makes it open in a new window.
    );
  }

}
