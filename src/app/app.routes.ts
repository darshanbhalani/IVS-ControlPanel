import { Routes } from '@angular/router';
import { StateElectionsComponent } from './components/state-elections/state-elections.component';
import { StateAssemblyComponent } from './components/state-assembly/state-assembly.component';
import { StateResultsComponent } from './components/state-results/state-results.component';
import { StateCandidatesComponent } from './components/state-candidates/state-candidates.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PartiesComponent } from './components/parties/parties.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { authGuard } from './guard/auth/auth.guard';
import { LiveElectionsComponent } from './components/live-elections/live-elections.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'stateelection', redirectTo: '/stateelection/elections', pathMatch: 'full'},
  {
    path: 'stateelection',
    canActivate: [authGuard],
    children: [
      { path: 'elections', component: StateElectionsComponent, pathMatch: 'full' },
      { path: 'liveelections', component:LiveElectionsComponent, pathMatch: 'full' },
      { path: 'assembly', component: StateAssemblyComponent, pathMatch: 'full' },
      { path: 'candidates', component: StateCandidatesComponent, pathMatch: 'full' },
      { path: 'results', component: StateResultsComponent, pathMatch: 'full' }
    ]
  },
  { path: 'parties', component: PartiesComponent, canActivate: [authGuard], pathMatch: 'full' },
  { path: 'account/login', component: LoginComponent, pathMatch: 'full' },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error', pathMatch: 'full' }
];
