# Flexternship Todo Application

## Project Title & Description
The **Flexternship Todo Application** is a full-stack task management application designed to help users organize their daily tasks efficiently. It includes features like adding, editing, deleting, and marking tasks as completed, ensuring better productivity and time management. The backend is built using **ASP.NET Core** with **Entity Framework**, while the frontend is developed using **Next.js** for a responsive and interactive user interface.

---

## Installation Instructions

### Backend Setup (TodoApi)
1. Clone the repository:
    ```bash
    git clone https://github.com/gh-kaja-kumar/todo_Kaja.git
    ```
2. Navigate to the backend directory:
    ```bash
    cd todo_Kaja/Todo.Backend
    ```
3. Restore NuGet packages:
    ```bash
    dotnet restore
    ```
4. Apply migrations and seed data:
    ```bash
    dotnet ef database update
    ```
5. Run the backend server:
    ```bash
    dotnet run
    ```
    The backend will be available at `http://localhost:5025` (change the port if yours is different).

---

### Frontend Setup (todo-frontend)
1. Navigate to the frontend directory(Open new terminal):
    ```bash
    cd todo_Kaja/Tod
    ```
2. Copy the `.env.example` file to `.env.local`:
    ```bash
    cp .env.example .env.local
    ```
3. Open the `.env.local` file and ensure the `NEXT_PUBLIC_API_BASE_URL` is set to your backend's base URL:
    ```bash
    NEXT_PUBLIC_API_BASE_URL=http://localhost:5025/api
    ```
4. Install dependencies:
    ```bash
    npm install
    ```
5. Start the development server:
    ```bash
    npm run dev
    ```
    The frontend will be available at `http://localhost:3000`.

---

### Notes:
- **Environment Variables**:
  - The `.env.example` file contains a template for environment variables. Ensure you copy it to `.env.local` and update the values as needed.
- **Backend Port**:
  - If your backend runs on a different port, update the `NEXT_PUBLIC_API_BASE_URL` in the `.env.local` file accordingly.

---

## How to Run the Project

1. **Start the Backend Server**:
   - Open a new terminal and navigate to the backend directory:
     ```bash
     cd todo_Kaja/TodoApi
     ```
   - Run the backend server:
     ```bash
     dotnet run
     ```
   - The backend will be available at `http://localhost:5025`.

2. **Start the Frontend Server**:
   - Open another terminal and navigate to the frontend directory:
     ```bash
     cd todo_Kaja/todo-frontend
     ```
   - Ensure the `.env.local` file is properly configured:
     ```bash
     cp .env.example .env.local
     ```
     - Open `.env.local` and verify the `NEXT_PUBLIC_API_BASE_URL` is set to:
       ```bash
       NEXT_PUBLIC_API_BASE_URL=http://localhost:5025/api
       ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend server:
     ```bash
     npm run dev
     ```
   - The frontend will be available at `http://localhost:3000`.

3. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000` to interact with the application.

4. **Test the Application**:
   - Register a new user or log in with an existing account.
   - Add, edit, delete, and manage tasks.
   - If you are an admin, test admin-specific features like managing other users' tasks.
   - To test the admin portal, use the following credentials:
     - **Username**: `admin`
     - **Password**: `admin`
   - For backend testing through Swagger, navigate to:
     - [http://localhost:5025/swagger](http://localhost:5025/swagger)

---

## Features

1. **Add New Tasks**  
   Users can create tasks with title, description, due date, priority, and category.

2. **View Tasks**  
   Tasks are displayed in a user-friendly list with filtering and progress tracking.

3. **Edit & Delete Tasks**  
   Users can edit or delete their own tasks. Admins can manage all tasks.

4. **Mark Tasks as Completed**  
   Users can track task completion via checkboxes.

5. **Filter & Sort Tasks**  
   Filter tasks by:
   - **Status** (completed, incomplete, overdue)
   - **Priority** (Low, Normal, High)
   - **Category** (e.g., Work, Personal)  
   Tasks are also sorted by **Due Date** by default.

6. **Overdue Highlight**  
   Overdue tasks are visually marked with a red “Overdue” label for quick recognition.

7. **Prioritize Tasks**  
   Toggle between priority levels using the star icon.

8. **Multi-User Support**  
   Each user has their own tasks. JWT-based login ensures only authenticated users access their data.

9. **Admin Mode**  
   Admins can:
   - View all tasks 
   - View and manage tasks of any specific user via username or `/admin/{userId}`
   - Edit or delete any task (without restrictions)
   - Assign tasks to other users

10. **Authentication (JWT)**  
    Secure login and logout with JSON Web Tokens.

11. **Responsive UI**  
    Clean, mobile-friendly layout using Tailwind CSS.

12. **Persistent Storage**  
    All data is stored in a SQLite database using a .NET backend.

---

## Usage

Users can interact with the application by:

1. **Register**  
   New users can register by visiting the registration page before logging in.
   ![image](https://github.com/user-attachments/assets/39d30c7c-2b4d-4616-9599-7c1eb2a6f77c)

2. **Login**
    Log in to access your personalized task dashboard as Admin/User. Auth is handled via JWT.
    ![image](https://github.com/user-attachments/assets/9230393f-d63e-4936-a463-6cd3e8af6efa)

3. **View Tasks**  
   Your tasks are listed and sorted by due date with clear status and priority indicators.
   ![image](https://github.com/user-attachments/assets/926c60f4-f5aa-4399-8123-8f7adb2efd97)

5. **Create a Task**  
   Click on "+ Add New Task" and enter task details like title, due date, category, and priority.
   ![image](https://github.com/user-attachments/assets/906fbd6c-1a0d-4ce8-9d2c-dd48e919a0a8)

6. **Filter by Status, Category, or Priority**  
   Use the filter bar to quickly find tasks based on your preferences.
   ![image](https://github.com/user-attachments/assets/8cc6ec9c-cf81-4965-8258-3769b112169f)

8. **Track Completion**  
   Mark tasks as completed using the checkbox. Progress is displayed via a progress bar.

9. **Edit & Delete Tasks**  
   You can edit or delete your own tasks anytime. Admins can manage tasks for any user.

10. **Overdue Tasks**  
   Tasks past their due date are automatically labeled as **Overdue** for visibility.

11. **Admin Actions**  
   Admins can access `/admin/{userId}` or via username to manage another user’s tasks fully.
   ![image](https://github.com/user-attachments/assets/035a392d-0201-4135-a1f7-e088456949cf)

12. **Logout**  
   End your session securely using the logout button, which clears your token from local storage.

---

## Technologies Used

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: ASP.NET Core, Entity Framework Core
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens)

---

## How GitHub Copilot Was Used

GitHub Copilot was instrumental in the development process by:
- Auto-generating boilerplate code for controllers, models, and components.
- Suggesting efficient function implementations for task management and filtering.
- Improving code readability and naming conventions.
- Speeding up repetitive tasks like creating state management logic and API endpoints.

---

## Project Structure

### Backend (`TodoApi`)
```plaintext
TodoApi/
├── .github/                # GitHub workflows and configurations
├── Controllers/            # API controllers
│   ├── UsersController.cs  # Handles user-related endpoints
│   ├── TodoItemsController.cs # Handles task-related endpoints
│   ├── AdminController.cs  # Handles admin-specific endpoints
├── Data/                   # Database context and configurations
│   ├── TodoDbContext.cs    # Entity Framework database context
├── DTOs/                   # Data Transfer Objects
│   ├── RegisterDto.cs      # DTO for user registration
│   ├── LoginDto.cs         # DTO for user login
│   ├── TodoItemDto.cs      # DTO for task data
│   ├── AdminDto.cs         # DTO for admin-specific actions
├── Migrations/             # EF Core migrations
│   ├── SeededData.Designer.cs # Migration for seeded data
│   ├── InitWithRoles.cs    # Initial migration with roles
│   ├── TodoDbContextModelSnapshot.cs # Snapshot of the database schema
├── Models/                 # Database models
│   ├── AppUser.cs          # User model
│   ├── TodoItem.cs         # Task model
├── Services/               # Business logic services
│   ├── IUserService.cs     # Interface for user service
│   ├── UserService.cs      # Implementation of user service
│   ├── IAdminService.cs    # Interface for admin service
│   ├── AdminService.cs     # Implementation of admin service
├── Properties/             # Project properties
│   ├── launchSettings.json # Launch settings for development
├── appsettings.json        # Application settings
├── appsettings.Development.json # Development-specific settings
├── Program.cs              # Entry point for the backend application
├── TodoApi.csproj          # Project file for the backend
├── TodoApi.http            # HTTP file for testing API endpoints
├── todo.db                 # SQLite database file
```

### Frontend (`todo-frontend`)
```plaintext
todo-frontend/
├── .next/                  # Next.js build output
├── public/                 # Static assets
├── src/                    # Source code
│   ├── app/                # Application pages and components
│   │   ├── components/     # Reusable UI components
│   │   │   ├── TaskList.tsx # Component for displaying task lists
│   │   │   ├── TaskItem.tsx # Component for individual task items
│   │   ├── hooks/          # Custom React hooks
│   │   │   ├── useTasks.ts # Hook for fetching tasks
│   │   │   ├── types.ts    # Type definitions
│   │   ├── edit-task/      # Edit task page
│   │   │   ├── [id]/page.tsx # Dynamic route for editing tasks
│   │   ├── signup/         # Signup page
│   │   │   ├── page.tsx    # Signup form
│   │   ├── login/          # Login page
│   │   │   ├── page.tsx    # Login form
│   │   ├── admin/          # Admin pages
│   │   │   ├── assign-task/ # Assign task page
│   │   │   │   ├── page.tsx
│   │   │   ├── [userId]/   # Admin user-specific tasks
│   │   │   │   ├── page.tsx
│   │   │   ├── page.tsx    # Admin dashboard
│   ├── axiosConfig.ts      # Axios configuration for API requests
├── .env.example            # Example environment variables
├── .env.local              # Local environment variables
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript configuration
├── next.config.ts          # Next.js configuration
├── README.md               # Frontend-specific README
```

