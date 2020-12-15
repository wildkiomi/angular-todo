import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { map} from 'rxjs/operators';
import { Todo } from '../../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private firestoreCollection: AngularFirestoreCollection;
  private todoList$: Observable<Todo[]>;

  constructor(
    private firestore: AngularFirestore,
  ) {
    const user = JSON.parse(localStorage.getItem('user'));
    this.firestoreCollection = this.firestore.collection(`users/${user}/todoList`);
    this.todoList$ = this.firestoreCollection.snapshotChanges()
    .pipe(
      map((actions: DocumentChangeAction<firebase.firestore.DocumentData>[]) => {
        return actions.map(action => {
          const todo = action.payload.doc;
          const id = todo.id;
          const data = todo.data() as Todo;
          return { ...data, id };
        });
      }
    ));
  }


  public getTodoList(): Observable<Todo[]> {
    return this.todoList$;
  }

  public complete(todo: Todo): Promise<void> {
    return this.firestoreCollection.doc(todo.id)
      .set({ completed: !todo.completed }, { merge: true });
  }

  public add(todo: Todo): Promise<any> {
    return this.firestoreCollection.add(todo);
  }

  public delete(todo: Todo): Promise<any> {
    return this.firestoreCollection.doc(todo.id).delete();
  }

}
