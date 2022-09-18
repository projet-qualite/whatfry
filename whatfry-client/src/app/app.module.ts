import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { ConversationComponent } from './components/conversation/conversation.component';
import { MessageComponent } from './components/message/message.component';
import { ConversationItemComponent } from './components/conversation-item/conversation-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user/user.effects';
import { ConversationsResolver } from './dashboard/dashboard.resolver';
import { ConversationEffects } from './store/conversation/conversation.effects';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { AccountItemComponent } from './components/account-item/account-item.component';
import { AuthModule } from './auth/auth.module';
import { DashboardGuard } from './dashboard/dashboard.guard';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


const routes: Routes = [
  {
    path: 'dashboard',
    resolve: {
      id: ConversationsResolver
    },
    component: DashboardComponent,
    canActivate: [DashboardGuard]

  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ConversationListComponent,
    DashboardComponent,
    ConversationComponent,
    MessageComponent,
    ConversationItemComponent,
    AccountItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UserEffects, ConversationEffects]),
    SocketIoModule.forRoot(config),
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
