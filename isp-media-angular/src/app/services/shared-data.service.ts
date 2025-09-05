import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Utilizador } from '../models/Utilizador';
import { Musica } from '../models/Musica';
import { Artista } from '../models/Artista';
import { Album } from '../models/Album';
import { Video } from '../models/Video';
import { Grupo } from '../models/Grupo';
import { MembroGrupo } from '../models/MembroGrupo';
import { Playlist } from '../models/Playlist';
import { MeuCarregado } from '../models/MeuCarregado';
import { RadioEstacao } from '../models/RadioEstacao';
import { Estacao } from '../models/Estacao';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  private storageKey = 'sharedData';

  public readonly ipServidor = "ispmedia.onrender.com";
  //public readonly ipServidor = "localhost:8080";
  private _usuarioLogado!: Utilizador;

  //Música Actual e Dados
  private _musicaActual!: Musica;
  private _artistasMusicaActual!: Artista[];
  private _duracao: string = '0:00';
  private _tempoAtual: string = '0:00';
  private _progressoPercentual: number = 0;
  private _progressoBuffer: number = 0;
  private _tocando: boolean = false;

  //álbum
  private _albumActual!: Album;
  private _musicasAlbumActual!: Musica[];

  //Vídeo
  private _videoActual!: Video;
  private _progressoPercentualVideo!: number;
  private _videoTocando!: boolean;
  private _duracaoVideo: string = '0:00';
  private _tempoAtualVideo: string = '0:00';
  private _progressoBufferVideo: number = 0;

  //Grupo
  private _grupoActual!: Grupo;
  private _utilizadoresGrupoActual!: MembroGrupo[];
  private _utilizadoresPendentesGrupoActual!: MembroGrupo[];
  private _utilizadoresNaoEstaoGrupoActual!: Utilizador[];

  //conteudo do Grupo
  private _musicasGrupoActual!: Musica[];
  private _videosGrupoActual!: Video[];

  //Playlist
  private _playlistActual!: Playlist;
  private _musicasPlaylistActual!: Musica[];

  //Mídias Externas
  private _utilizadorActual!: Utilizador;
  private _musicasCompartilhadas!: MeuCarregado[];
  private _videosCompartilhados!: MeuCarregado[];


  //artista
  private _artistaActual!: Artista;

  //estação de rádio
  private _estacaoRadioActual!: RadioEstacao;
  private _radioTocando!: boolean;

  //Edição
  private _musicaActualEditarMusica!: Musica;

  //Partilha de Conteúdo:
  private _tipoConteudoPartilhaGrupo!: "musica" | "video";
  private _musicaActualPartilhaGrupo!: Musica;
  private _videoActualPartilhaGrupo!: Video;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.carregarDoLocalStorage();
  }

  private carregarDoLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const dados = localStorage.getItem(this.storageKey);
      if (dados) {
        const obj = JSON.parse(dados);
        Object.assign(this, obj); // restaura tudo que estava salvo
      }
    }
  }

  private salvarNoLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const obj = {
        _usuarioLogado: this._usuarioLogado,
        _musicaActual: this._musicaActual,
        _artistasMusicaActual: this._artistasMusicaActual,
        _duracao: this._duracao,
        _tempoAtual: this._tempoAtual,
        _progressoPercentual: this._progressoPercentual,
        _progressoBuffer: this._progressoBuffer,
        _tocando: this._tocando,

        _albumActual: this._albumActual,
        _musicasAlbumActual: this._musicasAlbumActual,

        _videoActual: this._videoActual,
        _progressoPercentualVideo: this._progressoPercentualVideo,
        _videoTocando: this._videoTocando,
        _duracaoVideo: this._duracaoVideo,
        _tempoAtualVideo: this._tempoAtualVideo,
        _progressoBufferVideo: this._progressoBufferVideo,

        _grupoActual: this._grupoActual,
        _utilizadoresGrupoActual: this._utilizadoresGrupoActual,
        _utilizadoresPendentesGrupoActual: this._utilizadoresPendentesGrupoActual,
        _utilizadoresNaoEstaoGrupoActual: this._utilizadoresNaoEstaoGrupoActual,

        _musicasGrupoActual: this._musicasGrupoActual,
        _videosGrupoActual: this._videosGrupoActual,

        _playlistActual: this._playlistActual,
        _musicasPlaylistActual: this._musicasPlaylistActual,

        _utilizadorActual: this._utilizadorActual,
        _musicasCompartilhadas: this._musicasCompartilhadas,
        _videosCompartilhados: this._videosCompartilhados,

        _artistaActual: this._artistaActual,

        _estacaoRadioActual: this._estacaoRadioActual,
        _radioTocando: this._radioTocando,

        _musicaActualEditarMusica: this._musicaActualEditarMusica,

        _tipoConteudoPartilhaGrupo: this._tipoConteudoPartilhaGrupo,
        _musicaActualPartilhaGrupo: this._musicaActualPartilhaGrupo,
        _videoActualPartilhaGrupo: this._videoActualPartilhaGrupo
      };
      localStorage.setItem(this.storageKey, JSON.stringify(obj));
    }
  }

  get usuarioLogado(): Utilizador {
    return this._usuarioLogado;
  }

  public get utilizadorActual(): Utilizador {
    return this._utilizadorActual;
  }

  public set utilizadorActual(value: Utilizador) {
    this._utilizadorActual = value;
    this.salvarNoLocalStorage();
  }

  public get utilizadoresNaoEstaoGrupoActual(): Utilizador[] {
    return this._utilizadoresNaoEstaoGrupoActual;
  }

  public set utilizadoresNaoEstaoGrupoActual(value: Utilizador[]) {
    this._utilizadoresNaoEstaoGrupoActual = value;
    this.salvarNoLocalStorage();
  }

  public get utilizadoresPendentesGrupoActual(): MembroGrupo[] {
    return this._utilizadoresPendentesGrupoActual;
  }

  public set utilizadoresPendentesGrupoActual(value: MembroGrupo[]) {
    this._utilizadoresPendentesGrupoActual = value;
    this.salvarNoLocalStorage();
  }

  public get tipoConteudoPartilhaGrupo(): "musica" | "video" {
    return this._tipoConteudoPartilhaGrupo;
  }

  public set tipoConteudoPartilhaGrupo(value: "musica" | "video") {
    this._tipoConteudoPartilhaGrupo = value;
    this.salvarNoLocalStorage();
  }

  public get musicaActualPartilhaGrupo(): Musica {
    return this._musicaActualPartilhaGrupo;
  }

  public set musicaActualPartilhaGrupo(value: Musica) {
    this._musicaActualPartilhaGrupo = value;
    this.salvarNoLocalStorage();
  }

  public get videoActualPartilhaGrupo(): Video {
    return this._videoActualPartilhaGrupo;
  }

  public set videoActualPartilhaGrupo(value: Video) {
    this._videoActualPartilhaGrupo = value;
    this.salvarNoLocalStorage();
  }

  public get musicaActualEditarMusica(): Musica {
    return this._musicaActualEditarMusica;
  }

  public set musicaActualEditarMusica(value: Musica) {
    this._musicaActualEditarMusica = value;
    this.salvarNoLocalStorage();
  }

  public get estacaoRadioActual(): RadioEstacao {
    return this._estacaoRadioActual;
  }

  public set estacaoRadioActual(value: RadioEstacao) {
    this._estacaoRadioActual = value;
    this.salvarNoLocalStorage();
  }

  public get radioTocando(): boolean {
    return this._radioTocando;
  }

  public set radioTocando(value: boolean) {
    this._radioTocando = value;
    this.salvarNoLocalStorage();
  }

  public get musicasCompartilhadas(): MeuCarregado[] {
    return this._musicasCompartilhadas;
  }

  public set musicasCompartilhadas(value: MeuCarregado[]) {
    this._musicasCompartilhadas = value;
    this.salvarNoLocalStorage();
  }

  public get videosCompartilhados(): MeuCarregado[] {
    return this._videosCompartilhados;
  }

  public set videosCompartilhados(value: MeuCarregado[]) {
    this._videosCompartilhados = value;
    this.salvarNoLocalStorage();
  }


  set artistaActual(valor: Artista) {
    this._artistaActual = valor;
    this.salvarNoLocalStorage();
  }

  get playlistActual(): Playlist {
    return this._playlistActual;
  }

  set playlistActual(value: Playlist) {
    this._playlistActual = value;
    this.salvarNoLocalStorage();
  }

  get musicasPlaylistActual(): Musica[] {
    return this._musicasPlaylistActual;
  }

  set musicasPlaylistActual(value: Musica[]) {
    this._musicasPlaylistActual = value;
    this.salvarNoLocalStorage();
  }


  get musicasGrupoActual(): Musica[] {
    return this._musicasGrupoActual;
  }

  set musicasGrupoActual(musicas: Musica[]) {
    this._musicasGrupoActual = musicas;
    this.salvarNoLocalStorage();
  }

  get videosGrupoActual(): Video[] {
    return this._videosGrupoActual;
  }

  set videosGrupoActual(videos: Video[]) {
    this._videosGrupoActual = videos;
    this.salvarNoLocalStorage();
  }


  get artistaActual(): Artista {
    return this._artistaActual;
  }

  get grupoActual(): Grupo {
    return this._grupoActual;
  }

  set grupoActual(value: Grupo) {
    this._grupoActual = value;
    this.salvarNoLocalStorage();
  }

  get utilizadoresGrupoActual(): MembroGrupo[] {
    return this._utilizadoresGrupoActual;
  }

  set utilizadoresGrupoActual(value: MembroGrupo[]) {
    this._utilizadoresGrupoActual = value;
    this.salvarNoLocalStorage();
  }


  set usuarioLogado(valor: Utilizador) {
    this._usuarioLogado = valor;
    this.salvarNoLocalStorage();
  }

  get musicaActual(): Musica {
    return this._musicaActual;
  }

  set musicaActual(valor: Musica) {
    this._musicaActual = valor;
    this.salvarNoLocalStorage();
  }

  get videoActual(): Video {
    return this._videoActual;
  }

  set videoActual(valor: Video) {
    this._videoActual = valor;
    this.salvarNoLocalStorage();
  }


  get progressoPercentualVideo(): number {
    return this._progressoPercentualVideo;
  }

  set progressoPercentualVideo(valor: number) {
    this._progressoPercentualVideo = valor;
    this.salvarNoLocalStorage();
  }

  get artistasMusicaActual(): Artista[] {
    return this._artistasMusicaActual;
  }

  set artistasMusicaActual(valor: Artista[]) {
    this._artistasMusicaActual = valor;
    this.salvarNoLocalStorage();
  }

  // Duração total da música
  get duracao(): string {
    return this._duracao;
  }
  set duracao(value: string) {
    this._duracao = value;
    this.salvarNoLocalStorage();
  }

  // Tempo atual da reprodução
  get tempoAtual(): string {
    return this._tempoAtual;
  }
  set tempoAtual(value: string) {
    this._tempoAtual = value;
    this.salvarNoLocalStorage();
  }

  // Porcentagem de progresso (0 a 100)
  get progressoPercentual(): number {
    return this._progressoPercentual;
  }
  set progressoPercentual(value: number) {
    this._progressoPercentual = value;
    this.salvarNoLocalStorage();
  }

  // Porcentagem de progresso Buffer (0 a 100)
  get progressoBuffer(): number {
    return this._progressoBuffer;
  }
  set progressoBuffer(value: number) {
    this._progressoBuffer = value;
    this.salvarNoLocalStorage();
  }

  // Se a música está a tocar ou não
  get tocando(): boolean {
    return this._tocando;
  }
  set tocando(value: boolean) {
    this._tocando = value;
    this.salvarNoLocalStorage();
  }

  get videoTocando(): boolean {
    return this._videoTocando;
  }
  set videoTocando(value: boolean) {
    this._videoTocando = value;
    this.salvarNoLocalStorage();
  }

  public get albumActual(): Album {
    return this._albumActual;
  }

  public set albumActual(value: Album) {
    this._albumActual = value;
    this.salvarNoLocalStorage();
  }

  public get musicasAlbumActual(): Musica[] {
    return this._musicasAlbumActual;
  }

  public set musicasAlbumActual(value: Musica[]) {
    this._musicasAlbumActual = value;
    this.salvarNoLocalStorage();
  }

  get duracaoVideo(): string {
    return this._duracaoVideo;
  }

  set duracaoVideo(value: string) {
    this._duracaoVideo = value;
    this.salvarNoLocalStorage();
  }

  get tempoAtualVideo(): string {
    return this._tempoAtualVideo;
  }

  set tempoAtualVideo(value: string) {
    this._tempoAtualVideo = value;
    this.salvarNoLocalStorage();
  }

  get progressoBufferVideo(): number {
    return this._progressoBufferVideo;
  }
  set progressoBufferVideo(value: number) {
    this._progressoBufferVideo = value;
    this.salvarNoLocalStorage();
  }


  limparDados() {
    localStorage.removeItem(this.storageKey);
    this._usuarioLogado = undefined as any;
    this._musicaActual = undefined as any;
    this._artistasMusicaActual = [];
    this._duracao = '0:00';
    this._tempoAtual = '0:00';
    this._progressoPercentual = 0;
    this._progressoBuffer = 0;
    this._tocando = false;
    this._albumActual = undefined as any;
    this._musicasAlbumActual = [];
    this._videoActual = undefined as any;
    this._progressoPercentualVideo = 0;
    this._videoTocando = false;
    this._duracaoVideo = '0:00';
    this._tempoAtualVideo = '0:00';
    this._progressoBufferVideo = 0;
    this._grupoActual = undefined as any;
    this._utilizadoresGrupoActual = [];
    this._utilizadoresPendentesGrupoActual = [];
    this._utilizadoresNaoEstaoGrupoActual = [];
    this._musicasGrupoActual = [];
    this._videosGrupoActual = [];
    this._playlistActual = undefined as any;
    this._musicasPlaylistActual = [];
    this._utilizadorActual = undefined as any;
    this._musicasCompartilhadas = [];
    this._videosCompartilhados = [];
    this._artistaActual = undefined as any;
    this._estacaoRadioActual = undefined as any;
    this._radioTocando = false;
    this._musicaActualEditarMusica = undefined as any;
    this._tipoConteudoPartilhaGrupo = undefined as any;
    this._musicaActualPartilhaGrupo = undefined as any;
    this._videoActualPartilhaGrupo = undefined as any;
  }


}
