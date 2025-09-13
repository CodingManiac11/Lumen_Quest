# Quest - Subscription Management System

A modern subscription management system built with Next.js and a Stripe-inspired design system.

## 🚀 Features

- **Modern UI/UX**: Stripe-inspired design system with premium components
- **Authentication**: Role-based authentication for customers and admin users
- **Subscription Management**: Complete subscription lifecycle management
- **Responsive Design**: Mobile-first responsive design
- **TypeScript**: Full TypeScript support for type safety
- **State Management**: Zustand for efficient state management

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.5.3** - React framework with App Router
- **React 18.2.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **React Hook Form** - Form handling and validation
- **Lucide React** - Modern icon library

### Design System
- Stripe-inspired color palette
- Custom component library (Button, Card, Input, Badge, etc.)
- Consistent typography and spacing
- Micro-interactions and animations

## 📁 Project Structure

```
Quest/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # Reusable UI components
│   │   ├── store/           # Zustand stores
│   │   └── lib/             # Utility functions
│   ├── public/              # Static assets
│   └── ...config files
├── backend/                 # Backend API (if applicable)
├── docs/                    # Project documentation
└── ...config files
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Quest
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   ```

4. **Run the development server**
   ```bash
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

This project implements a comprehensive design system inspired by Stripe's UI/UX:

### Components
- **Button**: 5 variants (primary, secondary, outline, ghost, destructive)
- **Card**: 3 variants with consistent styling
- **Input**: Form inputs with validation states
- **Badge**: 6 variants for status indicators
- **MetricCard**: Dashboard metrics display

### Color Palette
- Primary: Blue gradient system
- Secondary: Neutral grays
- Success/Warning/Error states
- Premium purple accents

## 🔐 Authentication

The system supports dual-role authentication:

### Customer Users
- Standard subscription management
- Billing and payment features
- Account management

### Admin Users
- Full system administration
- Customer management
- Analytics and reporting

### Demo Credentials
- **Customer**: customer@example.com / password123
- **Admin**: admin@example.com / password123

## 📱 Responsive Design

- Mobile-first approach
- Collapsible sidebar navigation
- Optimized for all screen sizes
- Touch-friendly interactions

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t quest-app .
docker run -p 3000:3000 quest-app
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from [Stripe](https://stripe.com)
- UI components inspired by modern design systems
- Next.js team for the amazing framework

---

Built with ❤️ using Next.js and modern web technologies.