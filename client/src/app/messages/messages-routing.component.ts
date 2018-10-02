import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { ReceivedComponent } from './components/received/received.component';
import { SentComponent } from './components/sent/sent.component';
import { Routes, RouterModule } from '@angular/router';
import { UserWard } from '../services/user.ward';

const messagesRoutes: Routes = [
    {
        path: 'mensajes',
        component: MainComponent,
        children: [
            {path: '', redirectTo: 'recibidos', pathMatch: 'full', canActivate: [UserWard]},
            {path: 'enviar', component: AddComponent, canActivate: [UserWard]},
            {path: 'enviados', component: SentComponent, canActivate: [UserWard]},
            {path: 'enviados/:page', component: SentComponent, canActivate: [UserWard]},
            {path: 'recibidos', component: ReceivedComponent, canActivate: [UserWard]},
            {path: 'recibidos/:page', component: ReceivedComponent, canActivate: [UserWard]}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(messagesRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class MessagesRoutingModule {}
