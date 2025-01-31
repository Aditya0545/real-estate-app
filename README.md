This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


# Real Estate Hub

A modern real estate platform built with Next.js, TypeScript, and Prisma.

## Features

- 🏠 Property Listings
- 👥 User Authentication
- 💬 Messaging System
- 🔍 Advanced Search
- 📱 Responsive Design
- 🎨 Theme Customization
- 🔐 Role-based Access Control

## Tech Stack

- **Frontend**: Next.js 14, React, Material-UI
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: JWT
- **Styling**: Material-UI, Emotion
- **Type Safety**: TypeScript

## Prerequisites

- Node.js 18+ 
- npm/yarn
- PostgreSQL database (or Neon account)

## Getting Started

1. **Clone the repository**


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**

Create a `.env` file in the root directory:
```env
DATABASE_URL="your-database-url"
JWT_SECRET="your-secret-key"
```

4. **Database Setup**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   │   ├── sign-in/       # Sign in page
│   │   └── sign-up/       # Sign up page
│   ├── api/               # API routes
│   │   └── auth/          # Auth API endpoints
│   └── dashboard/         # Dashboard page
├── components/            # React components
│   ├── dialogs/          # Dialog components
│   ├── menus/            # Menu components
│   └── common/           # Shared components
├── contexts/             # React contexts
├── lib/                  # Utility functions
└── types/                # TypeScript types
```

## Key Files and Their Purposes

1. **Authentication**
   - `src/app/(auth)/sign-up/page.tsx`: User registration
   - `src/app/(auth)/sign-in/page.tsx`: User login
   - `src/app/api/auth/register/route.ts`: Registration API
   - `src/app/api/auth/login/route.ts`: Login API

2. **Database**
   - `prisma/schema.prisma`: Database schema
   - `src/lib/db.ts`: Prisma client configuration

3. **Components**
   - `src/components/Header.tsx`: Main navigation
   - `src/components/dialogs/ProfileDialog.tsx`: User profile
   - `src/components/menus/ProfileMenu.tsx`: User menu

## Common Modifications

### Adding a New Feature

1. **Create Component**
```bash
mkdir src/components/features
touch src/components/features/NewFeature.tsx
```

2. **Update Database Schema**
```prisma
// prisma/schema.prisma
model NewFeature {
  id        String   @id @default(cuid())
  // Add fields
}
```

3. **Create API Route**
```bash
mkdir src/app/api/new-feature
touch src/app/api/new-feature/route.ts
```

### Modifying User Roles

1. Update `prisma/schema.prisma`:
```prisma
enum UserRole {
  USER
  AGENT
  ADMIN
  // Add new role
}
```

2. Run database migration:
```bash
npx prisma generate
npx prisma db push
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Environment Variables

Required environment variables:

```env
DATABASE_URL="postgresql://username:password@host:port/database"
JWT_SECRET="your-secret-key"
```

## Common Issues and Solutions

1. **Database Connection Issues**
   - Check DATABASE_URL format
   - Ensure database is running
   - Verify network connectivity

2. **Authentication Errors**
   - Verify JWT_SECRET is set
   - Check token expiration
   - Validate user credentials

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@realestatehub.com or join our Slack channel.

## Deployment on Vercel

