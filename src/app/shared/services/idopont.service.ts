import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Idopont } from '../models/Idopont';

@Injectable({
  providedIn: 'root'
})
export class IdopontService {
  collectionName = 'Idoponts';

  constructor(private afs: AngularFirestore) { }

  create(idopont: Idopont) {
    idopont.id = this.afs.createId();
    return this.afs.collection<Idopont>(this.collectionName).doc(idopont.id).set(idopont);
    // return this.afs.collection<Idopont>(this.collectionName).add(idopont);
  }

  getAll() {
    return this.afs.collection<Idopont>(this.collectionName).valueChanges();
  }

  update(idopont: Idopont) {
    return this.afs.collection<Idopont>(this.collectionName).doc(idopont.id as string).set(idopont);
  }

  delete(id: string) {
    return this.afs.collection<Idopont>(this.collectionName).doc(id).delete();
  }

  getIdopontsById(id: string) {
    return this.afs.collection<Idopont>(this.collectionName, ref => ref.where('id', '==', id).orderBy('date', 'asc')).valueChanges();
  }
  getIdopontsByUserId(id: string) {
    return this.afs.collection<Idopont>(this.collectionName, ref => ref.where('username', '==', id).orderBy('date', 'asc')).valueChanges();
  }
}
