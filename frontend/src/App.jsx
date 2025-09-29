import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from './Pages/HomePage.jsx';
import LoginPage from "./Pages/LoginPage.jsx";
import SignUpPage from "./Pages/SignUpPage.jsx"
import CallPage from "./Pages/CallPage.jsx";
import ChatPage from "./Pages/ChatPage.jsx";
import NotificationPage from "./Pages/NotificationPage.jsx";
import OnboardingPage from "./Pages/OnboardingPage.jsx"
import { Toaster } from "react-hot-toast"
import PageLoader from './components/PageLoader.jsx';
import useAuthUser from './hooks/useAuthUser.js';
import Layout from './components/Layout.jsx';
import { useThemeStore } from './store/useThemeStore.js';
import ChatListPage from './Pages/ChatListPage.jsx';

function App() {

  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();

  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarding;

  if (isLoading) return <PageLoader />

  console.log("authUser:", authUser),
    console.log("isAuthenticated:", isAuthenticated),
    console.log("isOnboarded:", isOnboarded);

  return (
    <div className='h-screen' data-theme={theme}>
      <Routes>
        <Route path='/' element={
          <Layout showSidebar={true}>
            <HomePage />
          </Layout>
        } />


        <Route
          path="/"
          element={
            isAuthenticated ? (
              isOnboarded ? (
                <Layout showSidebar={true}>
                  <HomePage />
                </Layout>
              ) : (
                <Navigate to="/onboarding" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path='/signup'
          element={!isAuthenticated ? <SignUpPage /> : <Navigate to={
            isOnboarded ? "/" : "/onboarding"
          } />} />

        <Route
          path='/login'
          element={!isAuthenticated ? <LoginPage /> : <Navigate to={
            isOnboarded ? "/" : "/onboarding"
          } />} />

        <Route
          path='/call/:id'
          element={isAuthenticated && isOnboarded ? (
            <CallPage />
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarded"} />
          )}
        />

        <Route
          path='/chat/:id'
          element={isAuthenticated && isOnboarded ? (
            <Layout>
              <ChatPage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )}
        />

        <Route path="/chat" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <ChatListPage />
          </Layout>
        ) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)} />

        <Route
          path='/notification'
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <NotificationPage />
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )}
        />

        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )}
        />

      </Routes>

      <Toaster />
    </div>
  )
}

export default App;

