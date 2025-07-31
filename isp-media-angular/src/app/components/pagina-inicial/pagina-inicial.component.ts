import { AfterViewInit, Component, ElementRef, inject, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Artista } from '../../models/Artista';
import { ArtistaService } from '../../services/artista.service';
import { CommonModule } from '@angular/common';
import { SharedDataService } from '../../services/shared-data.service';
import { Album } from '../../models/Album';
import { GrupoDeEstacoes } from '../../models/GrupoDeEstacoes';
import { AlbumService } from '../../services/album.service';
import { Musica } from '../../models/Musica';
import { ConteudoGrupoService } from '../../services/conteudo-grupo.service';
import { Utilizador } from '../../models/Utilizador';
import { Video } from '../../models/Video';
import { MusicaArtistaService } from '../../services/musica-artista.service';
import Hls from 'hls.js';
import { LetraService } from '../../services/letra.service';
import { firstValueFrom, forkJoin, map, share } from 'rxjs';
import { AlbumArtistaService } from '../../services/album-artista.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { MembroGrupoService } from '../../services/membro-grupo.service';
import { Grupo } from '../../models/Grupo';
import { Categoria } from '../../models/Categoria';
import { MeuCarregadoService } from '../../services/meu-carregado.service';
import { MeuCarregado } from '../../models/MeuCarregado';
import { GrupoService } from '../../services/grupo.service';
import { MembroGrupo } from '../../models/MembroGrupo';
import { Playlist } from '../../models/Playlist';
import { PlaylistService } from '../../services/playlist.service';
import { PlaylistMusicaService } from '../../services/playlist-musica.service';
import { PrivilegioEditorService } from '../../services/privilegio-editor.service';
import { RadioEstacao } from '../../models/RadioEstacao';
import { RadioEstacaoService } from '../../services/radio-estacao.service';
import { AlbumArtista } from '../../models/AlbumArtista';
import { UploadService } from '../../services/upload.service';
import { FicheiroService } from '../../services/ficheiro-service.service';
import { MusicaArtista } from '../../models/MusicaArtista';
import { MusicaService } from '../../services/musica.service';
import { CategoriaService } from '../../services/categoria.service';
import { ConteudoGrupo } from '../../models/ConteudoGrupo';
import { VideoService } from '../../services/video.service';
import { RecordRTCPromisesHandler } from 'recordrtc';
import { UtilizadorService } from '../../services/utilizador.service';
import { PlaylistMusica } from '../../models/PlaylistMusica';
import { WebSocketNotificacaoService } from '../../services/web-socket-notificacao.service';
import { Notificacao } from '../../models/Notificacao';
import { NotificacaoService } from '../../services/notificacao.service';
import { PrivilegioEditor } from '../../models/PrivilegioEditor';
import { Router } from '@angular/router';
import { Estacao } from '../../models/Estacao';
import { RadioService } from '../../services/radio.service';

@Component({
  selector: 'app-pagina-inicial',
  imports: [CommonModule, FormsModule],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.scss'
})

export class PaginaInicialComponent {

  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('body') paginaInicial!: ElementRef<HTMLElement>;
  @ViewChild('barraPesquisa') barraPesquisa!: ElementRef<HTMLElement>;
  @ViewChild('previewVideo') cameraLive!: ElementRef<HTMLVideoElement>;

  private hlsAudio!: Hls | null;
  private hlsVideo!: Hls | null;

  carregarConteudosGrupoPendentes: boolean = false;
  carregarVisualizacaoGrupoPendente: boolean = false;
  carregarVisualizacaoPlaylistPendente: boolean = false;

  livesAtivas = [
    {
      usuario: { username: 'djmax' },
      titulo: 'Live de Afrobeat',
      id: 123
    }
  ];

  liveActual = {
    titulo: 'Concerto Ao Vivo - Banda XYZ',
    descricao: 'Acompanhe o espetáculo ao vivo da Banda XYZ direto de Luanda!',
    caminhoVideo: '/files/videos/concertoxyz.m3u8', // caminho do HLS
    utilizador: { username: 'djmax' },
    dataInicio: "23/67/72"
  };

  isModalEditarArtistaAberto: boolean = false;
  isModalCompartilharMidiasUsuarioAberto: boolean = false;
  isModalAdicionarMusicaPlaylistAberto: boolean = false;
  isModalPlaylistAberta: boolean = false;
  isModalAdicionarUsuarioGrupoAberto: boolean = false;
  isModalGrupoAberta: boolean = false;
  isModalMusicaAberta: boolean = false;
  isModalAlbumAberto: boolean = false;
  isModalArtistaAberta: boolean = false;
  isModalVideoAberta: boolean = false;
  isModalPartilharConteudoAberto: boolean = false;
  isModalEditarAlbumAberto: boolean = false;
  isModalEditarMusicaAberto: boolean = false;
  isModalEditarVideoAberto: boolean = false;

  abaSeleccionada: string = 'pagina-inicial';
  isReprodutorFechado: boolean = true;
  isReprodutorMaximizadoFechado: boolean = true;
  isPaginaAlbumFechado: boolean = true;
  isPaginaArtistaFechado: boolean = true;
  isPaginaVideoFechado: boolean = true;
  isPaginaGrupoFechado: boolean = true;
  isPaginaLiveFechado: boolean = true;
  isPaginaGravacaoLiveFechado: boolean = true;
  isPaginaConteudoGrupoFechado: boolean = true;
  isPaginaPlaylistFechada: boolean = true;
  isPaginaConteudoMidiasCompartilhadasFechado: boolean = true;
  username?: string = "";
  letraMusica: string = "";
  qtdNoScrollAdicionar: number = 0;
  pesquisaInput: string = "";
  audio = new Audio;

  //variáveis
  conjuntoUsuarios: Utilizador[] = [];
  conjuntoEstacoesRadio: RadioEstacao[] = [];
  conjuntoEstacoesRadioNovas: Estacao[] = [];
  conjuntoEstacoesAgrupadas: GrupoDeEstacoes[] = [];


  conjuntoArtistas: Artista[] = [];
  conjuntoAlbuns: Album[] = [];
  conjuntoMeusAlbuns: Album[] = [];
  conjuntoMusicasGrupoGeralSemAlbum: Musica[] = [];
  conjuntoMusicasGrupoGeral: Musica[] = [];


  conjuntoMusicas: Musica[] = [];
  conjuntoVideos: Video[] = [];
  conjuntoArtistasMusicas: Artista[][] = [];
  conjuntoArtistasAlbuns: Artista[][] = [];
  conjuntoCriadoresPostagemMusicas: Utilizador[] = [];
  conjuntoCriadoresPostagemVideos: Utilizador[] = [];

  conjuntoGruposCriadosPorMim: Grupo[] = [];
  conjuntoGruposUsuario: Grupo[] = []; //grupos em que estou
  conjuntoGruposVisiveis: Grupo[] = []; //grupos publicos visiveis para mim
  conjuntoGruposSistema: Grupo[] = []; //todos grupos do sistema
  conjuntoUsuariosGrupos: MembroGrupo[][] = []; //Usuarios com estado 1 (sistema) (membro do grupo)
  conjuntoUsuariosPendentesGrupos: MembroGrupo[][] = []; //Usuários com estado 2 (sistema) (pedido)
  conjuntoMusicasGrupos: Musica[][] = []; //dos grupos que o usuario tá
  conjuntoVideosGrupos: Video[][] = []; //dos grupos que o usuario tá

  conjuntoCategoriasMusicasSistema: Categoria[] = [];
  conjuntoCategoriasVideosSistema: Categoria[] = [];
  conjuntoCategoriasMusicas: Categoria[] = [];
  conjuntoCategoriasVideos: Categoria[] = [];

  conjuntoPlaylistsUsuario: Playlist[] = [];
  conjuntoPlaylistsVisiveis: Playlist[] = [];
  conjuntoPlaylistsSistema: Playlist[] = [];
  conjuntoMusicasPlaylists: Musica[][] = [];

  //variáveis formulários
  novoArtista: Artista = new Artista(null, '', '', '');
  novaPlaylist: Playlist = new Playlist(null, "", "", false, null!);
  novoGrupo: Grupo = new Grupo(null, "", "", "", null!, false);
  tipoGrupo: string = "publico";
  fotoSelecionada!: File | null;

  novoTituloAlbum: string = '';
  novaDescricaoAlbum: string = '';
  novaDataLancamentoAlbum: string = '';
  novaCapaAlbum!: File | null;

  novoTituloMusica: string = '';
  novaLetraMusica: string = '';
  novaDataLancamentoMusica: string = '';
  novaMusicaFile: File | undefined;
  novaCapaMusica: File | undefined;
  novaCategoriaSelecionadaMusica: Categoria | null = null;

  novoTituloVideo: string = '';
  novaDataLancamentoVideo: string = '';
  novaDescricaoVideo: string = '';
  novoAutorVideo: string = '';
  novoVideoFile: File | undefined;
  novaCapaVideo: File | undefined;
  novaCategoriaSelecionadaVideo: Categoria | null = null;

  novoNomeArtista: string = '';
  novaBiografia: string = '';

  artistaSelecionado: Artista | null = null;
  conjuntoArtistasDisponiveis: Artista[] = [];
  conjuntoArtistasSelecionados: Artista[] = [];

  musicaSelecionada: Musica | null = null;
  conjuntoMusicasDisponiveis: Musica[] = [];
  conjuntoMusicasSelecionadas: Musica[] = [];

  musicaSelecionadaParaPlaylist: Musica | null = null;
  conjuntoMusicasDisponiveisParaPlaylist: Musica[] = [];
  conjuntoMusicasSelecionadasParaPlaylist: Musica[] = [];

  usuarioSelecionado: Utilizador | null = null;
  conjuntoUsuariosNaoEstaoGrupo: Utilizador[] = [];
  conjuntoUsuariosSelecionados: Utilizador[] = [];

  usuarioSelecionadoCompartilhar: Utilizador | null = null;
  conjuntoUsuariosCompartilhar: Utilizador[] = [];
  conjuntoUsuariosSelecionadosCompartilhar: Utilizador[] = [];

  grupoSelecionado: Grupo | null = null;
  conjuntoGruposDisponiveis: Grupo[] = [];
  conjuntoGruposSelecionados: Grupo[] = [];


  //variáveis pesquisa
  conjuntoPesquisa: any[] = [];
  conjuntoOriginal: any[] = [];


  //variáveis midiasCarregadas
  conjuntoMeusCarregadosTotal: MeuCarregado[] = [];
  conjuntoMeusCarregadosMusicas: MeuCarregado[] = [];
  conjuntoMeusCarregadosVideos: MeuCarregado[] = [];
  conjuntoArtistasMeusCarregadosMusicas: Artista[][] = [];


  //Variáveis Mídias Externas
  conjuntoUsuariosPartilheiMidias: Utilizador[] = [];
  conjuntoUsuariosCompartilhouMidias: Utilizador[] = [];
  conjuntoMusicasCompartilhadas: MeuCarregado[][] = [];
  conjuntoVideosCompartilhados: MeuCarregado[][] = [];

  //injecções de dependência
  artistaService = inject(ArtistaService);
  albumService = inject(AlbumService);
  conteudoGrupoService = inject(ConteudoGrupoService);
  sharedDataService = inject(SharedDataService);
  musicaArtistaService = inject(MusicaArtistaService);
  albumArtistaService = inject(AlbumArtistaService);
  membroGrupoService = inject(MembroGrupoService);
  grupoService = inject(GrupoService);
  meuCarregadoService = inject(MeuCarregadoService);
  playlistService = inject(PlaylistService);
  playlistMusicaService = inject(PlaylistMusicaService);
  privilegioEditorService = inject(PrivilegioEditorService);
  radioEstacaoService = inject(RadioEstacaoService);
  radioServiceNova = inject(RadioService);
  letraService = inject(LetraService);
  uploadService = inject(UploadService);
  ficheiroService = inject(FicheiroService);
  musicaService = inject(MusicaService);
  videoService = inject(VideoService);
  categoriaService = inject(CategoriaService);
  utilizadorService = inject(UtilizadorService);
  websocketService = inject(WebSocketNotificacaoService);
  notificacaoService = inject(NotificacaoService);
  router = inject(Router);
  toast = inject(ToastrService);


  ngOnInit() {

    //Se tiver notificações que ainda não leu , procure e mostre
    this.notificacaoService.getNotificacoesNaoLidas(this.sharedDataService.usuarioLogado.id!).subscribe(notificacoes => {

      for (const notificacao of notificacoes) {
        this.mostrarNotificacao(notificacao);
      }

      // Marcar como lida logo após exibir
      this.notificacaoService.marcarNotificacoesComoLidas(notificacoes).subscribe();
    });

    //conectar ao canal específico para receber mensagem
    this.websocketService.conectar(this.sharedDataService.usuarioLogado.id!, (novaNotificacao: Notificacao) => {

      // mostra com o toastr
      this.mostrarNotificacao(novaNotificacao);

      // Marcar como lida logo após exibir
      this.notificacaoService.marcarNotificacoesComoLidas([novaNotificacao]).subscribe();
    });

    //Inicializar username e carregas itens
    this.username = this.sharedDataService.usuarioLogado?.username;
    this.carregarItens();
  }


  getRecursoUrl(caminhoFicheiro: string): string {
    return `http://${this.sharedDataService.ipServidor}:8080${caminhoFicheiro}`;
  }

  mostrarNotificacao(notificacao: Notificacao) {
    this.toast.info(
      notificacao.mensagem,
      '📬 Nova Notificação!',
      {
        timeOut: 0,          // 0 = não desaparece automaticamente
        closeButton: true,   // mostra o X
        tapToDismiss: false, // não desaparece ao clicar fora
        disableTimeOut: true // equivalente a timeOut: 0
      }
    );
  }

