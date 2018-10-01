import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { Router, ActivatedRoute, Params} from '@angular/router';


@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    providers: [UserService, PublicationService]
})
export class SidebarComponent implements OnInit {
    public identity;
    public token;
    public stats;
    public url;
    public status;
    public publication: Publication;

    @Output() sent = new EventEmitter();

    constructor(
        private _userService: UserService,
        private _publicationService: PublicationService,
        private _route: ActivatedRoute,
        private _router: Router,
    ) {
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.stats = this._userService.getStats();
        this.url = GLOBAL.url;
        this.publication = new Publication('', '', '', '', this.identity._id);
    }

    ngOnInit() {
        console.log(this.stats);
    }

    onSubmit(form) {
        this._publicationService.addPublication(this.token, this.publication).subscribe(
            response => {
                if (response.publication) {
                    this.publication = response.publication;
                    this.status = 'success';
                    form.reset();
                    this._router.navigate(['/timeline']);
                } else {
                    this.status = 'error';
                }
            },
            error => {
                const errorMessage = <any>error;
                console.log(errorMessage);
                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        );
    }

    sendPublication(event) {
         this.sent.emit({send: 'true'});
    }

}
