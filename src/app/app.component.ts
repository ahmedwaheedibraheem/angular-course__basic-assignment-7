import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  statusArr = ['Stable', 'Critical', 'Finished'];

  ngOnInit() {
    this.projectForm = new FormGroup({
      name: new FormControl(
        '',
        [
          Validators.required
          // this.isNotTestSync.bind(this)
        ],
        this.isNotTestAsync.bind(this)
      ),
      email: new FormControl('', [Validators.required, Validators.email]),
      status: new FormControl('Stable', Validators.required)
    });
  }

  onProjectFormSubmit() {
    console.log(this.projectForm.value);
  }

  private isNotTestSync(
    formControl: FormControl
  ): { [isTest: string]: boolean } {
    if (formControl.value === 'test') {
      return { isTest: true };
    } else {
      return null;
    }
  }

  private isNotTestAsync(
    formControl: FormControl
  ): Observable<any> | Promise<any> {
    if (formControl.value === 'test') {
      return of({ isTest: true });
    } else {
      return of(null);
    }
  }
}
