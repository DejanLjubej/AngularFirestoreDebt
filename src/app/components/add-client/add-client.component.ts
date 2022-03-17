import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit, ViewChild } from '@angular/core';
import { validateEventsArray } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';

import {Client} from '../../models/Client'
import { ClientsComponent } from '../clients/clients.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})

export class AddClientComponent implements OnInit {

  client: Client={
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0,
  }

  disableBalanceOnAdd: boolean = true;
  @ViewChild('clientForm') form: any;

  constructor(private clientService: ClientService, private router:Router) {

  }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    if(this.disableBalanceOnAdd){
      f.value.balance = 0;
    }

    if(!f.valid){
      //Show Error
    }else{
      this.clientService.newClient(f.value);
      //Add new client
      //Show a message
      //Redirect to "/"
    }
    // redirect
    this.router.navigate(['/']);
  }
}
