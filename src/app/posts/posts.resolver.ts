import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { first, map, mergeMap, Observable, of, tap } from "rxjs";
import { PostService } from "./post.service";

@Injectable()
export class PostsResolver implements Resolve<boolean>{
    constructor(private postService: PostService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.postService.loaded$.pipe(
            /* mergeMap(loaded => {
                if (loaded) {
                    return of(true);
                }
                return this.postService.getAll().pipe(map(
                    posts => {
                        return posts ? true : false; // <=> return !!posts
                    }
                ));
            }), first() */

            tap(loaded => {
                if (!loaded) {
                    console.log('loaded = ' + loaded);
                    this.postService.getAll();
                }
            }),
            first()
        );
    }

}