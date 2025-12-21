# ApniSec - Technical Documentation

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Backend OOP Implementation](#backend-oop-implementation)
3. [Authentication System](#authentication-system)
4. [Rate Limiting](#rate-limiting)
5. [Email Service](#email-service)
6. [Database Schema](#database-schema)
7. [API Documentation](#api-documentation)
8. [Frontend Architecture](#frontend-architecture)
9. [Security Considerations](#security-considerations)

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Custom JWT-based
- **Email**: Resend API
- **Styling**: Tailwind CSS

### Design Patterns
- **OOP (Object-Oriented Programming)**: All backend logic
- **Repository Pattern**: Data access layer
- **Service Layer**: Business logic
- **Handler Layer**: Request/response handling
- **Dependency Injection**: Service composition

## Backend OOP Implementation

### Class Hierarchy

```
┌─────────────────┐
│    Handlers     │ ← Handle HTTP requests/responses
└────────┬────────┘
         │
┌────────▼────────┐
│    Services     │ ← Business logic & orchestration
└────────┬────────┘
         │
┌────────▼────────┐
│  Repositories   │ ← Data access layer
└─────────────────┘
```

### Handler Classes
**Location**: `src/lib/backend/handlers/`

- **AuthHandler**: Handles authentication requests
  - `register()`: User registration
  - `login()`: User login
  - `logout()`: User logout
  - `getCurrentUser()`: Get authenticated user

- **UserHandler**: Handles user profile operations
  - `getProfile()`: Retrieve user profile
  - `updateProfile()`: Update user information

- **IssueHandler**: Handles issue management
  - `createIssue()`: Create new issue
  - `getAllIssues()`: List issues with filters
  - `getIssue()`: Get single issue
  - `updateIssue()`: Update issue
  - `deleteIssue()`: Delete issue

### Service Classes
**Location**: `src/lib/backend/services/`

- **AuthService**: Authentication business logic
  - Password hashing with bcrypt
  - JWT token generation
  - User verification
  - Email notification triggering

- **UserService**: User management
  - Profile retrieval
  - Profile updates
  - Email uniqueness validation

- **IssueService**: Issue management
  - CRUD operations
  - Authorization checks
  - Email notifications

- **EmailService**: Email operations
  - Welcome emails
  - Issue created notifications
  - Profile update notifications
  - HTML email templates

### Repository Classes
**Location**: `src/lib/backend/repositories/`

- **UserRepository**: User data access
  - `create()`: Create user
  - `findByEmail()`: Find by email
  - `findById()`: Find by ID
  - `update()`: Update user
  - `delete()`: Delete user

- **IssueRepository**: Issue data access
  - `create()`: Create issue
  - `findById()`: Find by ID
  - `findAll()`: List with filters
  - `update()`: Update issue
  - `delete()`: Delete issue

### Validator Classes
**Location**: `src/lib/backend/validators/`

- **AuthValidator**: Authentication validation
  - Email format validation
  - Password strength validation
  - Input sanitization

- **UserValidator**: User data validation
  - Profile update validation
  - Email uniqueness

- **IssueValidator**: Issue data validation
  - Type validation (CLOUD_SECURITY, VAPT, RETEAM_ASSESSMENT)
  - Priority validation
  - Status validation

### Middleware Classes
**Location**: `src/lib/backend/middleware/`

- **AuthMiddleware**: Authentication verification
  - `authenticate()`: Verify JWT token
  - `extractIP()`: Get client IP address

- **RateLimiter**: Rate limiting implementation
  - `checkLimit()`: Check and update rate limits
  - `resetLimit()`: Reset limit counters
  - Database-backed tracking

## Authentication System

### JWT Implementation

#### Token Structure
```typescript
interface IJWTPayload {
  userId: string;
  email: string;
}
```

#### Token Types
1. **Access Token**: 7-day expiry, used for API authentication
2. **Refresh Token**: 30-day expiry, used to obtain new access tokens

#### Flow
```
1. User registers/logs in
2. Server generates access + refresh tokens
3. Client stores tokens in localStorage
4. Client sends access token in Authorization header
5. Server validates token on protected routes
6. Token refresh (if needed)
```

### Password Security
- Passwords hashed with bcryptjs
- Salt rounds: 10
- Never stored in plain text
- Never returned in API responses

## Rate Limiting

### Implementation Details

**Class**: `RateLimiter`

### Configuration
- Window: 15 minutes
- Max Requests: 100 per window
- Storage: PostgreSQL database
- Tracking: By user ID or IP address

### Rate Limit Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1234567890000
```

### Database Schema
```prisma
model RateLimit {
  id        String   @id @default(uuid())
  key       String   @unique
  count     Int      @default(0)
  resetAt   DateTime
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Error Response
```json
{
  "success": false,
  "error": "Rate limit exceeded. Try again after 123 seconds"
}
```

## Email Service

### Provider: Resend

### Email Templates

1. **Welcome Email**
   - Sent on user registration
   - Contains welcome message
   - Dashboard link

2. **Issue Created Email**
   - Sent when issue is created
   - Issue details included
   - Link to view issue

3. **Profile Updated Email**
   - Sent on profile updates
   - Security notification

### Email Class Structure
```typescript
class EmailService {
  sendWelcomeEmail(user: IUser): Promise<void>
  sendIssueCreatedEmail(user: IUser, issue: IIssue): Promise<void>
  sendProfileUpdatedEmail(user: IUser): Promise<void>
}
```

### HTML Templates
- Responsive design
- Gradient styling
- Company branding
- Call-to-action buttons

## Database Schema

### Tables

#### Users
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  issues    Issue[]
}
```

#### Issues
```prisma
model Issue {
  id          String      @id @default(uuid())
  type        IssueType
  title       String
  description String
  priority    Priority    @default(MEDIUM)
  status      IssueStatus @default(OPEN)
  userId      String
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  user        User        @relation(fields: [userId], references: [id])
}
```

#### Enums
```prisma
enum IssueType {
  CLOUD_SECURITY
  RETEAM_ASSESSMENT
  VAPT
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum IssueStatus {
  OPEN
  IN_PROGRESS
  RESOLVED
  CLOSED
}
```

## API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    "tokens": {
      "accessToken": "jwt_token",
      "refreshToken": "refresh_token"
    }
  },
  "message": "User registered successfully"
}
```

#### POST /api/auth/login
Authenticate user

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:** Same as register

#### GET /api/auth/me
Get current authenticated user

**Headers:**
```
Authorization: Bearer {access_token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Issue Endpoints

#### POST /api/issues
Create a new issue

**Headers:**
```
Authorization: Bearer {access_token}
```

**Request Body:**
```json
{
  "type": "CLOUD_SECURITY",
  "title": "Security vulnerability in AWS S3",
  "description": "Found misconfigured S3 bucket permissions",
  "priority": "HIGH",
  "status": "OPEN"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "type": "CLOUD_SECURITY",
    "title": "Security vulnerability in AWS S3",
    "description": "Found misconfigured S3 bucket permissions",
    "priority": "HIGH",
    "status": "OPEN",
    "userId": "user_uuid",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Issue created successfully"
}
```

#### GET /api/issues
Get all issues (with optional filters)

**Query Parameters:**
- `type`: Filter by issue type (CLOUD_SECURITY, VAPT, RETEAM_ASSESSMENT)
- `status`: Filter by status (OPEN, IN_PROGRESS, RESOLVED, CLOSED)

**Example:**
```
GET /api/issues?type=CLOUD_SECURITY&status=OPEN
```

#### PUT /api/issues/[id]
Update an issue

**Request Body:**
```json
{
  "status": "IN_PROGRESS",
  "priority": "CRITICAL"
}
```

#### DELETE /api/issues/[id]
Delete an issue

**Response:**
```json
{
  "success": true,
  "data": { "deleted": true },
  "message": "Issue deleted successfully"
}
```

## Frontend Architecture

### Page Structure

```
src/app/
├── page.tsx                 # Landing page
├── (auth)/
│   ├── login/page.tsx      # Login page
│   └── register/page.tsx   # Registration page
└── (protected)/
    ├── dashboard/page.tsx  # Main dashboard
    └── profile/page.tsx    # User profile
```

### Component Structure

```
src/components/
├── landing/
│   ├── Navigation.tsx      # Top navigation
│   ├── Hero.tsx           # Hero section
│   ├── Features.tsx       # Features showcase
│   └── Footer.tsx         # Footer
└── dashboard/
    ├── IssueForm.tsx      # Create/edit issues
    └── IssueList.tsx      # Display issues
```

### State Management
- React hooks (useState, useEffect)
- localStorage for token persistence
- Client-side authentication checks

### Routing
- App Router (Next.js 15)
- Route groups for organization
- Protected route pattern

## Security Considerations

### Authentication
- JWT tokens with expiry
- Secure password hashing
- Token validation on every request
- XSS protection via HTTP-only cookies (recommended for production)

### Rate Limiting
- Prevents brute force attacks
- Database-backed tracking
- Per-user and per-IP limits

### Input Validation
- Server-side validation for all inputs
- Type checking with TypeScript
- SQL injection prevention via Prisma

### CORS
- Configure allowed origins in production
- Restrict API access

### Environment Variables
- Never commit .env files
- Use strong secrets in production
- Rotate keys regularly

### Database Security
- Parameterized queries via Prisma
- Connection string encryption
- Regular backups

### Best Practices
1. Use HTTPS in production
2. Implement CSRF protection
3. Add rate limiting to all endpoints
4. Sanitize user inputs
5. Keep dependencies updated
6. Monitor for security vulnerabilities
7. Implement proper error handling
8. Don't expose sensitive information in errors

## Deployment Checklist

- [ ] Set strong JWT secrets
- [ ] Configure production database
- [ ] Set up Resend with verified domain
- [ ] Enable HTTPS
- [ ] Configure CORS
- [ ] Set up monitoring
- [ ] Test rate limiting
- [ ] Verify email delivery
- [ ] Check SEO score (80%+)
- [ ] Test all API endpoints
- [ ] Verify authentication flow
- [ ] Test responsive design
- [ ] Set up error logging
- [ ] Configure backups

📈 SEO Optimization
Achieved 92% SEO score on Google Lighthouse:

![SEO Score 92%](https://github.com/hamsa-20/Apnisec/blob/main/Screenshot%202025-12-21%20154313.png)

*SEO Audit Results from Lighthouse*

**Key SEO improvements:**
- Semantic HTML with proper heading hierarchy
- Optimized meta tags and page titles
- Image alt attributes for accessibility

**Key SEO improvements implemented:**
- Semantic HTML structure with proper heading hierarchy
- Optimized meta tags and page titles
- Image alt attributes for accessibility
- Mobile-responsive design

## Performance Optimization

1. **Database Indexing**
   - User email index
   - Issue userId index
   - Issue type index

2. **API Response**
   - Minimal data transfer
   - Proper status codes
   - Caching headers (where appropriate)

3. **Frontend**
   - Code splitting
   - Lazy loading
   - Image optimization
   - CSS minification

## Monitoring & Logging

### Recommended Tools
- **Sentry**: Error tracking
- **Vercel Analytics**: Performance monitoring
- **Database Logs**: Query performance
- **Rate Limit Logs**: Attack detection

### Key Metrics
- API response times
- Error rates
- Authentication success/failure
- Rate limit hits
- Email delivery rates

---

## Support

For questions or issues, please contact the development team or refer to the README.md file.
