import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Todo } from '../todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  firestoreCollection = this.firestore.collection("todoList");

  getTodoList() { 
    return this.firestoreCollection.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(p => {
            const todo = p.payload.doc;
            const id = todo.id;
            const data = todo.data() as Todo;
            return { ...data, id };
          })
        }
        )
      )
  };

  complete(todo) {
    return new Promise<void>(() => {
      this.firestoreCollection.doc(todo.id)
        .set({ completed: !todo.completed }, { merge: true });
    });
  };

  add(todo): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        this.firestoreCollection
        .add(todo)
        .then((response) => { console.log(response)}, err => reject(err));
    })
  }

  delete(todo): Promise<void> {
    return new Promise<void>(() => {
      this.firestoreCollection
        .doc(todo.id).delete()
        .then(response => console.log(response))
    })
  }

}
