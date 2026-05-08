# Digital Asset Lending System — Frontend

A modern, dark futuristic enterprise dashboard built with React + Vite + Tailwind CSS.

## Tech Stack

- **React 18** + **Vite 5**
- **React Router DOM v6** — client-side routing
- **Axios** — HTTP client with JWT interceptor
- **Tailwind CSS 3** — utility-first styling
- **Context API** — auth & toast state

## Setup

```bash
# Install dependencies
npm install

# Start development server (connects to backend at localhost:9000)
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── context/
│   ├── AuthContext.jsx       # Auth state (login, logout, currentUser)
│   └── ToastContext.jsx      # Global toast notifications
├── services/
│   ├── api.js                # Axios instance + JWT interceptor
│   ├── authService.js        # /auth endpoints
│   ├── assetService.js       # /assets endpoints
│   └── lendingService.js     # /lendings endpoints
├── components/
│   ├── Layout.jsx            # App shell (sidebar + navbar)
│   ├── Sidebar.jsx           # Navigation sidebar
│   ├── Navbar.jsx            # Top bar
│   ├── ProtectedRoute.jsx    # Auth + role guard
│   ├── AssetCard.jsx         # Asset display card
│   ├── LendingTable.jsx      # Lending records table
│   ├── StatCard.jsx          # Dashboard stat card
│   └── Loader.jsx            # Loading spinner
└── pages/
    ├── LoginPage.jsx
    ├── RegisterPage.jsx
    ├── DashboardPage.jsx     # Role-adaptive dashboard
    ├── AssetsPage.jsx        # Browse & request assets
    ├── MyLendingsPage.jsx    # USER: personal lending history
    ├── RequestsPage.jsx      # MANAGER: approve/reject requests
    ├── AdminAssetsPage.jsx   # ADMIN: create assets
    └── AdminLendingsPage.jsx # ADMIN: all lending records
```

## Routes

| Path | Access | Description |
|------|--------|-------------|
| `/login` | Public | Login form |
| `/register` | Public | Registration form |
| `/dashboard` | All roles | Role-adaptive dashboard |
| `/assets` | All roles | Browse assets |
| `/my-lendings` | USER | Personal lending history |
| `/requests` | MANAGER | Approve/reject requests |
| `/admin/assets` | ADMIN | Create + manage assets |
| `/admin/lendings` | ADMIN | View all lending records |

## Backend URL

Set in `src/services/api.js`:
```js
baseURL: "http://localhost:9000"
```
