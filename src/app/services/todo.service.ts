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
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.firestore.collection('users').doc(this.user.uid).set({});
    this.firestoreCollection = this.firestore.collection(`users/${this.user.uid}/todoList`);
  }


  public getTodoList(): Observable<any> | any {
    return this.firestoreCollection.snapshotChanges()
    .pipe(
      map((actions: any) => {
        return actions.map(p => {
          const todo = p.payload.doc;
          const id = todo.id;
          const data = todo.data() as Todo;
          return { ...data, id };
        });
      }
    ));
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
