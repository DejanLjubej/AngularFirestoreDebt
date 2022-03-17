import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute, Params, ActivationEnd } from '@angular/router';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private clientService : ClientService,
    private router: Router,
    private route: ActivatedRoute
    ) {

    }

  ngOnInit() {
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client =>
      {
        console.log(`whats the id ${client.id}`)
        if(client!=null){
          if(client.balance!>0){
            this.hasBalance = true;
          }
        }
        console.log(`whats the client ${client.balance}`)
          this.client = client;
      });
  }

  onDeleteClick()
  {

  }
}
