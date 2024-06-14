import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StateElectionsComponent } from './components/state-elections/state-elections.component';
import { StateAssemblyComponent } from './components/state-assembly/state-assembly.component';
import { StateResultsComponent } from './components/state-results/state-results.component';
import { StateCandidatesComponent } from './components/state-candidates/state-candidates.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'elections', component: StateElectionsComponent },
    { path: 'assembly', component: StateAssemblyComponent },
    { path: 'candidates', component: StateCandidatesComponent },
    { path: 'results', component: StateResultsComponent }
];
