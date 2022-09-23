import { Component, OnInit, Output, OnDestroy, EventEmitter } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})

export class PainelComponent implements OnInit, OnDestroy {

  public frases: Frase[] = FRASES
  public instrucao: string = 'Traduza a frase:'
  public resposta: string = ''
  public rodada: number = 0
  public rodadaFrase: Frase = new Frase('', '')

  public progresso: number = 0
  public tentativas: number = 3

  @Output() public encerrarJogo:EventEmitter<string> = new EventEmitter()
  constructor() {
    this.atualizaRodada()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value
    console.log(this.resposta)
  }

  public verificarResposta(): void {
    console.log(this.tentativas)

    if (this.rodadaFrase.frasePtBr == this.resposta) {
      alert('A tradução está correta!')
      this.rodada++

      if(this.rodada === 4) {
        this.encerrarJogo.emit('vitoria')
      }

      //atualiza o objeto rodadaFrase
      this.atualizaRodada()

      this.progresso = this.progresso + (100 / this.frases.length)

    } else {

      //diminuir a variável tentativas
      this.tentativas--

      if(this.tentativas === -1) {
        this.encerrarJogo.emit('derrota')
      }

      console.log(this.tentativas)
    }
  }

  public atualizaRodada(): void {
    //define a frase da rodada com base em alguma lógica
    this.rodadaFrase = this.frases[this.rodada]

    //limpar a resposta
    this.resposta = ''
  }
}
