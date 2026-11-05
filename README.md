# Electrobox Web (ebox-react)

Web-Client für die DJ-Junkies-Sets. Gebaut mit [Vite](https://vite.dev), Paketverwaltung mit [bun](https://bun.sh).

## Befehle

| Befehl              | Zweck                                                                 |
|---------------------|-----------------------------------------------------------------------|
| `bun install`       | Abhängigkeiten installieren                                           |
| `bun run dev`       | Entwicklungsserver auf [http://localhost:3000](http://localhost:3000) |
| `bun run test`      | Tests mit Vitest im Watch-Modus (`bun run test --run` für einen Lauf) |
| `bun run typecheck` | TypeScript-Prüfung                                                    |
| `bun run build`     | Typprüfung und Produktions-Build nach `build/`                        |
| `bun run preview`   | Produktions-Build lokal ausliefern (mit Service Worker)               |

`bun test` (ohne `run`) startet den eingebauten Test-Runner von bun, nicht Vitest.

## Konfiguration

| Variable            | Vorgabe                     | Bedeutung                                         |
|---------------------|-----------------------------|---------------------------------------------------|
| `VITE_REST_API_URL` | `https://www.dj-junkies.de` | Backend, z. B. `https://test.dj-junkies.de`       |
| `VITE_GIT_SHA`      | `git describe --always`     | Versionsanzeige; im Docker-Build über `GIT_COMMIT` |

Die Variablen können als Umgebungsvariable oder in einer `.env.local` gesetzt werden.

Der Service Worker (`src/service-worker.ts`) wird nur im Produktions-Build registriert.

## Docker

```sh
docker build -t ebox-react --build-arg GIT_COMMIT=$(git rev-parse --short HEAD) .
```
