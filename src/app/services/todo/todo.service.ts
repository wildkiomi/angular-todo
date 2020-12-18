import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { map, mergeMap } from 'rxjs/operators';
import { Todo } from '../../models/todo';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private firestoreCollection: AngularFirestoreCollection;
  private todoList$: Observable<Todo[]>;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
  ) {
    this.todoList$ = this.authService.getUser().pipe(
      mergeMap(
        user => {
          this.firestoreCollection = this.firestore.collection(`users/${user.uid}/todoList`);
          return this.firestoreCollection.snapshotChanges()
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
      )
    );
  }

  public getTodoList(): Observable<Todo[]> {
    return this.todoList$;
  }

  public complete(todo: Todo): Promise<void> {
    return this.firestoreCollection.doc(todo.id)
      .set({ completed: !todo.completed }, { merge: true });
  }

  public changePriority(todo: Todo, priority: string): Promise<void> {
    return this.firestoreCollection.doc(todo.id)
      .set({ priority }, { merge: true });
  }

  public add(todo: Todo): Promise<any> {
    return this.firestoreCollection.add(todo);
  }

  public edit(todo: Todo): Promise<any> {
    return this.firestoreCollection.doc(todo.id)
    .set({ description: todo.description }, { merge: true });
  }

  public delete(todo: Todo): Promise<any> {
    return this.firestoreCollection.doc(todo.id).delete();
  }

}
