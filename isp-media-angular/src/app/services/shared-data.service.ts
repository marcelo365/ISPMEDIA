import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  public readonly ipServidor = "ispmedia.onrender.com";
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

  get usuarioLogado(): Utilizador {
    return this._usuarioLogado;
  }

  public get utilizadorActual(): Utilizador {
    return this._utilizadorActual;
  }

  public set utilizadorActual(value: Utilizador) {
    this._utilizadorActual = value;
  }

  public get utilizadoresNaoEstaoGrupoActual(): Utilizador[] {
    return this._utilizadoresNaoEstaoGrupoActual;
  }

  public set utilizadoresNaoEstaoGrupoActual(value: Utilizador[]) {
    this._utilizadoresNaoEstaoGrupoActual = value;
  }

  public get utilizadoresPendentesGrupoActual(): MembroGrupo[] {
    return this._utilizadoresPendentesGrupoActual;
  }

  public set utilizadoresPendentesGrupoActual(value: MembroGrupo[]) {
    this._utilizadoresPendentesGrupoActual = value;
  }

  public get tipoConteudoPartilhaGrupo(): "musica" | "video" {
    return this._tipoConteudoPartilhaGrupo;
  }

  public set tipoConteudoPartilhaGrupo(value: "musica" | "video") {
    this._tipoConteudoPartilhaGrupo = value;
  }

  public get musicaActualPartilhaGrupo(): Musica {
    return this._musicaActualPartilhaGrupo;
  }

  public set musicaActualPartilhaGrupo(value: Musica) {
    this._musicaActualPartilhaGrupo = value;
  }

  public get videoActualPartilhaGrupo(): Video {
    return this._videoActualPartilhaGrupo;
  }

  public set videoActualPartilhaGrupo(value: Video) {
    this._videoActualPartilhaGrupo = value;
  }

  public get musicaActualEditarMusica(): Musica {
    return this._musicaActualEditarMusica;
  }

  public set musicaActualEditarMusica(value: Musica) {
    this._musicaActualEditarMusica = value;
  }

  public get estacaoRadioActual(): RadioEstacao {
    return this._estacaoRadioActual;
  }

  public set estacaoRadioActual(value: RadioEstacao) {
    this._estacaoRadioActual = value;
  }

  public get radioTocando(): boolean {
    return this._radioTocando;
  }

  public set radioTocando(value: boolean) {
    this._radioTocando = value;
  }

  public get musicasCompartilhadas(): MeuCarregado[] {
    return this._musicasCompartilhadas;
  }

  public set musicasCompartilhadas(value: MeuCarregado[]) {
    this._musicasCompartilhadas = value;
  }

  public get videosCompartilhados(): MeuCarregado[] {
    return this._videosCompartilhados;
  }

  public set videosCompartilhados(value: MeuCarregado[]) {
    this._videosCompartilhados = value;
  }


  set artistaActual(valor: Artista) {
    this._artistaActual = valor;
  }

  get playlistActual(): Playlist {
    return this._playlistActual;
  }

  set playlistActual(value: Playlist) {
    this._playlistActual = value;
  }

  get musicasPlaylistActual(): Musica[] {
    return this._musicasPlaylistActual;
  }

  set musicasPlaylistActual(value: Musica[]) {
    this._musicasPlaylistActual = value;
  }


  get musicasGrupoActual(): Musica[] {
    return this._musicasGrupoActual;
  }

  set musicasGrupoActual(musicas: Musica[]) {
    this._musicasGrupoActual = musicas;
  }

  get videosGrupoActual(): Video[] {
    return this._videosGrupoActual;
  }

  set videosGrupoActual(videos: Video[]) {
    this._videosGrupoActual = videos;
  }


  get artistaActual(): Artista {
    return this._artistaActual;
  }

  get grupoActual(): Grupo {
    return this._grupoActual;
  }

  set grupoActual(value: Grupo) {
    this._grupoActual = value;
  }

  get utilizadoresGrupoActual(): MembroGrupo[] {
    return this._utilizadoresGrupoActual;
  }

  set utilizadoresGrupoActual(value: MembroGrupo[]) {
    this._utilizadoresGrupoActual = value;
  }


  set usuarioLogado(valor: Utilizador) {
    this._usuarioLogado = valor;
  }

  get musicaActual(): Musica {
    return this._musicaActual;
  }

  set musicaActual(valor: Musica) {
    this._musicaActual = valor;
  }

  get videoActual(): Video {
    return this._videoActual;
  }

  set videoActual(valor: Video) {
    this._videoActual = valor;
  }


  get progressoPercentualVideo(): number {
    return this._progressoPercentualVideo;
  }

  set progressoPercentualVideo(valor: number) {
    this._progressoPercentualVideo = valor;
  }

  get artistasMusicaActual(): Artista[] {
    return this._artistasMusicaActual;
  }

  set artistasMusicaActual(valor: Artista[]) {
    this._artistasMusicaActual = valor;
  }

  // Duração total da música
  get duracao(): string {
    return this._duracao;
  }
  set duracao(value: string) {
    this._duracao = value;
  }

  // Tempo atual da reprodução
  get tempoAtual(): string {
    return this._tempoAtual;
  }
  set tempoAtual(value: string) {
    this._tempoAtual = value;
  }

  // Porcentagem de progresso (0 a 100)
  get progressoPercentual(): number {
    return this._progressoPercentual;
  }
  set progressoPercentual(value: number) {
    this._progressoPercentual = value;
  }

  // Porcentagem de progresso Buffer (0 a 100)
  get progressoBuffer(): number {
    return this._progressoBuffer;
  }
  set progressoBuffer(value: number) {
    this._progressoBuffer = value;
  }

  // Se a música está a tocar ou não
  get tocando(): boolean {
    return this._tocando;
  }
  set tocando(value: boolean) {
    this._tocando = value;
  }

  get videoTocando(): boolean {
    return this._videoTocando;
  }
  set videoTocando(value: boolean) {
    this._videoTocando = value;
  }

  public get albumActual(): Album {
    return this._albumActual;
  }

  public set albumActual(value: Album) {
    this._albumActual = value;
  }

  public get musicasAlbumActual(): Musica[] {
    return this._musicasAlbumActual;
  }

  public set musicasAlbumActual(value: Musica[]) {
    this._musicasAlbumActual = value;
  }

  // Getter e Setter para _duracaoVideo
  get duracaoVideo(): string {
    return this._duracaoVideo;
  }
  set duracaoVideo(value: string) {
    this._duracaoVideo = value;
  }

  // Getter e Setter para _tempoAtualVideo
  get tempoAtualVideo(): string {
    return this._tempoAtualVideo;
  }
  set tempoAtualVideo(value: string) {
    this._tempoAtualVideo = value;
  }

  // Getter e Setter para _progressoBufferVideo
  get progressoBufferVideo(): number {
    return this._progressoBufferVideo;
  }
  set progressoBufferVideo(value: number) {
    this._progressoBufferVideo = value;
  }



  constructor() { }

}
