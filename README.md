# PHP Challenge

Este projeto é uma aplicação Laravel com React integrada através do Inertia.js. Siga as instruções abaixo para rodar o projeto localmente.

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Git](https://git-scm.com/)
- [PHP](https://www.php.net/manual/pt_BR/install.php) (versão 8.0 ou superior)
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) (versão 14.x ou superior)
- [NPM](https://www.npmjs.com/) (geralmente já vem com o Node.js)

## Instalação

1. **Clone o repositório**

   Abra seu terminal e execute o seguinte comando para clonar o repositório:

```
   git clone <URL_DO_REPOSITORIO>
```

Na pasta da aplicação rode os seguintes comandos:

Instalação das dependências do php
```
    composer install
```

Instalação das dependências do react
```
    npm install install
```

# Configuração de Ambiente

Configure o arquivo .env com as seguintes informações do banco

```
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=php_challenge
    DB_USERNAME=root
    DB_PASSWORD=root

```

Com um banco mysql previamente configurado na máquina, execute o seguinte comando para gerar as tabelas:

```
    php artisan migrate

```

Por fim, para rodar a aplicação basta executar:

```
    php artisan serve
    
```
