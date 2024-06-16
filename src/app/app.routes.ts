import { Routes } from '@angular/router';
import { StateElectionsComponent } from './components/state-elections/state-elections.component';
import { StateAssemblyComponent } from './components/state-assembly/state-assembly.component';
import { StateResultsComponent } from './components/state-results/state-results.component';
import { StateCandidatesComponent } from './components/state-candidates/state-candidates.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PartiesComponent } from './components/parties/parties.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component:DashboardComponent },
    { path: 'stateelection', redirectTo: '/stateelection/elections', pathMatch: 'full' },
    {
        path: 'stateelection', children: [
            { path: 'elections', component: StateElectionsComponent },
            { path: 'assembly', component: StateAssemblyComponent },
            { path: 'candidates', component: StateCandidatesComponent },
            { path: 'results', component: StateResultsComponent }
        ]
    },
    { path: 'parties', component: PartiesComponent },
    { path: 'account/login', component: LoginComponent }
];
