import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService extends EntityCollectionServiceBase<Post> {
  constructor(serviceElementFactory: EntityCollectionServiceElementsFactory){
    super('Post', serviceElementFactory)
  }
}
