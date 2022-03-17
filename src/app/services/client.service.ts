import { Injectable } from '@angular/core';

import {AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/compat/firestore'
import { Console } from 'console';

import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  emptyClient:Client =  {
    id:"",
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    balance: undefined
  }

  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients:Observable<Client[]>;
  client:Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('Clients', ref => ref.orderBy('lastName', 'asc'));
   }

   getClients(): Observable<Client[]>{
     this.clients = this.clientsCollection.snapshotChanges().pipe(
     map(changes=>
      {
        return changes.map(action=>
        {
          const data = action.payload.doc.data() as Client;
          data.id = action.payload.doc.id;
          return data;
        })
      }));
      return this.clients;
    }

    newClient(client: Client){
      this.clientsCollection.add(client);
    }

    getClient(id: string): Observable<Client>{

      console.log("client Doc id "+id);
      this.clientDoc = this.afs.doc<Client>(`Clients/${id}`);
      this.client = this.clientDoc.snapshotChanges().pipe(
        map(action =>
          {
            console.log(`action is ${action.type}`);
            if(action.payload.exists === false){
              return this.emptyClient;
            }else{
              console.log("client in else"+this.client);
              const data = action.payload.data() as Client;
              data.id = action.payload.id;
              return data;
            }
          }
          )
          );
          console.log("client"+this.client);
      return this.client;
    }


}
