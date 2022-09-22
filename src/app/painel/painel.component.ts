import { Component, OnInit } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})

export class PainelComponent implements OnInit {

  public frases: Frase[] = FRASES
  public instrcao: string = 'Traduza a frase:'
  public rodada: number = 0
  public rodadaFrase: Frase
  public resposta: string = ''

  public progresso: number = 0

  constructor() {
    this.atualizaRodada()

  }

  ngOnInit(): void {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
    console.log(this.resposta)
  }

  public verificarResposta(): void {
    if (this.rodadaFrase.frasePtBr == this.resposta) {
      alert('A tradução está correta!')
      this.rodada++

      this.progresso = this.progresso + (100 / this.frases.length)
      //atualiza o objeto rodadaFrase
      this.atualizaRodada()

    } else {
      alert('A tradução está errada!')
    }
  }

  public atualizaRodada(): void {
    //define a frase da rodada com base em alguma lógica
    this.rodadaFrase = this.frases[this.rodada]

    //limpar a resposta
    this.resposta = ''
  }
}
