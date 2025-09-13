🌍 [Português](#-ispmedia--plataforma-digital-de-gestão-e-partilha-de-conteúdos-multimídia
) | 🌍 [English](#-ispmedia--digital-platform-for-multimedia-content-management-and-sharing
)

# 🎶 ISPMEDIA – Plataforma Digital de Gestão e Partilha de Conteúdos Multimídia

## 📋 Sobre o Projeto

O **ISPMEDIA** é uma aplicação desenvolvida em **Angular** (frontend) e **Spring Boot** (API backend), com **MySQL** como base de dados.
O sistema foi criado para **gerir e partilhar músicas e vídeos em streaming**, permitindo publicação, organização e interação através de grupos, playlists e álbuns.

O objetivo principal é praticar **operações CRUD**, **integração frontend-backend**, **gestão de permissões** e conceitos avançados de partilha de conteúdos multimídia.

---

## ✨ Funcionalidades

### 👥 Usuários

* Visualizar **artistas, álbuns e músicas** disponíveis na plataforma.
* Participar do grupo **default (Todos)**, onde todos os usuários estão incluídos e podem publicar músicas e vídeos.
* Criar **grupos** (públicos ou privados):

  * **Privado**: apenas o criador vê e pode convidar membros.
  * **Público**: todos podem ver e enviar pedidos de entrada.
* Dentro de um grupo existem 3 papéis:

  * **Owner (criador ou promovido)**: pode adicionar/remover pessoas, editar e remover mídias, promover membros.
  * **Editor**: pode adicionar e editar mídias, mas não gerenciar membros.
  * **Membro normal**: apenas visualiza mídias do grupo.
* O **grupo default (Todos)** é especial: qualquer usuário pode adicionar músicas ou vídeos lá.

---

### 🎵 Gestão de Mídias

* Aba **Mídias Carregadas**:

  * Adicionar músicas, vídeos ou álbuns.
  * Mídias carregadas inicialmente são **privadas** (só o dono vê).
  * É possível compartilhar com grupos (cria-se uma **cópia independente** da mídia).
  * Se criada diretamente dentro de um grupo, a mídia é **compartilhada** entre "Mídias Carregadas" e o grupo (edições refletem em ambos).
* Aba **Mídias Externas**:

  * Exibe mídias compartilhadas por outros usuários com você.
* **Álbuns**:

  * Criados a partir de músicas do grupo default.
  * Se faltar uma música, pode ser criada no momento.
  * Todos os álbuns fazem parte do **grupo default**.
* **Playlists**:

  * Podem ser públicas (todos visualizam) ou privadas (apenas o criador).
  * Só podem conter músicas do grupo default.

---

### 📂 Compartilhamento

* Botão **Compartilhar Mídias**: envia todas as mídias carregadas para outros usuários.
* O destinatário vê essas mídias em **Mídias Externas**.
* Alterações feitas nas mídias compartilhadas refletem automaticamente para ambos.

---

### 📻 Outras Funcionalidades

* Estações de rádio disponíveis para ouvir diretamente na plataforma.
* Gestão completa de:

  * Upload e download de arquivos multimídia.
  * Exclusão de mídias, álbuns, playlists e grupos (com regras de autorização).
  * Criação de artistas durante a publicação de músicas.

---

## 🔐 Regras de Segurança

* Apenas criadores podem eliminar **grupos** (se todo o conteúdo interno for removido antes).
* Apenas donos de mídias podem excluí-las (ou membros com permissão em grupos).
* Para **álbuns**, é necessário excluir as músicas internas antes da exclusão do álbum.

---

## 🛠️ Tecnologias Utilizadas

**Frontend**

* Angular 17
* HTML5, CSS3, TypeScript

**Backend**

* Spring Boot (Java)
* REST API Development
* WebSocket para interação em tempo real
* FFMPEG (processamento multimídia) – já integrado na API hospedada

**Base de Dados**

* MySQL (hospedado remotamente)

---

## 🚀 Como Executar o Projeto

### 🔽 Clonar o Repositório

```bash
git clone https://github.com/marcelo365/ISPMEDIA.git
cd ISPMEDIA
```

### 💻 Frontend

1. Entrar na pasta do frontend
2. Instalar dependências

   ```bash
   npm install
   ```
3. Rodar em modo de desenvolvimento

   ```bash
   ng serve -o
   ```
4. A aplicação estará disponível em:
   `http://localhost:4200`

