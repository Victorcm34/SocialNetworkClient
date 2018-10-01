import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from '../../models/publication';
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';
import { PublicationService } from '../../services/publication.service';


@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    providers: [UserService, PublicationService]
})
export class TimelineComponent implements OnInit {
    public identity;
    public token;
    public title: string;
    public url: string;
    public status: string;
    public page;
    public pages;
    public total;
    public publications: Publication[];
    public itemsPerPage;
    public noMore = false;
    @Input() user: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _publicationService: PublicationService
    ) {
        this.title = 'Timeline';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.page = 1;
    }

    ngOnInit() {
        // this.getPublications(this.page);
    }

    getPublications(user, page, adding = false) {
        this._publicationService.getPublicationsUser(this.token, user, page).subscribe(
            response => {
                if (response.publications) {
                    this.total = response.total_items;
                    this.pages = response.pages;
                    this.itemsPerPage = response.items_per_page;

                    if (!adding) {
                        this.publications = response.publications;
                    } else {
                        const arrayA = this.publications;
                        const arrayB = response.publications;
                        this.publications = arrayA.concat(arrayB);

                        // $('html, body').animate({ scrollTop: $('body').prop('scrollHeight')}, 500);
                    }

                    if (page > this.pages) {
                        this._router.navigate(['/home']);
                    }
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

    viewMore() {
        if (this.publications.length === this.total) {
            this.noMore = true;
        } else {
            this.page += 1;
        }

        this.getPublications(this.page, true);
    }

    refresh(event) {
        this.getPublications(1);
    }
}
