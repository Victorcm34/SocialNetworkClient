import { Component, OnInit, DoCheck } from '@angular/core';
import { FollowService } from '../../../services/follow.service';
import { MessageService } from '../../../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import { Message } from '../../../models/message';

@Component({
    selector: 'app-add',
    templateUrl: 'add.component.html',
    providers: [FollowService, MessageService]
})
export class AddComponent implements OnInit {
    public title: string;
    public message: Message;
    public identity;
    public url: string;
    public token;
    public status: string;
    public follows;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _followService: FollowService,
        private _messageService: MessageService,
        private _userService: UserService
    ) {
        this.title = 'Enviar mensaje';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.message = new Message('', '', this.identity._id, '', '', '');

    }

    ngOnInit() {
        console.log('Main component cargado');
    }
}
