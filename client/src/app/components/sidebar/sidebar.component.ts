import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UploadService } from '../../services/upload.service';


@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    providers: [UserService, PublicationService, UploadService]
})
export class SidebarComponent implements OnInit {
    public identity;
    public token;
    public stats;
    public url;
    public status;
    public publication: Publication;
    public filesToUpload: Array<File>;

    @Output() sent = new EventEmitter();

    constructor(
        private _userService: UserService,
        private _publicationService: PublicationService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _uploadService: UploadService
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

                    if (this.filesToUpload && this.filesToUpload.length) {
                        this._uploadService.makeFileRequest(this.url + 'upload-image-pub/' + response.publication._id,
                        [], this.filesToUpload, this.token, 'image')
                                .then((result: any) => {
                                    this.publication.file = result.image;
                                    this.publication = response.publication;
                                    this.status = 'success';
                                    form.reset();
                                    this._router.navigate(['/timeline']);
                                });
                    } else {
                        this.publication = response.publication;
                        this.status = 'success';
                        form.reset();
                        this._router.navigate(['/timeline']);
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

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }

    sendPublication(event) {
         this.sent.emit({send: 'true'});
    }

}
