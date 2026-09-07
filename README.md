# B3 Analytics Frontend

Frontend da plataforma B3 Analytics. Exige cadastro/login para acessar a plataforma; após autenticado, o usuário consulta o histórico de preços de ativos da B3 (com gráfico em tempo real para o dia atual) e conta com ações extras, como um botão de compra simulada.

Consome a [B3 Analytics API](https://github.com/Filipelevar/B3AnalyticsBackend).

## Stack

- React 19 + TypeScript
- Vite
- React Router DOM (roteamento)
- Styled Components (estilização)
- React Hook Form (formulários)
- Zustand com persistência (estado de autenticação)
- Axios (requisições HTTP)
- Recharts (gráfico de histórico de ativos)
- date-fns (formatação de datas)
- react-hot-toast (notificações)
- react-icons (ícones, ex.: exibir/ocultar senha)

## Como rodar

```bash
yarn install
yarn dev      # ambiente de desenvolvimento (http://localhost:5173)
```

A URL base da API é lida de `VITE_API_BASE_URL` (ver `src/services/api.ts`), com fallback para `http://localhost:3333`.

## Fluxo da aplicação

- **Login (`/login`) é sempre a porta de entrada**: deslogado, qualquer rota redireciona para lá. Cadastro (`/register`) fica ao lado, também acessível só deslogado. Após login, o JWT é salvo em `localStorage`, o usuário passa a ver seu nome/avatar na navbar e é redirecionado para o dashboard — se já estiver autenticado, `/login` e `/register` redirecionam direto para lá.
- **Dashboard / Consulta de ativos (`/market`)**: só acessível autenticado. O usuário digita um ou mais tickers (`PETR4,VALE3`) e visualiza o histórico em um gráfico, com o botão de compra simulada disponível. Por padrão busca o range `1D` (intradiário, atualizado a cada 5 minutos via polling); também é possível escolher `5D/1M/3M/6M/1A` ou um período customizado (`startDate`/`endDate`).
- **Perfil (`/profile`)**: também só acessível autenticado; mostra nome, e-mail e senha mascarada do usuário. A senha nunca é armazenada nem retornada pelo backend, então não há valor real para exibir.

## Organização de pastas

```
src/
├── App.tsx              # composição raiz (Navbar + rotas)
├── main.tsx              # bootstrap (BrowserRouter, GlobalStyle)
├── routes/                # definição de rotas (AppRoutes)
├── pages/
│   └── core/
│       ├── auth-layout/   # estilos compartilhados entre login e cadastro
│       ├── login/
│       ├── register/
│       ├── profile/
│       └── market/        # consulta de ativos + gráfico (index, styles, utils)
├── components/            # componentes reutilizáveis de UI
│   ├── navbar/
│   ├── auth-dropdown/     # menu de conta (entrar/cadastrar ou perfil/sair)
│   ├── user-avatar/       # avatar circular com iniciais
│   ├── buttons/
│   └── inputs/
├── globals/               # design tokens e estilos base (theme, grid, buttons, forms, styles)
├── hooks/                 # hooks de domínio (ex.: useAuth)
├── stores/                # estado global com Zustand (auth-store)
├── services/              # camada de API (api.ts + um *.service.ts por domínio)
└── types/                 # DTOs e tipos compartilhados (um *Types.ts por domínio)
```

### Padrões adotados

- **Services por domínio**: `auth.service.ts`, `market.service.ts`, `health.service.ts` — cada um expõe funções finas que apenas chamam a API tipada (`AUTH_TOKEN_KEY`, interceptor de `Authorization`, `baseURL` centralizados em `services/api.ts`).
- **Tipos por domínio**: `AuthTypes.ts`, `MarketTypes.ts`, `HealthTypes.ts` — DTOs espelham exatamente o contrato do backend.
- **Componentes com pasta própria**: cada componente/página tem `index.tsx` (lógica/JSX) e `styles.ts` (Styled Components) separados.
- **Estado mínimo**: apenas o necessário vive em store global (usuário autenticado). Estado local de formulário e UI fica em `useState`/React Hook Form.
- **Guard implícito por rota**: `routes/index.tsx` verifica o usuário do store diretamente em cada rota — sem sessão, `/market` e `/profile` redirecionam para `/login`; com sessão, `/login` e `/register` redirecionam para `/market`. Sem um componente de guarda genérico, já que a plataforma é pequena o suficiente para não precisar dessa camada extra.
