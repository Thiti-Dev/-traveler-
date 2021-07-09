import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './landing/landing.component';

//
// ─── MAT ANG ────────────────────────────────────────────────────────────────────
//
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { AuthorizationComponent } from './authorization/authorization.component';
import { MatGridListModule } from '@angular/material/grid-list';

// ────────────────────────────────────────────────────────────────────────────────

//
// ─── FORM ───────────────────────────────────────────────────────────────────────
//
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── TOAST STUFF ────────────────────────────────────────────────────────────────
//
import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule,
} from '@costlydeveloper/ngx-awesome-popup';
import { ProofThreadComponent } from './proof-thread/proof-thread.component';
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── FLEX LAYOUT ────────────────────────────────────────────────────────────────
//
import { FlexLayoutModule } from '@angular/flex-layout';
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── NG STYLE ───────────────────────────────────────────────────────────────────
//
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
// ────────────────────────────────────────────────────────────────────────────────

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AuthorizationComponent,
    ProofThreadComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,

    //TOAST
    NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
    DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
    ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
    ToastNotificationConfigModule.forRoot(), // Needed for instantiating toast notifications.
    // ─────────────────────────────────────────────────────────────────
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
