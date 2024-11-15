import { inject } from "@angular/core";

import { ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { CourseDetails } from "../models/course";
import { CourseService } from "../services/course.service";


export const courseResolver: ResolveFn<CourseDetails> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    return inject(CourseService).getCourseDetails(+route.paramMap.get('courseId')!);
  };