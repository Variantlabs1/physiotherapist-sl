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
  VStack,
  useToast,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../../assets/logo.png";
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
import { useNavigate } from "react-router-dom";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
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
      {!isMobile ? (
        <Flex className={classes.navbar}>
          <VStack className={classes.navImage}>
            <Image className={classes.logo} src={logo} />
            <Text className={classes.text}>vigour</Text>
          </VStack>
          <Flex className={classes.navButtons}>
            <Button
              className={classes.signUp}
              onClick={() => {
                Navigate("/signup");
              }}
            >
              Sign Up
            </Button>
            <Button
              className={classes.signIn}
              onClick={() => {
                Navigate("/login");
              }}
            >
              Sign In
            </Button>
          </Flex>
        </Flex>
      ) : (
        <div className={classes.mobileNavbar}>
          <Flex className={classes.top}>
            <Center className={classes.leftIcon} onClick={toggleDropdown}>
              <HiBars3BottomLeft />
            </Center>
            <HStack className={classes.navContainer}>
              <VStack className={classes.navImage}>
                <Image className={classes.logo} src={logo} />
                <Text className={classes.text}>vigour</Text>
              </VStack>
            </HStack>
          </Flex>
          <AnimatePresence>
            {isDropdownOpen && (
              <Flex className={classes.dropdownContainer}>
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: 10 }}
                  exit={{ opacity: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={classes.dropdown}
                >
                  <button
                    onClick={() => {
                      Navigate("/home");
                    }}
                  >
                    Home
                  </button>
                  <button
                    onClick={() => {
                      Navigate("/login");
                    }}
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => {
                      Navigate("/signup");
                    }}
                  >
                    Sign In
                  </button>
                </motion.div>
                <Box className={classes.dropdownButton}>
                  <Button>Buy now</Button>
                </Box>
              </Flex>
            )}
          </AnimatePresence>
        </div>
      )}
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
              <Button>Get Started</Button>
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
            <Button>Get Started</Button>
          </motion.div>
        </HStack>
      </Center>
      <Box className={classes.cardComponent}>
        <Text className={classes.cardHeader}>Why Vigour?</Text>
        <Flex className={classes.cards}>
          {cards1.map((data) => (
            <Box className={classes.cardItem}>
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
          {cards2.map((data) => (
            <Box className={classes.cardItem}>
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
          transition: { duration: 3 },
        }}
        viewport={{ once: true }}
        className={`${classes.banner} ${classes.banner2}`}
      >
        <Box className={classes.bannerContainer}>
          <Text className={classes.bannerHeader}>Get Started Today:</Text>
          <Text className={classes.bannerText}>
            Ready to use Vigour ? Take the first step toward a happier,
            healthier you by downloading our app now!
          </Text>
        </Box>
        <Flex className={classes.bannerButton}>
          <Button>Download now</Button>
        </Flex>
      </motion.div>
      <Flex className={classes.followContainer}>
        <Box className={classes.first}>
          <Text className={classes.firstLabel}>Join our community:</Text>
          <Text className={classes.firstText}>
            Sign up to receive newsletters, tips, and updates from us.
          </Text>
          <Button variant="solid">Newsletters</Button>
        </Box>
        <Box className={classes.first}>
          <Text className={classes.firstLabel}>Follow us on social media:</Text>
          <Text className={classes.firstText}>
            Get connected with people who share your interests, document your
            progress, and maintain motivation as you pursue wellness. Follow us
            on social media and join the conversation today!
          </Text>
          <Flex className={classes.firstIcons}>
            <FaFacebook className={classes.icon} />
            <FaInstagram className={classes.icon} />
            <FaTwitter className={classes.icon} />
            <FaLinkedin className={classes.icon} />
          </Flex>
        </Box>
      </Flex>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: { duration: 2 },
        }}
        viewport={{ once: true }}
        className={classes.formContainer}
      >
        <Box className={classes.form}>
          <Heading className={classes.formHeader}>Get Started Today:</Heading>
          <form onSubmit={submitHandler}>
            <label>Your name</label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />
            <label>Your email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
            <label>Your comment</label>
            <Textarea
              value={formData.comment}
              onChange={(e) => {
                setFormData({ ...formData, comment: e.target.value });
              }}
            />
            <Button type="submit">Submit</Button>
            <Text>
              Ready to use Vigour ? Take the first step toward a happier,
              healthier you by downloading our app now!
            </Text>
          </form>
        </Box>
        <Flex className={classes.formButton}>
          <Button>Download now</Button>
        </Flex>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: { duration: 2 },
        }}
        viewport={{ once: true }}
        className={classes.bottomContainer}
      >
        <Flex className={classes.bottomTexts}>
          <Heading className={classes.bottomHeader}>Have questions?</Heading>
          <Text className={classes.bottomText}>
            We have a committed support staff available to help you at every
            stage. Please contact us with any questions or comments; we would be
            delighted to hear from you!
          </Text>
        </Flex>
        <Image src={bottomImage} />
      </motion.div>
      {isMobile && (
        <Box className={classes.footer}>
          <Box>
            <Heading>Vigour</Heading>
            <Text>Mindleap AI LLC</Text>
            <Text>
              Empower Your Fitness Journey with Precisionand Personalization
            </Text>
          </Box>
          <Box>
            <Text className={classes.headers}>Contact Us</Text>
            <Text>202 Helga Springs Rd, Crawford, TN 28554</Text>
            <Text>
              Call Us: <strong>630003660</strong>
            </Text>
            <Text>info@vigour.com</Text>
          </Box>
          <Box>
            <Text className={classes.headers}>Sign Up for Email Updates</Text>
            <Flex className={classes.inputContainer}>
              <Input placeholder="Your e-mail address" />
              <Button>Subscribe</Button>
            </Flex>
            <Text className={classes.smallText}>
              Sign up with your email address to receive news and updates
            </Text>
          </Box>
          <Box className={classes.last}>
            <Text>Home</Text>
            <Text className={classes.copy}>
              Copyright c2024 vigour. All rights reserved
            </Text>
          </Box>
        </Box>
      )}
    </div>
  );
}
