# TriVenture Frontend Application

This repository contains the frontend application for TriVenture, built with React, TypeScript, and Vite.

## 2. Installation Guides

### 2.1 System Requirements

Before installing and running the TriVenture frontend application, ensure your system meets the following requirements:

#### Operating System
- **Windows:** Windows 10 or later
- **macOS:** macOS 10.15 (Catalina) or later
- **Linux:** Ubuntu 18.04+, Debian 10+, or other modern Linux distributions

#### Browser
- **Chrome:** Version 100 or later (recommended)
- **Firefox:** Version 100 or later
- **Safari:** Version 15 or later
- **Edge:** Version 100 or later

#### Required Software
- **Node.js:** Version 18.x or later
- **npm:** Version 9.x or later (comes with Node.js)
- **Git:** Latest version recommended

#### Required Libraries/Frameworks
- React 18.x
- TypeScript 5.x
- Vite 5.x
- Other dependencies are automatically installed during setup

#### API Keys/Credentials Needed
- Google OAuth credentials (for authentication)
- Goong Maps API key (for map functionality)

### 2.2 Installation Instructions

Follow these steps to set up and run the TriVenture frontend application on your local machine:

#### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd TriVenture/FE
```

#### Step 2: Install Dependencies
```bash
npm install
```
This will install all necessary dependencies listed in the package.json file.

#### Step 3: Configure backend endpoint:

Edit in `src/constant/index.ts`:

#### Step 4: Start the Development Server
```bash
npm run dev
```
This will start the development server. By default, the application will be available at http://localhost:5173.

#### Step 5: Build for Production (Optional)
When you're ready to deploy the application to production:

```bash
npm run build
```

This will create an optimized production build in the `dist` directory. You can preview this build using:

```bash
npm run preview
```

## Troubleshooting

- **Node version issues**: If you encounter errors related to Node.js versions, consider using a Node version manager like nvm to install and use the correct version.
- **Dependency conflicts**: If you encounter dependency conflicts, try deleting the `node_modules` folder and the `package-lock.json` file, then run `npm install` again.
- **Port conflicts**: If port 5173 is already in use, Vite will automatically try to use the next available port. You can also specify a different port using `npm run dev -- --port 3000`.

## Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Ant Design Documentation](https://ant.design/docs/react/introduce)
