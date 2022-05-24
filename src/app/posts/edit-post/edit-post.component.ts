import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  editPostFormGroup: FormGroup;
  posts$: Observable<Post[]>;
  id = this.route.snapshot.params['id'];
  constructor(private route: ActivatedRoute,private router: Router, private postService: PostService) { }

  ngOnInit(): void {
    

    this.editPostFormGroup = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });

    this.postService.entities$.subscribe(posts => {
      const post = posts.find(post => post.id === this.id)
      this.editPostFormGroup.patchValue({
        title: post?.title,
        description: post?.description
      })
    });
  }
  onUpdatePost() {
    const postData={...this.editPostFormGroup.value, id: this.id}
    this.postService.update(postData);
    this.router.navigate(['/posts'])
  }
}