  carregarItens(): void {

    this.zerarVariaveis();

    this.carregarUsuarios();

    this.carregarEstacoesRadio();

    this.carregarCategorias();

    this.carregarAlbunsEArtistas();

    this.carregarGruposEMembros();

    this.carregarPlaylists();

    this.membroGrupoService.getMembrosGrupoByEstadoAndUtilizadorId(1, this.sharedDataService.usuarioLogado.id!).subscribe({
      next: membrosGrupo => {

        membrosGrupo.forEach(membroGrupo => {
          this.conjuntoGruposUsuario.push(membroGrupo.grupo);
        });
      },
      complete: () => {

        this.conjuntoGruposCriadosPorMim = this.conjuntoGruposUsuario.filter(g => g.utilizador.id == this.sharedDataService.usuarioLogado.id);
        this.conjuntoGruposDisponiveis = [...this.conjuntoGruposUsuario];
        this.carregarUsuariosCompartilharamMidias();
        this.pegarConteudosDosGruposEmQueUsuarioSeEncontra();
      }
    });

  }


  zerarVariaveis() {
    this.conjuntoArtistas = [];

    this.conjuntoAlbuns = [];
    this.conjuntoMusicas = [];
    this.conjuntoVideos = [];
    this.conjuntoArtistasMusicas = [];
    this.conjuntoArtistasAlbuns = [];
    this.conjuntoCriadoresPostagemMusicas = [];
    this.conjuntoCriadoresPostagemVideos = [];

    this.conjuntoCategoriasMusicas = [];
    this.conjuntoCategoriasVideos = [];

    this.conjuntoMusicasGrupos = []; //dos grupos que o usuario tá
    this.conjuntoVideosGrupos = []; //dos grupos que o usuario tá
    this.conjuntoGruposVisiveis = [];
    this.conjuntoGruposSistema = [];
    this.conjuntoUsuariosGrupos = [];
    this.conjuntoGruposUsuario = [];

    this.conjuntoPlaylistsUsuario = [];
    this.conjuntoPlaylistsVisiveis = [];
    this.conjuntoPlaylistsSistema = [];
    this.conjuntoMusicasPlaylists = [];

    this.conjuntoPesquisa = [];
    this.conjuntoOriginal = [];

    this.conjuntoMeusCarregadosMusicas = [];
    this.conjuntoMeusCarregadosTotal = [];
    this.conjuntoMeusCarregadosVideos = [];
    this.conjuntoArtistasMeusCarregadosMusicas = [];

    this.conjuntoUsuariosCompartilhouMidias = [];
    this.conjuntoMusicasCompartilhadas = [];
    this.conjuntoVideosCompartilhados = [];

  }

  carregarEstacoesRadio() {

    this.radioEstacaoService.getAllRadioEstacoes().subscribe(radioEstacoes => {
      this.conjuntoEstacoesRadio = radioEstacoes;
    });

  }

  carregarCategorias() {
    this.categoriaService.getAllCategorias().subscribe(categorias => {
      this.conjuntoCategoriasMusicasSistema = categorias.filter(m => m.tipo == 1);
      this.conjuntoCategoriasVideosSistema = categorias.filter(m => m.tipo == 2);
    });
  }

  carregarUsuarios() {
    this.utilizadorService.getAllUtilizadores().subscribe(utilizadores => {
      this.conjuntoUsuarios = utilizadores;
    });
  }

  getIndexOriginal(elemento: any, tipo: "musica" | "video"): number {
    return (tipo === "musica") ? this.conjuntoMusicas.findIndex(m => m.id === elemento.id) : this.conjuntoVideos.findIndex(m => m.id === elemento.id);
  }

  pegarMusicasVideosDeUmaCategoria(idCategoria: number | null, tipo: "musica"): Musica[];
  pegarMusicasVideosDeUmaCategoria(idCategoria: number | null, tipo: "video"): Video[];
  pegarMusicasVideosDeUmaCategoria(idCategoria: number | null, tipo: "musica" | "video"): Musica[] | Video[] {
    return (tipo === "musica")
      ? this.conjuntoMusicas.filter(m => m.categoria?.id === idCategoria)
      : this.conjuntoVideos.filter(v => v.categoria?.id === idCategoria);
  }

  async juntarMusicasVideosMeusCarregadosConteudosGrupos() {

    this.conjuntoMeusCarregadosMusicas.forEach(meuCarregado => {

      if (!this.verificarSeMeuCarregadoSeEncontraConjuntoMusicasVideos(meuCarregado, "musica")) {
        this.conjuntoMusicas.push(meuCarregado.musica);
        this.conjuntoArtistasMusicas.push(this.encontrarArtistasMeusCarregadosMusica(meuCarregado.musica, this.conjuntoMeusCarregadosMusicas, this.conjuntoArtistasMeusCarregadosMusicas));
        this.conjuntoCriadoresPostagemMusicas.push(meuCarregado.utilizador);
      }

    });


    for (const meusCarregados of this.conjuntoMusicasCompartilhadas) {
      for (const meuCarregado of meusCarregados) {
        if (!this.verificarSeMeuCarregadoSeEncontraConjuntoMusicasVideos(meuCarregado, "musica")) {
          this.conjuntoMusicas.push(meuCarregado.musica);
          const artistas = await this.pegarArtistasMusicaNaRede(meuCarregado.musica);
          this.conjuntoArtistasMusicas.push(artistas);
          this.conjuntoCriadoresPostagemMusicas.push(meuCarregado.utilizador);
        }
      }
    }

    this.conjuntoMeusCarregadosVideos.forEach(meuCarregado => {

      if (!this.verificarSeMeuCarregadoSeEncontraConjuntoMusicasVideos(meuCarregado, "video")) {
        this.conjuntoVideos.push(meuCarregado.video);
        this.conjuntoCriadoresPostagemVideos.push(meuCarregado.utilizador);
      }
    });

    this.conjuntoVideosCompartilhados.forEach(meusCarregados => {

      meusCarregados.forEach(meuCarregado => {

        if (!this.verificarSeMeuCarregadoSeEncontraConjuntoMusicasVideos(meuCarregado, "video")) {
          this.conjuntoVideos.push(meuCarregado.video);
          this.conjuntoCriadoresPostagemVideos.push(meuCarregado.utilizador);
        }

      });

    });

    this.pegarCategorias("musica");
    this.pegarCategorias("video");

    if (this.abaSeleccionada == "artistas") {
      this.conjuntoOriginal = [...this.conjuntoArtistas];
    } else if (this.abaSeleccionada == "albuns") {
      this.conjuntoOriginal = [...this.conjuntoAlbuns];
    } else if (this.abaSeleccionada == "musicas") {
      this.conjuntoOriginal = [...this.conjuntoMusicas];
    } else if (this.abaSeleccionada == "videos") {
      this.conjuntoOriginal = [...this.conjuntoVideos];
    } else if (this.abaSeleccionada == "midiasCarregados") {
      this.conjuntoOriginal = [...this.conjuntoMeusCarregadosTotal];
    }


    if (this.carregarConteudosGrupoPendentes) {
      this.abrirVisualizacaoConteudoGrupo(this.sharedDataService.grupoActual);
      this.carregarConteudosGrupoPendentes = false;
    }

    if (this.carregarVisualizacaoGrupoPendente) {
      this.abrirVisualizacaoGrupo(this.sharedDataService.grupoActual);
      this.removerClasseNoScroll(this.paginaInicial);
      this.carregarVisualizacaoGrupoPendente = false;
    }

    if (this.carregarVisualizacaoPlaylistPendente) {
      this.abrirVisualizacaoPlaylist(this.sharedDataService.playlistActual);
      this.removerClasseNoScroll(this.paginaInicial);
      this.carregarVisualizacaoPlaylistPendente = false;
    }

    this.conjuntoMusicasGrupoGeralSemAlbum = this.pegarMusicasGrupo(this.conjuntoGruposUsuario.find(g => (g.id == 1))!, this.conjuntoGruposUsuario, this.conjuntoMusicasGrupos)!.filter(m => m.album == null);

    this.conjuntoMusicasGrupoGeral = this.pegarMusicasGrupo(this.conjuntoGruposUsuario.find(g => (g.id == 1))!, this.conjuntoGruposUsuario, this.conjuntoMusicasGrupos)!;

    this.conjuntoMusicasDisponiveis = [...this.conjuntoMusicasGrupoGeralSemAlbum];
    this.conjuntoMusicasDisponiveisParaPlaylist = [...this.conjuntoMusicasGrupoGeral];
  }



  async pegarArtistasMusicaNaRede(musica: Musica): Promise<Artista[]> {
    const artistasMusicas = await firstValueFrom(
      this.musicaArtistaService.getMusicasArtistasByMusicaId(musica.id!)
    );
    return artistasMusicas.map(ma => ma.artista);
  }



  verificarSeMeuCarregadoSeEncontraConjuntoMusicasVideos(meuCarregado: MeuCarregado, tipo: "musica" | "video"): boolean {
    const conjunto = (tipo === "musica") ? this.conjuntoMusicas : this.conjuntoVideos;
    const idMidia = (tipo === "musica") ? meuCarregado.musica?.id : meuCarregado.video?.id;

    return conjunto.some(m => m.id === idMidia);
  }

  carregarAlbunsEArtistas() {
    //Pegar Artistas
    this.artistaService.getAllArtistas().subscribe(artistas => {
      this.conjuntoArtistas = artistas;
      this.conjuntoArtistasDisponiveis = [...this.conjuntoArtistas];
    });

    //Pegar álbuns
    this.albumService.getAllAlbuns().subscribe(albuns => {
      this.conjuntoAlbuns = albuns;
      this.conjuntoMeusAlbuns = albuns.filter(a => a.utilizador.id == this.sharedDataService.usuarioLogado.id);
    });
  }

  carregarUsuariosCompartilharamMidias() {

    this.privilegioEditorService.getPrivilegiosEditoresByBeneficiarioId(this.sharedDataService.usuarioLogado.id!).subscribe({
      next: (privilegiosEditores) => {
        this.conjuntoUsuariosCompartilhouMidias = privilegiosEditores.map(m => m.concedente);
      },
      complete: () => {
        this.pegarMidiasExternasUsuarios();
      }
    });

    this.privilegioEditorService.getPrivilegiosEditoresByConcedenteId(this.sharedDataService.usuarioLogado.id!).subscribe({
      next: (privilegiosEditores) => {
        this.conjuntoUsuariosPartilheiMidias = privilegiosEditores.map(m => m.beneficiario);
      },
      complete: () => {
        this.conjuntoUsuariosCompartilhar = [...this.conjuntoUsuarios.filter(u => !this.conjuntoUsuariosPartilheiMidias.find(uP => uP.id == u.id))].filter(v => v.id != this.sharedDataService.usuarioLogado.id);
      }
    });

  }

  pegarMidiasExternasUsuarios() {

    this.conjuntoUsuariosCompartilhouMidias.forEach((usuario, i) => {

      this.meuCarregadoService.getMeusCarregadosByUtilizadorId(usuario.id!).subscribe(meusCarregados => {

        this.conjuntoMusicasCompartilhadas[i] = [];
        this.conjuntoVideosCompartilhados[i] = [];

        meusCarregados.forEach(meuCarregado => {

          if (meuCarregado.musica != null) {
            this.conjuntoMusicasCompartilhadas[i].push(meuCarregado);
          } else {
            this.conjuntoVideosCompartilhados[i].push(meuCarregado);
          }

        });
      });
    });
  }


  pegarMusicasVideosCompartilhadasDeUmUsuario(usuario: Utilizador, conjuntoUsuariosCompartilhouMidias: Utilizador[], tipo: "musica" | "video"): MeuCarregado[] {

    const meusCarregadosMusicasVideos = (tipo == "musica") ? this.conjuntoMusicasCompartilhadas : this.conjuntoVideosCompartilhados;

    const index = conjuntoUsuariosCompartilhouMidias.findIndex(m => m.id === usuario.id);
    if (index !== -1) {
      return meusCarregadosMusicasVideos[index];
    }
    return [];
  }


  carregarPlaylists() {

    this.playlistService.getAllPlaylists().subscribe({
      next: (playlists) => {
        this.conjuntoPlaylistsSistema = playlists;
        this.conjuntoPlaylistsUsuario = playlists.filter(m => m.utilizador.id == this.sharedDataService.usuarioLogado.id);
        this.conjuntoPlaylistsVisiveis = playlists.filter(m => m.privada == false);
      },
      complete: () => {
        this.pegarMusicasPlaylists();
      }
    }
    );
  }

  pegarMusicasPlaylists() {

    this.conjuntoPlaylistsSistema.forEach((playlist, i) => {

      this.playlistMusicaService.getPlaylistMusicasByPlaylistId(playlist.id!).subscribe(playlistMusicas => {

        this.conjuntoMusicasPlaylists[i] = [];
        playlistMusicas.forEach(playlistMusica => this.conjuntoMusicasPlaylists[i].push(playlistMusica.musica));
      });
    });

  }

  carregarGruposEMembros() {
    this.grupoService.getAllGrupos().subscribe({
      next: (grupos) => {
        this.conjuntoGruposSistema = grupos;
        this.conjuntoGruposVisiveis = grupos.filter(m => m.publico == true);
      },
      complete: () => {
        this.pegarMembrosGrupos();
      }
    }

    );
  }

