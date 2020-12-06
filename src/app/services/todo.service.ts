import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo } from '../todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  public firestoreCollection: AngularFirestoreCollection<any> = this.firestore.collection('todoList');

  public getTodoList(): Observable<any> {
    return this.firestoreCollection.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(p => {
            const todo = p.payload.doc;
            const id = todo.id;
            const data = todo.data() as Todo;
            return { ...data, id };
          });
        }
        )
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
