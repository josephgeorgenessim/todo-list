# 📋 Todo List Application

A modern, responsive todo list application built with React and Vite. This application provides a clean and intuitive interface for managing tasks with authentication, task categorization, and a beautiful UI powered by Tailwind CSS.

## ✨ Features

### 🔐 Authentication System
- **User Registration & Login**: Secure authentication with username/password
- **Protected Routes**: Dashboard access requires authentication
- **Session Management**: Persistent login state
- **Logout Functionality**: Secure logout with route redirection

### 📝 Task Management
- **Create Tasks**: Add new tasks with descriptions
- **Task Status**: Three status categories:
  - **Pending**: Active tasks to be completed
  - **Completed**: Finished tasks
  - **Archived**: Archived tasks for reference
- **Drag & Drop**: Intuitive task organization
- **Task Actions**: Edit, delete, and status updates

### 🎨 User Interface
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, professional interface using Tailwind CSS
- **Component-Based Architecture**: Reusable UI components
- **Toast Notifications**: User feedback for actions
- **Loading States**: Smooth user experience

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.1.0
- **Build Tool**: Vite 6.3.5
- **Routing**: React Router DOM 7.6.1
- **Styling**: Tailwind CSS 3.3.0
- **UI Components**: Radix UI (Dialog, Dropdown, Toast, Slot)
- **Icons**: Lucide React
- **State Management**: React Context API
- **Code Quality**: ESLint with React Hooks plugin

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-list
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
todo-list/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Column.jsx
│   │   ├── TaskCard.tsx
│   │   └── TaskForm.jsx
│   ├── contexts/          # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── TaskContext.jsx
│   ├── data/             # JSON data files
│   │   ├── DataToDoList.json
│   │   └── DataUser.json
│   ├── pages/            # Application pages
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## 🔧 Configuration

### Default User Credentials
The application comes with a default admin user:
- **Username**: `admin`
- **Password**: `admin`

### Data Storage
- User data is stored in `src/data/DataUser.json`
- Task data is stored in `src/data/DataToDoList.json`
- Data persists during the session

## 🎯 Key Features Explained

### Authentication Flow
1. Users can register new accounts or login with existing credentials
2. Authentication state is managed through React Context
3. Protected routes redirect unauthenticated users to login
4. Logout clears authentication state and redirects to login

### Task Management System
1. **Task Creation**: Users can add new tasks with descriptions
2. **Status Management**: Tasks can be moved between pending, completed, and archived
3. **Task Organization**: Visual column-based layout for different task statuses
4. **Task Actions**: Edit, delete, and status change functionality

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Responsive grid layout that adapts to screen size
- Touch-friendly interface for mobile devices
- Consistent design across all devices

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build output will be in the `dist` folder, ready for deployment to any static hosting service.

### Recommended Hosting Platforms
- **Vercel**: Optimized for React applications
- **Netlify**: Easy deployment with Git integration
- **GitHub Pages**: Free hosting for open-source projects
- **Firebase Hosting**: Google's hosting solution

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- UI Components from [Radix UI](https://www.radix-ui.com/)

---

**Happy Task Management! 🎉**