⚠️ **Nota**: O backend já está hospedado e configurado.
Não é necessário instalar **FFMPEG** nem configurar o servidor manualmente.

---

## ⚠️ Observação

Este projeto foi desenvolvido inicialmente em **português** como prática.
Nos próximos projetos, a intenção é adotar **inglês como padrão** para melhor alinhamento com a comunidade global.

---

## 🔗 Links

* GitHub: [https://github.com/marcelo365/ISPMEDIA.git](https://github.com/marcelo365/ISPMEDIA.git)
* Projeto online: [https://isp-media-angular.vercel.app](https://isp-media-angular.vercel.app)

---

## 📄 Licença

Projeto desenvolvido para fins **acadêmicos e de portfólio**.

___________________________________________________________________________________________________________________________


# 🎶 ISPMEDIA – Digital Platform for Multimedia Content Management and Sharing

## 📋 About the Project

**ISPMEDIA** is an application developed with **Angular** (frontend) and **Spring Boot** (backend API), using **MySQL** as the database.
The system was created to **manage and share music and video streaming**, enabling publishing, organization, and interaction through groups, playlists, and albums.

The main goal is to practice **CRUD operations**, **frontend-backend integration**, **permission management**, and advanced concepts of multimedia content sharing.

---

## ✨ Features

### 👥 Users

* Browse available **artists, albums, and songs** on the platform.
* Join the **default group (Everyone)**, where all users are included and can publish music and videos.
* Create **groups** (public or private):

  * **Private**: only the creator can see it and invite members.
  * **Public**: everyone can see it and request to join.
* Inside a group, there are 3 roles:

  * **Owner (creator or promoted)**: can add/remove members, edit/remove media, and promote members.
  * **Editor**: can add and edit media, but cannot manage members.
  * **Regular member**: can only view group media.
* The **default group (Everyone)** is special: any user can add music or videos there.

---

### 🎵 Media Management

* **Uploaded Media** tab:

  * Add music, videos, or albums.
  * Uploaded media is initially **private** (visible only to the owner).
  * Media can be shared with groups (**independent copies** are created).
  * If created directly inside a group, media is **shared** between "Uploaded Media" and the group (edits reflect in both).
* **External Media** tab:

  * Shows media shared with you by other users.
* **Albums**:

  * Created from songs in the default group.
  * Missing songs can be created on the fly.
  * All albums belong to the **default group**.
* **Playlists**:

  * Can be public (visible to all) or private (only the creator).
  * Can only contain songs from the default group.

---

### 📂 Sharing

* **Share Media** button: sends all uploaded media to other users.
* Recipients see shared media under **External Media**.
* Any changes to shared media are automatically reflected for both users.

---

### 📻 Other Features

* Built-in radio stations available for listening directly on the platform.
* Full management of:

  * Upload and download of multimedia files.
  * Deletion of media, albums, playlists, and groups (with authorization rules).
  * Artist creation during music publishing.

---

## 🔐 Security Rules

* Only group creators can delete **groups** (and only if all internal content is removed first).
* Only media owners can delete their media (or members with proper permissions in groups).
* To delete an **album**, all internal songs must be deleted first.

---

## 🛠️ Technologies Used

**Frontend**

* Angular 17
* HTML5, CSS3, TypeScript

**Backend**

* Spring Boot (Java)
* REST API Development
* WebSocket for real-time interaction
* FFMPEG (multimedia processing) – already integrated into the hosted API

**Database**

* MySQL (hosted remotely)

---

## 🚀 How to Run the Project

### 🔽 Clone the Repository

```bash
git clone https://github.com/marcelo365/ISPMEDIA.git
cd ISPMEDIA
```

### 💻 Frontend

1. Go into the frontend folder
2. Install dependencies

   ```bash
   npm install
   ```
3. Run in development mode

   ```bash
   ng serve -o
   ```
4. The application will be available at:
   `http://localhost:4200`

⚠️ **Note**: The backend is already hosted and configured.
No need to install **FFMPEG** or manually configure the server.

---

## ⚠️ Notice

This project was initially developed in **Portuguese** as practice.
Future projects will adopt **English as the standard language** to align better with the global community.

---

## 🔗 Links

* GitHub: [https://github.com/marcelo365/ISPMEDIA.git](https://github.com/marcelo365/ISPMEDIA.git)
* Online project: [https://isp-media-angular.vercel.app](https://isp-media-angular.vercel.app)

---

## 📄 License

This project was developed for **academic and portfolio purposes**.
