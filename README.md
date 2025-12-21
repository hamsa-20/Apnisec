# ApniSec - Cybersecurity Management Platform

A full-stack Next.js application with authentication, rate limiting, email integration, and SEO optimization built for ApniSec cybersecurity services.

##  Features

- ✅ **Custom JWT Authentication** - Secure user registration and login
- ✅ **OOP Backend Architecture** - Complete class-based backend structure
- ✅ **Rate Limiting** - 100 requests per 15 minutes per user/IP
- ✅ **Email Integration** - Resend email service for notifications
- ✅ **Issue Management** - Track Cloud Security, VAPT, and Reteam Assessment issues
- ✅ **Modern UI** - Dark theme with gradient accents
- ✅ **Responsive Design** - Mobile, tablet, and desktop optimized
- ✅ **SEO Optimized** - 80%+ Lighthouse SEO score
- ✅ **Protected Routes** - Secure dashboard and profile pages

##  Tech Stack

### Frontend
- Next.js 15+ (App Router)
- React 19+
- TypeScript
- Tailwind CSS
- Lucide Icons

### Backend
- Next.js API Routes (OOP Architecture)
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Custom Rate Limiter
- Resend Email Service

##  Installation

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (Supabase recommended)
- Resend API key

### Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd apnisec-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
- `DATABASE_URL` - Your PostgreSQL connection string
- `JWT_SECRET` - Random secret key for JWT
- `JWT_REFRESH_SECRET` - Random secret key for refresh tokens
- `RESEND_API_KEY` - Your Resend API key from https://resend.com
- `NEXT_PUBLIC_APP_URL` - Your app URL (http://localhost:3000 for dev)

4. **Set up the database**
```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. **Run the development server**
```bash
npm run dev
```

Visit http://localhost:3000

##  Database Setup (Supabase PostgreSQL)

1. Go to https://supabase.com
2. Create a new project
3. Go to Project Settings > Database
4. Copy the connection string (URI format)
5. Replace `[YOUR-PASSWORD]` with your database password
6. Paste into `.env.local` as `DATABASE_URL`

##  Email Setup (Resend)

1. Go to https://resend.com
2. Sign up for a free account
3. Go to API Keys section
4. Create a new API key
5. Copy the key to `.env.local` as `RESEND_API_KEY`

##  Project Structure

```
apnisec-app/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # API Routes
│   │   ├── (auth)/              # Auth pages (login, register)
│   │   ├── (protected)/         # Protected pages (dashboard, profile)
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Landing page
│   ├── lib/
│   │   ├── backend/             # Backend OOP Classes
│   │   │   ├── handlers/       # Request handlers
│   │   │   ├── services/       # Business logic
│   │   │   ├── repositories/   # Data access
│   │   │   ├── validators/     # Input validation
│   │   │   ├── middleware/     # Auth & Rate limiting
│   │   │   └── errors/         # Custom errors
│   │   └── utils/              # Utility functions
│   ├── components/             # React components
│   └── types/                  # TypeScript types
├── prisma/
│   └── schema.prisma           # Database schema
├── .env.example                # Environment template
├── package.json
└── README.md
```

##  API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user (protected)

### User Profile
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)

### Issues
- `GET /api/issues` - Get all issues (protected, supports ?type= filter)
- `POST /api/issues` - Create issue (protected)
- `GET /api/issues/[id]` - Get single issue (protected)
- `PUT /api/issues/[id]` - Update issue (protected)
- `DELETE /api/issues/[id]` - Delete issue (protected)

##  Testing

1. Register a new account at `/register`
2. Check your email for welcome message
3. Login at `/login`
4. Access dashboard at `/dashboard`
5. Create, update, and delete issues
6. Update profile at `/profile`
7. Test rate limiting by making multiple requests

##  Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy

### Environment Variables for Production
- Set all variables from `.env.example`
- Use production database URL
- Use strong JWT secrets
- Use production app URL

##  SEO Optimization

The application includes:
- Semantic HTML structure
- Meta tags for SEO
- Open Graph tags
- Twitter Card tags
- Structured data
- Proper heading hierarchy
- Alt text for images
- Fast loading times

Test SEO score:
1. Run `npm run build`
2. Open Chrome DevTools
3. Run Lighthouse audit
4. Check SEO score (target: 80%+)

##  Design Features

- Dark theme with purple/pink gradients
- Glassmorphism effects
- Smooth animations
- Responsive design
- Modern cybersecurity aesthetic
- Intuitive user interface

##  License

MIT License - feel free to use this project for learning or production.



##  Future Enhancements

- Password reset functionality
- Email verification
- Two-factor authentication
- Advanced search and filtering
- File attachments for issues
- Real-time notifications
- Team collaboration features