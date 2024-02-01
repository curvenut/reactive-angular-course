import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  tap,
  delay,
  map,
  concatMap,
  switchMap,
  withLatestFrom,
  concatAll, shareReplay, catchError
} from 'rxjs/operators';
import {merge, fromEvent, Observable, concat, throwError, combineLatest} from 'rxjs';
import {Lesson} from '../model/lesson';
import {CoursesService} from '../services/courses.service';


interface CourseData {
    course: Course;
    lessons: Lesson[];
}


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  data$: Observable<CourseData>;

  courseId:number;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService) {

    this.courseId = parseInt(this.route.snapshot.paramMap.get("courseId"));

  }

  ngOnInit() {

    this.loadData();

  }


  loadData() {

    const course$ = this.coursesService.loadCourseById(this.courseId);

    const lessons$ = this.coursesService.loadAllCourseLessons(this.courseId);

    this.data$ = combineLatest({course: course$, lessons: lessons$})
      .pipe(
        startWith([null, []]),
        tap(console.log)
      );
  }
}











