import React, { useEffect, useState } from "react";
import classes from "./LandingPage.module.scss";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Image,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import fitgirlImage from "../../assets/fitgirl.png";
import introImage from "../../assets/introImage.png";
import cardPrecision from "../../assets/cardPrecision.png";
import cardPersonalisation from "../../assets/cardPersonalisation.png";
import cardConvenience from "../../assets/cardConvinience.png";
import cardMotivation from "../../assets/cardMotivation.png";
import card3dBody from "../../assets/card3dBody.png";
import cardBodyComposition from "../../assets/cardBodyComposition.png";
import cardPosture from "../../assets/cardPosture.png";
import bottomImage from "../../assets/bottonImage.png";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Removed 'Link' as it's not used
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import Navbar from "./Navbar";

const cards1 = [
  {
    img: cardPrecision,
    label: "Precision",
    text: "We can precisely track your progress and make data-driven decisions thanks to our cutting-edge 3D body scanning technology, which offers unmatched accuracy.",
  },
  {
    img: cardPersonalisation,
    label: "Personalization",
    text: "Our app uses deep insights into your body composition, posture, and other areas to provide personalized recommendations based on your unique needs and goals.",
  },
  {
    img: cardConvenience,
    label: "Convenience",
    text: "The difficult manual measurements are over. You can easily scan your body from the comforts of your home with a few taps and access your data anywhere at any time.",
  },
  {
    img: cardMotivation,
    label: "Motivation",
    text: "When you work toward your fitness and health goals, keep track of your progress and acknowledge your successes. Our app will encourage and uplift you during the process by displaying the changes to your body.",
  },
];

const cards2 = [
  {
    img: card3dBody,
    label: "3D Body Scanning:",
    text: "To generate an intricate digital model, 86 exact measurements of your body are required.",
  },
  {
    img: cardBodyComposition,
    label: "Body Composition Analysis:",
    text: "To maximize your fitness journey, learn about your muscle mass, body fat percentage, and other factors.",
  },
  {
    img: cardPosture,
    label: "Posture Assessment:",
    text: "With our posture analysis feature, you can pinpoint your areas of weakness and avoid getting hurt.",
  },
  {
    img: cardPosture,
    label: "Progress tracking:",
    text: "Monitor your advancement over time with the help of interactive graphics and thorough statistics.",
  },
  {
    img: cardPosture,
    label: "Personalized Advice:",
    text: "Get customized exercise and dietary advice based on your body type and objectives.",
  },
];

export default function LandingPage() {
  const Navigate = useNavigate();
  const toast = useToast();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 820);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 820);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (formData.name !== "" || formData.email !== "") {
      try {
        // Store form data in Firebase "contact form" collection
        await addDoc(collection(db, "contact form"), formData);
        setFormData({
          name: "",
          email: "",
          comment: "",
        });
        toast({
          title: "Form Submitted",
          description: "Your form has been submitted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error adding document: ", error);
        toast({
          title: "Error",
          description: "An error occurred. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Name or Email cannot be empty",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <div className={classes.rootDiv}>
      <Navbar />
      <Center className={classes.header}>
        <Box className={classes.headerContainer}>
          <motion.div
            className={classes.content}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Box className={classes.texts}>
              <Text className={classes.text}>
                Start your fitness journey with new-gen technology.
              </Text>
              <Button onClick={() => Navigate("/signup")}>Get Started</Button>
              <Text className={classes.text2}>
                Do you already have an account?{" "}
                <span
                  onClick={() => {
                    Navigate("/login");
                  }}
                >
                  Sign in
                </span>
              </Text>
            </Box>
            {!isMobile && <Image src={fitgirlImage} />}
          </motion.div>
          <Text className={classes.description}>
            Empower Your Fitness Journey with Precision and Personalization
          </Text>
        </Box>
      </Center>
      <Center className={classes.intro}>
        <HStack justify="space-between" className={classes.content}>
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: { duration: 3 },
            }}
            viewport={{ once: true }}
            src={introImage}
            alt=""
          ></motion.img>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              transition: { duration: 1 },
            }}
            viewport={{ once: true }}
            className={classes.texts}
          >
            <Text className={classes.label}>INTRODUCTION:</Text>
            <Text className={classes.text}>
              Let me introduce you to Vigour, a cutting-edge app that uses
              modern technology to maximize your health and happiness like never
              before. With our state-of-the-art 3D body scanning technology, you
              can wave goodbye to guesswork and hello to precision. It can
              accurately capture 86 measurements to create a detailed digital
              body model.
            </Text>
            <Button onClick={() => Navigate("/signup")}>Get Started</Button>
          </motion.div>
        </HStack>
      </Center>
      <Box className={classes.cardComponent}>
        <Text className={classes.cardHeader}>Why Vigour?</Text>
        <Flex className={classes.cards}>
          {cards1.map((data, index) => (
            <Box key={index} className={classes.cardItem}>
              <Image src={data.img} />
              <Text className={classes.label}>{data.label}:</Text>
              <Text className={classes.text}>{data.text}</Text>
            </Box>
          ))}
        </Flex>
      </Box>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: { duration: 2 },
        }}
        viewport={{ once: true }}
        className={classes.banner}
      >
        <Text className={classes.bannerHeader}>
          How are we different from others?
        </Text>
        <Text className={classes.bannerText}>
          We identify specific body parts and extract major physical
          characteristics from the user, such as body contour, shape, and
          position.
        </Text>
      </motion.div>
      <Box className={`${classes.cardComponent2} ${classes.cardComponent}`}>
        <Flex className={classes.cards}>
          {cards2.map((data, index) => (
            <Box key={index} className={classes.cardItem}>
              <Image src={data.img} />
              <Text className={classes.label}>{data.label}</Text>
              <Text className={classes.text}>{data.text}</Text>
            </Box>
          ))}
        </Flex>
      </Box>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: { duration: 1 },
        }}
        viewport={{ once: true }}
        className={classes.banner2}
      >
        <Box>
          <Text className={classes.bannerHeader}>
            You Only Have One Body, Use it Well.
          </Text>
          <Text className={classes.bannerText}>
            Let's bring your ideal body and way of life to life with our
            innovative technology.
          </Text>
          <Button
            onClick={() => Navigate("/signup")}
            className={classes.bannerBtn}
          >
            Get Started
          </Button>
        </Box>
      </motion.div>
      <Box className={classes.contactForm}>
        <Center className={classes.heading}>Contact Us</Center>
        <Box className={classes.formBox}>
          <form onSubmit={submitHandler}>
            <Input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <Textarea
              placeholder="Write Your Comment Here"
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
            />
            <Button type="submit">Submit</Button>
          </form>
        </Box>
      </Box>
      <Center className={classes.bottomImage}>
        <img src={bottomImage} alt="bottom" />
      </Center>
      <Box className={classes.footer}>
        <Box className={classes.socials}>
          <FaFacebook />
          <FaInstagram />
          <FaTwitter />
          <FaLinkedin />
        </Box>
      </Box>
    </div>
  );
}
