"use client";
import React, { useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Hero from "./components/Hero";
import Header from "./components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Hero2 from "./components/Hero2";
import Hero3 from "./components/Hero3";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/");
    } else {
      router.push(`/dashboard/${session.user.id}`);
    }
  }, [session, status, router]);

  // Animation settings
  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Custom hook to check if a component is in view
  const useOnScreen = (options) => {
    const ref = React.useRef();
    const [isVisible, setIsVisible] = React.useState(false);
  
    const observer = React.useMemo(
      () =>
        new IntersectionObserver(
          ([entry]) => setIsVisible(entry.isIntersecting),
          options
        ),
      [options]
    );
  
    React.useEffect(() => {
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, [ref, observer]);

    return [ref, isVisible];
  };

  // Usage of custom hook
  const [heroRef, heroInView] = useOnScreen({ threshold: 0.1 });
  const [hero2Ref, hero2InView] = useOnScreen({ threshold: 0.1 });
  const [hero3Ref, hero3InView] = useOnScreen({ threshold: 0.1 });

  return (
    <>
      <Header />
      <motion.div
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={animationVariants}
      >
        <Hero />
      </motion.div>
      <motion.div
        ref={hero2Ref}
        initial="hidden"
        animate={hero2InView ? "visible" : "hidden"}
        variants={animationVariants}
      >
        <Hero2 />
      </motion.div>
      <motion.div
        ref={hero3Ref}
        initial="hidden"
        animate={hero3InView ? "visible" : "hidden"}
        variants={animationVariants}
      >
        <Hero3
          h4="Document Customization"
          p="Utilize presets for exams like NEET, JEE, UPSC, and MPSC to resize and format your documents. Adjust dimensions and file sizes as needed for optimized downloads."
          a="ir"
          img="/hero3.jpeg"
        />
      </motion.div>
      <motion.div
        ref={hero3Ref}
        initial="hidden"
        animate={hero3InView ? "visible" : "hidden"}
        variants={animationVariants}
      >
        <Hero3
          h4="Secure Document Management"
          p="Ensure your documents are safely shared and downloaded. Our platform provides secure access controls and encryption for sensitive information, enabling you to manage and distribute your files with confidence."
          a="il"
          img="/hero30.png"
        />
      </motion.div>
    </>
  );
}
