import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import SchedulePickup from './pages/SchedulePickup';
import Rewards from './pages/Rewards';
import FindBins from './pages/FindBins';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Contact from './pages/Contact';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/schedule-pickup" element={
          <Layout>
            <SchedulePickup />
          </Layout>
        } />
        <Route path="/rewards" element={
          <Layout>
            <Rewards />
          </Layout>
        } />
        <Route path="/find-bins" element={
          <Layout>
            <FindBins />
          </Layout>
        } />
        <Route path="/community" element={
          <Layout>
            <Community />
          </Layout>
        } />
        <Route path="/profile" element={
          <Layout>
            <Profile />
          </Layout>
        } />
        <Route path="/admin" element={
          <Layout>
            <Admin />
          </Layout>
        } />
        <Route path="/contact" element={
          <Layout>
            <Contact />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;