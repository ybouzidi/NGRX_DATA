import { HttpClient } from "@angular/common/http";
import { identifierName } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { DefaultDataService, HttpUrlGenerator } from "@ngrx/data";
import { Update } from "@ngrx/entity";
import { map, Observable } from "rxjs";
import { Post } from "../models/post.model";

@Injectable()
export class PostsDataService extends DefaultDataService<Post>{
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator);
  }

  override getAll(): Observable<Post[]> {
    return this.http.get('https://.....firebasedatabase.app/posts.json').pipe(
      map((response) => {
        const posts: Post[] = [];
        for (let key in response) {
          posts.push({ ...response[key], id: key });
        }
        return posts;
      })
    );
  }

  override add(post: Post): Observable<Post> {
    return this.http.post<{ name: string }>(`https://....firebasedatabase.app/posts.json`, post).pipe(map(data => {
      return { ...post, id: data.name };
    }))
  }

  override update(post: Update<Post>): Observable<Post> {
    return this.http.put<Post>(
      `https://....firebasedatabase.app/posts/${post.id}.json`,
      {
        ...post.changes
      }
    );
  }

  override delete(id: string): Observable<string> {
    return this.http.delete(
      `https://....firebasedatabase.app/posts/${id}.json`
    ).pipe(map(data => {
      return id;
    }));
  }
}