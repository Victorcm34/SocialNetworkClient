import { Component, OnInit, DoCheck } from '@angular/core';
import { FollowService } from '../../../services/follow.service';
import { MessageService } from '../../../services/message.service';
import { UserService } from '../../../services/user.service';
import { GLOBAL } from '../../../services/global';
import { Message } from '../../../models/message';
import { Router, ActivatedRoute, Params} from '@angular/router';


@Component({
    selector: 'app-sent',
    templateUrl: 'sent.component.html',
    providers: [MessageService, UserService]
})
export class SentComponent implements OnInit {
    public title: string;
    public identity;
    public url: string;
    public token;
    public status: string;
    public follows;
    public messages: Message[];
    public pages;
    public page;
    public total;
    public next_page;
    public prev_page;

    constructor(
        private _messageService: MessageService,
        private _userService: UserService,
        private _route: ActivatedRoute
    ) {
        this.title = 'Mensajes enviados';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit() {
        console.log('sent component cargado');
        this.actualPage();
    }

    getMessages(token, page) {
        this._messageService.getEmmitMessages(this.token, 1).subscribe(
            response => {
                if (response.messages) {
                    this.status = 'success';
                    this.messages = response.messages;
                    this.total = response.total;
                    this.pages = response.pages;

                }
            },
            error => {
                this.status = 'error';
                console.log(error);
            }
        );
    }

    actualPage() {
        this._route.params.subscribe(params => {
            let page = +params['page'];
            this.page = page;

            if (!params['page']) {
                page = 1;
            }

            if (!page) {
                page = 1;
            } else {
                this.next_page = page + 1;
                this.prev_page = page - 1;

                if (this.prev_page <= 0) {
                    this.prev_page = 1;
                }
            }

            // Devolver listado de usuarios
            this.getMessages(this.token, page);
        });
    }
}
