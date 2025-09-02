import { useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/sections/HeroSection';
import UploadConnectSection from '@/components/sections/UploadConnectSection';
import DashboardSection from '@/components/sections/DashboardSection';
import GamificationSection from '@/components/sections/GamificationSection';
import DetailedTabsSection from '@/components/sections/DetailedTabsSection';
import ReportsSection from '@/components/sections/ReportsSection';
import AboutSection from '@/components/sections/AboutSection';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [uploadedData, setUploadedData] = useState({
    resume: null,
    linkedin: '',
    github: ''
  });

  const handleDataUpload = (type: string, data: any) => {
    setUploadedData(prev => ({
      ...prev,
      [type]: data
    }));
  };

  const hasAnyData = uploadedData.resume || uploadedData.linkedin || uploadedData.github;

  return (
    <div className="min-h-screen bg-neutral-light">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Upload & Connect Section */}
      <UploadConnectSection onDataUpload={handleDataUpload} uploadedData={uploadedData} />
      
      {/* Main Dashboard - Show only if user has uploaded any data */}
      {hasAnyData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Dashboard Overview Cards */}
          <DashboardSection uploadedData={uploadedData} />
          
          {/* Gamification Layer */}
          <GamificationSection uploadedData={uploadedData} />
          
          {/* Detailed Analysis Tabs */}
          <DetailedTabsSection activeTab={activeTab} setActiveTab={setActiveTab} uploadedData={uploadedData} />
          
          {/* Reports Section */}
          <ReportsSection uploadedData={uploadedData} />
        </motion.div>
      )}
      
      {/* About Section */}
      <AboutSection />
    </div>
  );
};

export default Index;