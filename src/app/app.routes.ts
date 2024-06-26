import { Routes } from '@angular/router';
import { StateElectionsComponent } from './components/state-elections/state-elections.component';
import { StateAssemblyComponent } from './components/state-assembly/state-assembly.component';
import { StateResultsComponent } from './components/state-results/state-results.component';
import { StateCandidatesComponent } from './components/state-candidates/state-candidates.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PartiesComponent } from './components/parties/parties.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component:DashboardComponent },
    { path: 'stateelection', redirectTo: '/stateelection/elections', pathMatch: 'full' },
    {
        path: 'stateelection', children: [
            { path: 'elections', component: StateElectionsComponent, pathMatch: 'full' },
            { path: 'assembly', component: StateAssemblyComponent, pathMatch: 'full' },
            { path: 'candidates', component: StateCandidatesComponent, pathMatch: 'full' },
            { path: 'results', component: StateResultsComponent, pathMatch: 'full' }
        ]
    },
    { path: 'parties', component: PartiesComponent , pathMatch: 'full'},
    { path: 'account/login', component: LoginComponent, pathMatch: 'full' },
    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo: '/error', pathMatch: 'full' }
];
