import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { ReceivedComponent } from './components/received/received.component';
import { SentComponent } from './components/sent/sent.component';
import { MessagesRoutingModule } from './messages-routing.component';

import { MomentModule } from 'angular2-moment';
import { UserService } from '../services/user.service';
import { UserWard } from '../services/user.ward';



@NgModule({
    declarations: [
      MainComponent,
      AddComponent,
      ReceivedComponent,
      SentComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MessagesRoutingModule,
        MomentModule
    ],
    exports: [
        MainComponent,
        AddComponent,
        ReceivedComponent,
        SentComponent
    ],
    providers: [UserService, UserWard]
})

export class MessagesModule {}
