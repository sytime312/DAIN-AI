
import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, OrbitControls, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Cpu, 
  Layers, 
  Users, 
  ChevronRight, 
  Linkedin, 
  Mail, 
  ArrowUpRight,
  Monitor,
  Lightbulb,
  Search,
  Layout,
  Menu,
  X
} from 'lucide-react';

// --- 3D Background Component ---
const Particles = () => {
  const ref = useRef<THREE.Points>(null!);
  const [sphere] = useState(() => {
    const arr = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2 + Math.random() * 2;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00f0ff"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const AnimatedSphere = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 200]} scale={1.2}>
        <MeshDistortMaterial
          color="#7000ff"
          speed={3}
          distort={0.4}
          radius={1}
        />
      </Sphere>
    </Float>
  );
};

// --- Helper Components ---
const SectionTitle = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="mb-12">
    <motion.h3 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      className="text-cyber-blue font-orbitron text-sm tracking-widest uppercase mb-2"
    >
      {subtitle}
    </motion.h3>
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl font-orbitron font-bold"
    >
      {title}
    </motion.h2>
  </div>
);

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 glass border-b border-white/10' : 'py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-orbitron font-black tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-cyber-blue rounded-sm flex items-center justify-center text-cyber-black text-xs">D</div>
          <span>DAIN<span className="text-cyber-blue">.AI</span></span>
        </div>

        <div className="hidden md:flex space-x-8 text-sm font-medium">
          {['About', 'Services', 'Strengths', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-cyber-blue transition-colors uppercase tracking-widest">
              {item}
            </a>
          ))}
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full glass p-6 flex flex-col space-y-4 text-center border-b border-white/10"
          >
            {['About', 'Services', 'Strengths', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsOpen(false)}
                className="text-lg font-orbitron py-2"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Main Page Content ---
export default function App() {
  return (
    <div className="relative font-sans text-white bg-cyber-black min-h-screen">
      {/* 3D Background Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#7000ff" />
          <Suspense fallback={null}>
            <Particles />
            <group position={[2.5, -0.5, 0]}>
              <AnimatedSphere />
            </group>
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <Nav />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center px-6 pt-20 overflow-hidden">
        <div className="container mx-auto">
          <div className="max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1 glass rounded-full text-cyber-blue text-xs font-bold tracking-widest uppercase mb-6 border border-cyber-blue/30">
                Next-Gen AI Transformation Expert
              </span>
              <h1 className="text-6xl md:text-8xl font-orbitron font-black leading-none mb-6">
                DRIVING THE <br />
                <span className="gradient-text">FUTURE OF AI</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed font-light">
                안녕하세요, 인공지능 교육 전문가 <span className="text-white font-medium">Dain</span>입니다. 
                복잡한 기술을 실무의 언어로 변환하여, 조직의 성장을 가속화하는 AI 도입 전략을 제시합니다.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="px-8 py-4 bg-cyber-blue text-cyber-black font-orbitron font-bold rounded-sm hover:bg-white transition-all transform hover:-translate-y-1 flex items-center gap-2 group">
                  LET'S COLLABORATE
                  <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
                <a href="#services" className="px-8 py-4 glass text-white font-orbitron font-bold rounded-sm hover:bg-white/10 transition-all border border-white/20">
                  EXPLORE SERVICES
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Floating Code Decorations */}
        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute right-10 top-1/3 hidden lg:block opacity-20"
        >
          <pre className="text-xs font-mono text-cyber-blue">
{`{
  "expert": "Dain",
  "focus": "AI Transformation",
  "status": "Ready to Innovate",
  "tech_stack": ["LLM", "RAG", "NoCode"]
}`}
          </pre>
        </motion.div>
      </section>

      {/* About / Roles Section */}
      <section id="about" className="relative py-32 px-6">
        <div className="container mx-auto">
          <SectionTitle subtitle="Visionary Consultant" title="The Architect of AI" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Zap />, 
                title: "AI 실무 교육 전문가", 
                desc: "제미나이, 챗GPT 등 핵심 AI 툴을 활용한 실질적인 결과물을 도출하는 핸즈온 강의를 수행합니다." 
              },
              { 
                icon: <Layers />, 
                title: "도입 전략 수석 컨설턴트", 
                desc: "조직 내 업무 효율 극대화를 위한 최적화된 AI 워크플로우를 설계하고 가이드를 수립합니다." 
              },
              { 
                icon: <Users />, 
                title: "콘텐츠 디렉터", 
                desc: "급변하는 AI 생태계 속에서 최신 기술 동향을 분석하여 실무에 바로 적용 가능한 사례를 전파합니다." 
              }
            ].map((role, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 glass rounded-2xl hover:border-cyber-blue/50 transition-all group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-xl flex items-center justify-center mb-6 text-white transform group-hover:rotate-12 transition-transform">
                  {React.cloneElement(role.icon as React.ReactElement, { size: 28 })}
                </div>
                <h4 className="text-xl font-orbitron font-bold mb-4">{role.title}</h4>
                <p className="text-gray-400 font-light leading-relaxed">{role.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-32 bg-cyber-dark/50 px-6">
        <div className="container mx-auto">
          <SectionTitle subtitle="Core Solutions" title="Our Services" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                icon: <Monitor />, 
                title: "생성형 AI 실무 워크숍", 
                tags: ["Prompt Engineering", "Tool Expertise"],
                desc: "단순 체험을 넘어 실무 역량을 강화하는 맞춤형 프롬프트 설계 교육을 제공합니다." 
              },
              { 
                icon: <Cpu />, 
                title: "AI 기반 업무 자동화 컨설팅", 
                tags: ["No-Code", "Efficiency"],
                desc: "노코드 툴과 AI를 결합하여 반복적인 업무를 자동화하는 스마트 워크플레이스를 구축합니다." 
              },
              { 
                icon: <Lightbulb />, 
                title: "AI 리터러시 강연", 
                tags: ["Futuristic", "Insights"],
                desc: "비전공자도 쉽게 이해할 수 있는 AI 기술의 메커니즘과 미래 트렌드를 대중의 언어로 전달합니다." 
              },
              { 
                icon: <Layout />, 
                title: "기업 맞춤형 AI 가이드라인", 
                tags: ["Strategy", "Governance"],
                desc: "효율적이면서도 안전한 AI 도입을 위한 사내 정책 및 활용 가이드라인을 수립합니다." 
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 glass rounded-xl flex flex-col md:flex-row gap-6 hover:bg-white/5 transition-colors border-l-4 border-l-cyber-blue"
              >
                <div className="flex-shrink-0 text-cyber-blue">
                  {React.cloneElement(service.icon as React.ReactElement, { size: 40 })}
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {service.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold tracking-tighter bg-cyber-purple/20 text-cyber-purple px-2 py-0.5 rounded uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-2xl font-orbitron font-bold mb-3">{service.title}</h4>
                  <p className="text-gray-400 font-light">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strengths Section */}
      <section id="strengths" className="py-32 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionTitle subtitle="Why Choose Dain" title="Unmatched Value" />
              <div className="space-y-8">
                {[
                  { title: "기술의 일상화", desc: "복잡한 기술을 누구나 바로 쓸 수 있는 실무 언어로 변환합니다." },
                  { title: "실전형 커리큘럼", desc: "이론을 넘어 즉각적인 결과물을 만들어내는 핸즈온 중심 교육입니다." },
                  { title: "트렌드 분석력", desc: "급변하는 AI 생태계에서 핵심 도구를 선별하는 통찰력을 제공합니다." },
                  { title: "솔루션 중심 접근", desc: "현장에 즉시 도입 가능한 실용적인 해결책을 제시합니다." }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full border border-cyber-blue flex items-center justify-center">
                      <div className="w-2 h-2 bg-cyber-blue rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <h5 className="text-xl font-bold font-orbitron text-white mb-1">{item.title}</h5>
                      <p className="text-gray-400 font-light">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, rotate: 5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              className="relative aspect-square max-w-lg mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-cyber-blue to-cyber-purple opacity-20 blur-3xl rounded-full"></div>
              <div className="relative z-10 p-1 glass rounded-3xl overflow-hidden h-full flex items-center justify-center border-2 border-white/10">
                <div className="text-center">
                  <div className="text-8xl font-black gradient-text mb-4">99%</div>
                  <div className="text-xl font-orbitron font-bold tracking-widest text-gray-400">SATISFACTION RATE</div>
                  <div className="mt-8 flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="w-12 h-1 bg-cyber-blue rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 px-6">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl p-12 text-center relative overflow-hidden group border-2 border-white/5"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink"></div>
            
            <h2 className="text-4xl md:text-6xl font-orbitron font-black mb-8">
              READY TO <span className="gradient-text">TRANSFORM?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light">
              당신의 비즈니스에 인공지능의 날개를 달아보세요. <br />
              맞춤형 컨설팅과 교육으로 앞서가는 미래를 만듭니다.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <a href="mailto:dain@example.com" className="flex items-center gap-3 text-2xl font-orbitron hover:text-cyber-blue transition-colors group">
                <Mail />
                <span>DAIN@AI.COM</span>
                <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </a>
              <div className="h-px w-12 bg-white/10 hidden md:block"></div>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-2xl font-orbitron hover:text-cyber-blue transition-colors group">
                <Linkedin />
                <span>LINKEDIN.COM/IN/DAIN</span>
                <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-orbitron font-black flex items-center gap-2">
            <div className="w-6 h-6 bg-cyber-blue rounded-sm flex items-center justify-center text-cyber-black text-[10px]">D</div>
            <span>DAIN<span className="text-cyber-blue">.AI</span></span>
          </div>
          
          <p className="text-gray-500 text-sm font-light">
            © 2024 DAIN AI TRANSFORMATION. ALL RIGHTS RESERVED.
          </p>
          
          <div className="flex gap-6 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Career</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
