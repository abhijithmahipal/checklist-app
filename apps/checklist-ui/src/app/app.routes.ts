import { ChecklistComponent } from './checklist/checklist.component';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', component: ChecklistComponent },
  { path: ':id', component: ChecklistComponent },
];
