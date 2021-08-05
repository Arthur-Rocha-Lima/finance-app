import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;
  mensagemSucesso : String;
  mensagemErro : String;

  constructor(private service: ClientesService, private router: Router) { }

  ngOnInit(): void {
    this.service
      .getClientes()
      .subscribe( response => {
        this.clientes = response
      });
  }

  novoCadastro(){
    this.router.navigate(['/clientes-form']);
  }

  preparaDelecao(cliente: Cliente){
    this.clienteSelecionado = cliente;
  }

  deletarCliente(id: number){
    this.service.deletar(id).subscribe(
      response => {
        this.mensagemSucesso = 'Cliente deletado com sucesso!';
        this.ngOnInit();
      },
      erro => this.mensagemErro = 'Ocorreu um erro ao deletar o cliente.'
    );
  }

}
