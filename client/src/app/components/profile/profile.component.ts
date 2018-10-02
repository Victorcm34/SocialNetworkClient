import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL } from '../../services/global';



@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    providers: [UserService, FollowService]
})
export class ProfileComponent implements OnInit {
    public title: string;
    public user: User;
    public status: string;
    public identity;
    public token;
    public stats;
    public url;
    public followed;
    public following;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _followService: FollowService
    ) {
        this.title = 'Perfil';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.followed = 'false';
        this.following = 'false';
    }

    ngOnInit() {
        console.log('Cargado correctamente el profile');
        this.loadProfile();
    }

    loadProfile() {
        this._route.params.subscribe(params => {
            const id = params['id'];
            this.getUser(id);
            this.getCounters(id);
        });
    }

    getUser(id) {
        this._userService.getUser(id).subscribe(
            response => {
                if (response.user) {
                    this.user = response.user;
                    console.log(response);

                    if (response && response.following && response.following._id) {
                        this.following = 'true';
                    } else {
                        this.following = 'false';
                    }

                    if (response && response.followed && response.followed._id) {
                        this.followed = 'true';
                    } else {
                        this.followed = 'false';
                    }

                } else {
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
                this._router.navigate(['/perfil', this.identity._id]);
            }
        );
    }

    getCounters(id) {
        this._userService.getCounters(id).subscribe(
            response => {
                this.stats = response;
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}
