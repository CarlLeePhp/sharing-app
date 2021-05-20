import { Component, OnInit } from '@angular/core';
import { Sharing } from 'src/app/_models/Sharing';
import { AppComment } from 'src/app/_models/AppComment';
import { CommentsService } from 'src/app/_services/comments.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  sharing: Sharing;
  maxRate: number = 5;
  isReadonly: boolean = false;
  comment: AppComment = {
    id: 0,
    sharingRate: 5,
    sharingComment: '',
    sharerRate: 5,
    sharerComment: '',
    sharingId: 0,
    Commentator: 0,
  };

  constructor(
    private commentsService: CommentsService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getSharing();
  }
  getSharing() {
    this.sharing = this.commentsService.selectedSharing;
    this.comment.sharingId = this.commentsService.selectedSharing.id;
  }
  createComment() {
    this.commentsService.createComment(this.comment).subscribe(() => {
      this.toastr.info('Comment Successfully');
      this.router.navigateByUrl('/home');
    });
  }
}
