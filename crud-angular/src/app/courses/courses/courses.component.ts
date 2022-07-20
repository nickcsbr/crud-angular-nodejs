import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent, ErrorMessage } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category']; 
 
  constructor( 
    private coursesService: CoursesService, 
    public dialog: MatDialog 
    ) { 
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => { 
        console.log(error) 
        const errorMsg: ErrorMessage = { 
          title: error.status + ' - ' + error.statusText,
          message: error.message
        } 
        this.onError(errorMsg); 
        return of([]);
      })
    );
  }

  onError(errorMessage: ErrorMessage) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage
    });
  }
}