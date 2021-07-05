import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthorizationComponent } from './authorization/authorization.component';
import { LandingComponent } from './landing/landing.component';
import { ProofThreadComponent } from './proof-thread/proof-thread.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'auth', component: AuthorizationComponent },
  {
    path: 'proof-thread',
    component: ProofThreadComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