  //função que pega os membros de cada grupo do sistema
  pegarMembrosGrupos() {
    this.conjuntoGruposSistema.forEach((grupo, i) => {

      this.membroGrupoService.getMembrosGrupoByGrupoId(grupo.id!).subscribe(membrosGrupos => {

        this.conjuntoUsuariosGrupos[i] = [];
        this.conjuntoUsuariosPendentesGrupos[i] = [];
        membrosGrupos.forEach(membroGrupo => {
          if (membroGrupo.estado == 1) {
            this.conjuntoUsuariosGrupos[i].push(membroGrupo);
          }

          if (membroGrupo.estado == 2) {
            this.conjuntoUsuariosPendentesGrupos[i].push(membroGrupo);
          }
        });
      });
    });
  }

  pegarMembrosGrupoDeUmGrupo(grupo: Grupo, conjuntoGruposSistema: Grupo[], conjuntoUsuariosGrupos: MembroGrupo[][]): MembroGrupo[] {

    const index = conjuntoGruposSistema.findIndex(m => m.id === grupo.id);
    if (index !== -1) {
      return conjuntoUsuariosGrupos[index];
    }
    return [];
  }

  verificarSeUsuarioTemPedidoPendenteGrupo(idGrupo: number | null, usuario: Utilizador): MembroGrupo {

    const index = this.conjuntoGruposSistema.findIndex(m => m.id === idGrupo);
    if (index !== -1) {
      return this.conjuntoUsuariosPendentesGrupos[index].find(membroGrupo => membroGrupo.utilizador.id == usuario.id)!;
    }
    return null!;
  }

  verificarSeUsuarioOwnerGrupoActual(): boolean {
    const index = this.conjuntoGruposSistema.findIndex(m => m.id === this.sharedDataService.grupoActual.id);

    if (index !== -1) {
      return this.conjuntoUsuariosGrupos[index].some(membroGrupo => (membroGrupo.utilizador.id == this.sharedDataService.usuarioLogado.id) && membroGrupo.papel == 3);
    }

    return false;
  }

  verificarSeUsuarioOwnerGrupoGeral(): boolean {
    const index = this.conjuntoGruposSistema.findIndex(m => m.id === 1);

    if (index !== -1) {
      return this.conjuntoUsuariosGrupos[index].some(membroGrupo => (membroGrupo.utilizador.id == this.sharedDataService.usuarioLogado.id) && membroGrupo.papel == 3);
    }

    return false;
  }

  verificarSeUsuarioEditorGrupoActual(): boolean {
    const index = this.conjuntoGruposSistema.findIndex(m => m.id === this.sharedDataService.grupoActual.id);

    if (index !== -1) {
      return this.conjuntoUsuariosGrupos[index].some(membroGrupo => (membroGrupo.utilizador.id == this.sharedDataService.usuarioLogado.id) && membroGrupo.papel == 2);
    }

    return false;
  }

  pegarUtilizadoresNaoEstaoGrupoActual(): Utilizador[] {

    const index = this.conjuntoGruposSistema.findIndex(m => m.id === this.sharedDataService.grupoActual.id);

    let conjunto: Utilizador[] = [];

    if (index !== -1) {

      this.conjuntoUsuarios.forEach(utilizador => {

        if (!this.conjuntoUsuariosGrupos[index].some(g => g.utilizador.id == utilizador.id)) {
          conjunto.push(utilizador);
        }

      });
    }

    return conjunto;
  }

  verificarSeUsuarioEstaNoGrupo(idGrupo: number | null): Grupo | undefined {
    return this.conjuntoGruposUsuario.find(m => m.id == idGrupo);
  }

  async pegarConteudosDosGruposEmQueUsuarioSeEncontra() {

    for (const grupoUsuario of this.conjuntoGruposUsuario) {
      await this.pegarConteudosDeUmGrupo(grupoUsuario.id!);
    }


    //Após pegar as músicas do grupo público e dos outros grupos , pegar os artistas de cada música
    this.pegarArtistasConjuntoMusicas();
    this.pegarArtistasConjuntoAlbuns();
    this.carregarMidiasCarregadas();
  }


  async pegarConteudosDeUmGrupo(idGrupo: number): Promise<void> {

    const conteudosGrupos = await firstValueFrom(this.conteudoGrupoService.getConteudosGruposByGrupoId(idGrupo));

    conteudosGrupos.forEach(conteudoGrupo => {
      if (conteudoGrupo.video == null) {
        this.conjuntoMusicas.push(conteudoGrupo.musica!);
        this.AdicionarMusicaVideoAoGrupoArray(conteudoGrupo.musica, this.conjuntoMusicasGrupos, idGrupo);
        this.conjuntoCriadoresPostagemMusicas.push(conteudoGrupo.utilizador);
      } else {
        this.conjuntoVideos.push(conteudoGrupo.video!);
        this.AdicionarMusicaVideoAoGrupoArray(conteudoGrupo.video, this.conjuntoVideosGrupos, idGrupo);
        this.conjuntoCriadoresPostagemVideos.push(conteudoGrupo.utilizador);
      }
    });
  }


  pegarMusicasGrupo(grupo: Grupo, conjuntoGruposUsuario: Grupo[], conjuntoMusicasGrupos: Musica[][]): Musica[] | null {

    const index = conjuntoGruposUsuario.findIndex(a => a.id === grupo.id);
    if (index !== -1) {
      return conjuntoMusicasGrupos[index];
    }
    return null;
  }

  pegarMusicasPlaylist(playlist: Playlist, conjuntoPlaylistsSistema: Playlist[], conjuntoMusicasPlaylists: Musica[][]): Musica[] | null {

    const index = conjuntoPlaylistsSistema.findIndex(a => a.id === playlist.id);
    if (index !== -1) {
      return conjuntoMusicasPlaylists[index];
    }
    return null;
  }

  pegarVideosGrupo(grupo: Grupo, conjuntoGruposUsuario: Grupo[], conjuntoVideosGrupos: Video[][]): Video[] | null {

    const index = conjuntoGruposUsuario.findIndex(a => a.id === grupo.id);
    if (index !== -1) {
      return conjuntoVideosGrupos[index];
    }
    return null;
  }

  carregarMidiasCarregadas() {

    this.meuCarregadoService.getMeusCarregadosByUtilizadorId(this.sharedDataService.usuarioLogado.id!).subscribe({
      next: meusCarregados => {
        this.conjuntoMeusCarregadosTotal = meusCarregados;
        this.conjuntoMeusCarregadosMusicas = meusCarregados.filter(m => m.musica != null);
        this.conjuntoMeusCarregadosVideos = meusCarregados.filter(m => m.video != null);
      },
      complete: () => {
        this.pegarArtistasMeusCarregadosMusicas();
      }
    });

  }

  pegarArtistasMeusCarregadosMusicas() {

    if (this.conjuntoMeusCarregadosMusicas.length > 0) {

      const observables = this.conjuntoMeusCarregadosMusicas.map((meuCarregado) =>
        this.musicaArtistaService.getMusicasArtistasByMusicaId(meuCarregado.musica.id!)
      );

      forkJoin(observables).subscribe(resultados => {
        this.conjuntoArtistasMeusCarregadosMusicas = resultados.map(musicasArtistas =>
          musicasArtistas.map(ma => ma.artista)
        );
        this.juntarMusicasVideosMeusCarregadosConteudosGrupos();
      });

    } else {
      this.juntarMusicasVideosMeusCarregadosConteudosGrupos();
    }

  }


  verificarSeMidiaFoiCriadaDirectamenteGrupo(meuCarregado: MeuCarregado, tipo: "musica" | "video"): Grupo | null {

    if (meuCarregado.vinculoDireto == true) {
      return (tipo == "musica") ? this.pegarGrupoDeUmMidia(meuCarregado.musica, 'musica') : this.pegarGrupoDeUmMidia(meuCarregado.video, 'video');

    } else {
      return null;
    }
  }


  verificarSeMusicaVideoPrivados(musicaVideo: Musica | Video, tipo: "musica" | "video"): boolean {

    const conjunto = (tipo == "musica") ? this.conjuntoMeusCarregadosMusicas : this.conjuntoMeusCarregadosVideos;

    return conjunto.some(mV => ((tipo == "musica") ? mV.musica.id == musicaVideo.id : mV.video.id == musicaVideo.id) && mV.vinculoDireto == false);
  }

  verificarSeMusicaVideoCompartilhadosPrivados(musicaVideo: Musica | Video, tipo: "musica" | "video"): boolean {

    const conjunto = (tipo == "musica") ? this.conjuntoMusicasCompartilhadas : this.conjuntoVideosCompartilhados;

    let index = 0;
    for (const usuario of this.conjuntoUsuariosCompartilhouMidias) {

      if (conjunto[index].some(m => ((tipo == "musica") ? m.musica.id == musicaVideo.id : m.video.id == musicaVideo.id) && m.vinculoDireto == false)) {
        return true;
      }
      index++;
    }

    return false;

  }


  pegarGrupoDeUmMidia(midia: any, tipo: "musica" | "video"): Grupo | null {

    const conjunto = (tipo == "musica") ? this.conjuntoMusicasGrupos : this.conjuntoVideosGrupos;

    const index = conjunto.findIndex(grupo =>
      grupo.some(m => m.id === midia.id)
    );

    if (index !== -1) {
      return this.conjuntoGruposUsuario[index];
    }

    return null;
  }


  AdicionarMusicaVideoAoGrupoArray(musicaVideo: any, conjunto: any[][], idGrupo: number) {
    const index = this.conjuntoGruposUsuario.findIndex(a => a.id === idGrupo);
    if (index !== -1) {
      if (!conjunto[index]) {
        conjunto[index] = []; // Inicializa se estiver undefined
      }
      conjunto[index].push(musicaVideo);
    }
  }


  //função que pega os artistas de cada música no grupo público
  pegarArtistasConjuntoMusicas() {

    this.conjuntoMusicas.forEach((musica, i) => {

      this.musicaArtistaService.getMusicasArtistasByMusicaId(musica.id!).subscribe(musicasArtistas => {

        this.conjuntoArtistasMusicas[i] = [];
        musicasArtistas.forEach(musicaArtista => this.conjuntoArtistasMusicas[i].push(musicaArtista.artista));
      });

    });
  }

  //função que pega os artistas de cada álbum no grupo público
  pegarArtistasConjuntoAlbuns() {

    this.conjuntoAlbuns.forEach((album, i) => {

      this.albumArtistaService.getAlbunsArtistasByAlbumId(album.id!).subscribe(albunsArtistas => {
        this.conjuntoArtistasAlbuns[i] = [];
        albunsArtistas.forEach(albumArtista => this.conjuntoArtistasAlbuns[i].push(albumArtista.artista));
      });
    });
  }

  pegarCategorias(tipo: "musica" | "video") {

    console.log("aquiii");

    if (tipo == "musica") {
      this.conjuntoMusicas.forEach(musica => {
        if (!this.conjuntoCategoriasMusicas.some(c => c.id == musica.categoria?.id)) {
          this.conjuntoCategoriasMusicas.push(musica.categoria!);
        }
      });
    } else {
      this.conjuntoVideos.forEach(video => {
        if (!this.conjuntoCategoriasVideos.some(c => c.id == video.categoria?.id)) {
          this.conjuntoCategoriasVideos.push(video.categoria!);
        }
      });
    }
  }

  pegarArtistasAlbum(album: Album, conjuntoAlbuns: Album[], conjuntoArtistasAlbuns: Artista[][]): Artista[] {
    const index = conjuntoAlbuns.findIndex(a => a.id === album.id);
    if (index !== -1) {
      return conjuntoArtistasAlbuns[index];
    }

    return [];
  }

  pegarArtistasMusica(musica: Musica, conjuntoMusicas: Musica[], conjuntoArtistasMusicas: Artista[][]): Artista[] {

    const index = conjuntoMusicas.findIndex(m => m.id === musica.id);
    if (index !== -1) {
      return conjuntoArtistasMusicas[index];
    }
    return [];
  }

  getMusicasDosMeusCarregados(): Musica[] {
    return this.conjuntoMeusCarregadosMusicas.map(m => m.musica);
  }

  verificarExisteMusicaVideoMeusCarregadosEPrivado(meuCarregado: MeuCarregado | null, tipo: "musica" | "video"): boolean {
    if (!meuCarregado) return false;

    const meuCarregadoEncontrado = (tipo == "musica") ? this.conjuntoMeusCarregadosMusicas.find(m => m.musica.id == meuCarregado.musica.id) : this.conjuntoMeusCarregadosVideos.find(m => m.video.id == meuCarregado.video.id);

    return (meuCarregadoEncontrado!.vinculoDireto == false) ? true : false;

  }

  getMusicaVideoMeusCarregados(midia: Musica | Video, tipo: "musica" | "video"): MeuCarregado | null {
    return (tipo == "musica")
      ? this.conjuntoMeusCarregadosMusicas.find(m => m.musica?.id === midia.id) || null
      : this.conjuntoMeusCarregadosVideos.find(m => m.video?.id === midia.id) || null;
  }



  encontrarArtistasMeusCarregadosMusica(musica: Musica, conjuntoMeusCarregadosMusicas: MeuCarregado[], conjuntoArtistasMeusCarregadosMusicas: Artista[][]): Artista[] {

    const index = conjuntoMeusCarregadosMusicas.findIndex(m => m.musica.id === musica.id);
    if (index !== -1) {
      return conjuntoArtistasMeusCarregadosMusicas[index];
    }
    return [];
  }


  pegarAlbunsArtista(artista: Artista, conjuntoAlbuns: Album[], conjuntoArtistasAlbuns: Artista[][]): Album[] {
    return conjuntoAlbuns.filter(album =>
      conjuntoArtistasAlbuns[this.conjuntoAlbuns.indexOf(album)]
        .some(a => a.id === artista.id)
    );
  }

  pegarMusicasArtista(artista: Artista, conjuntoMusicas: Musica[], conjuntoArtistasMusicas: Artista[][]): Musica[] {
    return conjuntoMusicas.filter((musica, index) =>
      conjuntoArtistasMusicas[index]
        .some(a => a.id === artista.id)
    );
  }

