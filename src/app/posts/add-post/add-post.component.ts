import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  addPostFormGroup: FormGroup;
  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.addPostFormGroup = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(4)]),
      description: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  onAddPost() {
    const post: Post = this.addPostFormGroup.value;
    this.postService.add(post).subscribe(data => {
      if (data) {
        this.router.navigate(['/posts'])
      }
    });
  }
}