### Prerequisites
1. [GitHub Account](https://github.com)
2. [Vercel Account](https://vercel.com)
3. [Neon Database Account](https://neon.tech) (or any PostgreSQL provider)

### Steps to Deploy

1. **Prepare Your Repository**
```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Create a new repository on GitHub and push your code
git remote add origin https://github.com/yourusername/real-estate-hub.git
git branch -M main
git push -u origin main
```

2. **Set Up Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select "Next.js" as framework preset

3. **Configure Environment Variables**
   - In Vercel project settings, go to "Environment Variables"
   - Add the following variables:
   ```env
   DATABASE_URL="your-neon-database-url"
   JWT_SECRET="your-secret-key"
   ```

4. **Database Setup**
   - Create a new database in Neon
   - Copy the connection string
   - Update DATABASE_URL in Vercel environment variables
   - Run database migrations:
   ```bash
   # Locally run
   npx prisma generate
   npx prisma db push
   ```

5. **Deploy**
   - Vercel will automatically deploy when you push to main
   - Manual deploy:
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel
   ```

### Post-Deployment

1. **Verify Database Connection**
   - Check if the app can connect to the database
   - Verify environment variables are set correctly

2. **Test Authentication**
   - Try signing up a new user
   - Test login functionality
   - Verify JWT token generation

3. **Monitor Deployment**
   - Check Vercel deployment logs
   - Monitor database connections
   - Set up error tracking (optional)

### Common Deployment Issues

1. **Database Connection Errors**
   ```
   Solution:
   - Check if DATABASE_URL is correctly set in Vercel
   - Ensure database is accessible from Vercel's servers
   - Verify SSL requirements are met
   ```

2. **Build Failures**
   ```
   Solution:
   - Check build logs in Vercel
   - Verify all dependencies are listed in package.json
   - Ensure Node.js version is compatible
   ```

3. **Environment Variable Issues**
   ```
   Solution:
   - Double-check all required env vars are set in Vercel
   - Ensure variable names match exactly
   - Check for any missing quotation marks
   ```

### Production Considerations

1. **Performance**
   - Enable caching where appropriate
   - Optimize images and assets
   - Use proper error boundaries

2. **Security**
   - Ensure JWT_SECRET is secure and unique
   - Enable rate limiting
   - Set up proper CORS policies

3. **Monitoring**
   - Set up error tracking (e.g., Sentry)
   - Monitor database performance
   - Set up alerts for critical errors

## Getting Started After Forking

### 1. Clone Your Forked Repository
```bash
# Clone your forked repository
git clone https://github.com/your-username/real-estate-hub.git

# Navigate to project directory
cd real-estate-hub
```

### 2. Install Dependencies
```bash
# Install all required packages
yarn install

# If you encounter any issues, try:
yarn install --legacy-peer-deps
```

### 3. Set Up Environment Variables
1. **Use Provided Database Connection**
   - Create a `.env` file in the root directory
   - Add the following environment variables:
   ```env
   DATABASE_URL="postgresql://neondb_owner:npg_vNsAID6F7hYT@ep-jolly-field-a5sfn1x6-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
   JWT_SECRET="real-estate-hub-secret-key-2024"
   ```

2. **Initialize Database Connection**
   ```bash
   # Generate Prisma client
   npx prisma generate
   ```

   Note: The database is already set up on the server, so you don't need to create a new one.

### 4. Run Development Server
```bash
# Start the development server
yarn dev

# The app will be available at http://localhost:3000
```

### 5. Required Configuration Changes

1. **Update API Routes**
   - Check `src/app/api/auth/register/route.ts`
   - Check `src/app/api/auth/login/route.ts`
   - Ensure database connection is working

2. **Verify Environment**
   - Make sure all environment variables are set
   - Check database connection
   - Verify JWT configuration

### 6. Test Core Functionality
1. Try registering a new user
2. Test login functionality
3. Check dashboard access
4. Verify database connections

## Troubleshooting Common Setup Issues

### Database Connection Issues
```bash
# Check if Prisma can connect to your database
npx prisma db pull

# If you get errors, verify:
1. DATABASE_URL in .env is correct
2. Database is accessible
3. Neon database is active
```

### Build Errors
```bash
# Clear next.js cache
rm -rf .next

# Clear yarn cache
yarn cache clean

# Reinstall dependencies
yarn install
```

### TypeScript Errors
```bash
# Update TypeScript definitions
yarn update-types

# Check for type errors
yarn type-check
```

## Required Files Checklist
- [ ] `.env` file with database credentials
- [ ] `node_modules` (installed via npm)
- [ ] `.next` directory (created by Next.js)
- [ ] `prisma/generated` (created by Prisma)

## Development Tools
- [Prisma Studio](https://www.prisma.io/studio) - Database Management
  ```bash
  npx prisma studio
  ```
- [Next.js DevTools](https://nextjs.org/docs/advanced-features/debugging)
  ```bash
  # Enable debugging
  NODE_OPTIONS='--inspect' npm run dev
  ```