  pegarCriadorMusica(musica: Musica, conjuntoMusicas: Musica[], conjuntoCriadoresPostagemMusicas: Utilizador[]): Utilizador {
    const index = conjuntoMusicas.findIndex(a => a.id === musica.id);
    if (index !== -1) {
      return conjuntoCriadoresPostagemMusicas[index];
    }
    return null!;
  }

  pegarCriadorVideo(video: Video, conjuntoVideos: Video[], conjuntoCriadoresPostagemVideos: Utilizador[]): Utilizador {
    const index = conjuntoVideos.findIndex(a => a.id === video.id);
    if (index !== -1) {
      return conjuntoCriadoresPostagemVideos[index];
    }
    return null!;
  }


  //Funções relacionadas a reprodução de música
  ///_______________________________________________________________

  abrirFecharReprodutorMusica() {
    this.isReprodutorFechado = !this.isReprodutorFechado;

    if (this.isReprodutorFechado) {
      this.sharedDataService.tocando = false;
      this.audioPlayer.nativeElement.pause();
    }
  }


  abrirFecharReprodutorMaximizado() {
    this.isReprodutorMaximizadoFechado = !this.isReprodutorMaximizadoFechado;

    this.letraService.carregarLetra(this.sharedDataService.musicaActual.letra)
      .subscribe(letra => {
        this.letraMusica = letra;
      });

    if (!this.isReprodutorMaximizadoFechado) {
      this.adicionarClasseNoScroll(this.paginaInicial);
    } else {
      this.removerClasseNoScroll(this.paginaInicial);
    }

  }

