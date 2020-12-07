import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Todo } from '../todo';
import { AuthService } from './auth.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  user;

  firestoreCollection;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
  ) {
    this.authService.getUser().subscribe((user) => {
        if (user) {
          this.user = user;
          this.firestore.collection('users').doc(user.uid).set({});
          this.firestoreCollection = this.firestore.collection(`users/${user.uid}/todoList`);
        }
      }
    )
  }


  public getTodoList(): Observable<any> | any {
    return this.firestoreCollection.snapshotChanges()
    .pipe(
      map((actions: any) => {
        return actions.map(p => {
          console.log(p)
          const todo = p.payload.doc;
          const id = todo.id;
          const data = todo.data() as Todo;
          return { ...data, id };
        });
      }
      ),
      catchError((err) => of([]))
    );
  }

  public complete(todo: Todo): void {
    this.firestoreCollection.doc(todo.id)
      .set({ completed: !todo.completed }, { merge: true });
  }

  public add(todo: Todo): void {
    this.firestoreCollection.add(todo);
  }

  public delete(todo: Todo): void {
    this.firestoreCollection.doc(todo.id).delete();
  }

}
