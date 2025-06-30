'use client'
import React, { useState, useEffect } from 'react';
import { Seo } from "@/app/ui/components/seo";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [visibleElements, setVisibleElements] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleElements(prev => new Set(prev).add(entry.target.dataset.index));
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach((el, index) => {
      el.dataset.index = index;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const smoothScroll = (targetId) => {
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <Seo title="ATPU - Association Tunisienne de Promotion Universitaire" description="Formation • Environnement • Innovation" />
      
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #0a0a0a;
          color: #ffffff;
          overflow-x: hidden;
        }

        /* Header */
        .header {
          position: fixed;
          top: 0;
          width: 100%;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(20px);
          z-index: 1000;
          padding: 1rem 0;
          transition: all 0.3s ease;
        }

        .header.scrolled {
          background: rgba(10, 10, 10, 0.98);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .logo-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #00d4ff, #0099cc);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .logo-text h1 {
          font-size: 1.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #00d4ff, #00ff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo-text p {
          font-size: 0.8rem;
          color: #888;
        }

        .nav-menu {
          display: flex;
          gap: 2rem;
          list-style: none;
        }

        .nav-menu a {
          color: #fff;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
          position: relative;
          cursor: pointer;
        }

        .nav-menu a:hover {
          color: #00d4ff;
        }

        .nav-menu a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #00d4ff, #00ff88);
          transition: width 0.3s ease;
        }

        .nav-menu a:hover::after {
          width: 100%;
        }

        /* Hero Section */
        .hero {
          height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 70%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 70% 30%, rgba(0, 255, 136, 0.1) 0%, transparent 50%);
          animation: pulse 4s ease-in-out infinite alternate;
        }

        @keyframes pulse {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        .hero-content {
          max-width: 800px;
          padding: 0 2rem;
          z-index: 2;
          position: relative;
        }

        .hero h1 {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 800;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #fff, #00d4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeInUp 1s ease-out;
        }

        .hero p {
          font-size: clamp(1.1rem, 2vw, 1.3rem);
          color: #ccc;
          margin-bottom: 2.5rem;
          line-height: 1.6;
          animation: fadeInUp 1s ease-out 0.2s both;
        }

        .cta-button {
          background: linear-gradient(135deg, #00d4ff, #00ff88);
          color: #0a0a0a;
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
          animation: fadeInUp 1s ease-out 0.4s both;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(0, 212, 255, 0.4);
        }

        /* Stats Section */
        .stats {
          padding: 5rem 0;
          background: linear-gradient(135deg, #1a1a2e, #16213e);
          position: relative;
        }

        .stats-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2.5rem;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 255, 136, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .stat-card:hover::before {
          opacity: 1;
        }

        .stat-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 212, 255, 0.3);
        }

        .stat-icon {
          font-size: 3rem;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, #00d4ff, #00ff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #fff, #00d4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          color: #ccc;
          font-size: 1.1rem;
          font-weight: 500;
        }

        /* Workshops Section */
        .workshops {
          padding: 5rem 0;
          background: #0a0a0a;
        }

        .section-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .section-title {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #fff, #00d4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: #888;
          max-width: 600px;
          margin: 0 auto;
        }

        .workshops-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .workshop-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
          position: relative;
          cursor: pointer;
        }

        .workshop-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 212, 255, 0.3);
        }

        .workshop-image {
          height: 200px;
          background: linear-gradient(135deg, #00d4ff, #00ff88);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          color: #0a0a0a;
          position: relative;
          overflow: hidden;
        }

        .workshop-image::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .workshop-card:hover .workshop-image::before {
          transform: translateX(100%);
        }

        .workshop-content {
          padding: 2rem;
        }

        .workshop-title {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #fff;
        }

        .workshop-description {
          color: #ccc;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .workshop-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
          color: #888;
        }

        .workshop-date, .workshop-participants {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Environmental Projects Section */
        .environmental {
          padding: 5rem 0;
          background: linear-gradient(135deg, #1a1a2e, #16213e);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .project-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 212, 255, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card:hover::before {
          opacity: 1;
        }

        .project-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 255, 136, 0.3);
        }

        .project-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #00ff88, #00d4ff);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          font-size: 2rem;
          color: #0a0a0a;
        }

        .project-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: #fff;
        }

        .project-description {
          color: #ccc;
          line-height: 1.6;
        }

        /* Floating Particles */
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(0, 212, 255, 0.6);
          border-radius: 50%;
          animation: float 6s linear infinite;
        }

        .particle:nth-child(2n) {
          background: rgba(0, 255, 136, 0.6);
          animation-duration: 8s;
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        /* Animations */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nav-menu {
            display: none;
          }
          
          .hero {
            padding: 2rem 0;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          
          .workshops-grid {
            grid-template-columns: 1fr;
          }
          
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />

      {/* Header */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo">
            <div className="logo-icon">
              <i className="fas fa-leaf"></i>
            </div>
            <div className="logo-text">
              <h1>ATPU</h1>
              <p>Formation • Environnement • Innovation</p>
            </div>
          </div>
          <nav>
            <ul className="nav-menu">
              <li><a onClick={() => smoothScroll('#home')}>Accueil</a></li>
              <li><a onClick={() => smoothScroll('#workshops')}>Ateliers</a></li>
              <li><a onClick={() => smoothScroll('#environmental')}>Environnement</a></li>
              <li><a onClick={() => smoothScroll('#about')}>À propos</a></li>
              <li><a onClick={() => smoothScroll('#contact')}>Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="particles">
          {[...Array(9)].map((_, i) => (
            <div 
              key={i}
              className="particle" 
              style={{
                left: `${(i + 1) * 10}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
        <div className="hero-content">
          <h1>Façonnons l'Avenir Ensemble</h1>
          <p>Rejoignez notre communauté universitaire dédiée à l'innovation environnementale et au développement durable. Participez à nos ateliers exclusifs et projets verts qui transforment notre planète.</p>
          <a className="cta-button" onClick={() => smoothScroll('#workshops')}>
            Découvrir nos Ateliers
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-container">
          <div className="stats-grid">
            <div className={`stat-card fade-in ${visibleElements.has('0') ? 'visible' : ''}`}>
              <div className="stat-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-number">1,200+</div>
              <div className="stat-label">Étudiants Engagés</div>
            </div>
            <div className={`stat-card fade-in ${visibleElements.has('1') ? 'visible' : ''}`}>
              <div className="stat-icon">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <div className="stat-number">50+</div>
              <div className="stat-label">Ateliers Complétés</div>
            </div>
            <div className={`stat-card fade-in ${visibleElements.has('2') ? 'visible' : ''}`}>
              <div className="stat-icon">
                <i className="fas fa-seedling"></i>
              </div>
              <div className="stat-number">15</div>
              <div className="stat-label">Projets Verts Actifs</div>
            </div>
            <div className={`stat-card fade-in ${visibleElements.has('3') ? 'visible' : ''}`}>
              <div className="stat-icon">
                <i className="fas fa-globe-africa"></i>
              </div>
              <div className="stat-number">3</div>
              <div className="stat-label">Pays Partenaires</div>
            </div>
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section className="workshops" id="workshops">
        <div className="section-header">
          <h2 className="section-title">Ateliers à Venir</h2>
          <p className="section-subtitle">Participez à nos prochains ateliers innovants et développez vos compétences pour un avenir durable</p>
        </div>
        <div className="workshops-grid">
          <div className={`workshop-card fade-in ${visibleElements.has('4') ? 'visible' : ''}`}>
            <div className="workshop-image">
              <i className="fas fa-solar-panel"></i>
            </div>
            <div className="workshop-content">
              <h3 className="workshop-title">Énergies Renouvelables</h3>
              <p className="workshop-description">Explorez les dernières technologies solaires et éoliennes. Apprenez à concevoir des systèmes énergétiques durables pour l'avenir.</p>
              <div className="workshop-meta">
                <div className="workshop-date">
                  <i className="fas fa-calendar"></i>
                  <span>15 Juillet 2025</span>
                </div>
                <div className="workshop-participants">
                  <i className="fas fa-user-friends"></i>
                  <span>45 places</span>
                </div>
              </div>
            </div>
          </div>
          <div className={`workshop-card fade-in ${visibleElements.has('5') ? 'visible' : ''}`}>
            <div className="workshop-image">
              <i className="fas fa-recycle"></i>
            </div>
            <div className="workshop-content">
              <h3 className="workshop-title">Économie Circulaire</h3>
              <p className="workshop-description">Découvrez comment transformer les déchets en ressources. Créez des solutions innovantes pour une économie zéro déchet.</p>
              <div className="workshop-meta">
                <div className="workshop-date">
                  <i className="fas fa-calendar"></i>
                  <span>22 Juillet 2025</span>
                </div>
                <div className="workshop-participants">
                  <i className="fas fa-user-friends"></i>
                  <span>35 places</span>
                </div>
              </div>
            </div>
          </div>
          <div className={`workshop-card fade-in ${visibleElements.has('6') ? 'visible' : ''}`}>
            <div className="workshop-image">
              <i className="fas fa-water"></i>
            </div>
            <div className="workshop-content">
              <h3 className="workshop-title">Gestion de l'Eau</h3>
              <p className="workshop-description">Maîtrisez les techniques de conservation et purification de l'eau. Développez des solutions pour les communautés locales.</p>
              <div className="workshop-meta">
                <div className="workshop-date">
                  <i className="fas fa-calendar"></i>
                  <span>30 Juillet 2025</span>
                </div>
                <div className="workshop-participants">
                  <i className="fas fa-user-friends"></i>
                  <span>40 places</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Projects Section */}
      <section className="environmental" id="environmental">
        <div className="section-header">
          <h2 className="section-title">Projets Environnementaux</h2>
          <p className="section-subtitle">Nos initiatives durables qui font la différence dans notre communauté</p>
        </div>
        <div className="projects-grid">
          <div className={`project-card fade-in ${visibleElements.has('7') ? 'visible' : ''}`}>
            <div className="project-icon">
              <i className="fas fa-tree"></i>
            </div>
            <h3 className="project-title">Reforestation Campus</h3>
            <p className="project-description">Plantation de 1000 arbres sur le campus universitaire pour créer un environnement d'apprentissage plus vert et améliorer la qualité de l'air.</p>
          </div>
          <div className={`project-card fade-in ${visibleElements.has('8') ? 'visible' : ''}`}>
            <div className="project-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h3 className="project-title">Campus Intelligent</h3>
            <p className="project-description">Installation de systèmes d'éclairage LED intelligents et de capteurs IoT pour optimiser la consommation énergétique du campus.</p>
          </div>
          <div className={`project-card fade-in ${visibleElements.has('9') ? 'visible' : ''}`}>
            <div className="project-icon">
              <i className="fas fa-droplet"></i>
            </div>
            <h3 className="project-title">Collecte Eau de Pluie</h3>
            <p className="project-description">Système de récupération et filtration des eaux pluviales pour l'irrigation des espaces verts et la réduction de la consommation d'eau.</p>
          </div>
          <div className={`project-card fade-in ${visibleElements.has('10') ? 'visible' : ''}`}>
            <div className="project-icon">
              <i className="fas fa-bicycle"></i>
            </div>
            <h3 className="project-title">Mobilité Verte</h3>
            <p className="project-description">Programme de vélos partagés et stations de recharge électrique pour promouvoir les transports écologiques sur le campus.</p>
          </div>
          <div className={`project-card fade-in ${visibleElements.has('11') ? 'visible' : ''}`}>
            <div className="project-icon">
              <i className="fas fa-leaf"></i>
            </div>
            <h3 className="project-title">Jardin Communautaire</h3>
            <p className="project-description">Création d'un jardin biologique géré par les étudiants pour promouvoir l'agriculture durable et la sécurité alimentaire.</p>
          </div>
          <div className={`project-card fade-in ${visibleElements.has('12') ? 'visible' : ''}`}>
            <div className="project-icon">
              <i className="fas fa-trash-alt"></i>
            </div>
            <h3 className="project-title">Zéro Déchet</h3>
            <p className="project-description">Initiative campus zéro déchet avec programmes de compostage, recyclage avancé et réduction des emballages plastiques.</p>
          </div>
        </div>
      </section>
    </>
  );
}