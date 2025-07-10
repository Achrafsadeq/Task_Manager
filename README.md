# Task Manager

A modern, responsive web application designed for efficient task and project management. Featuring a dark-themed interface with green accents, it offers robust task organization, data visualization, and team collaboration tools to streamline professional workflows.

## ⚙️ Tech Stack

| Technology   | Purpose                         |
|--------------|---------------------------------|
| Next.js      | App framework (SSR & SSG)       |
| TypeScript   | Safer, scalable JavaScript      |
| Tailwind CSS | Utility-first UI styling        |
| React Hooks  | Component state management      |
| Vercel       | Deployment & CI/CD              |
| LocalStorage | Temporary data persistence      |

---

## 📦 Features

### Design
- Dark theme with a charcoal background (#0f0f0f)) and green accent colors (#146037) for a professional aesthetic.
- Modern card-based UI featuring subtle shadows, rounded corners, and backdrop blur effects.

### Dashboard Components
- Task statistics: Overview cards displaying total, completed, in-progress, and overdue tasks.
- Progress charts: Area charts powered by Recharts to visualize task completion trends.
- Recent tasks: Interactive list with priority indicators, due dates, and assignee details.
- Project progress: Visual progress bars showing completion percentages for active projects.
- Quick actions: Fast-access buttons for streamlined task and project workflows.

### Core Functionality
- Collapsible sidebar navigation with color-coded project labels for intuitive organization.
- Advanced search and filtering by task priority, status, and assignee.
- Task management with high, medium, and low priority levels, indicated by color-coded borders.
- Project organization with progress tracking and customizable labels.

### Professional Features
- Data visualization using Recharts for actionable analytics and progress tracking.
- Task prioritization with clear visual indicators for efficient workflow management.
- Team collaboration with assignee tracking and user management capabilities.

---
### 📐 Architecture

```
User
↓
Components (Shadcn/UI, Radix UI for accessibility)
↓
State Management
↓
Database (Temporary data persistence)
↓
Vercel (Edge Functions, CDN, CI/CD)
```
---

## 🚀 Getting Started

Clone the repo:

```bash
git clone https://github.com/achrafsadeq/task-manager.git
cd task-manager


## Overview
The Professional Task Manager is a web-based application built to enhance productivity for individuals and teams. It provides an intuitive interface with a dark charcoal theme (#1a1a1a) and green accents (#12a648), featuring task prioritization, project tracking, and interactive data visualizations. The app is designed for scalability, with a modular architecture ready for backend integration.

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/achrafsadeq/task-manager-pro.git
cd task-manager-pro
```

Install dependencies:

```bash
pnpm install
```

Set up environment variables (e.g., `.env.local`):

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON6243_KEY=your_supabase_key
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Technologies
- **Next.js**: Framework for routing and server-side rendering.
- **TypeScript**: Type-safe JavaScript for robust development.
- **Tailwind CSS**: Utility-first CSS for responsive styling.
- **Recharts**: Data visualization for charts and analytics.
- **shadcn/ui**: Reusable UI components for a professional look.
- **React**: Core library for building the user interface.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request with a detailed description.

## License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/Achrafsadeq/Task_Manager/blob/main/LICENSE) file for details.

## Submission

- **GitHub Repository**: [Task_Manager](https://github.com/Achrafsadeq/Task_Manager)
- **Directory**: `Task_Manager`

## Developer

**[Achraf Sadeq](https://github.com/achrafsadeq)**: Full-Stack Developer | UI/UX Designer | Project Manager  

## Acknowledgments

This program was developed by Holberton School, in collaboration with the ALX Software Engineering Program, to provide practical, hands-on learning experiences in a professional and real-world context. It aims to equip learners with the skills and knowledge necessary to tackle complex challenges in software engineering.
