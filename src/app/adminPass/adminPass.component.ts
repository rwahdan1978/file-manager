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
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd && !e.url.startsWith('claim')),
        first()
      )
      .subscribe(() => {
        localStorage.removeItem('lastTab');
      });
  }

  onSubmit(): void {
    this.thepass = this.adminPassForm.controls['thepass'].value;
    if (this.thepass === "Fatima@2020" && this.first === 0) 
    {  
    this.first = 1;
    this.router.navigate(['/']);
    }

  }

  goBack(){
    window.open(
      'https://ramiwahdan.com/#/',
      '_self' // <- This is what makes it open in a new window.
    );
  }

}
