import { Routes } from '@angular/router';
import { StateElectionsComponent } from './components/module/stateelection/state-elections/state-elections.component';
import { StateAssemblyComponent } from './components/module/stateelection/state-assembly/state-assembly.component';
import { StateResultsComponent } from './components/module/stateelection/state-results/state-results.component';
import { StateCandidatesComponent } from './components/module/stateelection/state-candidates/state-candidates.component';
import { DashboardComponent } from './components/module/dashboard/dashboard.component';
import { PartiesComponent } from './components/module/parties/parties.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { ErrorComponent } from './components/other/error/error.component';
import { authGuard } from './guard/auth/auth.guard';
import { LiveElectionsComponent } from './components/module/stateelection/live-elections/live-elections.component';
import { VotersComponent } from './components/module/voters/voters/voters.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'stateelection', redirectTo: '/stateelection/elections', pathMatch: 'full'},
  { path: 'voters', component: VotersComponent, canActivate: [authGuard], pathMatch: 'full' },
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
