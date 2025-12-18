# Locadora de Automóveis

[![Stack](https://skillicons.dev/icons?i=dotnet,cs,sqlserver,nodejs,typescript,angular&perline=8)](https://skillicons.dev)

## Projeto

Desenvolvido durante o curso Full-Stack da [Academia do Programador](https://www.academiadoprogramador.net) 2025.

## Descrição

Este projeto é um sistema completo de gerenciamento para uma locadora de automóveis. Ele permite o controle total sobre o ciclo de aluguel de veículos, desde o cadastro de funcionários e clientes até a gestão de planos de cobrança, taxas, serviços e a emissão de contratos de aluguel.

A solução foi construída seguindo os princípios da **Clean Architecture**, garantindo separação de responsabilidades, testabilidade e facilidade de manutenção.

## Funcionalidades e Módulos

O sistema conta com os seguintes módulos implementados:

1.  **Autenticação**: Gestão de usuários, cargos e controle de acesso via JWT.
2.  **Funcionários**: Cadastro e controle de colaboradores do sistema.
3.  **Grupos de Veículos**: Categorização de veículos por grupos e características.
4.  **Planos de Cobrança**: Configuração de preços por km controlado, km livre ou plano diário.
5.  **Veículos**: Gestão técnica e operacional da frota.
6.  **Clientes**: Cadastro de pessoas físicas e jurídicas.
7.  **Condutores**: Registro de motoristas vinculados aos clientes.
8.  **Taxas e Serviços**: Gerenciamento de custos adicionais fixos ou diários.
9.  **Aluguéis**: Processo de locação, incluindo seleção de plano, veículo, condutor e cálculo de valores.
10. **Parceiros**: Cadastro de parceiros para gestão de cupons e promoções.
11. **Configurações**: Parâmetros globais do sistema.

## Arquitetura

O projeto está dividido nas seguintes camadas:

- **Core.Dominio**: Contém as entidades de negócio, interfaces de repositório e regras fundamentais.
- **Core.Aplicacao**: Implementa os casos de uso do sistema e orquestra a lógica de negócio.
- **Infraestrutura.Orm**: Implementação dos repositórios utilizando Entity Framework Core e SQL Server.
- **WebApi**: Ponto de entrada da aplicação, expondo os recursos via REST.

## Requisitos para Execução

- **.NET SDK 9.0** ou superior.
- **SQL Server** (LocalDB ou instância completa).
- **Node.js v20+** e **Angular CLI** (para o front-end).

## Configuração de Variáveis de Ambiente

O funcionamento da API depende das seguintes configurações no `appsettings.json` ou `User Secrets`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=LocadoraDb;Trusted_Connection=True;MultipleActiveResultSets=true"
  },
  "Jwt": {
    "Key": "SuaChaveSecretaSuperProtegidaComPeloMenos32Caracteres",
    "Issuer": "locadora-api",
    "Audience": "locadora-client"
  }
}
```

## Executando o Back-End

Vá para a pasta do projeto da WebAPI:

```bash
cd server/web-api
```

Execute o projeto:

```bash
dotnet run
```

A API poderá ser acessada em `https://localhost:7043/swagger` (ou porta configurada em `launchSettings.json`).

## Executando o Front-End

Vá para a pasta do projeto Angular:

```bash
cd client
```

Instale as dependências e execute:

```bash
npm install
npm start
```

A aplicação Angular estará disponível no endereço `http://localhost:4200`.