  fecharVisualizacaoReprodutorMaximizado() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isReprodutorMaximizadoFechado = true;
  }

  fecharVisualizacaoConteudoGrupo() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isPaginaConteudoGrupoFechado = true;
  }

  fecharVisualizacaoPlaylist() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isPaginaPlaylistFechada = true;
  }

  fecharVisualizacaoConteudoMidiasCompartilhadas() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isPaginaConteudoMidiasCompartilhadasFechado = true;
  }


  rodarMusica(musica: Musica, artistasMusica: Artista[]) {
    this.isReprodutorFechado = false;
    this.isReprodutorMaximizadoFechado = true;
    this.sharedDataService.musicaActual = musica;
    this.sharedDataService.artistasMusicaActual = artistasMusica;

    setTimeout(() => {
      const audio = this.audioPlayer.nativeElement;
      const url = this.getRecursoUrl(musica.caminhoFicheiro); // o caminho para o .m3u8

      // Reset visual
      this.sharedDataService.duracao = '0:00';
      this.sharedDataService.tempoAtual = '0:00';
      this.sharedDataService.progressoPercentual = 0;

      // Destroi HLS anterior se existir
      if (this.hlsAudio) {
        this.hlsAudio.destroy();
      }

      // Safari tem suporte nativo
      if (audio.canPlayType('application/vnd.apple.mpegurl')) {
        audio.src = url;
        audio.addEventListener('loadedmetadata', () => {
          audio.play();
          this.sharedDataService.tocando = true;
        }, { once: true });
      } else if (Hls.isSupported()) {
        this.hlsAudio = new Hls();
        this.hlsAudio.loadSource(url);
        this.hlsAudio.attachMedia(audio);
        this.hlsAudio.on(Hls.Events.MANIFEST_PARSED, () => {
          audio.play();
          this.sharedDataService.tocando = true;
        });
      } else {
        console.error('HLS não suportado no navegador');
      }

    }, 0);

  }

  alternarPlayPause(tipo: 'audio' | 'video') {

    const player = (tipo == "audio") ? this.audioPlayer.nativeElement : this.videoPlayer.nativeElement;

    if (player.paused) {
      player.play();

      if (tipo == "audio") {
        this.sharedDataService.tocando = true;
        this.sharedDataService.videoTocando = false;
      } else {
        this.sharedDataService.tocando = false;
        this.sharedDataService.videoTocando = true;
      }

    } else {
      player.pause();

      if (tipo == "audio") {
        this.sharedDataService.tocando = false;
      } else {
        this.sharedDataService.videoTocando = false;
      }

    }

  }

  atualizarProgresso(tipo: 'audio' | 'video') {
    const player = (tipo == "audio") ? this.audioPlayer.nativeElement : this.videoPlayer.nativeElement;
    const tempo = player.currentTime;
    const dur = player.duration;
    this.sharedDataService.tempoAtual = this.formatarTempo(tempo);
    this.sharedDataService.progressoPercentual = (tempo / dur) * 100;


    if (player.buffered.length > 0) {
      const bufferedEnd = player.buffered.end(player.buffered.length - 1);
      this.sharedDataService.progressoBuffer = (bufferedEnd / dur) * 100;
    }
  }

  definirDuracao(tipo: 'audio' | 'video') {
    const player = (tipo == "audio") ? this.audioPlayer.nativeElement : this.videoPlayer.nativeElement;
    const dur = player.duration;
    this.sharedDataService.duracao = this.formatarTempo(dur);
  }

  formatarTempo(segundos: number): string {
    const min = Math.floor(segundos / 60);
    const seg = Math.floor(segundos % 60);
    return `${min}:${seg < 10 ? '0' + seg : seg}`;
  }

  irParaTempo(event: MouseEvent, tipo: 'audio' | 'video') {
    const player = (tipo == "audio") ? this.audioPlayer.nativeElement : this.videoPlayer.nativeElement;
    const barra = event.currentTarget as HTMLElement;
    const largura = barra.clientWidth;
    const clickX = event.offsetX;
    const duracao = player.duration;

    const novoTempo = (clickX / largura) * duracao;
    player.currentTime = novoTempo;

    this.atualizarProgresso(tipo); // atualiza visualmente
  }

  reiniciarMusica() {
    const audio = this.audioPlayer.nativeElement;
    audio.currentTime = 0;
    audio.play();
    this.sharedDataService.tocando = true;
  }

  //função que abre página de visualização de um álbum
  abrirVisualizacaoAlbum(album: Album) {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isPaginaAlbumFechado = false;
    this.sharedDataService.albumActual = album;
    this.sharedDataService.musicasAlbumActual = this.conjuntoMusicas.filter(musica =>
      musica.album && musica.album.id === album.id
    );
  }

  abrirVisualizacaoGrupo(grupo: Grupo) {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isPaginaGrupoFechado = false;
    this.sharedDataService.grupoActual = grupo;

    this.sharedDataService.utilizadoresGrupoActual = this.pegarMembrosGrupoDeUmGrupo(grupo, this.conjuntoGruposSistema, this.conjuntoUsuariosGrupos);

    this.sharedDataService.utilizadoresPendentesGrupoActual = this.pegarMembrosGrupoDeUmGrupo(grupo, this.conjuntoGruposSistema, this.conjuntoUsuariosPendentesGrupos);

  }

  abrirVisualizacaoConteudoGrupo(grupo: Grupo) {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isPaginaConteudoGrupoFechado = false;

    this.sharedDataService.musicasGrupoActual = this.pegarMusicasGrupo(grupo, this.conjuntoGruposUsuario, this.conjuntoMusicasGrupos)!;

    this.sharedDataService.videosGrupoActual = this.pegarVideosGrupo(grupo, this.conjuntoGruposUsuario, this.conjuntoVideosGrupos)!;

  }

  abrirVisualizacaoPlaylist(playlist: Playlist) {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isPaginaPlaylistFechada = false;
    this.sharedDataService.playlistActual = playlist;
    this.sharedDataService.musicasPlaylistActual = this.pegarMusicasPlaylist(playlist, this.conjuntoPlaylistsSistema, this.conjuntoMusicasPlaylists)!;
  }

  abrirVisualizacaoLive() {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isPaginaLiveFechado = false;
  }

  abrirVisualizacaoGravacaoLive() {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isPaginaGravacaoLiveFechado = false;
  }

  abrirVisualizacaoMidiasCompartilhadasPor(usuario: Utilizador) {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isPaginaConteudoMidiasCompartilhadasFechado = false;
    this.sharedDataService.utilizadorActual = usuario;

    this.sharedDataService.musicasCompartilhadas = this.pegarMusicasVideosCompartilhadasDeUmUsuario(usuario, this.conjuntoUsuariosCompartilhouMidias, "musica");

    this.sharedDataService.videosCompartilhados = this.pegarMusicasVideosCompartilhadasDeUmUsuario(usuario, this.conjuntoUsuariosCompartilhouMidias, "video");
  }

  fecharVisualizacaoAlbum() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isPaginaAlbumFechado = true;
  }

  fecharVisualizacaoGrupo() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isPaginaGrupoFechado = true;
  }

  fecharVisualizacaoLive() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isPaginaLiveFechado = true;
  }

  fecharVisualizacaoGravacaoLive() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isPaginaGravacaoLiveFechado = true;
  }

  fecharVisualizacaoArtista() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isPaginaArtistaFechado = true;
  }



  adicionarClasseNoScroll(elemento: ElementRef<HTMLElement>) {
    elemento.nativeElement.classList.add("no-scroll");
    this.qtdNoScrollAdicionar++;
  }

  removerClasseNoScroll(elemento: ElementRef<HTMLElement>) {
    elemento.nativeElement.classList.remove("no-scroll");
    this.qtdNoScrollAdicionar--;
    for (let i = 0; i < this.qtdNoScrollAdicionar; i++) {
      elemento.nativeElement.classList.add("no-scroll");
    }
  }

  abrirVisualizacaoArtista(artista: Artista) {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isPaginaArtistaFechado = false;
    this.sharedDataService.artistaActual = artista;
  }


  rodarVideo(video: Video) {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isPaginaVideoFechado = false;
    this.sharedDataService.videoActual = video;


    setTimeout(() => {
      const videoPlayer = this.videoPlayer.nativeElement;
      const url = this.getRecursoUrl(video.caminhoFicheiro); // o caminho para o .m3u8

      // Reset visual
      this.sharedDataService.duracaoVideo = '0:00';
      this.sharedDataService.tempoAtualVideo = '0:00';
      this.sharedDataService.progressoPercentualVideo = 0;

      // Destroi HLS anterior se existir
      if (this.hlsVideo) {
        this.hlsVideo.destroy();
      }

      // Safari tem suporte nativo
      if (videoPlayer.canPlayType('application/vnd.apple.mpegurl')) {
        videoPlayer.src = url;
        videoPlayer.addEventListener('loadedmetadata', () => {
          videoPlayer.play();
          this.sharedDataService.videoTocando = true;
        }, { once: true });
      } else if (Hls.isSupported()) {
        this.hlsVideo = new Hls();
        this.hlsVideo.loadSource(url);
        this.hlsVideo.attachMedia(videoPlayer);
        this.hlsVideo.on(Hls.Events.MANIFEST_PARSED, () => {
          videoPlayer.play();
          this.sharedDataService.videoTocando = true;
        });
      } else {
        console.error('HLS não suportado no navegador');
      }
    }, 0);
  }

  fecharVisualizacaoVideo() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isPaginaVideoFechado = true;
  }

  onVideoPlay() {
    this.sharedDataService.videoTocando = true;
  }

  onVideoPause() {
    this.sharedDataService.videoTocando = false;
  }

  fecharVisualizacoes() {
    this.fecharVisualizacaoAlbum();
    this.fecharVisualizacaoArtista();
    this.fecharVisualizacaoVideo();
    this.fecharVisualizacaoReprodutorMaximizado();
    this.fecharVisualizacaoGrupo();
    this.fecharVisualizacaoConteudoGrupo();
    this.fecharVisualizacaoPlaylist();
    this.fecharVisualizacaoConteudoMidiasCompartilhadas();
    this.qtdNoScrollAdicionar = 0;
  }


  irTelaArtistas() {
    this.pesquisaInput = "";
    this.fecharVisualizacoes();
    this.barraPesquisa.nativeElement.classList.remove("non-active");
    this.zerarVariaveis();
    this.abaSeleccionada = 'artistas';
    this.carregarItens();
  }


  irPaginaInicial() {
    this.zerarVariaveis();
    this.abaSeleccionada = 'pagina-inicial';
    this.barraPesquisa.nativeElement.classList.add("non-active");
    this.carregarItens();
    this.fecharVisualizacoes();
    this.pesquisaInput = "";
  }

  irPaginaLive() {
    this.zerarVariaveis();
    this.abaSeleccionada = 'lives';
    this.barraPesquisa.nativeElement.classList.remove("non-active");
    this.carregarItens();
    this.fecharVisualizacoes();
    this.pesquisaInput = "";
  }

  irTelaAlbuns() {
    this.pesquisaInput = "";
    this.fecharVisualizacoes();
    this.barraPesquisa.nativeElement.classList.remove("non-active");
    this.zerarVariaveis();
    this.abaSeleccionada = 'albuns';
    this.carregarItens();
  }

  irTelaMusicas() {
    this.pesquisaInput = "";
    this.fecharVisualizacoes();
    this.barraPesquisa.nativeElement.classList.remove("non-active");
    this.zerarVariaveis();
    this.abaSeleccionada = 'musicas';
    this.carregarItens();
  }

  irTelaVideos() {
    this.pesquisaInput = "";
    this.fecharVisualizacoes();
    this.barraPesquisa.nativeElement.classList.remove("non-active");
    this.zerarVariaveis();
    this.abaSeleccionada = 'videos';
    this.carregarItens();
  }

  irTelaMidiasCarregados() {
    this.pesquisaInput = "";
    this.fecharVisualizacoes();
    this.barraPesquisa.nativeElement.classList.remove("non-active");
    this.zerarVariaveis();
    this.abaSeleccionada = 'midiasCarregados';
    this.carregarItens();
  }

  irTelaGrupos() {
    this.pesquisaInput = "";
    this.fecharVisualizacoes();
    this.barraPesquisa.nativeElement.classList.remove("non-active");
    this.zerarVariaveis();
    this.abaSeleccionada = 'grupos';
    this.carregarItens();
  }

  irTelaPlaylists() {
    this.pesquisaInput = "";
    this.fecharVisualizacoes();
    this.barraPesquisa.nativeElement.classList.remove("non-active");
    this.zerarVariaveis();
    this.abaSeleccionada = 'playlists';
    this.carregarItens();
  }

  irTelaMidiasExternas() {
    this.pesquisaInput = "";
    this.fecharVisualizacoes();
    this.barraPesquisa.nativeElement.classList.remove("non-active");
    this.zerarVariaveis();
    this.abaSeleccionada = 'midiasExternas';
    this.carregarItens();
  }

  irTelaEstacoesRadio() {
    this.pesquisaInput = "";
    this.fecharVisualizacoes();
    this.barraPesquisa.nativeElement.classList.remove("non-active");
    this.zerarVariaveis();
    this.abaSeleccionada = 'estacoesRadio';
    this.carregarItens();
  }

  efectuarPesquisa() {

    let termo = "";
    let termoNome = 0;

    if (this.abaSeleccionada == 'albuns') {
      termo = "album";
      termoNome = 2;
    } else if (this.abaSeleccionada == 'artistas') {
      termo = "artista";
      termoNome = 1;
    } else if (this.abaSeleccionada == 'musicas') {
      termo = "musica";
      termoNome = 2;
    } else if (this.abaSeleccionada == 'videos') {
      termo = "video";
      termoNome = 2;
    } else if (this.abaSeleccionada == 'midiasCarregados') {
      termo = "mídia";
      termoNome = 3;
    }

    if (this.pesquisaInput == "") {
      this.toast.warning('Por favor digite um(a) ' + termo + ' para pesquisar', 'Atenção!', { closeButton: true });
      return;
    }

    const pesquisa = this.pesquisaInput.toLowerCase().trim();

    if (termoNome != 3) {
      this.conjuntoPesquisa = this.conjuntoOriginal.filter(elemento =>
        (termoNome == 1) ? elemento.nome?.toLowerCase().trim().includes(pesquisa) : elemento.titulo?.toLowerCase().trim().includes(pesquisa));
    } else {
      this.conjuntoPesquisa = this.conjuntoOriginal.filter(elemento => (elemento.musica != null) ? elemento.musica.titulo?.toLowerCase().trim().includes(pesquisa) : elemento.video.titulo?.toLowerCase().trim().includes(pesquisa));
    }

    if (this.abaSeleccionada == 'albuns') {
      this.conjuntoAlbuns = [...this.conjuntoPesquisa];
    } else if (this.abaSeleccionada == 'artistas') {
      this.conjuntoArtistas = [...this.conjuntoPesquisa];
    } else if (this.abaSeleccionada == 'musicas') {
      this.conjuntoMusicas = [...this.conjuntoPesquisa];
    } else if (this.abaSeleccionada == 'videos') {
      this.conjuntoVideos = [...this.conjuntoPesquisa];
    } else if (this.abaSeleccionada == 'midiasCarregados') {
      this.conjuntoMeusCarregadosMusicas = [...(this.conjuntoPesquisa.filter(m => m.musica != null))];
      this.conjuntoMeusCarregadosVideos = [...(this.conjuntoPesquisa.filter(m => m.video != null))];
    }

  }


  tocarEstacao(estacao: RadioEstacao) {
    this.sharedDataService.estacaoRadioActual = estacao;
    this.audio.src = estacao.urlStream; // deve ser um link de stream de rádio válido
    this.audio.play();
    this.sharedDataService.radioTocando = true;
  }

  /*tocarEstacao22(estacao: Estacao) {
    this.sharedDataService.estacaoRadioActual = estacao;
    this.audio.src = estacao.url_resolved;
    this.audio.load();
    this.audio.play();
    this.sharedDataService.radioTocando = true;
  }*/

  pausarOuTocarEstacao() {
    if (this.sharedDataService.radioTocando) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.sharedDataService.radioTocando = !this.sharedDataService.radioTocando;
  }

  fecharEstacaoAtual() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.sharedDataService.estacaoRadioActual = null!;
    this.sharedDataService.radioTocando = false;
  }


  abrirModalAdicionarArtista() {
    this.isModalArtistaAberta = true;
    this.adicionarClasseNoScroll(this.paginaInicial);
  }

  abrirModalCompartilharMidiasUsuario() {
    this.isModalCompartilharMidiasUsuarioAberto = true;
    this.adicionarClasseNoScroll(this.paginaInicial);
  }

  abrirModalAdicionarPlaylist() {
    this.isModalPlaylistAberta = true;
    this.adicionarClasseNoScroll(this.paginaInicial);
  }

  abrirModalAdicionarMusicaPlaylist() {
    this.isModalAdicionarMusicaPlaylistAberto = true;
    this.adicionarClasseNoScroll(this.paginaInicial);

    this.conjuntoMusicasDisponiveisParaPlaylist = this.conjuntoMusicasDisponiveisParaPlaylist.filter(m => !this.sharedDataService.musicasPlaylistActual.some(mP => mP.id == m.id));
  }


  abrirModalAdicionarVideo() {
    this.isModalVideoAberta = true;
    this.adicionarClasseNoScroll(this.paginaInicial);
  }

  abrirModalAdicionarGrupo() {
    this.isModalGrupoAberta = true;
    this.adicionarClasseNoScroll(this.paginaInicial);
  }


  fecharModalAdicionarArtista() {
    this.isModalArtistaAberta = false;
    this.removerClasseNoScroll(this.paginaInicial);
    this.novoArtista = new Artista(null, '', '', '');
    this.fotoSelecionada = null;

    this.artistaSelecionado = null;
    this.conjuntoArtistasSelecionados = [];
    this.conjuntoArtistasDisponiveis = [...this.conjuntoArtistas];

    this.musicaSelecionada = null;
    this.conjuntoMusicasSelecionadas = [];
    this.conjuntoMusicasDisponiveis = [...this.conjuntoMusicasGrupoGeralSemAlbum];
  }

  fecharModalAdicionarGrupo() {
    this.isModalGrupoAberta = false;
    this.removerClasseNoScroll(this.paginaInicial);
    this.novoGrupo = new Grupo(null, "", "", "", null!, false);
    this.tipoGrupo = "publico";
  }

  fecharModalAdicionarPlaylist() {
    this.isModalPlaylistAberta = false;
    this.removerClasseNoScroll(this.paginaInicial);
    this.novaPlaylist = new Playlist(null, "", "", true, null!);
  }

  abrirModalAdicionarAlbum() {
    this.isModalAlbumAberto = true;
    this.adicionarClasseNoScroll(this.paginaInicial);
  }

  onCapaSelecionada(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.novaCapaAlbum = event.target.files[0];
    }
  }

  fecharModalAdicionarAlbum() {
    this.isModalAlbumAberto = false;
    this.removerClasseNoScroll(this.paginaInicial);
    this.novoTituloAlbum = '';
    this.novaDescricaoAlbum = '';
    this.novaDataLancamentoAlbum = '';
    this.novaCapaAlbum = null;

    this.artistaSelecionado = null;
    this.conjuntoArtistasSelecionados = [];
    this.conjuntoArtistasDisponiveis = [...this.conjuntoArtistas];

    this.musicaSelecionada = null;
    this.conjuntoMusicasSelecionadas = [];
    this.conjuntoMusicasDisponiveis = [...this.conjuntoMusicasGrupoGeralSemAlbum];
  }

  fecharModalAdicionarMusicaPlaylist() {
    this.isModalAdicionarMusicaPlaylistAberto = false;
    this.removerClasseNoScroll(this.paginaInicial);

    this.musicaSelecionadaParaPlaylist = null;
    this.conjuntoMusicasSelecionadasParaPlaylist = [];
    this.conjuntoMusicasDisponiveisParaPlaylist = [...this.conjuntoMusicasGrupoGeral];
  }

  fecharModalCompartilharMidiasUsuario() {
    this.isModalCompartilharMidiasUsuarioAberto = false;
    this.removerClasseNoScroll(this.paginaInicial);

    this.usuarioSelecionadoCompartilhar = null;
    this.conjuntoUsuariosSelecionadosCompartilhar = [];

    this.conjuntoUsuariosCompartilhar = [...this.conjuntoUsuarios.filter(u => !this.conjuntoUsuariosPartilheiMidias.find(uP => uP.id == u.id))].filter(v => v.id != this.sharedDataService.usuarioLogado.id);

  }

  fecharModalPartilharConteudo() {
    this.isModalPartilharConteudoAberto = false;
    this.removerClasseNoScroll(this.paginaInicial);

    this.grupoSelecionado = null;
    this.conjuntoGruposSelecionados = [];
    this.conjuntoGruposDisponiveis = [...this.conjuntoGruposUsuario];
  }

  abrirModalAdicionarMusica() {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isModalMusicaAberta = true;
  }

  abrirModalEditarAlbum(album: Album) {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isModalEditarAlbumAberto = true;
    this.sharedDataService.albumActual = album;
    this.novoTituloAlbum = album.titulo;
    this.novaDescricaoAlbum = album.descricao;
    this.novaDataLancamentoAlbum = album.dataLancamento;
  }

  abrirModalAdicionarUsuarioGrupo() {
    this.isModalAdicionarUsuarioGrupoAberto = true;
    this.adicionarClasseNoScroll(this.paginaInicial);

    this.sharedDataService.utilizadoresNaoEstaoGrupoActual = this.pegarUtilizadoresNaoEstaoGrupoActual();
    this.conjuntoUsuariosNaoEstaoGrupo = [...this.sharedDataService.utilizadoresNaoEstaoGrupoActual];
  }

  abrirModalPartilharConteudo(musicaVideo: any, tipo: "musica" | "video") {
    this.isModalPartilharConteudoAberto = true;
    this.adicionarClasseNoScroll(this.paginaInicial);
    if (tipo == "musica") {
      this.sharedDataService.musicaActualPartilhaGrupo = musicaVideo;
      this.sharedDataService.tipoConteudoPartilhaGrupo = "musica";
    } else {
      this.sharedDataService.videoActualPartilhaGrupo = musicaVideo;
      this.sharedDataService.tipoConteudoPartilhaGrupo = "video";
    }
  }

  abrirModalEditarMusica(musica: Musica) {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isModalEditarMusicaAberto = true;
    this.sharedDataService.musicaActualEditarMusica = musica;
    this.novoTituloMusica = musica.titulo;
    this.novaDataLancamentoMusica = musica.dataLancamento;
    this.novaCategoriaSelecionadaMusica = this.conjuntoCategoriasMusicasSistema.find(
      c => c.id === musica.categoria!.id)!;

    this.letraService.carregarLetra(musica.letra)
      .subscribe(letra => {
        this.novaLetraMusica = letra;
      });
  }

  abrirModalEditarArtista(artista: Artista) {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isModalEditarArtistaAberto = true;

    this.novoNomeArtista = artista.nome;
    this.novaBiografia = artista.biografia;
  }

  abrirModalEditarVideo(video: Video) {
    this.adicionarClasseNoScroll(this.paginaInicial);
    this.isModalEditarVideoAberto = true;
    this.sharedDataService.videoActual = video;
    this.novoTituloVideo = video.titulo;
    this.novoAutorVideo = video.autor;
    this.novaDescricaoVideo = video.descricao;
    this.novaDataLancamentoVideo = video.dataLancamento;
    this.novaCategoriaSelecionadaVideo = this.conjuntoCategoriasVideosSistema.find(
      c => c.id === video.categoria!.id)!;
  }

  fecharModalAdicionarMusica() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isModalMusicaAberta = false;

    // Reset campos
    this.novoTituloMusica = '';
    this.novaMusicaFile = null!;
    this.novaLetraMusica = "";
    this.novaCapaMusica = null!;
    this.novaDataLancamentoMusica = '';
    this.novaCategoriaSelecionadaMusica = null;

    this.artistaSelecionado = null;
    this.conjuntoArtistasSelecionados = [];
    this.conjuntoArtistasDisponiveis = [...this.conjuntoArtistas];

    this.musicaSelecionada = null;
    this.conjuntoMusicasSelecionadas = [];
    this.conjuntoMusicasDisponiveis = [...this.conjuntoMusicasGrupoGeralSemAlbum];
  }

  fecharModalEditarAlbum() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isModalEditarAlbumAberto = false;

    this.novoTituloAlbum = "";
    this.novaDescricaoAlbum = "";
    this.novaDataLancamentoAlbum = "";
    this.novaCapaAlbum = null;
  }

  fecharModalEditarArtista() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isModalEditarArtistaAberto = false;

    this.novoNomeArtista = "";
    this.novaBiografia = "";
  }

  fecharModalAdicionarUsuarioGrupo() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isModalAdicionarUsuarioGrupoAberto = false;

    this.usuarioSelecionado = null;
    this.conjuntoUsuariosSelecionados = [];
    this.conjuntoUsuariosNaoEstaoGrupo = [...this.sharedDataService.utilizadoresNaoEstaoGrupoActual];
  }

  fecharModalEditarMusica() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isModalEditarMusicaAberto = false;

    this.novoTituloMusica = '';
    this.novaLetraMusica = "";
    this.novaCapaMusica = null!;
    this.novaDataLancamentoMusica = '';
    this.novaCategoriaSelecionadaMusica = null;
  }

  fecharModalEditarVideo() {
    this.removerClasseNoScroll(this.paginaInicial);
    this.isModalEditarVideoAberto = false;

    this.novoTituloVideo = "";
    this.novoAutorVideo = "";
    this.novaDescricaoVideo = "";
    this.novaCapaVideo = null!;
    this.novaDataLancamentoVideo = '';
    this.novaCategoriaSelecionadaVideo = null;
  }

  fecharModalAdicionarVideo() {
    this.isModalVideoAberta = false;
    this.removerClasseNoScroll(this.paginaInicial);

    this.novoTituloVideo = "";
    this.novoAutorVideo = "";
    this.novaDescricaoVideo = "";
    this.novaDataLancamentoVideo = "";
    this.novaCategoriaSelecionadaVideo = null;
    this.novoVideoFile = null!;
    this.novaCapaVideo = null!;
  }

  onMusicaSelecionada(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.novaMusicaFile = event.target.files[0];
    }
  }

  onVideoSelecionado(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.novoVideoFile = event.target.files[0];
    }
  }

  onCapaMusicaSelecionada(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.novaCapaMusica = event.target.files[0];
    }
  }

  onCapaVideoSelecionado(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.novaCapaVideo = event.target.files[0];
    }
  }

  adicionarArtista() {
    const artista = this.artistaSelecionado;

    if (artista && !this.conjuntoArtistasSelecionados.some(a => a.id === artista!.id)) {
      this.conjuntoArtistasSelecionados.push(artista!);
      this.conjuntoArtistasDisponiveis = this.conjuntoArtistasDisponiveis.filter(a => a.id !== artista!.id);
      // Reset após próximo ciclo de detecção de mudanças
      setTimeout(() => {
        this.artistaSelecionado = null;
      });
    }
  }

  adicionarGrupo() {
    const grupo = this.grupoSelecionado;

    if (grupo && !this.conjuntoGruposSelecionados.some(a => a.id === grupo!.id)) {
      this.conjuntoGruposSelecionados.push(grupo!);
      this.conjuntoGruposDisponiveis = this.conjuntoGruposDisponiveis.filter(a => a.id !== grupo!.id);
      // Reset após próximo ciclo de detecção de mudanças
      setTimeout(() => {
        this.grupoSelecionado = null;
      });
    }
  }

  adicionarMusica() {
    const musica = this.musicaSelecionada;

    if (musica && !this.conjuntoMusicasSelecionadas.some(a => a.id === musica!.id)) {
      this.conjuntoMusicasSelecionadas.push(musica!);
      this.conjuntoMusicasDisponiveis = this.conjuntoMusicasDisponiveis.filter(a => a.id !== musica!.id);
      // Reset após próximo ciclo de detecção de mudanças
      setTimeout(() => {
        this.musicaSelecionada = null;
      });
    }
  }

  adicionarMusicaParaPlaylist() {
    const musica = this.musicaSelecionadaParaPlaylist;

    if (musica && !this.conjuntoMusicasSelecionadasParaPlaylist.some(a => a.id === musica!.id)) {
      this.conjuntoMusicasSelecionadasParaPlaylist.push(musica!);
      this.conjuntoMusicasDisponiveisParaPlaylist = this.conjuntoMusicasDisponiveisParaPlaylist.filter(a => a.id !== musica!.id);
      // Reset após próximo ciclo de detecção de mudanças
      setTimeout(() => {
        this.musicaSelecionadaParaPlaylist = null;
      });
    }
  }

  adicionarUsuario() {
    const usuario = this.usuarioSelecionado;

    if (usuario && !this.conjuntoUsuariosSelecionados.some(a => a.id === usuario!.id)) {
      this.conjuntoUsuariosSelecionados.push(usuario!);
      this.conjuntoUsuariosNaoEstaoGrupo = this.conjuntoUsuariosNaoEstaoGrupo.filter(a => a.id !== usuario!.id);
      // Reset após próximo ciclo de detecção de mudanças
      setTimeout(() => {
        this.usuarioSelecionado = null;
      });
    }
  }

  adicionarUsuarioCompartilhar() {
    const usuario = this.usuarioSelecionadoCompartilhar;

    if (usuario && !this.conjuntoUsuariosSelecionadosCompartilhar.some(a => a.id === usuario!.id)) {
      this.conjuntoUsuariosSelecionadosCompartilhar.push(usuario!);
      this.conjuntoUsuariosCompartilhar = this.conjuntoUsuariosCompartilhar.filter(a => a.id !== usuario!.id);
      // Reset após próximo ciclo de detecção de mudanças
      setTimeout(() => {
        this.usuarioSelecionadoCompartilhar = null;
      });
    }
  }

  removerArtista(artista: any) {
    this.conjuntoArtistasDisponiveis.push(artista);
    this.conjuntoArtistasSelecionados = this.conjuntoArtistasSelecionados.filter(a => a.id != artista.id);
  }

  removerGrupo(grupo: any) {
    this.conjuntoGruposDisponiveis.push(grupo);
    this.conjuntoGruposSelecionados = this.conjuntoGruposSelecionados.filter(a => a.id != grupo.id);
  }

  removerMusica(musica: any) {
    this.conjuntoMusicasDisponiveis.push(musica);
    this.conjuntoMusicasSelecionadas = this.conjuntoMusicasSelecionadas.filter(a => a.id != musica.id);
  }

  removerMusicaParaPlaylist(musica: any) {
    this.conjuntoMusicasDisponiveisParaPlaylist.push(musica);
    this.conjuntoMusicasSelecionadasParaPlaylist = this.conjuntoMusicasSelecionadasParaPlaylist.filter(a => a.id != musica.id);
  }

  removerUsuario(usuario: any) {
    this.conjuntoUsuariosNaoEstaoGrupo.push(usuario);
    this.conjuntoUsuariosSelecionados = this.conjuntoUsuariosSelecionados.filter(a => a.id != usuario.id);
  }

  removerUsuarioCompartilhar(usuario: any) {
    this.conjuntoUsuariosCompartilhar.push(usuario);
    this.conjuntoUsuariosSelecionadosCompartilhar = this.conjuntoUsuariosSelecionadosCompartilhar.filter(a => a.id != usuario.id);
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.fotoSelecionada = event.target.files[0];
    }
  }

  /*adicionarArtistaSelecionadoAlbum(event: any) {
    const idArtista = +event.target.value;
    const artista = this.conjuntoArtistas.find((a) => a.id === idArtista);
    if (
      artista &&
      !this.conjuntoArtistasSelecionados.some((a) => a.id === artista.id)
    ) {
      this.conjuntoArtistasSelecionados.push(artista);
    }
    event.target.value = ''; // Reset select
  }

  removerArtistaSelecionadoAlbum(artista: Artista) {
    this.conjuntoArtistasSelecionados = this.conjuntoArtistasSelecionados.filter(
      (a) => a.id !== artista.id
    );
  }*/

  async partilharConteudoComGrupos() {

    if (this.conjuntoGruposSelecionados.length === 0) {
      this.toast.warning('Adicione pelo menos um grupo!', 'Atenção!');
      return;
    }

    this.toast.warning('Aguarde um Momento ...', 'Atenção!');

    try {

      if (this.sharedDataService.tipoConteudoPartilhaGrupo == "musica") {

        let conteudo = this.sharedDataService.musicaActualPartilhaGrupo;

        for (const grupo of this.conjuntoGruposSelecionados) {

          // Duplicar Arquivo da música
          const caminhoMusicaDuplicada: string = await firstValueFrom(
            this.ficheiroService.duplicarArquivo(conteudo.caminhoFicheiro, 'musica')
          );

          const caminhoFotoDuplicada: string = await firstValueFrom(
            this.uploadService.duplicarImagem(conteudo.caminhoFoto)
          );

          const caminhoLetra: string = await firstValueFrom(
            this.uploadService.duplicarLetra(conteudo.letra)
          );


          const musicaCriada = await firstValueFrom(
            this.musicaService.createMusica(new Musica(null, conteudo.titulo, conteudo.duracao, conteudo.formato, conteudo.tamanho, caminhoLetra, conteudo.dataLancamento, caminhoMusicaDuplicada, caminhoFotoDuplicada, conteudo.album, conteudo.categoria))
          );

          for (const artista of this.pegarArtistasMusica(conteudo, this.conjuntoMusicas, this.conjuntoArtistasMusicas)) {
            await firstValueFrom(
              this.musicaArtistaService.saveMusicaArtista(new MusicaArtista(null, musicaCriada, artista))
            );
          }

          await firstValueFrom(
            this.conteudoGrupoService.saveConteudoGrupo(new ConteudoGrupo(null, grupo, null, musicaCriada, this.sharedDataService.usuarioLogado))
          );

        }

      } else {

        let conteudo = this.sharedDataService.videoActualPartilhaGrupo;

        for (const grupo of this.conjuntoGruposSelecionados) {

          // Duplicar Arquivo da música
          const caminhoVideoDuplicado: string = await firstValueFrom(
            this.ficheiroService.duplicarArquivo(conteudo.caminhoFicheiro, 'video')
          );

          const caminhoFotoDuplicada: string = await firstValueFrom(
            this.uploadService.duplicarImagem(conteudo.caminhoFoto)
          );

          const videoCriado = await firstValueFrom(
            this.videoService.saveVideo(new Video(null, conteudo.titulo, conteudo.descricao, conteudo.duracao, conteudo.formato, conteudo.tamanho, conteudo.dataLancamento, conteudo.autor, caminhoVideoDuplicado, caminhoFotoDuplicada, null, conteudo.categoria))
          );

          await firstValueFrom(
            this.conteudoGrupoService.saveConteudoGrupo(new ConteudoGrupo(null, grupo, videoCriado, null, this.sharedDataService.usuarioLogado))
          );

        }

      }

      this.toast.success('Conteúdo partilhado com sucesso!', 'Sucesso!');
      this.fecharModalPartilharConteudo();
      this.carregarItens();

    } catch (err) {
      console.error(err);
      this.toast.error('Erro ao partilhar conteúdo!', 'Erro!');
    }

  }

  async salvarNovaMusica(salvarMidiasCarregadas: boolean) {

    if (!this.novoTituloMusica || this.novoTituloMusica.trim() === '') {
      this.toast.warning('Preencha o título da música!', 'Atenção!');
      return;
    }

    if (!this.novaLetraMusica || this.novaLetraMusica.trim() === '') {
      this.toast.warning('Preencha a letra da música!', 'Atenção!');
      return;
    }

    if (!this.novaDataLancamentoMusica) {
      this.toast.warning('Selecione a data de lançamento!', 'Atenção!');
      return;
    }

    if (!this.novaCategoriaSelecionadaMusica) {
      this.toast.warning('Selecione uma categoria!', 'Atenção!');
      return;
    }

    if (this.conjuntoArtistasSelecionados.length === 0) {
      this.toast.warning('Adicione pelo menos um artista!', 'Atenção!');
      return;
    }

    if (!this.novaMusicaFile) {
      this.toast.warning('Selecione o arquivo da música!', 'Atenção!');
      return;
    }

    this.toast.warning('Aguarde um Momento ...', 'Atenção!');

    try {

      // Upload da música
      const caminhoFicheiro: string = await firstValueFrom(
        this.ficheiroService.uploadFicheiro(this.novaMusicaFile, 'musica')
      );

      // Upload da letra
      let caminhoLetra: string | null = await firstValueFrom(
        this.uploadService.uploadLetra(this.novoTituloMusica, this.novaLetraMusica)
      );

      // Upload da capa da música
      let caminhoCapa = "";
      if (this.novaCapaMusica) {
        caminhoCapa = await firstValueFrom(
          this.uploadService.uploadImagem(this.novaCapaMusica)
        );
      } else {
        caminhoCapa = "/files/imagens/musicadefault.jpg";
      }

      // Tentar obter duração (opcional)
      const audio = new Audio(URL.createObjectURL(this.novaMusicaFile));
      await new Promise((resolve) => {
        audio.addEventListener('loadedmetadata', resolve);
      });
      const duracao = this.formatarTempoM(audio.duration); // por exemplo: "00:03:45"

      // Monta a música
      const musica = new Musica(
        null,
        this.novoTituloMusica,
        duracao,
        this.novaMusicaFile.name.split('.').pop()?.toLowerCase()!,
        //this.novaMusicaFile.type.split('/')[1], // formato (ex: "mp3")
        Math.round(this.novaMusicaFile.size / (1024 * 1024)), // tamanho em MB aproximado
        caminhoLetra || "",
        this.novaDataLancamentoMusica,
        caminhoFicheiro,
        caminhoCapa,
        null, // pode ser null
        this.novaCategoriaSelecionadaMusica // pode ser null
      );

      console.log("musica add:" + musica);

      // Salvar no backend
      const musicaCriada = await firstValueFrom(
        this.musicaService.createMusica(musica)
      );

      // Vínculo com artistas
      for (const artista of this.conjuntoArtistasSelecionados) {
        const musicaArtista = new MusicaArtista(null, musicaCriada, artista);
        await firstValueFrom(
          this.musicaArtistaService.saveMusicaArtista(musicaArtista)
        );
      }

      if (salvarMidiasCarregadas) {

        //Salvar nos meus carregados
        const meuCarregado = new MeuCarregado(null, false, this.sharedDataService.usuarioLogado, null!, musicaCriada);
        await firstValueFrom(
          this.meuCarregadoService.saveMeuCarregado(meuCarregado)
        );

      } else {

        const grupo = (this.isModalAlbumAberto) ? this.conjuntoGruposUsuario.find(g => g.id == 1) : this.sharedDataService.grupoActual;

        //Guardar a música no conteúdo do grupo
        const conteudoGrupo = new ConteudoGrupo(null, grupo!, null, musicaCriada, this.sharedDataService.usuarioLogado);
        await firstValueFrom(
          this.conteudoGrupoService.saveConteudoGrupo(conteudoGrupo)
        );

        //Salvar nos meus carregados
        const meuCarregado = new MeuCarregado(null, true, this.sharedDataService.usuarioLogado, null!, musicaCriada);
        await firstValueFrom(
          this.meuCarregadoService.saveMeuCarregado(meuCarregado)
        );

      }

      this.toast.success('Música criada com sucesso!', 'Sucesso!');
      this.fecharModalAdicionarMusica();
      this.carregarConteudosGrupoPendentes = (!salvarMidiasCarregadas && !this.isModalAlbumAberto) ? true : false;
      this.carregarItens();

    } catch (err) {
      console.error(err);
      this.toast.error('Erro ao criar música!', 'Erro!');
    }
  }

  private formatarTempoM(segundos: number): string {
    const min = Math.floor(segundos / 60)
      .toString()
      .padStart(2, '0');
    const seg = Math.floor(segundos % 60)
      .toString()
      .padStart(2, '0');
    return `00:${min}:${seg}`;
  }


  async salvarNovoVideo(salvarMidiasCarregadas: boolean) {

    if (!this.novoTituloVideo || this.novoTituloVideo.trim() === '') {
      this.toast.warning('Preencha o título do vídeo!', 'Atenção!');
      return;
    }

    if (!this.novoAutorVideo || this.novoAutorVideo.trim() === '') {
      this.toast.warning('Preencha o autor do vídeo!', 'Atenção!');
      return;
    }

    if (!this.novaDescricaoVideo || this.novaDescricaoVideo.trim() === '') {
      this.toast.warning('Preencha a descrição do vídeo!', 'Atenção!');
      return;
    }

    if (!this.novaDataLancamentoVideo) {
      this.toast.warning('Selecione a data de lançamento!', 'Atenção!');
      return;
    }

    if (!this.novaCategoriaSelecionadaVideo) {
      this.toast.warning('Selecione uma categoria!', 'Atenção!');
      return;
    }

    if (!this.novoVideoFile) {
      this.toast.warning('Selecione o arquivo do vídeo!', 'Atenção!');
      return;
    }

    this.toast.warning('Aguarde um Momento ...', 'Atenção!');

    try {

      // Upload do vídeo
      const caminhoFicheiro: string = await firstValueFrom(
        this.ficheiroService.uploadFicheiro(this.novoVideoFile, 'video')
      );

      // Upload da capa do vídeo
      let caminhoCapa = "";
      if (this.novaCapaVideo) {
        caminhoCapa = await firstValueFrom(
          this.uploadService.uploadImagem(this.novaCapaVideo)
        );
      } else {
        caminhoCapa = "/files/imagens/videodefault.jpg";
      }


      // Criar elemento de vídeo temporário
      const videoTemp = document.createElement('video');
      videoTemp.src = URL.createObjectURL(this.novoVideoFile);

      // Aguardar carregamento dos metadados (inclui duração)
      await new Promise((resolve) => {
        videoTemp.addEventListener('loadedmetadata', resolve);
      });

      const duracao = this.formatarTempoM(videoTemp.duration); // mesmo formatador

      // Monta o vídeo
      const video = new Video(
        null,
        this.novoTituloVideo,
        this.novaDescricaoVideo,
        duracao,
        this.novoVideoFile.name.split('.').pop()?.toLowerCase()!, // formato (ex: "mp3")
        Math.round(this.novoVideoFile.size / (1024 * 1024)), // tamanho em MB aproximado
        this.novaDataLancamentoVideo,
        this.novoAutorVideo,
        caminhoFicheiro,
        caminhoCapa,
        null, // pode ser null
        this.novaCategoriaSelecionadaVideo
      );

      // Salvar no backend
      const videoCriado = await firstValueFrom(
        this.videoService.saveVideo(video)
      );

      if (salvarMidiasCarregadas) {

        //Salvar nos meus carregados
        const meuCarregado = new MeuCarregado(null, false, this.sharedDataService.usuarioLogado, videoCriado, null!);
        await firstValueFrom(
          this.meuCarregadoService.saveMeuCarregado(meuCarregado)
        );

      } else {
        //Guardar a música no conteúdo do grupo
        const conteudoGrupo = new ConteudoGrupo(null, this.sharedDataService.grupoActual, videoCriado, null, this.sharedDataService.usuarioLogado);
        await firstValueFrom(
          this.conteudoGrupoService.saveConteudoGrupo(conteudoGrupo)
        );

        //Salvar nos meus carregados
        const meuCarregado = new MeuCarregado(null, true, this.sharedDataService.usuarioLogado, videoCriado, null!);
        await firstValueFrom(
          this.meuCarregadoService.saveMeuCarregado(meuCarregado)
        );
      }

      this.toast.success('Vídeo criada com sucesso!', 'Sucesso!');
      this.fecharModalAdicionarVideo();
      this.carregarConteudosGrupoPendentes = (!salvarMidiasCarregadas) ? true : false;
      this.carregarItens();

    } catch (err) {
      console.error(err);
      this.toast.error('Erro ao criar vídeo!', 'Erro!');
    }
  }

  async salvarNovoAlbum() {

    if (!this.novoTituloAlbum || this.novoTituloAlbum.trim() === '') {
      this.toast.warning('Preencha o título do álbum!', 'Atenção!');
      return;
    }

    if (!this.novaDescricaoAlbum || this.novaDescricaoAlbum.trim() === '') {
      this.toast.warning('Preencha a descrição do álbum!', 'Atenção!');
      return;
    }

    if (!this.novaDataLancamentoAlbum) {
      this.toast.warning('Selecione a data de lançamento!', 'Atenção!');
      return;
    }

    // Upload da capa da música
    let caminhoCapa = "";
    if (this.novaCapaAlbum) {
      caminhoCapa = await firstValueFrom(
        this.uploadService.uploadImagem(this.novaCapaAlbum)
      );
    } else {
      caminhoCapa = "/files/imagens/musicadefault.jpg";
    }

    const novoAlbum = new Album(
      null,
      this.novoTituloAlbum,
      this.novaDescricaoAlbum,
      this.novaDataLancamentoAlbum,
      caminhoCapa,
      this.sharedDataService.usuarioLogado
    );

    // Salvar no backend
    const albumCriado = await firstValueFrom(
      this.albumService.createAlbum(novoAlbum)
    );

    this.conjuntoArtistasSelecionados.forEach(artista => {
      const albumArtista = new AlbumArtista(null, albumCriado, artista);
      this.albumArtistaService.saveAlbumArtista(albumArtista).subscribe();
    });

    this.conjuntoMusicasSelecionadas.forEach(musica => {
      musica.album = albumCriado;
      this.musicaService.createMusica(musica).subscribe();
    });

    this.toast.success('Álbum adicionado com sucesso!', 'Sucesso!');
    this.fecharModalAdicionarAlbum();
    this.carregarItens();
  }

  async salvarNovoArtista() {

    if (this.novoArtista.nome == "") {
      this.toast.warning('Selecione um nome ao artista', 'Atenção!', {
        closeButton: true,
      });
      return;
    }

    if (this.novoArtista.biografia == "") {
      this.toast.warning('Selecione uma biografia ao artista', 'Atenção!', {
        closeButton: true,
      });
      return;
    }

    if (!this.fotoSelecionada) {
      this.toast.warning('Selecione uma foto.', 'Atenção!', {
        closeButton: true,
      });
      return;
    }

    this.uploadService.uploadImagem(this.fotoSelecionada).subscribe({
      next: (caminhoFoto) => {

        this.novoArtista.caminhoFoto = caminhoFoto;

        this.artistaService.createArtista(this.novoArtista).subscribe({
          next: (artistaCriado) => {
            this.toast.success('Artista adicionado com sucesso!', 'Sucesso!', {
              closeButton: true,
            });
            this.fecharModalAdicionarArtista();
            this.carregarItens(); // recarrega lista
          },
          error: () => {
            this.toast.error('Erro ao salvar artista.', 'Erro!', {
              closeButton: true,
            });
          },
        });
      },
      error: () => {
        this.toast.error('Erro ao fazer upload da imagem.', 'Erro!', {
          closeButton: true,
        });
      },
    });
    this.carregarAlbunsEArtistas();
  }

  async salvarNovoGrupo() {

    if (this.novoGrupo.nome == "") {
      this.toast.warning('Selecione um nome ao grupo', 'Atenção!', {
        closeButton: true,
      });
      return;
    }

    if (this.novoGrupo.descricao == "") {
      this.toast.warning('Selecione uma descrição ao grupo', 'Atenção!', {
        closeButton: true,
      });
      return;
    }

    this.novoGrupo.dataCriacao = new Date().toISOString().split('T')[0];
    this.novoGrupo.utilizador = this.sharedDataService.usuarioLogado;
    this.novoGrupo.publico = (this.tipoGrupo == "publico") ? true : false;

    try {

      const grupoCriado = await firstValueFrom(
        this.grupoService.saveGrupo(this.novoGrupo)
      );

      await firstValueFrom(
        this.membroGrupoService.saveMembroGrupo(new MembroGrupo(null, 3, 1, grupoCriado, this.sharedDataService.usuarioLogado))
      );

      this.toast.success('Grupo adicionado com sucesso!', 'Sucesso!');
      this.fecharModalAdicionarGrupo();
      this.carregarItens();

    } catch (err) {
      console.error(err);
      this.toast.error('Erro ao criar grupo!', 'Erro!');
    }

  }



  async salvarNovaPlaylist() {

    if (this.novaPlaylist.titulo == "") {
      this.toast.warning('Selecione um nome à playlist', 'Atenção!', {
        closeButton: true,
      });
      return;
    }

    this.novaPlaylist.dataCriacao = new Date().toISOString().split('T')[0];
    this.novaPlaylist.utilizador = this.sharedDataService.usuarioLogado;
    this.novaPlaylist.privada = true;

    try {

      const playlistCriada = await firstValueFrom(
        this.playlistService.createPlaylist(this.novaPlaylist)
      );

      this.toast.success('Playlist adicionada com sucesso!', 'Sucesso!');
      this.fecharModalAdicionarPlaylist();
      this.carregarItens();

    } catch (err) {
      console.error(err);
      this.toast.error('Erro ao criar playlist!', 'Erro!');
    }

  }


  async editarNovoAlbum() {

    if (!this.novoTituloAlbum || this.novoTituloAlbum.trim() === '') {
      this.toast.warning('Preencha o título do álbum!', 'Atenção!');
      return;
    }

    if (!this.novaDescricaoAlbum || this.novaDescricaoAlbum.trim() === '') {
      this.toast.warning('Preencha a descrição do álbum!', 'Atenção!');
      return;
    }

    if (!this.novaDataLancamentoAlbum) {
      this.toast.warning('Selecione a data de lançamento!', 'Atenção!');
      return;
    }

    // Upload da capa da música
    let caminhoCapa = this.sharedDataService.albumActual.caminhoFoto;
    if (this.novaCapaAlbum) {
      caminhoCapa = await firstValueFrom(
        this.uploadService.uploadImagem(this.novaCapaAlbum, true, caminhoCapa)
      );
    }

    this.sharedDataService.albumActual.titulo = this.novoTituloAlbum;
    this.sharedDataService.albumActual.dataLancamento = this.novaDataLancamentoAlbum;
    this.sharedDataService.albumActual.descricao = this.novaDescricaoAlbum;
    this.sharedDataService.albumActual.caminhoFoto = caminhoCapa;

    // Salvar no backend
    await firstValueFrom(
      this.albumService.createAlbum(this.sharedDataService.albumActual)
    );

    this.toast.success('Álbum editado com sucesso!', 'Sucesso!', {
      closeButton: true,
    });

    this.fecharModalEditarAlbum();
    this.carregarItens(); // recarrega lista
  }


  async editarNovaMusica() {

    if (!this.novoTituloMusica || this.novoTituloMusica.trim() === '') {
      this.toast.warning('Preencha o título da música!', 'Atenção!');
      return;
    }

    if (!this.novaLetraMusica || this.novaLetraMusica.trim() === '') {
      this.toast.warning('Preencha a letra da música!', 'Atenção!');
      return;
    }

    if (!this.novaDataLancamentoMusica) {
      this.toast.warning('Selecione a data de lançamento!', 'Atenção!');
      return;
    }

    if (!this.novaCategoriaSelecionadaMusica) {
      this.toast.warning('Selecione uma categoria!', 'Atenção!');
      return;
    }

    // Upload da capa da música
    let caminhoCapa = this.sharedDataService.musicaActualEditarMusica.caminhoFoto;
    if (this.novaCapaMusica) {
      caminhoCapa = await firstValueFrom(
        this.uploadService.uploadImagem(this.novaCapaMusica, true, caminhoCapa)
      );
    }

    // Upload da letra
    let caminhoLetra = this.sharedDataService.musicaActualEditarMusica.letra;
    caminhoLetra = await firstValueFrom(
      this.uploadService.uploadLetra(this.novoTituloMusica, this.novaLetraMusica, true, caminhoLetra)
    );

    this.sharedDataService.musicaActualEditarMusica.titulo = this.novoTituloMusica;
    this.sharedDataService.musicaActualEditarMusica.dataLancamento = this.novaDataLancamentoMusica;
    this.sharedDataService.musicaActualEditarMusica.letra = caminhoLetra;
    this.sharedDataService.musicaActualEditarMusica.caminhoFoto = caminhoCapa;
    this.sharedDataService.musicaActualEditarMusica.categoria = this.novaCategoriaSelecionadaMusica;

    // Salvar no backend
    await firstValueFrom(
      this.musicaService.createMusica(this.sharedDataService.musicaActualEditarMusica)
    );

    this.toast.success('Música editada com sucesso!', 'Sucesso!', {
      closeButton: true,
    });

    this.fecharModalEditarMusica();
    this.carregarItens(); // recarrega lista
  }


  async editarNovoVideo() {

    if (!this.novoTituloVideo || this.novoTituloVideo.trim() === '') {
      this.toast.warning('Preencha o título do vídeo!', 'Atenção!');
      return;
    }

    if (!this.novoAutorVideo || this.novoAutorVideo.trim() === '') {
      this.toast.warning('Preencha o autor do vídeo!', 'Atenção!');
      return;
    }

    if (!this.novaDescricaoVideo || this.novaDescricaoVideo.trim() === '') {
      this.toast.warning('Preencha a descrição do vídeo!', 'Atenção!');
      return;
    }

    if (!this.novaDataLancamentoVideo) {
      this.toast.warning('Selecione a data de lançamento!', 'Atenção!');
      return;
    }

    if (!this.novaCategoriaSelecionadaVideo) {
      this.toast.warning('Selecione uma categoria!', 'Atenção!');
      return;
    }

    // Upload da capa do vídeo
    let caminhoCapa = this.sharedDataService.videoActual.caminhoFoto;
    if (this.novaCapaVideo) {
      caminhoCapa = await firstValueFrom(
        this.uploadService.uploadImagem(this.novaCapaVideo, true, caminhoCapa)
      );
    }

    this.sharedDataService.videoActual.titulo = this.novoTituloVideo;
    this.sharedDataService.videoActual.dataLancamento = this.novaDataLancamentoVideo;
    this.sharedDataService.videoActual.autor = this.novoAutorVideo;
    this.sharedDataService.videoActual.descricao = this.novaDescricaoVideo;
    this.sharedDataService.videoActual.caminhoFoto = caminhoCapa;
    this.sharedDataService.videoActual.categoria = this.novaCategoriaSelecionadaVideo;

    // Salvar no backend
    await firstValueFrom(
      this.videoService.saveVideo(this.sharedDataService.videoActual)
    );

    this.toast.success('Vídeo editado com sucesso!', 'Sucesso!', {
      closeButton: true,
    });

    this.fecharModalEditarVideo();
    this.carregarItens(); // recarrega lista
  }


  async editarNovoArtista() {

    if (!this.novoNomeArtista || this.novoNomeArtista.trim() === '') {
      this.toast.warning('Preencha o nome do artista!', 'Atenção!');
      return;
    }

    if (!this.novaBiografia || this.novaBiografia.trim() === '') {
      this.toast.warning('Preencha a biografia do artista!', 'Atenção!');
      return;
    }

    this.sharedDataService.artistaActual.nome = this.novoNomeArtista;
    this.sharedDataService.artistaActual.biografia = this.novaBiografia;

    // Salvar no backend
    await firstValueFrom(
      this.artistaService.createArtista(this.sharedDataService.artistaActual)
    );


    this.toast.success('Artista editado com sucesso!', 'Sucesso!', {
      closeButton: true,
    });

    this.fecharModalEditarArtista();
    this.carregarItens(); // recarrega lista

  }



  async solicitarAdesaoGrupo() {

    await firstValueFrom(
      this.membroGrupoService.saveMembroGrupo(new MembroGrupo(null, 1, 2, this.sharedDataService.grupoActual, this.sharedDataService.usuarioLogado))
    );

    this.toast.success('Pedido de adesão enviado!', 'Sucesso!', {
      closeButton: true,
    });
    this.carregarItens();

  }

  async removerSolicitarAdesaoGrupo() {

    const membroGrupo = this.pegarMembrosGrupoDeUmGrupo(this.sharedDataService.grupoActual, this.conjuntoGruposSistema, this.conjuntoUsuariosPendentesGrupos).find(mG => mG.utilizador.id == this.sharedDataService.usuarioLogado.id);

    await firstValueFrom(
      this.membroGrupoService.deleteMembroGrupo(membroGrupo!)
    );

    this.toast.success('Pedido de adesão removido!', 'Sucesso!', {
      closeButton: true,
    });

    this.carregarItens();
  }

  async aceitarSolicitacaoGrupo(membroGrupo: MembroGrupo) {

    membroGrupo.estado = 1;

    await firstValueFrom(
      this.membroGrupoService.saveMembroGrupo(membroGrupo)
    );

    this.notificacaoService.criarNotificacao("O seu pedido de entrada ao grupo " + this.sharedDataService.grupoActual.nome + " foi aceite", membroGrupo.utilizador.id!).subscribe();

    this.toast.success('Pedido de adesão aceite!', 'Sucesso!', {
      closeButton: true,
    });

    this.carregarVisualizacaoGrupoPendente = true;
    this.carregarItens();

  }

  async rejeitarSolicitacaoGrupo(membroGrupo: MembroGrupo) {

    await firstValueFrom(
      this.membroGrupoService.deleteMembroGrupo(membroGrupo!)
    );

    this.notificacaoService.criarNotificacao("O seu pedido de entrada ao grupo " + this.sharedDataService.grupoActual.nome + " foi rejeitado", membroGrupo.utilizador.id!).subscribe();

    this.toast.success('Pedido de adesão não aceite!', 'Sucesso!', {
      closeButton: true,
    });

    this.carregarVisualizacaoGrupoPendente = true;
    this.carregarItens();

  }

  async promoverUsuario(membroGrupo: MembroGrupo, tipo: "normal" | "owner" | "editor") {

    membroGrupo.papel = (tipo == "owner") ? 3 : (tipo == "normal") ? 1 : 2;

    await firstValueFrom(
      this.membroGrupoService.saveMembroGrupo(membroGrupo)
    );

    this.notificacaoService.criarNotificacao("Foi promovido a " + tipo + " por " + this.sharedDataService.usuarioLogado.username, membroGrupo.utilizador.id!).subscribe();

    this.toast.success('Usuário promovido a ' + tipo + ' com sucesso!', 'Sucesso!', {
      closeButton: true,
    });

    this.carregarVisualizacaoGrupoPendente = true;
    this.carregarItens();

  }

  async salvarUsuariosAoGrupo() {

    if (this.conjuntoUsuariosSelecionados.length === 0) {
      this.toast.warning('Adicione pelo menos um usuário ao grupo!', 'Atenção!');
      return;
    }

    for (const usuario of this.conjuntoUsuariosSelecionados) {

      const jaTemPedidoNoGrupo = this.verificarSeUsuarioTemPedidoPendenteGrupo(this.sharedDataService.grupoActual.id, usuario);

      if (jaTemPedidoNoGrupo) {
        jaTemPedidoNoGrupo.estado = 1;
      }

      this.notificacaoService.criarNotificacao("Agora faz parte do grupo: " + this.sharedDataService.grupoActual.nome + " , foi adicionado por: " + this.sharedDataService.usuarioLogado.username, usuario.id!).subscribe();

      await firstValueFrom(
        this.membroGrupoService.saveMembroGrupo((jaTemPedidoNoGrupo) ? jaTemPedidoNoGrupo : new MembroGrupo(null, 1, 1, this.sharedDataService.grupoActual, usuario))
      );
    }

    this.toast.success('Utilizadores adicionados ao grupo com sucesso!', 'Sucesso!');
    this.fecharModalAdicionarUsuarioGrupo();
    this.carregarVisualizacaoGrupoPendente = true;
    this.carregarItens();
  }

  async salvarMusicasAPlaylist() {

    if (this.conjuntoMusicasSelecionadasParaPlaylist.length === 0) {
      this.toast.warning('Adicione pelo menos uma música à playlist!', 'Atenção!');
      return;
    }

    for (const musica of this.conjuntoMusicasSelecionadasParaPlaylist) {

      await firstValueFrom(
        this.playlistMusicaService.createPlaylistMusica(new PlaylistMusica(null, musica, this.sharedDataService.playlistActual))
      );
    }

    this.toast.success('Músicas adicionadas à playlist com sucesso!', 'Sucesso!');
    this.fecharModalAdicionarMusicaPlaylist();
    this.carregarVisualizacaoPlaylistPendente = true;
    this.carregarItens();

  }

  async tornarPlaylistPrivadaPublica() {

    this.sharedDataService.playlistActual.privada = !this.sharedDataService.playlistActual.privada;

    await firstValueFrom(
      this.playlistService.createPlaylist(this.sharedDataService.playlistActual)
    );

    this.toast.success('Visibilidade alterada com sucesso!', 'Sucesso!');
    this.carregarItens();
  }

  async compartilharMidiasUsuario() {

    if (this.conjuntoUsuariosSelecionadosCompartilhar.length === 0) {
      this.toast.warning('Adicione pelo menos um usuário para compartilhar as suas mídias!', 'Atenção!');
      return;
    }

    for (const usuario of this.conjuntoUsuariosSelecionadosCompartilhar) {

      await firstValueFrom(
        this.privilegioEditorService.savePrivilegioEditor(new PrivilegioEditor(null, this.sharedDataService.usuarioLogado, usuario))
      );

      this.notificacaoService.criarNotificacao(this.sharedDataService.usuarioLogado.username + " compartilhou as suas mídias consigo", usuario.id!).subscribe();

    }

    this.toast.success('Minhas mídias compartilhadas com sucesso!', 'Sucesso!');
    this.fecharModalCompartilharMidiasUsuario();
    this.carregarItens();
  }


  baixar(musicaVideo: Musica | Video) {

    this.ficheiroService.baixarFicheiroOriginal(musicaVideo.caminhoFicheiro, musicaVideo.formato).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = musicaVideo.titulo + "." + musicaVideo.formato; // ou pode pegar dinamicamente
      a.click();
      window.URL.revokeObjectURL(url);
    });

  }

  async pararPartilharMidias(usuario: Utilizador) {

    await firstValueFrom(
      this.privilegioEditorService.deleteByConcedenteAndBeneficiario(this.sharedDataService.usuarioLogado.id!, usuario.id!)
    );

    this.notificacaoService.criarNotificacao(this.sharedDataService.usuarioLogado.username + " parou de partilhar as suas mídias consigo", usuario.id!).subscribe();

    this.toast.success('Parou de partilhar as mídias!', 'Sucesso!');
    this.carregarItens();

  }


  voltarPaginaLogin() {
    this.router.navigate(['/pagina-login-registo']);
  }


  //-------------------------------------------------------------------------------------------------------------

  mediaRecorder!: RecordRTCPromisesHandler;
  stream!: MediaStream;
  isRecording = false;
  screenInterval: any;


  iniciarLive() {
    this.startRecordingLoop();
  }


  async startRecordingLoop() {

    if (this.isRecording) return;
    this.isRecording = true;

    const stream = await this.getScreenStream();

    this.mediaRecorder = new RecordRTCPromisesHandler(stream, {
      type: 'video',
      mimeType: 'video/webm',
      disableLogs: true
    });

    await this.mediaRecorder.startRecording();

    setTimeout(async () => {
      await this.mediaRecorder.stopRecording();
      this.isRecording = false;

      const blob = await this.mediaRecorder.getBlob();

      if (blob) {
        this.enviarSegmento(blob);
      }

      this.startRecordingLoop(); // reinicia o ciclo
    }, 2000); // 20 segundos
  }


  async getScreenStream(): Promise<MediaStream> {
    if (!this.stream) {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      this.cameraLive.nativeElement.srcObject = this.stream;
    }
    return this.stream;
  }


  enviarSegmento(blob: Blob) {
    const formData = new FormData();
    formData.append('segment', blob, 'segment.webm');

    fetch("http://localhost:8080/uploadBlobLiveStream", {
      method: 'POST',
      body: formData
    }).catch(err => {
      console.error('Erro ao enviar segmento:', err);
    });
  }

  /*const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  this.cameraLive.nativeElement.srcObject = stream;

  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'video/webm; codecs=vp8,opus'
  });

  const socket = new WebSocket(`ws://${this.sharedDataService.ipServidor}:8080/live/stream`);

  socket.onopen = () => {
    console.log('WebSocket aberto!');

    // Só inicia o MediaRecorder quando o WebSocket estiver pronto
    try {
      mediaRecorder.start(4000); // grava segmentos de 1s
      console.log('MediaRecorder iniciado');
    } catch (err) {
      console.error('Erro ao iniciar MediaRecorder:', err);
    }
  };

  socket.onerror = (error) => {
    console.error('Erro no WebSocket:', error);
  };

  socket.onclose = () => {
    console.warn('WebSocket fechado');
    if (mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
  };

  mediaRecorder.ondataavailable = (event) => {
    console.log('Bloco gerado:', event.data.size);
    if (event.data.size > 0 && socket.readyState === WebSocket.OPEN) {
      console.log('Enviando bloco para o servidor...');
      socket.send(event.data); // envia o Blob direto
    } else {
      console.log('Bloco não enviado - WebSocket fechado ou vazio');
    }
  };*/

  /*iniciarLive() {

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.stream = stream;
        this.cameraLive.nativeElement.srcObject = stream;
        // Inicializa o MediaRecorder com o codec adequado
        this.mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'video/webm; codecs=vp8,opus'
        });

        // Manipulador para dados gravados (chamado após requestData)
        this.mediaRecorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            this.enviarSegmento(event.data); // Envia o segmento para o backend
          }
        };

        // Inicia gravação contínua (sem tempo definido)
        this.mediaRecorder.start();

        // A cada 3 segundos, força o envio de um segmento com cabeçalho válido
        this.segmentInterval = setInterval(() => {
          this.mediaRecorder.requestData();
        }, 20000);

        this.emGravacao = true;

        // Começar a tocar a live com atraso (consumidor)
        //this.carregarHLS();
      })
      .catch(err => console.error('Erro ao acessar a câmera: ', err));
  }
*/

}
