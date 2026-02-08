# SimpleTaskManager

A simple task manager application with a React frontend and .NET backend.

## Quick Start

1. Make sure you have [Docker](https://www.docker.com/get-started) installed and running.

2. Open a terminal in the project root directory (where `docker-compose.yaml` is located).

3. Make sure the following ports are free before starting:
   - **33000** (Frontend)
   - **55000** (Backend API)
   - **1433** (SQL Server)

4. Run:
   ```bash
   docker-compose up
   ```

5. Wait for all services to start (this may take a few minutes on first run).
   
   > **Note:** If the backend container fails to start on the first attempt, simply restart it from Docker Desktop or run `docker-compose up` again.

6. Access the application at: **http://localhost:33000**

7. Login with the default credentials:
   - **Username:** `admin`
   - **Password:** `password`

## Services

| Service   | Port  | Description                |
|-----------|-------|----------------------------|
| Frontend  | 33000 | React web application      |
| Backend   | 55000 | .NET API                   |
| SQL Server| 1433  | Database                   |

## Stopping the Application

Press `Ctrl+C` in the terminal, or run:
```bash
docker-compose down
```

To remove all data and start fresh:
```bash
docker-compose down -v
```
